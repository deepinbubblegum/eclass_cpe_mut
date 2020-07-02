$(document).ready(function() {
    var iurl;
    var datatable;
    var iddata;
    var subdata;
    var data_semester;

    show_data_semester();

    function show_data_semester() {
        $.ajax({
            url: "../Admin_semester/Show_Data_ctl",
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                console.log(response);
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].semester_id + '">' + response[i].semester_name + '</option>';
                        a = i;
                    }

                }
                $('#Semester_Form_option').html(html);
                $('#Semester_Form_option').val(response[a].semester_id);
                show_data();
            }
        });
    }


    $('#Semester_Form_option').change(function(e) {
        e.preventDefault();
        show_data();
    });


    function show_data() {
        data_semester = $("#Semester_Form_option :selected").val();
        $.ajax({
            type: "POST",
            url: "../Teacher_add_subject/Show_Data_ctl",
            data: '&semester=' + data_semester,
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                datatable = response;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        if (i % 3 == 0) {
                            if (i != 0) {
                                html += '</div>';
                            }
                            html += '<div class="card-deck">';
                        }
                        html +=
                            '<a href="#" class="card" id="Card_subject" data="' + response[i].subject_id + '" value="' + i + '" style="max-width:32%;">' +
                            '<img src="http://wallpoper.com/images/00/34/44/77/da-capo_00344477_thumb.jpg">' +
                            '<div class="card-body">' +
                            '<h5 class="card-title ">' + response[i].subject_id + '</h5>' +
                            '<p class="card-text">' + response[i].subject_name + '</p>' +
                            '</div>' +
                            '</a>';
                    }
                }
                $('#ShowDataSubject').html(html);
            }
        });
    }

    $('#btnAdd').click(function(e) {
        e.preventDefault();
        iurl = "../Admin_subject_semester/Add_Data_ctl";
        $('#Modal').find('.modal-title').text('เพิ่มข้อมูลวิชาประจำปีการศึกษา');
        $('#Modal').modal('show');
        $.ajax({
            url: "../Admin_semester/Show_Data_ctl",
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].semester_id + '">' + response[i].semester_name + '</option>';
                    }
                }
                $('#Semester_Form_add_option').html(html);
            }
        });
        $.ajax({
            url: "../Teacher_add_subject/Subject_Add_data_ctl",
            dataType: "json",
            success: function(response) {
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].subject_id + '" data-2="' + response[i].subject_teacher + '">' + response[i].subject_name + '(' + response[i].subject_id + ') </option>';
                    }
                }
                $('#Subject_Form_add_option').html(html);
            }
        });
    });

    $('#btnSave').click(function(e) {
        e.preventDefault();
        if (iurl == '../Admin_subject_semester/Add_Data_ctl') {
            txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
            txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
        } else {
            txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
            txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
        }
        data = $("#Semester_Form_add_option :selected").val();
        data2 = $("#Subject_Form_add_option :selected").val();
        update_teasub = $("#Subject_Form_add_option").find(':selected').data('2');
        $.ajax({
            type: "POST",
            url: iurl,
            data: '&semester_id=' + data + '&subject_id=' + data2 + '&org_id=' + iddata + '&org_sub=' + subdata,
            success: function() {
                if (iurl == '../Admin_subject_semester/Edit_Data_ctl') {
                    $('#Modal').modal('hide');
                }
                document.getElementById("Semester_Form_add_option").value = datatable[0].semester_id;
                document.getElementById("Subject_Form_add_option").value = datatable[0].subject_id;
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
        $.ajax({
            type: "POST",
            url: "../Admin_teacher_subject/Add_Data_ctl",
            data: '&semester=' + data + '&subject=' + data2 + '&teacher=' + update_teasub,
            success: function() {
                $('#Modal').modal('hide');
                show_data();
            }
        });
    });


    $('#ShowDataSubject').on('click', '#Card_subject', function(e) {
        e.preventDefault();
        iddata = $(this).attr('data');
        ivalue = $(this).attr('value');
        semesterdata = datatable[ivalue].subject_id;
        data_semester = $("#Semester_Form_option :selected").val();
        window.location.replace("../Teacher_subject/subject_menu_news?subject=" + semesterdata + "&semester=" + data_semester);
    });


});