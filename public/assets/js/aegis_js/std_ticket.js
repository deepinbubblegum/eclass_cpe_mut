$(document).ready(function () {
    var url = $(location).attr('href').split("/");
    var camera_use = false;
    $("#btn_start_reader").click(function () {
        camera_use = true;
    });
    
    $('#btnTicketSave').click(function (e) {
        ticket = $('#Ticket').val();
        takeThisUrl = '/' + url[3] + '/Std_ticket/getTicket';
        $.ajax({
            type: "POST",
            url: takeThisUrl,
            data: '&ticket=' + ticket,
            dataType: "json",
            success: function (response) {
                $('#txtShowReturn').removeClass();
                if (response == '0') {
                    //console.log('IF 0');
                    $('#txtShowReturn').addClass('text-warning');
                    $('#txtShowReturn').text('*ไม่พบรหัสใบงานนี้');
                } else if (response == '1') {
                    //console.log('IF 1');
                    $('#txtShowReturn').addClass('text-success');
                    $('#txtShowReturn').text('สำเร็จ');
                    $('#Ticket').val('');
                    if (camera_use) {
                        $("#btn_start_reader").click();
                    }
                } else if (response == '-1') {
                    //console.log('IF -1');
                    $('#txtShowReturn').addClass('text-danger');
                    $('#txtShowReturn').text('*รหัสใบงานนี้ถูกใช้งานแล้ว');
                } else if (response == '-2') {
                    //console.log('IF -1');
                    $('#txtShowReturn').addClass('text-danger');
                    $('#txtShowReturn').text('*ช่องคะแนนถูกปิดแล้ว');
                } else if (response == '-3') {
                    $('#txtShowReturn').addClass('text-danger');
                    $('#txtShowReturn').text('*นักศึกษากรอกคะแนนแล้ว');
                } else {
                    //console.log('dafug?');
                    $('#txtShowReturn').addClass('text-secondary');
                    $('#txtShowReturn').text('dafug?');
                }
                //$('#modal_ticket').modal('hide');
            },
        });
    });
});