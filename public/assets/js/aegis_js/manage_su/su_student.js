$(document).ready(function() {
    show_data();
    var iddata;
    var iurl;
    var datatable;

    var limit = 10;
    var start = 0;
    var currentPage = 1;

    var pagingSize = [10, 25, 50, 100];
    dropGen();

    $('.row_set').click(function() {
        limit = $(this).attr('value');
        showBtnTxt = limit;
        if (limit == 0) {
            showBtnTxt = 'all';
        }
        document.getElementById('row_active').innerText = showBtnTxt;
        start = 0;
        currentPage = 1;
        show_data();
    });

    $('#chevron_right').click(function() {
        limit = $('.row_active').text();
        start = start + (limit * 1);
        currentPage++;
        show_data();
    });

    $('#chevron_left').click(function() {
        limit = $('.row_active').text();
        start = start - limit;
        currentPage--;
        show_data();
    });

    function dropGen() {
        var html = '';
        for (i = 0; i < pagingSize.length; i++) {
            html += '<a  class="dropdown-item row_set" value="' + pagingSize[i] + '">' + pagingSize[i] + '</a>';
        }
        html += '<div class="dropdown-divider" ></div>' +
            '<a class="dropdown-item row_set" value="0" >Show all</a>';
        $('#rowsetmenu').html(html);
    }

    function disableArrow(start, pageMax) {
        if (start == 1) {
            $('#chevron_left').addClass('disabled text-muted');
        } else {
            $('#chevron_left').removeClass('disabled text-muted');
        }

        if (start == pageMax) {
            $('#chevron_right').addClass('disabled text-muted');
        } else {
            $('#chevron_right').removeClass('disabled text-muted');
        }
    }

    function show_data() {
        $.ajax({
            url: "../Admin_student/Show_Max_Data_ctl",
            dataType: "json",
            success: function(maxdata) {
                pageMax = Math.ceil(maxdata / limit);
                console.log(pageMax);
                if (currentPage == pageMax) {
                    stop = maxdata;
                } else if (pageMax == Infinity) {
                    stop = maxdata;
                    limit = start = null;
                } else {
                    stop = Number(limit) + Number(start);
                }
                start_limit = (start + 1) + '-' + (stop) + ' of ' + maxdata;
                document.getElementById('showstart_limit').innerText = start_limit;
                disableArrow(currentPage, pageMax);
            }
        });

        $.ajax({
            type: "POST",
            data: "&start=" + start + "&limit=" + limit,
            url: "../Admin_student/Show_Data_ctl",
            dataType: "json",
            success: function(response) {
                datatable = response;
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].student_id + '" id="' + response[i].student_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].student_id + i + '">' + response[i].student_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].student_name + '   ' + response[i].student_lastname + '</td>' +
                            '<td>' + response[i].student_email + '</td>' +
                            '<td>' + response[i].major_name + '</td>' +
                            '<td>' + response[i].student_username + '</td>' +
                            '<td>' + response[i].permission_name + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].student_id + '" class="item-edit">Edit</a></td>' +
                            '</tr>';
                    }
                }
                $('#ShowStudentTable').html(html);
            }
        });
    }

    $('#btnSave').click(function(e) {
        e.preventDefault();
        if (iurl == '../Admin_student/Add_Data_ctl') {
            txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
            txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
        } else {
            txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
            txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
        }
        data = $('#Student_Form_add').serialize();
        data2 = $("#Major_Form_add_option :selected").val();
        data3 = $("#Permission_Form_add_option :selected").val();
        $.ajax({
            type: "POST",
            url: iurl,
            data: data + '&major_id=' + data2 + '&permission_id=' + data3 + '&org_id=' + iddata,
            success: function(response) {
                document.getElementById('id_student').value = "";
                document.getElementById('name_student').value = "";
                document.getElementById('lastname_student').value = "";
                document.getElementById('email_student').value = "";
                document.getElementById('username_student').value = "";
                document.getElementById('Major_Form_add_option').value = datatable[0].major_id;
                document.getElementById('Permission_Form_add_option').value = datatable[0].permission_id;
                show_data();
                if (iurl != '../Admin_student/Add_Data_ctl') {
                    $('#Modal').modal('hide');
                };
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

    $('#btnAdd').click(function(e) {
        e.preventDefault();
        iurl = '../Admin_student/Add_Data_ctl';
        $('#Modal').find('.modal-title').text('เพิ่มข้อมูลนักศึกษา');
        $('#Modal').find('#btnSave').text('เพิ่มข้อมูลนักศึกษา');
        $('#Modal').modal('show');
        $.ajax({
            url: "../Admin_major/Show_Data_ctl",
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].major_id + '">' + response[i].major_name + '</option>';
                    }
                }
                $('#Major_Form_add_option').html(html);
            }
        });
        $.ajax({
            url: "../Admin_permission/Show_Data_ctl",
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].permission_id + '">' + response[i].permission_name + '</option>';
                    }
                }
                $('#Permission_Form_add_option').html(html);
            }
        });
    });

    $('#ShowStudentTable').on('click', '.item-edit', function() {
        iddata = $(this).attr('data');
        ivalue = $(this).attr('value');
        $('#id_student').val(datatable[ivalue].student_id);
        $('#name_student').val(datatable[ivalue].student_name);
        $('#lastname_student').val(datatable[ivalue].student_lastname);
        $('#email_student').val(datatable[ivalue].student_email);
        $('#username_student').val(datatable[ivalue].student_username);
        $('#Modal').modal('show');
        $('#Modal').find('.modal-title').text('แก้ไขข้อมูลนักศึกษา');
        $('#Modal').find('#btnSave').text('แก้ไขข้อมูลนักศึกษา');
        iurl = '../Admin_student/Edit_Data_ctl';
        $.ajax({
            url: "../Admin_major/Show_Data_ctl",
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].major_id + '">' + response[i].major_name + '</option>';
                    }
                }
                $('#Major_Form_add_option').html(html);
                // alert(datatable[ivalue].faculty_id);
                $('#Major_Form_add_option').val(datatable[ivalue].major_id);
            }
        });
        $.ajax({
            url: "../Admin_permission/Show_Data_ctl",
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].permission_id + '">' + response[i].permission_name + '</option>';
                    }
                }
                $('#Permission_Form_add_option').html(html);
                // alert(datatable[ivalue].faculty_id);
                $('#Permission_Form_add_option').val(datatable[ivalue].permission_id);
            }
        });
    });

    $('#btnSearch').click(function(e) {
        e.preventDefault();
        data = $('#SearchName').val();
        $.ajax({
            type: "POST",
            url: "../Admin_student/Search_Show_Data_ctl",
            data: "&data=" + data,
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].student_id + '" id="' + response[i].student_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].student_id + i + '">' + response[i].student_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].student_name + '   ' + response[i].student_lastname + '</td>' +
                            '<td>' + response[i].student_email + '</td>' +
                            '<td>' + response[i].major_name + '</td>' +
                            '<td>' + response[i].student_username + '</td>' +
                            '<td>' + response[i].permission_name + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].student_id + '" class="item-edit">Edit</a></td>' +
                            '</tr>';
                    }
                }
                $('#ShowStudentTable').html(html);
            }
        });
    });

    $('#btnDel').click(function(e) {
        e.preventDefault();
        $data = selectchb();
        if ($data.length > 0) {
            $.ajax({
                type: "POST",
                url: "../Admin_student/Delete_Data_ctl",
                data: {
                    $data
                },
                success: function(response) {
                    $('#modaldel').modal('hide');
                    show_data();
                    Snackbar.show({
                        actionText: 'close',
                        pos: 'top-center',
                        actionTextColor: '#4CAF50',
                        backgroundColor: '#323232',
                        width: 'auto',
                        text: 'ลบข้อมูล ( Success: ลบข้อมูลเรียบร้อย )'
                    });
                }
            });
        } else {
            $('#modaldel').modal('hide');
            Snackbar.show({
                actionText: 'ปิด',
                pos: 'top-center',
                actionTextColor: '#4CAF50',
                backgroundColor: '#323232',
                width: 'auto',
                text: 'ไม่สามารถลบข้อมูลได้ : กรุณาเลือกข้อมูลต้องการจะลบ'
            });
        }
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