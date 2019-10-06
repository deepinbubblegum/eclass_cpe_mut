$(document).ready(function() {
    var iddata;
    var iurl;
    var dataSubSemester;
    var txtsnack;
    var subdata;
    var semesdata;

    var limit = 10;
    var start = 0;
    var currentPage = 1;

    // 1.showAllData
    // 2.formAdd
    // 3.modaldel

    //--------------------------------------------START_FUNCTION_GEN--------------------------------------------//
    $('#titleNameTxt').text("จัดการข้อมูลวิชาประจำเทอม");
    $('#findByTxt').text("ค้นหาด้วย");
    $('#btnFindTxt').text("ค้นหา");
    $('#saveModalTxt').text("SAVE_MODAL");
    $('#delModalTxt').text("ยืนยันการลดข้อมูล");
    $('#tableTitleTxt').text("จัดการข้อมูลวิชาประจำเทอม");
    $('#rowPerPageTxt').text("Rows per page:");

    var btnAddText = 'เพิ่มข้อมูลวิชาประจำเทอม';
    var btnEditText = 'แก้ไขข้อมูลวิชาประจำเทอม';

    var pagingSize = [10, 25, 50, 100];

    var dropSearchValue = [
        //[VALUE,TEXT]
        ['semester_name', 'เทอม'],
        ['subject_id', 'รหัสวิชา'],
        ['subject_name', 'ชื่อวิชา'],
        ['teacher_code_id', 'รหัสอาจารย์'],
        ['teacher_Ename', 'ชื่ออาจารย์']
    ];

    //head of table
    var theadGenValue = ['Semester', 'Subject_id', 'Subject_name', 'Teacher_id', 'Teacher_name', 'Option'];

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
                $('#selectAddSemester').html(html);
            }
        });
        $.ajax({
            url: "../Admin_subject/Show_Data_ctl",
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].subject_id + '" data-2="' + response[i].subject_teacher + '">' + response[i].subject_id + ' - ' + response[i].subject_name + '</option>';
                    }
                }
                $('#selectAddSubject').html(html);
                $('#selectAddSubject').change(function(e) {
                    thisSubject = $("#selectAddSubject :selected").val();
                    console.log('selectAddSubject', thisSubject);
                    takeTeacher(thisSubject);
                });
            }
        });
    }

    function takeTeacher(sbjid) {
        $.ajax({
            type: "POST",
            data: "&subject=" + sbjid,
            url: "../Admin_subject_semester/takeTeacher",
            dataType: "json",
            success: function(response) {
                console.log('-');
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].teacher_code_id + '">' + response[i].teacher_Ename + '</option>';
                    }
                }
                $('#selectAddTeacher').html(html);
                $('#selectAddTeacher').change(function(e) {
                    thisTeacher = $("#selectAddTeacher :selected").val();
                    console.log('selectAddTeacher', thisTeacher);
                });
            }
        });
    }

    function takeSubject(tchid) {
        $.ajax({
            type: "POST",
            data: "&teacher=" + tchid,
            url: "../Admin_subject_semester/takeSubject",
            dataType: "json",
            success: function(response) {
                console.log('-');
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].subject_id + '" data-2="' + response[i].subject_teacher + '">' + response[i].subject_id + ' - ' + response[i].subject_name + '</option>';
                    }
                }
                $('#selectAddTeacher').html(html);
                $('#selectAddTeacher').change(function(e) {
                    thisTeacher = $("#selectAddTeacher :selected").val();
                    console.log('selectAddTeacher', thisTeacher);
                });
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
    //--------------------------------------------END_PAGINATION_ELEMENT--------------------------------------------//

    //--------------------------------------------START_CANT_TOUCH_THIS--------------------------------------------//

    function show_data() {
        $.ajax({
            url: "../Admin_subject_semester/Show_Max_Data_ctl",
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
            url: "../Admin_subject_semester/Show_Data_ctl",
            dataType: "json",
            success: function(response) {
                dataSubSemester = response;
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox" >' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" data="' + response[i].subject_id + '"  value="' + response[i].semester_id + '" data2="' + response[i].subject_teacher + '" id="' + response[i].semester_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].semester_id + i + '"> ' + response[i].semester_name + ' </label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].subject_id + '</td>' +
                            '<td>' + response[i].subject_name + '</td>' +
                            '<td>' + response[i].teacher_code_id + '</td>' +
                            '<td>' + response[i].teacher_Ename + '</td>' +
                            '<td><a data="' + response[i].semester_id + '" value="' + i + '" class="item-edit">Edit</a></td>' +
                            '</tr>';
                    }
                }
                console.log(response);
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
            url: "../Admin_subject_semester/Search_Show_Data_ctl",
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
                            '<div class="custom-control custom-checkbox" >' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" data="' + response[i].subject_id + '"  value="' + response[i].semester_id + '" id="' + response[i].semester_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].semester_id + i + '"> ' + response[i].semester_name + ' </label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].subject_id + '</td>' +
                            '<td>' + response[i].subject_name + '</td>' +
                            '<td>' + response[i].teacher_code_id + '</td>' +
                            '<td>' + response[i].teacher_Ename + '</td>' +
                            '<td><a data="' + response[i].semester_id + '" value="' + i + '" class="item-edit">Edit</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            },
        });
    });

    //--------------------------------------------END_CANT_TOUCH_THIS--------------------------------------------//
    $(document).keyup(function(e) {
        if ($('#Modal').is(':visible') == true) {
            if (e.keyCode === 13) $('#btnSave').click(); // enter
            if (e.keyCode === 27) $('#btnClose').click(); // esc
            console.log('Some Key Pressed');
        }
    });

    $('#btnClose').click(function(e) {
        $('#selectAddSemester').val(dataSubSemester[0].semester_id);
        $('#selectAddSubject').val(dataSubSemester[0].subject_id);
    });

    $('#btnAdd').click(function(e) {
        e.preventDefault();
        iurl = "../Admin_subject_semester/Add_Data_ctl";

        // $('#selectAddSemester').val(dataSubSemester[ivalue].semester_id);

        // takeTeacher(dataSubSemester[ivalue].semester_id);
        // $('#selectAddSubject').val(dataSubSemester[ivalue].subject_id);

        $('#Modal').find('.modal-title').text(btnAddText);
        $('#Modal').modal('show');

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
        data = $("#selectAddSemester :selected").val();
        data2 = $("#selectAddSubject :selected").val();
        data3 = $("#selectAddTeacher :selected").val();
        //update_teasub = $("#selectAddSubject").find(':selected').data('2');
        // alert(update_teasub);
        console.log(data, data2, data3);
        $.ajax({
            type: "POST",
            url: iurl,
            data: '&semester_id=' + data + '&subject_id=' + data2 + '&teacher_id=' + data3 + '&org_id=' + semesdata + '&org_sub=' + subdata,
            success: function() {
                if (iurl == '../Admin_subject_semester/Edit_Data_ctl') {
                    $('#Modal').modal('hide');
                }
                show_data();
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

        subdata = dataSubSemester[ivalue].subject_id;
        $('#selectAddSemester').val(dataSubSemester[ivalue].semester_id);

        takeTeacher(subdata);
        semesdata = dataSubSemester[ivalue].semester_id;
        $('#selectAddSubject').val(dataSubSemester[ivalue].subject_id);

        $('#Modal').find('.modal-title').text(btnEditText);
        $('#Modal').find('#btnSave').text('Save');
        $('#Modal').modal('show');
        iurl = '../Admin_subject_semester/Edit_Data_ctl';
    });



    $('#btnDel').click(function(e) {
        e.preventDefault();
        data_semester = selectchb();
        data_subject = selectchb_sub();
        data_teacher = selectchb_teacher();
        // alert(data3);
        if (data_semester.length > 0) {
            $.ajax({
                type: "POST",
                url: "../Admin_subject_semester/Delete_Data_ctl",
                data: {
                    data_semester,
                    data_subject
                },
                success: function(dataSub) {
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
                    $('#SearchName').val('');
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

    function selectchb_sub() {
        var item = [];
        $('input[name^=checkitem]:checked').each(function() {
            item.push($(this).attr('data'));
        });
        return item;
    }

    function selectchb_teacher() {
        var item = [];
        $('input[name^=checkitem]:checked').each(function() {
            item.push($(this).attr('data2'));
        });
        return item;
    }



});