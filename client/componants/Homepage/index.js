$(document).ready(() => {
    //STATE
    let allPosts = null
    let currentusername = null
    const id = localStorage.getItem("id")

    //GET USERINFOR
    function getUserInfor() {
        $.ajax({
            url: "http://localhost:3000/users",
            type: 'GET',
            contentType: 'application/json'

        }).done((data) => {
            if (!data.isSuccess) {
                $('.alert').remove()
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">Database error</div>`)
            } else {
                data.data.forEach(user => {
                    if (id === user._id) {
                        currentusername = user.firstname + " " + user.lastname
                        $('#navbardrop').html(` <img src="../../assets/images/default-user-avatar.png" alt=""
                        style="width:15%; border-radius: 50%;margin-right: 5px;"> ${user.firstname} ${user.lastname}`)
                    } else {
                        $('#list-user').html(`<li class="item-r">
                    <a href="#"><i class="fa fa-user-circle" aria-hidden="true"></i><span
                            class="md-2">${user.firstname} ${user.lastname}</span></a>
                    </li>`)
                    }
                })
            }
        })
    }
    getUserInfor()

    //GET ALL GROUP
    function getAllGroup() {
        $.ajax({
            url: "http://localhost:3000/groups",
            type: 'GET',
            contentType: 'application/json'

        }).done((data) => {
            if (!data.isSuccess) {
                $('.alert').remove()
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">Database error</div>`)
            } else {
                data.data.forEach(group => {
                    $('.group').append(
                        `<li class="item-r">
                        <img src="../../assets/images/group.png" alt=""
                            style="width:10%; border-radius: 50%;margin-right: 5px;"> ${group.name}
                    </li>`
                    )
                })
            }
        })
    }
    getAllGroup()
    //GET ALLPOST
    function getPosts() {
        $.ajax({
            url: "http://localhost:3000/posts",
            type: 'GET',
            contentType: 'application/json'
        }).done(data => {
            if (!data.isSuccess) {
                $('.alert').remove()
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">Database error</div>`)
            } else {
                allPosts = data.posts
                data.posts.forEach(post => {
                    $('#content').prepend(`
                <div class="content-main bg-7c mb-3 " key="${post._id}">
                    <div class="author">
                        <div class="author-main pb-2">
                            <a href="#"><img src="../../assets/images/default-user-avatar.png"
                                    alt="" style="width:8%; border-radius: 50%"></a>
                            <a href="#">
                                <span class='aut-name'>${post.author}</span>
                            </a>
                        </div>
                        <div class="author-status">
                            <span>${post.content}</span>
                        </div>
                    </div>  

                    <div class="reaction-comment d-flex justify-content-between">
                        <div class="reaction">

                            <div class="mr-4 reaction-detail">
                                <img class="mr-1 reaction-icon" id="likeIcon"
                                    src="../../assets/images/like.png" alt="icon">
                                ${post.reaction.like}
                            </div>
                            <div class="mr-4 reaction-detail">
                                <img class="mr-1 reaction-icon" id="smileIcon"
                                    src="../../assets/images/smile.png" alt="icon">
                                    ${post.reaction.smile}
                            </div>
                            <div class="mr-4 reaction-detail">
                                <img class="mr-1 reaction-icon" id="loveIcon"
                                    src="../../assets/images/heart.png" alt="icon">
                                    ${post.reaction.love}
                            </div>
                            <div class="mr-4 reaction-detail">
                                <img class="mr-1 reaction-icon" id="angryIcon"
                                    src="../../assets/images/angry.png" alt="icon">
                                    ${post.reaction.angry}
                            </div>
                            <div class="mr-4 reaction-detail">
                                <img class="mr-1 reaction-icon" id="surpriseIcon"
                                    src="../../assets/images/suprise.png" alt="icon">
                                    ${post.reaction.suprise}
                            </div>
                        </div>
                        <div class="comment d-flex">
                            <a class=" mr-2" href="#">${post.comment.length} bình luận</a>
                            <a class=" mr-2" href="#">86 lượt chia sẻ</a>
                        </div>
                    </div>
                    <div class="d-flex justify-content-around btn-top-ac">
                        <div class="btn-item"> <button data-toggle="collapse" data-target="#comment"
                                class="btn btn-reaction postcomment" id=""> <i
                                    class="far fa-thumbs-up"></i> Thích</button>
                        </div>
                        <div class="btn-item"> <button data-toggle="collapse" data-target="#comment"
                                class="btn btn-reaction postcomment" id=""> <i
                                    class="far fa-comments"></i> bình
                                luận</button></div>
                        <div class="btn-item"> <button data-toggle="collapse" data-target="#share"
                                class="btn btn-reaction"> <i class="far fa-share-square"></i> chia
                                sẻ</button></div>
                    </div>
                    <div class="post-comment-main">
                        <div class="comment-main mt-3 mb-3"> 
                        </div>                        
                        <div class=" row d-flex align-items-center post-comment-item">
                            <div class="col-1">
                                <img src="../../assets/images/default-user-avatar.png"
                                    alt="author-commet" class="rounded-circle" style="width:35px;">
                            </div>
                            <div class="col-9 post-main">
                                <input type="text" class="form-control gPgfXu comment-post">
                            </div>
                            <div class="col-2 p-0">
                                <button class="btn btn-success btn-comment" id="post-cmt"><i
                                        class="far fa-paper-plane"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                    `)
                    //RENDER COMMENT
                    if (post.comment.length > 0) {
                        post.comment.map(cmt => {
                            let cmtcomponant = `<div class="comment-item mb-3">
                                <div class="comment-author">
                                    <img src="../../assets/images/default-user-avatar.png"
                                 style="width:35px;border-radius: 50%; margin-right: 5px;">${cmt.author}
                              </div>
                             <p class="m-0" style="padding-left: 35px; padding-top:10px">${cmt.content}</p>
                        </div>`
                            $(`div[key = "${post._id}"]`).children('.post-comment-main').children('.comment-main').append(cmtcomponant)
                        })
                    }
                })
            }
        })

    }
    getPosts()

    //ADD COMMENT
    $('.content').on("click", ".content-main .post-comment-main .post-comment-item .btn-comment", (event) => {
        event.preventDefault();
        let postId = $(event.currentTarget).parents('.content-main').attr('key')
        const content = $(event.currentTarget).parent().parent().children('.post-main').children('.comment-post').val()

        //CHECK EMPTY COMMENT
        if (!content) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Vui lòng nhập bình luận của bạn</div>')
            return
        }

        const postInfor = allPosts.find(post => post._id === postId)
        if (!postInfor) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Bài đăng chưa có</div>')
            return
        }
        postInfor.comment.push({
            postID: postId,
            author: currentusername,
            content
        })
        $.ajax({
            url: `http://localhost:3000/posts/${postId}`,
            data: JSON.stringify({ ...postInfor }),
            type: 'PUT',
            contentType: 'application/json'
        }).done(data => {
            if (!data.isSuccess) {
                $('.alert').remove()
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">Bình luận chưa được đăng thành công</div>`)
            } else {
                window.location.replace('http://127.0.0.1:5500/gapo%20app/client/componants/Homepage/index.html')
            }
        })

    })

    //ADD POST
    $("#postModal").click(() => { $(`#sel1`).val(currentusername) })
    $("#create-group").click(() => { $(`#sell`).val(currentusername) })
    $('.btn-post').click(() => {

        let author = $(`#sel1`).val()
        let content = $(`#content-post`).val()
        if (!content) {
            $('.alert').remove()
            $('.modal-body').prepend('<div class="alert alert-warning" role="alert">Bạn chưa viết cảm nghĩ kìa</div>')
            return
        }
        $.ajax({
            url: `http://localhost:3000/posts/`,
            data: JSON.stringify({
                author,
                content
            }),
            type: 'POST',
            contentType: 'application/json'
        }).done(data => {
            if (!data.isSuccess) {
                $('.alert').remove()
                $('.container-fluid').prepend(`<div class="alert alert-warning" role="alert">${data.message}</div>`)
                return
            }
            else {
                window.location.replace('http://127.0.0.1:5500/gapo%20app/client/componants/Homepage/index.html')
            }
        })
    })

    //REACTION
    // LIKE
    $(".content").on("click", ".content-main .reaction-comment .reaction .reaction-detail #likeIcon", function (event) {
        event.preventDefault();
        let postId = $(event.currentTarget).parents('.content-main').attr('key')
        const postInfo = allPosts.find(post => post._id === postId)

        if (!postInfo) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Post Invalid</div>')
            return
        }
        postInfo.reaction.like += 1

        $.ajax({
            url: `http://localhost:3000/posts/${postId}`,
            data: JSON.stringify({
                ...postInfo
            }),
            type: 'PUT',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data.isSuccess) {
                $('.alert').remove()
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
            } else {
                location.reload()
            }
        })
    })

    // SMILE
    $(".content").on("click", ".content-main .reaction-comment .reaction .reaction-detail #smileIcon", function (event) {
        event.preventDefault();
        let postId = $(event.currentTarget).parents('.content-main').attr('key')
        const postInfo = allPosts.find(post => post._id === postId)

        if (!postInfo) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Post Invalid</div>')
            return
        }
        postInfo.reaction.smile += 1

        $.ajax({
            url: `http://localhost:3000/posts/${postId}`,
            data: JSON.stringify({
                ...postInfo
            }),
            type: 'PUT',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data.isSuccess) {
                $('.alert').remove()
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
            } else {
                location.reload()
            }
        })
    })

    //LOVE
    $(".content").on("click", ".content-main .reaction-comment .reaction .reaction-detail #loveIcon", function (event) {
        event.preventDefault();
        let postId = $(event.currentTarget).parents('.content-main').attr('key')
        const postInfo = allPosts.find(post => post._id === postId)

        if (!postInfo) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Post Invalid</div>')
            return
        }
        postInfo.reaction.love += 1

        $.ajax({
            url: `http://localhost:3000/posts/${postId}`,
            data: JSON.stringify({
                ...postInfo
            }),
            type: 'PUT',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data.isSuccess) {
                $('.alert').remove()
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
            } else {
                location.reload()
            }
        })
    })

    //ANGRY
    $(".content").on("click", ".content-main .reaction-comment .reaction .reaction-detail #angryIcon", function (event) {
        event.preventDefault();
        let postId = $(event.currentTarget).parents('.content-main').attr('key')
        const postInfo = allPosts.find(post => post._id === postId)

        if (!postInfo) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Post Invalid</div>')
            return
        }
        postInfo.reaction.angry += 1

        $.ajax({
            url: `http://localhost:3000/posts/${postId}`,
            data: JSON.stringify({
                ...postInfo
            }),
            type: 'PUT',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data.isSuccess) {
                $('.alert').remove()
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
            } else {
                location.reload()
            }
        })
    })
    //SUPRISE
    $(".content").on("click", ".content-main .reaction-comment .reaction .reaction-detail #surpriseIcon", function (event) {
        event.preventDefault();
        let postId = $(event.currentTarget).parents('.content-main').attr('key')
        const postInfo = allPosts.find(post => post._id === postId)

        if (!postInfo) {
            $('.alert').remove()
            $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Post Invalid</div>')
            return
        }
        postInfo.reaction.suprise += 1

        $.ajax({
            url: `http://localhost:3000/posts/${postId}`,
            data: JSON.stringify({
                ...postInfo
            }),
            type: 'PUT',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data.isSuccess) {
                $('.alert').remove()
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
            } else {
                location.reload()
            }
        })
    })

    //TẠO NHÓM
    $(".btn-create").click(() => {
        let name = $('#groupname').val()
        let decription = $('#groupdecription').val()
        let memberID = id
        if (!name) {
            $('.alert').remove()
            $('#groupModal').prepend('<div class="alert alert-warning" role="alert">Vui lòng nhập tên nhóm  </div>')
            return
        }
        $.ajax({
            url: `http://localhost:3000/groups/`,
            data: JSON.stringify({
                name,
                decription,
                memberID
            }),
            type: 'POST',
            contentType: 'application/json'
        }).done(data => {
            if (!data.isSuccess) {
                $('.alert').remove()
                $('.container-fluid').prepend(`<div class="alert alert-warning" role="alert">${data.message}</div>`)
                return
            }
            else {
                window.location.replace('http://127.0.0.1:5500/gapo%20app/client/componants/Homepage/index.html')
            }
        })

    })

    //SIGN OUT
    $('#signout-btn').click(() => {
        localStorage.removeItem("id")
        window.location.replace('../LoginPage/index.html')
    })

})