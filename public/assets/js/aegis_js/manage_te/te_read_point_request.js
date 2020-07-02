$(document).ready(function() {

    // alert(semester);

    var url = $(location).attr('href').split("/");
    ShowRead();
    // $('#txtRead').show();


    function ShowRead() {
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_point_request/Show_Data_Read_ctl",
            data: '&semester=' + semester + '&subject=' + subject_id,
            dataType: "json",
            success: function(response) {
                var html = 0;
                var i;
                if (response != null) {
                    // console.log(response);
                    for (i = 0; i < response.length; i++) {
                        html += 1;
                    }
                }
                if (html == 0) {
                    $('#txtRead').hide();
                    $('#txtReadSide').hide();
                } else {
                    $('#txtRead').show();
                    $('#txtReadSide').show();
                    $('#txtRead').text(html);
                    $('#txtReadSide').text(html);
                }

            }
        });
    }


});