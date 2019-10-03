$(document).ready(function() {
    data_semester = $("#semester").val();
    data_subject = $("#subject").val();
    $('#txt_title').find('.txt').text(data_subject);
    show_side_menu_subject();

    function show_side_menu_subject() {
        $.ajax({
            type: "POST",
            url: "../Teacher_subject_menu/Show_Data_ctl",
            data: '&semester=' + data_semester + '&subject=' + data_subject,
            dataType: "json",
            success: function(response) {
                console.log(response);
                var html = '';
                var i;
                datatable_menu = response;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<a class="nav-item nav-link" href="#" id="menu" data="' + response[i].submenu_type + '" value="' + i + '" >' +
                            '<span style="font-size: 1.5em;">' +
                            '<i class="fas fa-tachometer-alt"></i></span>' +
                            '<span style="font-size: 1.2em;">' +
                            '&nbsp;&nbsp;' + response[i].submenu_name + '' +
                            '</span>' +
                            '</a>';
                    }

                }
                $('#side_menu_subject').html(html);
            }
        });
    }

});