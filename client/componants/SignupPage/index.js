$(document).ready(function () {
    $('#singup-btn').click(() => {
        //INPUT INFO
        const firstname = $('#firstname').val()
        const lastname = $('#lastname').val()
        const email = $('#email').val()
        const password = $('#password').val()
        const birthday = $('#birthday').val()
        const gender = $("input[type='radio']:checked").val()
        console.log(firstname, lastname, email, password, birthday, gender)

        //CHECK EMPTY
        if (!firstname) {
            $('.alert').remove();
            $(".container-fluid").prepend('<div class="alert alert-warning " role="alert">Bạn chưa nhập Họ</div>')
            return
        }

        if (!lastname) {
            $('.alert').remove();
            $(".container-fluid").prepend('<div class="alert alert-warning " role="alert">Bạn chưa nhập tên</div>')
            return
        }

        if (!email) {
            $('.alert').remove();
            $(".container-fluid").prepend('<div class="alert alert-warning " role="alert">Bạn chưa nhập email</div>')
            return
        }

        if (!password) {
            $('.alert').remove();
            $(".container-fluid").prepend('<div class="alert alert-warning " role="alert">Bạn chưa nhập mật khẩu</div>')
            return
        }

        if (!birthday) {
            $('.alert').remove();
            $(".container-fluid").prepend('<div class="alert alert-warning " role="alert">Bạn chưa nhập ngày sinh</div>')
            return
        }

        if (!gender) {
            $('.alert').remove();
            $(".container-fluid").prepend('<div class="alert alert-warning " role="alert">Bạn chưa chọn giới tính</div>')
            return
        }


        // CALL API
        $.ajax({
            url: "http://localhost:3000/users",
            data: JSON.stringify({
                firstname,
                lastname,
                email,
                password,
                birthday,
                gender
            }),
            type: 'POST',
            contentType: 'application/json'
        }).done(function (data) {
            if (data.status === "success") {
                window.location.replace("http://127.0.0.1:5500/gapo%20app/client/componants/LoginPage/index.html")
            } else {
                $('.alert').remove();
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
                return
            }
        })

    })
    $('#login-btn').click(() => {
        window.location.replace('http://127.0.0.1:5500/gapo%20app/client/componants/LoginPage/index.html')
    })
})