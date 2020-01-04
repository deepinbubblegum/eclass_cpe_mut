$(document).ready(function() {
    // alert(semester);

    var url = $(location).attr('href').split("/");
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
                    // console.log(response);
                    for (i = 0; i < response.length; i++) {
                        html += '<tr>' +
                            '<th scope="row">' + response[i].std_code_id + '</th>' +
                            '<td>' + response[i].std_Tname + '</td>' +
                            '<td>' + response[i].ps_tea_point + '</td>' +
                            '</tr>';
                    }
                }
                $('#TbodyPoint').html(html);
                $('#txtRead').hide();
                $('#txtReadSide').hide();
            }
        });
    }


});