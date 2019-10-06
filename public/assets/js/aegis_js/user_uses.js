$(document).ready(function () {

        $(document).on('keypress', function (e) {
                if (e.keyCode == 13) {
                        $('#Signin_btn').click();
                }
        });

        $('#Signin_btn').click(function (e) {
                e.preventDefault();
                username = $('#Username').val();
                password = $('#Password').val();
                var url = $(location).attr('href').split("/");

                if (username == '') {
                        $('#Username').addClass('is-invalid');
                        return false;
                } else {
                        $('#Username').removeClass('is-invalid');
                }
                if (password == '') {
                        $('#Password').addClass('is-invalid');
                        return false;
                } else {
                        $('#Password').removeClass('is-invalid');
                }

                $.ajax({
                        type: "POST",
                        url: "../"+url[3]+"/User_uses/sign_in",
                        data: "&username=" + username + "&password=" + password,
                        success: function (response) {
                                url = window.location.pathname;
                                window.location.href = url;
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                                Snackbar.show({
                                        actionText: 'close',
                                        pos: 'top-center',
                                        actionTextColor: '#4CAF50',
                                        backgroundColor: '#323232',
                                        width: 'auto',
                                        text: 'ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง'
                                });
                        }
                });
        });

        $('#Signout_btn').click(function (e) {
                e.preventDefault();
                window.location.href = '../User_uses/sign_out';
        });
});