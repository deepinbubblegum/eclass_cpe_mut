$(document).ready(function () {

    var iurl;
    var datatable;
    var semesterdata;
    var subjectdata;
    var teacherdata;
    var data_select_semester;
    var iddata;
    var iddata2;

    var limit = 10;
    var start = 0;
    var currentPage = 1;

    //--------------------------------------------START_FUNCTION_GEN--------------------------------------------//
    $('#titleNameTxt').text("จัดการข้อมูลอาจารย์ประจำวิชา");
    $('#findByTxt').text("ค้นหาด้วย");
    $('#btnFindTxt').text("ค้นหา");
    $('#saveModalTxt').text("SAVE_MODAL");
    $('#delModalTxt').text("ยืนยันการลบข้อมูล");
    $('#tableTitleTxt').text("จัดการข้อมูลอาจารย์ประจำวิชา");
    $('#rowPerPageTxt').text("Rows per page:");

    var btnAddText = 'เพิ่มข้อมูลอาจารย์ประจำวิชา';
    var btnEditText = 'แก้ไขข้อมูลอาจารย์ประจำวิชา';

    var pagingSize = [10, 25, 50, 100];

    var dropSearchValue = [
        //[VALUE,TEXT]
        ['teasub_subjectid', 'รหัสวิชาวิชา'],
        ['subject_name', 'ชื่อวิชา'],
        ['teasub_teacherid', 'อาจารย์'],
    ];

    //head of table
    var theadGenValue = ['รหัสวิชา', 'ชื่อวิชา', 'อาจารย์', 'ตัวเลือก'];

    var Sort = [
        ['subject_id', 'ASC', 'รหัสวิชา A > Z'],
        ['subject_id', 'DESC', 'รหัสวิชา Z > A'],
        ['subject_name', 'ASC', 'ชื่อวิชา A > Z'],
        ['subject_name', 'DESC', 'ชื่อวิชา Z > A'],
        ['teacher_Tname', 'ASC', 'อาจารย์ ก > ฮ'],
        ['teacher_Tname', 'DESC', 'อาจารย์ ฮ > ก']
    ];

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
            '<label>คณะ</label>' +
            '<select id="selectAddFaculty" class="form-control">' +
            '</select>' +
            '</div>';
        html += '<div class="col-md-4 mb-3" >' +
            '<label>สาขา</label>' +
            '<select id="selectAddMajor" class="form-control">' +
            '</select>' +
            '</div>';
        html += '<div class="col-md-4 mb-3" >' +
            '<label>วิชา</label>' +
            '<select id="selectAddSubject" class="form-control">' +
            '</select>' +
            '</div>';
        html += '<div class="col-md-4 mb-3" >' +
            '<label>อาจารย์</label>' +
            '<select id="selectAddTeacher" class="form-control">' +
            '</select>' +
            '</div>';
        html += '</div>';
        $('#inModelBody').html(html);
        $.ajax({
            url: "../Admin_faculty/Show_Data_ctl",
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].faculty_id + '">' + response[i].faculty_name + '</option>';
                    }
                }
                $('#selectAddFaculty').html(html);
                select_major_add();
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

    function ShowSort() {
        var html = '';
        for (i = 0; i < Sort.length; i++) {
            html += ' <a class="dropdown-item" id="sortDrop" href="#" data-1="' + Sort[i][0] + '" data-2="' + Sort[i][1] + '">' + Sort[i][2] + '</a>';
        }
        $('#TableSort').html(html);
    }

    //---------------------------------------------END_FUNCTION_GEN---------------------------------------------//

    inModelGen();

    dropPag();
    dropSearch();
    theadGen();
    show_data();
    ShowSort();

    //--------------------------------------------START_PAGINATION_ELEMENT--------------------------------------------//

    $('.row_set').click(function () {
        limit = $(this).attr('value');
        showBtnTxt = limit;
        if (limit == 0) {
            showBtnTxt = 'all';
        }
        document.getElementById('row_active').innerText = showBtnTxt;
        start = 0;
        currentPage = 1;
        // show_data();
        if($('#SearchName').val() == ""){
            show_data();
        }else{
            LimitSearch();
        }
    });

    $('#chevron_right').click(function () {
        limit = $('.row_active').text();
        start = start + (limit * 1);
        currentPage++;
        // show_data();
        if($('#SearchName').val() == ""){
            show_data();
        }else{
            LimitSearch();
        }
    });

    $('#chevron_left').click(function () {
        limit = $('.row_active').text();
        start = start - limit;
        currentPage--;
        // show_data();
        if($('#SearchName').val() == ""){
            show_data();
        }else{
            LimitSearch();
        }
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
            success: function (maxdata) {
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
            success: function (response) {
                datatable = response;
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" data="' + response[i].teacher_code_id + '" value="' + response[i].subject_id + '"  id="' + response[i].subject_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].subject_id + i + '">(' + response[i].subject_major + ') ' + response[i].subject_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].subject_name + '</td>' +
                            '<td>' + response[i].de_Tname + " " + response[i].teacher_Tname + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].subject_id + '" data2="' + response[i].teacher_code_id + '" data3="' + response[i].subject_major + '" class="item-edit">แก้ไข</a></td>' +
                            '</tr>';
                    }

                }

                $('#showAllData').html(html);
            }
        });

    }

    $('#btnSearch').click(function (e) {
        e.preventDefault();
        data = $('#SearchName').val();
        data2 = $('#select_search').val();

        $.ajax({
            type: "POST",
            url: "../Admin_teacher_subject/Show_Max_Search_Data_ctl",
            data: "&data=" + data + "&search=" + data2,
            dataType: "json",
            success: function (maxdata) {
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
            url: "../Admin_teacher_subject/Search_Show_Data_ctl",
            data: "&data=" + data + "&search=" + data2 + "&start=" + start + "&limit=" + limit,
            dataType: "json",
            success: function (response) {
                datatable = response;
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" data="' + response[i].teacher_code_id + '" value="' + response[i].subject_id + '"  id="' + response[i].subject_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].subject_id + i + '">(' + response[i].subject_major + ') ' + response[i].subject_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].subject_name + '</td>' +
                            '<td>' + response[i].de_Tname + " " + response[i].teacher_Tname + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].subject_id + '" data2="' + response[i].teacher_code_id + '" data3="' + response[i].subject_major + '" class="item-edit">แก้ไข</a></td>' +
                            '</tr>';
                    }

                }

                $('#showAllData').html(html);
            }
        });
    });
    
    function LimitSearch()
    {
        data = $('#SearchName').val();
        data2 = $('#select_search').val();

        $.ajax({
            type: "POST",
            url: "../Admin_teacher_subject/Show_Max_Search_Data_ctl",
            data: "&data=" + data + "&search=" + data2,
            dataType: "json",
            success: function (maxdata) {
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
            url: "../Admin_teacher_subject/Search_Show_Data_ctl",
            data: "&data=" + data + "&search=" + data2 + "&start=" + start + "&limit=" + limit,
            dataType: "json",
            success: function (response) {
                datatable = response;
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" data="' + response[i].teacher_code_id + '" value="' + response[i].subject_id + '"  id="' + response[i].subject_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].subject_id + i + '">(' + response[i].subject_major + ') ' + response[i].subject_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].subject_name + '</td>' +
                            '<td>' + response[i].de_Tname + " " + response[i].teacher_Tname + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].subject_id + '" data2="' + response[i].teacher_code_id + '" data3="' + response[i].subject_major + '" class="item-edit">แก้ไข</a></td>' +
                            '</tr>';
                    }

                }

                $('#showAllData').html(html);
            }
        });
    }

    //--------------------------------------------END_CANT_TOUCH_THIS--------------------------------------------//


    $('#btnAdd').click(function (e) {
        e.preventDefault();
        subjectdata = null;
        iurl = "../Admin_teacher_subject/Add_Data_ctl";
        $('#Modal').find('.modal-title').text('เพิ่มข้อมูลอาจารย์ประจำวิชา');
        $('#Modal').find('#btnSave').text('เพิ่มข้อมูล');
        $('#Modal').modal('show');

        // $.ajax({
        //     url: "../Admin_teacher/Show_Data_ctl",
        //     dataType: "json",
        //     success: function(response) {
        //         console.log(response);
        //         var html = '';
        //         var i;
        //         if (response != null) {
        //             for (i = 0; i < response.length; i++) {
        //                 html += '<option value="' + response[i].teacher_code_id + '">' + response[i].teacher_Ename + '</option>';
        //             }
        //         }
        //         $('#selectAddFaculty').html(html);
        //     }
        // });
        $.ajax({
            url: "../Admin_faculty/Show_Data_ctl",
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].faculty_id + '">' + response[i].faculty_name + '</option>';
                    }
                }
                $('#selectAddFaculty').html(html);
                select_major_add();
            }
        });
    });

    $('#selectAddFaculty').change(function () {
        select_major_add();
    });

    $('#selectAddMajor').change(function () {
        select_teacher_add();
        select_subject_add();
    });

    function select_major_add() {
        $data = $('#selectAddFaculty :selected').val();
        $.ajax({
            type: "POST",
            url: "../Admin_major/Select_major",
            data: '&datamajor=' + $data,
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].major_id + '">(' + response[i].major_id + ') ' + response[i].major_name + '</option>';
                    }
                }
                $('#selectAddMajor').html(html);
                select_teacher_add();
                select_subject_add();
            }
        });
    }

    function select_teacher_add() {
        $data = $('#selectAddMajor :selected').val();
        $.ajax({
            type: "POST",
            url: "../Admin_teacher_subject/Select_Teacher_Add_ctl",
            data: '&data=' + $data,
            dataType: "json",
            success: function (response) {
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].teacher_code_id + '">' + response[i].de_Tname + " " + response[i].teacher_Tname + '</option>';
                    }
                }
                $('#selectAddTeacher').html(html);
            }
        });
    }

    function select_subject_add() {
        $data = $('#selectAddMajor :selected').val();
        $.ajax({
            type: "POST",
            url: "../Admin_teacher_subject/Select_Subject_Add_ctl",
            data: '&data=' + $data,
            dataType: "json",
            success: function (response) {
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].subject_id + '">' + response[i].subject_id + ' - ' + response[i].subject_name + '</option>';
                    }
                }
                $('#selectAddSubject').html(html);
            }
        });
    }

    $('#btnSave').click(function (e) {
        e.preventDefault();
        if (iurl == "../Admin_teacher_subject/Add_Data_ctl") {
            txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
            txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
        } else {
            txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
            txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
        }
        data = $("#selectAddSubject :selected").val();
        data2 = $("#selectAddTeacher :selected").val();
        $.ajax({
            type: "POST",
            url: iurl,
            data: '&subject=' + data + '&teacher=' + data2 + '&org_subject=' + iddata + '&org_teacher=' + iddata2,
            success: function (response) {
                // document.getElementById("selectAddSemester").value = datatable[0].id;
                // document.getElementById("selectAddSubject").value = datatable[0].subject_id;
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
            error: function (XMLHttpRequest, textStatus, errorThrown) {
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

    $('#showAllData').on('click', '.item-edit', function () {
        iddata = $(this).attr('data');
        iddata2 = $(this).attr('data2');
        iddata3 = $(this).attr('data3');
        ivalue = $(this).attr('value');
        $('#Modal').modal('show');
        $('#Modal').find('.modal-title').text('แก้ไขข้อมูลอาจารย์ประจำวิชา');
        $('#Modal').find('#btnSave').text('แก้ไขข้อมูล');
        iurl = '../Admin_teacher_subject/Edit_Data_ctl';
        $.ajax({
            type: "POST",
            url: "../Admin_teacher_subject/Select_Edit_Faculty",
            data: '&datamajor=' + iddata3,
            dataType: "json",
            success: function (response) {
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].faculty_id + '">' + response[i].faculty_name + '</option>';
                    }
                }
                $('#selectAddFaculty').html(html);
                Edit_Select();
            }
        });
    });

    function Edit_Select() {
        $data = $('#selectAddFaculty :selected').val();
        $.ajax({
            type: "POST",
            url: "../Admin_major/Select_major",
            data: '&datamajor=' + $data,
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].major_id + '">(' + response[i].major_id + ') ' + response[i].major_name + '</option>';
                    }
                }
                $('#selectAddMajor').html(html);
                $('#selectAddMajor').val(iddata3);
            }
        });
        $.ajax({
            type: "POST",
            url: "../Admin_teacher_subject/Select_Teacher_Add_ctl",
            data: '&data=' + iddata3,
            dataType: "json",
            success: function (response) {
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].teacher_code_id + '">' + response[i].de_Tname + " " + response[i].teacher_Tname + '</option>';
                    }
                }
                $('#selectAddTeacher').html(html);
                $('#selectAddTeacher').val(iddata2);
            }
        });
        $.ajax({
            type: "POST",
            url: "../Admin_teacher_subject/Select_Subject_Add_ctl",
            data: '&data=' + iddata3,
            dataType: "json",
            success: function (response) {
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].subject_id + '">' + response[i].subject_id + ' - ' + response[i].subject_name + '</option>';
                    }
                }
                $('#selectAddSubject').html(html);
                $('#selectAddSubject').val(iddata);
            }
        });
    }

    $('#btnDel').click(function (e) {
        e.preventDefault();
        data_subject = selectchb();
        data_teacher = selectchb_tea();
        if (data_subject.length > 0) {
            $.ajax({
                type: "POST",
                url: "../Admin_teacher_subject/Delete_Data_ctl",
                data: {
                    data_subject,
                    data_teacher
                },
                success: function (response) {
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

    $('#selectall').change(function () {
        $('.custom-control-input').prop("checked", $(this).prop("checked"));
    });

    function selectchb() {
        var item = [];
        $('input[name^=checkitem]:checked').each(function () {
            item.push($(this).val());
        });
        return item;
    }

    function selectchb_tea() {
        var item = [];
        $('input[name^=checkitem]:checked').each(function () {
            item.push($(this).attr('data'));
        });
        return item;
    }

    $(".dropdown-menu.sort a ").click(function () {
        data = $(this).attr('data-1');
        sort = $(this).attr('data-2');
        // alert(limit);
        $.ajax({
            type: 'POST',
            url: "../Admin_teacher_subject/Show_Sort_ctl",
            data: '&data=' + data + '&sort=' + sort + '&start=' + start + '&limit=' + limit, 
            dataType: "json",
            success: function (response) {
                datatable = response;
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" data="' + response[i].teacher_code_id + '" value="' + response[i].subject_id + '"  id="' + response[i].subject_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].subject_id + i + '">(' + response[i].subject_major + ') ' + response[i].subject_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].subject_name + '</td>' +
                            '<td>' + response[i].de_Tname + " " + response[i].teacher_Tname + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].subject_id + '" data2="' + response[i].teacher_code_id + '" data3="' + response[i].subject_major + '" class="item-edit">แก้ไข</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    });

});