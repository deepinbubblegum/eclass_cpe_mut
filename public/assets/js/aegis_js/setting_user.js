$(document).ready(function () {
        var url = $(location).attr('href').split("/");
        $('#set_user').click(function (e) { 
                e.preventDefault();
                $('#navdrawer-right').navdrawer('hide');
                $("#user_setting").modal('show');
        });

        function _check_passwd(){
                if($('#Passwd').val() == $('#Passwd_ck').val() && $('#Passwd').val() != '')
                {
                        if($('#Passwd').val().length >= 6){
                                return true;
                        }else{
                                return false;
                        }
                }else
                {
                        return false;
                }
        }

        $('#save_changes').click(function (e) { 
                e.preventDefault();
                if(_check_passwd()){
                        $.ajax({
                                type: "POST",
                                url: "/" + url[3] + "/user_uses/password_change",
                                data: {
                                        old_passwd: $('#old_passwd').val(),
                                        passwd: $('#Passwd').val()
                                },
                                success: function (res) {
                                        console.log(res);
                                        if(res){
                                                Snackbar.show({
                                                        pos: 'top-center',
                                                        text: 'เปลี่ยนรหัสผ่านเรียบร้อย',
                                                        showAction: false,
                                                });
                                                $("#user_setting").modal('hide');
                                                $('#old_passwd').val('');
                                                $('#Passwd').val('');
                                                $('#Passwd_ck').val('');
                                        }else{
                                                Snackbar.show({
                                                        pos: 'top-center',
                                                        text: '! รหัสผ่านเดิมไม่ถูกต้อง หรือ ไม่เป็นไปตามข้อกำหนด',
                                                        showAction: false,
                                                });
                                                // $("#user_setting").modal('hide');
                                                // $('#old_passwd').val('');
                                                $('#Passwd').val('');
                                                $('#Passwd_ck').val('');
                                        }
                                }
                        });
                }else{
                        Snackbar.show({
                                pos: 'top-center',
                                text: 'รหัสผ่านไม่ตรงกัน หรือ ไม่เป็นไปตามข้อกำหนด',
                                showAction: false,
                        });
                        $('#Passwd').val('');
                        $('#Passwd_ck').val('');
                }
        });
});