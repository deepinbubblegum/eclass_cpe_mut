$(document).ready(function() {
    var datacard;
    var point_id;
    data_subject = $("#subject").val();
    data_semester = $("#semester").val();
    data_menu_id = $("#menu_id").val();
    $('#txt_title').find('.txt').text(data_subject);
    ShowData();

    function ShowData() {
        $.ajax({
            type: "POST",
            url: "../Teacher_subject_menu_point/Show_Data_ctl",
            data: '&semester=' + data_semester + '&subject=' + data_subject + '&menu_id=' + data_menu_id,
            dataType: "json",
            success: function(response) {
                console.log(response);
                datacard = response;
                var html = '';
                var i;
                for (i = 0; i < response.length; i++) {
                    if (i % 6 == 0) {
                        if (i != 0) {
                            html += '</div>';
                        }
                        html += '<div class="row mt-4">';
                    }
                    html +=
                        '<div class="col-2">' +
                        '<div class="card">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title">' + response[i].menu_point_fullname + '</h5>' +
                        // '<p class="card-text"> ' + response[i].menu_point_fullname + ' </p>' +
                        '<a href="#" class="mr-2 ml-2">' +
                        '<span style="font-size: 30px; color: blue;"">' +
                        '<i class="far fa-list-alt" id="ViewPoint" value="' + i + '" title="ชมรายการรหัสใบงาน"></i>' +
                        '</span>' +
                        '<a href="#" class="mr-2 ml-2">' +
                        '<span style="font-size: 29px;">' +
                        '<i class="fas fa-file-medical" id="AddPoint" value="' + i + '" title="ส่งรหัสใบงาน"></i>' +
                        '</span>' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                $('#ShowDataPoint').html(html);
            }
        });
    }

    $('#btnAdd').click(function(e) {
        e.preventDefault();
        $('#Modal').find('.modal-title').text('เพิ่มช่องคะแนน');
        $('#Modal').modal('show');

    });

    $('#btnSave').click(function(e) {
        e.preventDefault();
        txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
        txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
        data = $("#FullName").val();
        data2 = $("#MiniName").val();
        $.ajax({
            type: "POST",
            url: "../Teacher_subject_menu_point/Add_Data_ctl",
            data: '&fullname=' + data + '&mininame=' + data2 + '&semester=' + data_semester + '&subject=' + data_subject + '&menu_id=' + data_menu_id,
            success: function() {
                $("#FullName").val("");
                $("#MiniName").val("");
                ShowData();
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: txtsnack
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: txtsnackerr + errorThrown + ' )'
                });
            }
        });
    });

    $('#btnClose').click(function(e) {
        // document.getElementById("FullName").value = "";
        // document.getElementById("MiniName").value = "";
        $("#FullName").val("");
        $("#MiniName").val("");
        document.getElementById("selectall").checked = false;
    });

    $('#ShowDataPoint').on('click', '#AddPoint', function(e) {
        ivalue = $(this).attr('value');
        datacard[ivalue].menu_point_id_point;
        $('#Modal_Add_Point').modal('show');
        $('#Modal_Add_Point').find('.modal-title').text('กรอกคะแนน' + " " + datacard[ivalue].menu_point_fullname);
        point_id = datacard[ivalue].menu_point_id_point;
        // document.getElementById("#Point").focus();
    });


    $('#ShowDataPoint').on('click', '#ViewPoint', function(e) {
        ivalue = $(this).attr('value');
        datacard[ivalue].menu_point_id_point;
        $('#Modal_Show_Point_Student').modal('show');
        $('#Modal_Show_Point_Student').find('.modal-title').text('รายชื่อผู้กรอกคะแนน' + " " + datacard[ivalue].menu_point_fullname);
        point_id = datacard[ivalue].menu_point_id_point;
        show_point_student();
        // document.getElementById("#Point").focus();
    });


    function show_point_student() {
        $.ajax({
            type: "POST",
            url: "../Teacher_point_student/Show_point_In_MenuPoint",
            data: '&semester=' + data_semester + '&subject=' + data_subject + '&menu_id=' + data_menu_id + '&point_id=' + point_id,
            dataType: "json",
            success: function(response) {
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" data="' + response[i].point_std_user_id + '" id="' + response[i].point_std_user_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].point_std_user_id + i + '">' + response[i].point_std_user_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].point_std_point + '</td>' +
                            '</tr>';
                    }
                }
                $('#Form_Show_Point_Student').html(html);
            }
        });
    }


    $('#btnAddPoint').click(function(e) {
        e.preventDefault();
        txtsnack = 'เพิ่มคะแนน ( Success: เพิ่มคะแนนเรียบร้อย )';
        txtsnackerr = 'ไม่สามารถเพิ่มคะแนนได้ ( Error: ';
        data_id_std = $("#id_std").val();
        data_point = $("#Point").val();
        $.ajax({
            type: "POST",
            url: "../Teacher_point_student/Add_Data_ctl",
            data: '&semester=' + data_semester + '&subject=' + data_subject + '&menu_id=' + data_menu_id + '&point_id=' + point_id + '&id_std=' + data_id_std + '&point=' + data_point,
            success: function() {
                document.getElementById("id_std").value = "",
                    Snackbar.show({
                        actionText: 'close',
                        pos: 'top-center',
                        actionTextColor: '#4CAF50',
                        backgroundColor: '#323232',
                        width: 'auto',
                        text: txtsnack
                    });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: txtsnackerr + errorThrown + ' )'
                });
            }
        });
    });


    $('#selectall').change(function() {
        $('.custom-control-input').prop("checked", $(this).prop("checked"));
    });

    function selectchb() {
        var item = [];
        $('input[name^=checkitem]:checked').each(function() {
            item.push($(this).val());
        });
        return item;
    }


});