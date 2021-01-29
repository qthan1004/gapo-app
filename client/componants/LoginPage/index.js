$(document).ready(function () {
    //LOGIN
    $('#login-btn').click(() => {
        //GET INPUT
        const email = $('#email').val();
        const password = $('#password').val()
        console.log(email, password)

        //CHECK EMPTY
        if (!email) {
            $('.alert').remove();
            $(".container-fluid").prepend('<div class="alert alert-warning " role="alert">Bạn chưa nhập email</div>')
            return
        }

        if (!password) {
            $('.alert').remove();
            $('.container-fluid').prepend('<div class="alert alert-warning " role="alert">Bạn chưa nhập mật khẩu</div>')
            return
        }

        // CALL API FROM BACKEND (EXPRESS)
        $.ajax({
            url: "http://localhost:3000/login",
            data: JSON.stringify({
                email,
                password
            }),
            type: 'POST',
            contentType: 'application/json'
        }).done(function (data) {
            if (data.status === 'success') {
                window.location.replace('http://127.0.0.1:5500/gapo%20app/client/componants/Homepage/index.html')
            } else {
                $('.alert').remove();
                $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.massage}</div>`)
                return
            }
        });
    })

    $("#singup-btn").click(() => {
        window.location.replace('http://127.0.0.1:5500/gapo%20app/client/componants/SignupPage/index.html')
    })
})