$(document).ready(() => {
    getAllPost()

    getUserInfo()

    getEmoji((data) => {
        let allEmoji = ''

        data.forEach(emoji => {
            allEmoji += `<div id="${emoji.character}" class="emoji d-inline rounded-circle">${emoji.character.split(' ')[0]}</div>`
        })

        $('.emoji-board').html(allEmoji)

        $('.emoji').click((e) => getEmojiByID(e.currentTarget))
    })

    $('#get-file').change(() => {
        const files = $('#get-file').prop('files')

        if (files && files[0]) {
            let reader = new FileReader()

            reader.onload = (e) => {
                $('#show-file').html(`
                    <img src="${e.target.result}" class="w-100 border rounded-custom">
                `)

            }

            reader.readAsDataURL(files[0])
        }
    })

    $('#post-btn').click(() => {
        const content = $('.post-content').val()
        const email = localStorage.getItem('email')
        const date = (`${new Date()}`).split(' ')
        const time = date[2] + '-' + date[1] + '-' + date[3]

        $.ajax({
            url: 'http://localhost:3000/posts',
            type: 'POST',
            data: JSON.stringify({
                author: email,
                content,
                time,
                reaction: {
                    like: 0,
                    haha: 0,
                    cry: 0,
                    love: 0
                }
            }),
            contentType: 'application/json'
        }).done(data => {
            $('.container-fluid').prepend(`
                <div class="alert alert-success w-75 position-absolute">Đăng bài viết thành công.</div>
            `)

            setTimeout(() => {
                location.reload()
            }, 500)
        })

    })

    function getUser(handler) {
        $.ajax({
            url: 'http://localhost:3000/users',
            type: 'GET',
            contentType: 'application/json'
        }).done((data) => {
            // console.log(data)
            data.data.forEach(user => {
                handler(user)
            })
        })
    }

    function getAllPost() {
        $.ajax({
            url: 'http://localhost:3000/posts',
            type: 'GET',
            contentType: 'application/json'
        }).done(data => {
            // console.log(data)
            data.posts.forEach(post => {
                console.log(data)
                getUser((user) => {
                    if (post.author == user.email) {
                        const postComponent = `
                            <div class="mb-3 p-3 bg-white shadow border rounded-custom">
                                <div class="row mb-3 m-0 p-0 flex-nowrap align-items-center">
                                    <div class="icon-size">
                                        <img class="d-inline-block rounded-circle icon-md-size" src="../../assets/images/iconuser.jpg" alt="">
                                    </div>
                                    <div class="col-10 d-inline-block p-0 post-info">
                                        <p class="m-0"><span class="c-pointer name post-name">${user.firstname} ${user.lastname}</span></p>
                                        <p class="mb-0 post-date"><span class="text-secondary">${post.time}</span></p>
                                    </div>
                                </div>
                                <p>${post.content}</p>
                                <div class="my-3 border"></div>
                                <div class="row flex-nowrap px-2 fw-bold text-secondary">
                                    <label class="col py-2 c-pointer menu-unselect rounded-custom reaction" for="${post._id}-lk">
                                        <i class="fas fa-thumbs-up pe-1"></i>Like
                                    </label>
                                    <input type="radio" class="d-none" id="${post._id}-lk" name="${post._id}">
                                    <label class="col py-2 c-pointer menu-unselect rounded-custom reaction" for="${post._id}-ha">
                                        <i class="fas fa-grin-squint pe-1"></i>Haha
                                    </label>
                                    <input type="radio" class="d-none" id="${post._id}-ha" name="${post._id}">
                                    <label class="col py-2 c-pointer menu-unselect rounded-custom reaction" for="${post._id}-cr">
                                        <i class="fas fa-sad-tear pe-1"></i>Cry
                                    </label>
                                    <input type="radio" class="d-none" id="${post._id}-cr" name="${post._id}">
                                    <label class="col py-2 c-pointer menu-unselect rounded-custom reaction" for="${post._id}-lv">
                                        <i class="fas fa-heart pe-1"></i>Love
                                    </label>
                                    <input type="radio" class="d-none" id="${post._id}-lv" name="${post._id}">
                                </div>
                                <div id="show-cmt"></div>
                                <div class="d-flex comment-inp">
                                    <input type="text" class="col-11 pe-5 form-control rounded-pill post-content post-comment">
                                    <i class="fas fa-plane post-cmt-bnt" ></i>
                                </div>
                                </div>
                            </div>`
                        $.ajax({
                            url: 'http://localhost:3000/users',
                            type: 'GET',
                            contentType: 'application/json'
                        }).done((data) => {
                            console.log(data.data)
                            post.comment.forEach((postinfo) => {
                                for (let i = 0; i < data.data.length; i++) {
                                    if (postinfo.author === data.data[i]._id) {
                                        const comt = `     
                                            <div class="p-0 border border-light col-10">
                                                <p class="col-6 m-0 post-cmt-name"><span class="c-pointer ">${data.data[i].firstname} ${data.data[i].lastname}</span></p>
                                                <p class="mb-0 post-date cmt-content"><span class="fs-4">${postinfo.content}</span></p>
                                            </div>
                                        `
                                        $('#show-cmt').append(comt)
                                    }
                                }
                            })

                        })
                        $('.main-content').append(postComponent)
                        $('input[name="' + post._id + '"]').click(() => {
                            const checked = $('input[name="' + post._id + '"]:checked')
                            const unChecks = $('input[name="' + post._id + '"]:not(:checked)')
                            reaction(checked, unChecks)
                        })

                        $('.post-cmt-bnt').click(() => {
                            const author = localStorage.getItem("id")
                            const idPost = post._id
                            const content = $('.post-comment').val()
                            console.log(author, idPost, content)
                            $.ajax({
                                url: `http://localhost:3000/posts/${idPost}`,
                                type: 'PUT',
                                data: JSON.stringify({
                                    author,
                                    idPost,
                                    content
                                }),
                                contentType: 'application/json'
                            }).done()
                        })
                    }
                })

            })

        })
    }

    function getUserInfo() {
        getUser((user) => {
            const email = localStorage.getItem('email')
            // console.log(user.email)
            if (user.email === email) {
                $('#info-user').html(`
                        <img class="mx-1 d-inline-block rounded-circle icon-md-size" src="../../assets/images/iconuser.jpg" alt="">
                        ${user.firstname} ${user.lastname}
                    `)

                $('#post-avatar').attr('src', "../../assets/images/iconuser.jpg")

                $('#post-content').attr('placeholder', `${user.lastname} ơi, cảm nghĩ của bạn là gi?`)
            } else {
                $('#friend').after(`
                        <div class="d-flex align-items-center flex-nowrap p-2 rounded-custom menu-unselect">
                            <img class="me-3 icon-size rounded-circle" src="../../assets/images/iconuser.jpg" alt="">
                            <p class="m-0 name">${user.firstname} ${user.lastname}</p>
                        </div>
                    `)
            }
        })
    }



    function reaction(checked, unChecks) {
        let i = 0
        while (i < unChecks.length) {
            checkReaction(unChecks[i])
            i++
        }

        if (checkReaction(checked)) {
            return
        }

        if (checked.attr('id').includes('lk')) {
            const checkedID = checked.attr('id')
            $(`label[for="${checkedID}"]`).addClass('text-primary')
        }

        if (checked.attr('id').includes('ha')) {
            const checkedID = checked.attr('id')
            $(`label[for="${checkedID}"]`).addClass('text-warning')
        }

        if (checked.attr('id').includes('cr')) {
            const checkedID = checked.attr('id')
            $(`label[for="${checkedID}"]`).addClass('text-success')
        }

        if (checked.attr('id').includes('lv')) {
            const checkedID = checked.attr('id')
            $(`label[for="${checkedID}"]`).addClass('text-danger')
        }
    }

    function checkReaction(element) {
        const unCheckID = $(element).attr('id')

        if ($(`label[for="${unCheckID}"]`).attr('class').includes('text-')) {
            let unCheckClass = $(`label[for="${unCheckID}"]`).attr('class').split(' ')

            let j = 0
            while (j < unCheckClass.length) {
                if (unCheckClass[j].includes('text-')) {
                    unCheckClass.splice(j, 1)
                    $(`label[for="${unCheckID}"]`).attr('class', unCheckClass.join(' '))
                    return true
                }
                j++
            }
        }

        return false
    }

    function getEmojiByID(element) {
        const character = $(element).attr('id')
        $('.post-content').val(`${$('.post-content').val()}${character}`)
    }

    function getEmoji(callBack) {
        $.getJSON('https://emoji-api.com/emojis?access_key=8dc971798f1b3ca9293d7d68e2357d749a8b2a63', (data) => {
            callBack(data)
        })
    }

    $('#signout-btn').click(() => {
        localStorage.removeItem("email")
        localStorage.removeItem("id")
        window.location.replace('../LoginPage/index.html')
    })

})