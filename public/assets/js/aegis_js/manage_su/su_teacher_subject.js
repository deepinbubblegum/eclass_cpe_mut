$(document).ready(function() {

    var iurl;
    var datatable;
    var semesterdata;
    var subjectdata;
    var teacherdata;
    var data_select_semester;

    var limit = 10;
    var start = 0;
    var currentPage = 1;

    //--------------------------------------------START_FUNCTION_GEN--------------------------------------------//
    $('#titleNameTxt').text("จัดการข้อมูลอาจารย์ประจำวิชา");
    $('#findByTxt').text("ค้นหาด้วย");
    $('#btnFindTxt').text("ค้นหา");
    $('#saveModalTxt').text("SAVE_MODAL");
    $('#delModalTxt').text("ยืนยันการลดข้อมูล");
    $('#tableTitleTxt').text("จัดการข้อมูลอาจารย์ประจำวิชา");
    $('#rowPerPageTxt').text("Rows per page:");

    var btnAddText = 'เพิ่มข้อมูลอาจารย์ประจำวิชา';
    var btnEditText = 'แก้ไขข้อมูลอาจารย์ประจำวิชา';

    var pagingSize = [10, 25, 50, 100];

    var dropSearchValue = [
        //[VALUE,TEXT]
        ['semester_name', 'เทอม'],
        ['subject_name', 'วิชา'],
        ['user_Ename', 'ชื่ออาจารย์']
    ];

    //head of table
    var theadGenValue = ['Semester', 'Subject', 'Teacher', 'Option'];

    function dropPag() {
        var html = '';
        for (i = 0; i < pagingSize.length; i++) {
            html += '<a  class="dropdown-item row_set" value="' + pagingSize[i] + '">' + pagingSize[i] + '</a>';
        }
        html += '<div class="dropdown-divider" ></div>' +
            '<a class="dropdown-item row_set" value="0" >Show all</a>';
        $('#rowsetmenu').html(html);
    }

    function dropSearch() {
        var html = '';
        html += '<option value=""> ทั้งหมด </option>';
        for (i = 0; i < dropSearchValue.length; i++) {
            html += '<option value="' + dropSearchValue[i][0] + '">' + dropSearchValue[i][1] + '</option>';
        }
        $('#select_search').html(html);
    }

    function inModelGen() {
        var html = '';
        html += '<div class="form-row" >';
        html += '<div class="col-md-4 mb-3" >' +
            '<label>Semester</label>' +
            '<select id="selectAddSemester" class="form-control">' +
            '</select>' +
            '</div>';
        html += '<div class="col-md-4 mb-3" >' +
            '<label>Subject</label>' +
            '<select id="selectAddSubject" class="form-control">' +
            '</select>' +
            '</div>';
        html += '<div class="col-md-4 mb-3" >' +
            '<label>Teacher</label>' +
            '<select id="selectAddTeacher" class="form-control">' +
            '</select>' +
            '</div>';
        html += '</div>';
        $('#inModelBody').html(html);
        $.ajax({
            url: "../Admin_teacher_subject/Select_Data_Semester",
            dataType: "json",
            success: function(response) {
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].subsem_semester + '">' + response[i].semester_name + '</option>';
                    }
                }
                $('#selectAddSemester').html(html);
                data_select_semester = $("#selectAddSemester :selected").val();
                select_semester_for_subject();
            }
        });

        $.ajax({
            url: "../Admin_teacher/Show_Data_ctl",
            dataType: "json",
            success: function(response) {
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].user_code_id + '">' + response[i].user_Ename + '</option>';
                    }
                }
                $('#selectAddTeacher').html(html);
            }
        });
    }

    function theadGen() {
        var html = '';
        html += '<tr>' +
            '<th scope="col">' +
            '<div class="custom-control custom-checkbox">' +
            '<input type="checkbox" class="custom-control-input" name="selectall" id="selectall">' +
            '<label class="custom-control-label" for="selectall">' + theadGenValue[0] + '</label>' +
            '</div>';
        for (i = 1; i < theadGenValue.length; i++) {
            html += '<th scope="col">' + theadGenValue[i] + '</th>';
        }
        html += '</tr>';
        $('#tableHead').html(html);
    }

    //---------------------------------------------END_FUNCTION_GEN---------------------------------------------//

    inModelGen();

    dropPag();
    dropSearch();
    theadGen();
    show_data();

    //--------------------------------------------START_PAGINATION_ELEMENT--------------------------------------------//

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

    //--------------------------------------------START_CANT_TOUCH_THIS--------------------------------------------//

    function show_data() {
        $.ajax({
            url: "../Admin_teacher_subject/Show_Max_Data_ctl",
            dataType: "json",
            success: function(maxdata) {
                pageMax = Math.ceil(maxdata / limit);
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
            url: "../Admin_teacher_subject/Show_Data_ctl",
            data: "&start=" + start + "&limit=" + limit,
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" data="' + response[i].semester_id + '" value="' + response[i].subject_id + '" data2="' + response[i].user_code_id + '" id="' + response[i].semester_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].semester_id + i + '">' + response[i].semester_name + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].subject_name + '</td>' +
                            '<td>' + response[i].user_Ename + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].semester_id + '" class="item-edit">Edit</a></td>' +
                            '</tr>';
                    }

                }

                $('#showAllData').html(html);
            }
        });

    }

    $('#btnSearch').click(function(e) {
        e.preventDefault();
        data = $('#SearchName').val();
        data2 = $('#select_search').val();
        $.ajax({
            type: "POST",
            url: "../Admin_teacher_subject/Search_Show_Data_ctl",
            data: "&data=" + data + "&search=" + data2,
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" data="' + response[i].semester_id + '" value="' + response[i].subject_id + '" data2="' + response[i].user_code_id + '" id="' + response[i].semester_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].semester_id + i + '">' + response[i].semester_name + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].subject_name + '</td>' +
                            '<td>' + response[i].user_Ename + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].semester_id + '" class="item-edit">Edit</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    });

    //--------------------------------------------END_CANT_TOUCH_THIS--------------------------------------------//


    $('#btnAdd').click(function(e) {
        e.preventDefault();
        subjectdata = null;
        iurl = "../Admin_teacher_subject/Add_Data_ctl";
        $('#Modal').find('.modal-title').text('เพิ่มข้อมูลอาจารย์ประจำวิชา');
        $('#Modal').modal('show');
    });

    function select_semester_for_subject() {
        $.ajax({
            type: "POST",
            url: "../Admin_teacher_subject/Select_Data_Subject",
            data: '&semester=' + data_select_semester,
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].subsem_subject + '">' + response[i].subject_name + '</option>';
                    }
                }
                $('#selectAddSubject').html(html);
                if (subjectdata != null) {
                    $('#selectAddSubject').val(subjectdata);
                }
            }
        });
    }


    $('#selectAddSemester').change(function(e) {
        e.preventDefault();
        data_select_semester = $("#selectAddSemester :selected").val();
        subjectdata = null;
        select_semester_for_subject();
    });


    $('#btnSave').click(function(e) {
        e.preventDefault();
        if (iurl == "../Admin_teacher_subject/Add_Data_ctl") {
            txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
            txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
        } else {
            txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
            txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
        }
        data = $("#selectAddSemester :selected").val();
        data2 = $("#selectAddSubject :selected").val();
        data3 = $("#selectAddTeacher :selected").val();
        $.ajax({
            type: "POST",
            url: iurl,
            data: '&semester=' + data + '&subject=' + data2 + '&teacher=' + data3 + '&org_semester=' + semesterdata + '&org_subject=' + subjectdata + '&org_teacher=' + teacherdata,
            success: function(response) {
                // document.getElementById("selectAddSemester").value = datatable[0].id;
                // document.getElementById("selectAddSubject").value = datatable[0].subject_id;
                document.getElementById("selectAddTeacher").value = datatable[0].user_code_id;
                show_data();
                if (iurl != "../Admin_teacher_subject/Add_Data_ctl") {
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

    $('#showAllData').on('click', '.item-edit', function() {
        iddata = $(this).attr('data');
        ivalue = $(this).attr('value');
        semesterdata = datatable[ivalue].semester_id;
        subjectdata = datatable[ivalue].subject_id;
        teacherdata = datatable[ivalue].user_code_id;
        $('#Modal').modal('show');
        $('#Modal').find('.modal-title').text('แก้ไขข้อมูลอาจารย์ประจำวิชา');
        $('#Modal').find('#btnSave').text('แก้ไขข้อมูล');
        iurl = '../Admin_teacher_subject/Edit_Data_ctl';
    });

    $('#btnDel').click(function(e) {
        e.preventDefault();
        data_subject = selectchb();
        data_semester = selectchb_semes();
        data_teacher = selectchb_tea();
        if (data_subject.length > 0) {
            $.ajax({
                type: "POST",
                url: "../Admin_teacher_subject/Delete_Data_ctl",
                data: {
                    data_subject,
                    data_semester,
                    data_teacher
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

    function selectchb_semes() {
        var item = [];
        $('input[name^=checkitem]:checked').each(function() {
            item.push($(this).attr('data'));
        });
        return item;
    }

    function selectchb_tea() {
        var item = [];
        $('input[name^=checkitem]:checked').each(function() {
            item.push($(this).attr('data2'));
        });
        return item;
    }
});