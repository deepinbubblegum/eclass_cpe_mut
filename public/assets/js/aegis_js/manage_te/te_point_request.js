$(document).ready(function() {
    // alert(semester);

    var url = $(location).attr('href').split("/");
    var dataStdPoint = '';
    ShowMenu();

    function Read() {

    }

    function ShowMenu() {
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_point_request/Show_Data_ctl",
            data: '&semester=' + semester + '&subject=' + subject_id,
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                if (response != null) {
                    console.log(response);
                    dataStdPoint = response;
                    var btnConfirm = '';
                    for (i = 0; i < response.length; i++) {
                        if(response[i].ps_tea_confirm == 0){
                            btnConfirm = '<button type="button" class="btn btn-primary btn-sm" id="btlConfirm' + i +'"  >รับทราบ</button>';
                        }else{
                            btnConfirm = '<button type="button" class="btn btn-primary btn-sm" disabled>รับทราบแล้ว</button>';
                        }
                        html += '<tr>' +
                            '<th scope="row">' + response[i].std_code_id + '</th>' +
                            '<td>' + response[i].std_Tname + '</td>' +
                            '<td>' + response[i].ps_tea_point + '</td>' +
                            '<td>' + btnConfirm + '</td>' +
                            '</tr>';
                    }
                }
                $('#TbodyPoint').html(html);
                $('#txtRead').hide();
                $('#txtReadSide').hide();

                $.each(dataStdPoint, function(a) {
                    $('#btlConfirm' + a).click(function(){
                        subMain = dataStdPoint[a].ps_tea_subject;
                        menuId = dataStdPoint[a].ps_tea_menu;
                        std = dataStdPoint[a].std_code_id;
                        alert(menuId);
                    });
                });
            }
        });
    }


});