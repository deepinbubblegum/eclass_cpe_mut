$(document).ready(function () {
        var url = $(location).attr('href').split("/");
        $('#te_user').click(function (e) {
                e.preventDefault();
                $('#navdrawer-right').navdrawer('hide');
                $("#te_user_setting").modal('show');
                te_major_status();
        });

        $('#user').click(function (e) {
                e.preventDefault();
                $('#navdrawer-right').navdrawer('hide');
                $("#te_user_setting").modal('show');
        });

        function _check_passwd() {
                if ($('#Passwd').val() == $('#Passwd_ck').val() && $('#Passwd').val() != '') {
                        if ($('#Passwd').val().length >= 6) {
                                return true;
                        } else {
                                Snackbar.show({
                                        pos: 'top-center',
                                        text: '! รหัสผ่านจำเป็นต้องมีความยาวมากกว่าหรือเท่ากับ 6 ตัวขึ้นไป',
                                        showAction: false,
                                });
                                return false;
                        }
                } else {
                        Snackbar.show({
                                pos: 'top-center',
                                text: '! รหัสผ่านใหม่ไม่ตรงกัน',
                                showAction: false,
                        });
                        return false;
                }
        }

        $('#save_changes').click(function (e) {
                e.preventDefault();
                if (_check_passwd()) {
                        $.ajax({
                                type: "POST",
                                url: "/" + url[3] + "/user_uses/password_change",
                                data: {
                                        old_passwd: $('#old_passwd').val(),
                                        passwd: $('#Passwd').val()
                                },
                                success: function (res) {
                                        console.log(res);
                                        if (res) {
                                                Snackbar.show({
                                                        pos: 'top-center',
                                                        text: 'เปลี่ยนรหัสผ่านเรียบร้อย',
                                                        showAction: false,
                                                });
                                                $("#te_user_setting").modal('hide');
                                                $('#old_passwd').val('');
                                                $('#Passwd').val('');
                                                $('#Passwd_ck').val('');
                                        } else {
                                                Snackbar.show({
                                                        pos: 'top-center',
                                                        text: '! รหัสผ่านเดิมไม่ถูกต้อง',
                                                        showAction: false,
                                                });
                                                // $("#user_setting").modal('hide');
                                                // $('#old_passwd').val('');
                                                $('#Passwd').val('');
                                                $('#Passwd_ck').val('');
                                        }
                                }
                        });
                } 
                // else {
                //         Snackbar.show({
                //                 pos: 'top-center',
                //                 text: 'รหัสผ่านไม่ตรงกัน หรือ ไม่เป็นไปตามข้อกำหนด',
                //                 showAction: false,
                //         });
                //         $('#Passwd').val('');
                //         $('#Passwd_ck').val('');
                // }
        });

        function te_major_status() {
                $.ajax({
                        type: "post",
                        url: "/" + url[3] + "/te_major_status/te_major_status_show",
                        dataType: "json",
                        success: function (response) {
                                htmltxt = '';
                                response.forEach(element => {
                                        console.log();
                                        htmltxt += '<br> - (' + element['major_id'] + ') ' + element['major_name'] + '';
                                });
                                $('#techer_major_show').html(htmltxt);
                        }
                });
        }
});