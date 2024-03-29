$(document).ready(function () {


     /******************************* highlight Navbar ************************************* */
     var Navbar_Side_highlight = ['admin_side_Anc', 'admin_side_Anc_course', 'admin_side_Anc_services', 'admin_side_Anc_personnel', 'admin_side_Anc_about_us', 'admin_side_faculty', 'admin_side_major', "admin_side_semester", "admin_side_subject", "admin_side_subsem", "admin_side_student", "admin_side_teacher", "admin_side_admin", "admin_side_teamaj", "admin_side_teasub", "admin_side_degree"];
     for (z = 0; z < Navbar_Side_highlight.length; z++) {
         var elementRemove = document.getElementById(Navbar_Side_highlight[z]);
         elementRemove.classList.remove("bg-danger");
     }
 
     var Navbar_highlight = ['admin_Anc', 'admin_Anc_course', 'admin_Anc_services', 'admin_Anc_personnel', 'admin_Anc_about_us', 'admin_faculty', 'admin_major', "admin_semester", "admin_subject", "admin_subsem", "admin_student", "admin_teacher", "admin_admin", "admin_teamaj", "admin_teasub", "admin_degree"];
     for (y = 0; y < Navbar_highlight.length; y++) {
         var elementRemove = document.getElementById(Navbar_highlight[y]);
         elementRemove.classList.remove("bg-danger");
     }

     // $('#score').classList.add(".bg-primary");
     var element = document.getElementById("admin_side_teamaj");
     element.classList.add("bg-danger");
     var element = document.getElementById("admin_teamaj");
     element.classList.add("bg-danger");
     /******************************************************************** */


    var iddata;
    var iurl;
    var datatable;
    var iddata;
    var iddata2;

    var data_major;

    var limit = 10;
    var start = 0;
    var currentPage = 1;

    $('#titleNameTxt').text("จัดการข้อมูลอาจารย์ประจำสาขา");
    $('#findByTxt').text("ค้นหาด้วย");
    $('#btnFindTxt').text("ค้นหา");
    $('#saveModalTxt').text("SAVE_MODAL");
    $('#delModalTxt').text("ยืนยันการลบข้อมูล");
    $('#tableTitleTxt').text("จัดการข้อมูลอาจารย์ประจำสาขา");
    $('#rowPerPageTxt').text("Rows per page:");

    var btnAddText = 'เพิ่มข้อมูลอาจารย์ประจำสาขา';
    var btnEditText = 'แก้ไขข้อมูลอาจารย์ประจำสาขา';

    var pagingSize = [10, 25, 50, 100];
    dropGen();

    var theadGenValue = ['รหัสอาจารย์', 'ชื่อาจารย์(TH)', 'ชื่อาจารย์(EN)', 'สาขา', 'ตัวเลือก'];

    var formData = ["#teacher_code_id", "#major_id"];

    var popData = ["#popupID", "#popupMajor"];

    var popValue = [
        //[POP_ID,POP_TEXT]
        ['popupID', 'กรุณาระบุไอดี'],
        ['popupMajor', 'กรุณาระบุชื่อ(TH)'],
    ];

    // var inModelValue = [
    //     //['TEXT','ID','NAME','HOLDER']
    //     ['teacher_code_id', 'teacher_code_id', 'teacher_code_id', 'teacher_code_id'],
    //     ['teacher_Tname', 'teacher_Tname', 'teacher_Tname', 'teacher_Tname'],
    //     ['teacher_Ename', 'teacher_Ename', 'teacher_Ename', 'teacher_Ename'],
    //     ['teacher_email', 'teacher_email', 'teacher_email', 'teacher_email'],
    //     ['teacher_username', 'teacher_username', 'teacher_username', 'teacher_username'],
    //     ['teacher_password', 'teacher_password', 'teacher_password', 'teacher_password']
    // ];

    var dropSearchValue = [
        //[VALUE,TEXT]
        ['teacher_code_id', 'รหัสอาจารย์'],
        ['teacher_Tname', 'ชื่ออาจารย์(TH)'],
        ['teacher_Ename', 'ชื่ออาจารย์(EN)'],
        ['major_name', 'ชื่อสาขา'],
    ];

    var Sort = [
        ['teacher_code_id', 'ASC', 'รหัสอาจารย์ น้อย > มาก'],
        ['teacher_code_id', 'DESC', 'รหัสอาจารย์ มาก > น้อย'],
        ['teacher_Tname', 'ASC', 'ชื่ออาจารย์(TH) ก > ฮ'],
        ['teacher_Tname', 'DESC', 'ชื่ออาจารย์(TH) ฮ > ก'],
        ['teacher_Ename', 'ASC', 'ชื่ออาจารย์(EN) A > Z'],
        ['teacher_Ename', 'DESC', 'ชื่ออาจารย์(EN) Z > A'],
        ['major_name', 'ASC', 'สาขา A > Z'],
        ['major_name', 'DESC', 'สาขา Z > A']
    ];

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

    function inModelGen() {
        var html = '';
        html += '<div class="form-row" >';
        // for (i = 0; i < inModelValue.length; i++) {
        //     html += '<div class="col-md-4 mb-3" >' +
        //         '<label>' + inModelValue[i][0] + '</label>' +
        //         '<input type="text" type="text" id="' + inModelValue[i][1] + '" name="' + inModelValue[i][2] + '" class="form-control" placeholder="' + inModelValue[i][3] + '">' +
        //         '</div>';
        // }
        html += '<div class="col-md-6 mb-3" id="TeacherSelect">' +
            '<label>อาจารย์</label>' +
            '<select id="teacherSelectAdd" class="form-control"></select>' +
            '</div>';
        html += '</div>';

        html += '<div class="form-row" >';
        html += '<div class="col-md-6 mb-3" id="facultySelect">' +
            '<label>คณะ</label>' +
            '<select id="facultySelectAdd" class="form-control"></select>' +
            '</div>';
        html += '<div class="col-md-6 mb-3" id="majorSelect">' +
            '<label>สาขา</label>' +
            '<select id="majorSelectAdd" class="form-control"></select>' +
            '</div>';
        html += '<span class="ml-1 mr-1" style="font-size: 1.5rem;" id="IconAdd_Major">' +
            '<span style="color: #ff4081;">' +
            '<a><i class="fas fa-plus-circle"></i></a>' +
            '</span>' +
            '</span>' +
            '<span class="ml-1 mr-1" style="font-size: 1.5rem;" id="IconDel_Major">' +
            '<span style="color: #ff4081;">' +
            '<a><i class="fas fa-minus-circle"></i></a>' +
            '</span>' +
            '</span>';
        html += '</div>';
        $('#inModelBody').html(html);
    }

    function popGen() {
        for (i = 0; i < popValue.length; i++) {
            $("<div id='" + popValue[i][0] + "' class=\"text-danger\">*" + popValue[i][1] + "</div>").insertAfter(formData[i]);
        }
    }

    function hideAllPop() {
        for (i = 0; i < popData.length; i++) {
            $(popData[i]).hide();
        }
    }

    function dropSearch() {
        var html = '';
        html += '<option value=""> ทั้งหมด </option>';
        for (i = 0; i < dropSearchValue.length; i++) {
            html += '<option value="' + dropSearchValue[i][0] + '">' + dropSearchValue[i][1] + '</option>';
        }
        $('#select_search').html(html);
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

    dropSearch();
    theadGen();
    show_major_data();
    // show_data();
    ShowSort();

    popGen();
    hideAllPop();

    //--------------------------------------------START_PAGINATION_ELEMENT--------------------------------------------//

    $('#facultySelectAdd').select2({
        theme: 'bootstrap4',
    });

    $('#majorSelectAdd').select2({
        theme: 'bootstrap4',
    });

    $('#teacherSelectAdd').select2({
        theme: 'bootstrap4',
    });


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
        if ($('#SearchName').val() == "") {
            // show_data();
            show_major_data();
        } else {
            LimitSearch();
        }
    });

    $('#chevron_right').click(function () {
        limit = $('.row_active').text();
        start = start + (limit * 1);
        currentPage++;
        // show_data();
        if ($('#SearchName').val() == "") {
            // show_data();
            show_major_data();
        } else {
            LimitSearch();
        }
    });

    $('#chevron_left').click(function () {
        limit = $('.row_active').text();
        start = start - limit;
        currentPage--;
        // show_data();
        if ($('#SearchName').val() == "") {
            // show_data();
            show_major_data();
        } else {
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

    /*-------------------------------------------*/
    function show_major_data() {
        $.ajax({
            url: "../Admin_teacher_major/Show_MajorAll_Data_ctl",
            dataType: "json",
            success: function (response) {
                data_major = response;
                show_data();
            }
        });
    }

    function show_data() {
        $.ajax({
            url: "../Admin_teacher_major/Show_Max_Data_ctl",
            dataType: "json",
            success: function (maxdata) {
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
            url: "../Admin_teacher_major/Show_Data_ctl",
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].teacher_code_id + '" data="' + response[i].major_id + '" id="' + response[i].teacher_code_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].teacher_code_id + i + '">' + response[i].teacher_code_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].de_Ename + " " + response[i].teacher_Ename + '</td>' +
                            '<td>' + response[i].de_Tname + " " + response[i].teacher_Tname + '</td>' +
                            '<td>';
                        // '<td>(' + response[i].major_id + ') ' + response[i].major_name + '</td>' +
                        for (m = 0; m < data_major.length; m++) {
                            if (response[i].teacher_code_id == data_major[m].teamaj_teacherid) {
                                html += '(' + data_major[m].major_id + ') ' + data_major[m].major_name + '<br>';
                            }
                        }
                        html += '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].teacher_code_id + '" data2="' + response[i].major_id + '" data3="' + response[i].major_faculty + '" class="item-edit">แก้ไข</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    }

    $('#btnSearch').click(function (e) {
        e.preventDefault();
        data1 = $('#select_search').val();
        data2 = $('#SearchName').val();

        $.ajax({
            type: "POST",
            url: "../Admin_teacher_major/Show_Max_Search_Data_ctl",
            data: "&data=" + data1 + "&search=" + data2,
            dataType: "json",
            success: function (maxdata) {
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
            url: "../Admin_teacher_major/Search_Show_Data_ctl",
            data: "&data=" + data1 + "&search=" + data2 + "&start=" + start + "&limit=" + limit,
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].teacher_code_id + '" data="' + response[i].major_id + '" id="' + response[i].teacher_code_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].teacher_code_id + i + '">' + response[i].teacher_code_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].de_Ename + " " + response[i].teacher_Ename + '</td>' +
                            '<td>' + response[i].de_Tname + " " + response[i].teacher_Tname + '</td>' +
                            '<td>';
                        // '<td>(' + response[i].major_id + ') ' + response[i].major_name + '</td>' +
                        for (m = 0; m < data_major.length; m++) {
                            if (response[i].teacher_code_id == data_major[m].teamaj_teacherid) {
                                html += '(' + data_major[m].major_id + ') ' + data_major[m].major_name + '<br>';
                            }
                        }
                        html += '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].teacher_code_id + '" data2="' + response[i].major_id + '" data3="' + response[i].major_faculty + '" class="item-edit">แก้ไข</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    });

    function LimitSearch() {
        data1 = $('#select_search').val();
        data2 = $('#SearchName').val();

        $.ajax({
            type: "POST",
            url: "../Admin_teacher_major/Show_Max_Search_Data_ctl",
            data: "&data=" + data1 + "&search=" + data2,
            dataType: "json",
            success: function (maxdata) {
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
            url: "../Admin_teacher_major/Search_Show_Data_ctl",
            data: "&data=" + data1 + "&search=" + data2 + "&start=" + start + "&limit=" + limit,
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].teacher_code_id + '" data="' + response[i].major_id + '" id="' + response[i].teacher_code_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].teacher_code_id + i + '">' + response[i].teacher_code_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].de_Ename + " " + response[i].teacher_Ename + '</td>' +
                            '<td>' + response[i].de_Tname + " " + response[i].teacher_Tname + '</td>' +
                            '<td>';
                        // '<td>(' + response[i].major_id + ') ' + response[i].major_name + '</td>' +
                        for (m = 0; m < data_major.length; m++) {
                            if (response[i].teacher_code_id == data_major[m].teamaj_teacherid) {
                                html += '(' + data_major[m].major_id + ') ' + data_major[m].major_name + '<br>';
                            }
                        }
                        html += '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].teacher_code_id + '" data2="' + response[i].major_id + '" data3="' + response[i].major_faculty + '" class="item-edit">แก้ไข</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    }


    $('#btnAdd').click(function (e) {
        e.preventDefault();
        iurl = '../Admin_teacher_major/Add_Data_ctl';
        $('#majorSelect').show();
        $('#facultySelect').show();
        $('#Modal').find('.modal-title').text('เพิ่มข้อมูลอาจารย์ประจำสาขา');
        $('#Modal').find('#btnSave').text('เพิ่มข้อมูลอาจารย์');
        $('#Modal').modal('show');
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
                $('#facultySelectAdd').html(html);
                select_major_add();
            }
        });
        $.ajax({
            url: "../Admin_teacher/Show_Data_ctl",
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
                $('#teacherSelectAdd').html(html);
            }
        });
    });

    $('#facultySelectAdd').change(function () {
        select_major_add();
    });

    function select_major_add() {
        $data = $('#facultySelectAdd :selected').val();
        $.ajax({
            type: "POST",
            url: "../Admin_major/Select_major",
            data: '&datamajor=' + $data,
            dataType: "json",
            success: function (response) {
                // console.log(response.length);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].major_id + '">(' + response[i].major_id + ') ' + response[i].major_name + '</option>';
                    }
                }
                $('#majorSelectAdd').html(html);
            }
        });
    }

    $('#IconAdd_Major').click(function (e) {
        e.preventDefault();
        data2Encode = $("#majorSelectAdd :selected").val();
        data2text = $("#majorSelectAdd :selected").text();
        data2 = encodeURIComponent(data2Encode);
        // alert(data2);
        chk = 0;
        if (data2Encode !== '') {
            if ($('#List_Major').has('option').length > 0) {
                $("#List_Major > option").each(function () {
                    if (this.value == data2Encode) {
                        Snackbar.show({
                            actionText: 'close',
                            pos: 'top-center',
                            actionTextColor: '#FF0000',
                            backgroundColor: '#323232',
                            width: 'auto',
                            text: 'สาขานี้ถูกเพิ่มแล้ว'
                        });
                        chk = 1;
                    }
                });
                if (chk != 1) {
                    $('#List_Major').append('<option value="' + data2Encode + '"> ' + data2text + ' </option>');
                }
            } else {
                $('#List_Major').append('<option value="' + data2Encode + '"> ' + data2text + ' </option>');
            }
        }
    });

    $('#IconDel_Major').click(function (e) {
        e.preventDefault();
        if (typeof $('#List_Major :selected').val() != "undefined") {
            // alert($('#List_Major_Edit :selected').val());
            major_id = $('#List_Major :selected').val();
            // $('#List_Major_Edit option[value="' + subid + '"]').remove();
            $('#List_Major').find('option[value="' + major_id + '"]').remove();
        } else {
            Snackbar.show({
                actionText: 'close',
                pos: 'top-center',
                actionTextColor: '#FF0000',
                backgroundColor: '#323232',
                width: 'auto',
                text: 'กรุณาเลือกสาขาที่ต้องการลบ'
            });
        }
    });


    $('#btnSave').click(function (e) {
        e.preventDefault();
        var result = '';
        var check = '';

        for (i = 0; i < $(formData).length; i++) {
            if ($(formData[i]).val() == '') {
                $(popData[i]).show();

            } else {
                $(popData[i]).hide();
                result += i;
            }
            check += i;
        }
        if (check == result) {
            if (iurl == '../Admin_teacher_major/Add_Data_ctl') {
                txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
            } else {
                txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
            }

            arr_major = [];
            $("#List_Major option").each(function () {
                value_id =  encodeURIComponent(this.value);
                arr_major.push(value_id);
            });

            if (typeof arr_major !== 'undefined' && arr_major.length > 0) {
                Add_major_teacher(arr_major);
            } else {
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#FF0000',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: 'กรุณาเลือกสาขาที่อาจารย์สังกัด'
                });
            }

            // $.ajax({
            //     type: "POST",
            //     url: iurl,
            //     data: '&teacher_id=' + data1 + '&major_id=' + data2 + '&org_teacher=' + iddata + '&org_major=' + iddata2,
            //     success: function (response) {
            //         // show_data();
            //         show_major_data();
            //         if (iurl != '../Admin_teacher_major/Add_Data_ctl') {
            //             $('#Modal').modal('hide');
            //         };
            //         Snackbar.show({
            //             actionText: 'close',
            //             pos: 'top-center',
            //             actionTextColor: '#4CAF50',
            //             backgroundColor: '#323232',
            //             width: 'auto',
            //             text: txtsnack
            //         });
            //     },
            //     error: function (XMLHttpRequest, textStatus, errorThrown) {
            //         Snackbar.show({
            //             actionText: 'close',
            //             pos: 'top-center',
            //             actionTextColor: '#4CAF50',
            //             backgroundColor: '#323232',
            //             width: 'auto',
            //             text: txtsnackerr + errorThrown + ' )'
            //         });
            //     }
            // });
        }
    });

    function Add_major_teacher(arr_major) {
        data1 = $("#teacherSelectAdd :selected").val();
        // console.log(arr_major);
        data2Encode = $("#majorSelectAdd :selected").val();
        data2 = encodeURIComponent(data2Encode);
        $.ajax({
            type: "POST",
            url: iurl,
            // data: '&teacher_id=' + data1 + '&major_id=' + arr_major + '&org_teacher=' + iddata + '&org_major=' + iddata2,
            data :{
                data1 , arr_major , iddata , iddata2
            },
            success: function (response) {
                // show_data();
                show_major_data();
                $("#List_Major").empty();
                if (iurl != '../Admin_teacher_major/Add_Data_ctl') {
                    $('#Modal').modal('hide');
                };

                if(response == 1){
                    txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
                }else if(response == 0){
                    txtsnack = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: มีข้อมูลอยู่ในระบบแล้ว )';
                } else if(response == 2){
                    txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
                } else if(response == -2){
                    txtsnack = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: มีข้อมูลอยู่ในระบบแล้ว ) ';
                }

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
    }

    $('#showAllData').on('click', '.item-edit', function () {
        iddata = $(this).attr('data');
        iddata2 = $(this).attr('data2');
        iddata3 = $(this).attr('data3');
        ivalue = $(this).attr('value');
        org = datatable[ivalue].teacher_code_id;
        $('#Modal').modal('show');
        $('#Modal').find('.modal-title').text('แก้ไขข้อมูลอาจารย์ประจำสาขา');
        $('#Modal').find('#btnSave').text('แก้ไขข้อมูลอาจารย์');
        iurl = '../Admin_teacher_major/Edit_Data_ctl';
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
                $('#facultySelectAdd').html(html);
                $('#facultySelectAdd').val(iddata3);
            }
        });
        $.ajax({
            type: "POST",
            url: "../Admin_major/Select_major",
            data: '&datamajor=' + iddata3,
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].major_id + '">(' + response[i].major_id + ') ' + response[i].major_name + '</option>';
                    }
                }
                $('#majorSelectAdd').html(html);
                $('#majorSelectAdd').val(iddata2);
            }
        });
        $.ajax({
            url: "../Admin_teacher/Show_Data_ctl",
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
                $('#teacherSelectAdd').html(html);
                $('#teacherSelectAdd').val(iddata);
            }
        });
        /**************************************************************/
        for (m = 0; m < data_major.length; m++) {
            if (iddata == data_major[m].teamaj_teacherid) {
                $('#List_Major').append('<option value="' + data_major[m].major_id + '"> (' + data_major[m].major_id + ') '+ data_major[m].major_name + '</option>');
            }
        }
        
    });


    $('#btnDel').click(function (e) {
        e.preventDefault();
        $data = selectchb();
        $data2 = selectchb_major();
        if ($data.length > 0) {
            $.ajax({
                type: "POST",
                url: "../Admin_teacher_major/Delete_Data_ctl",
                data: {
                    $data,
                    $data2
                },
                success: function (response) {
                    $('#modaldel').modal('hide');
                    // show_data();
                    show_major_data();
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

    function selectchb_major() {
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
            url: "../Admin_teacher_major/Show_Sort_ctl",
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].teacher_code_id + '" data="' + response[i].major_id + '" id="' + response[i].teacher_code_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].teacher_code_id + i + '">' + response[i].teacher_code_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].de_Ename + " " + response[i].teacher_Ename + '</td>' +
                            '<td>' + response[i].de_Tname + " " + response[i].teacher_Tname + '</td>' +
                            '<td>';
                        // '<td>(' + response[i].major_id + ') ' + response[i].major_name + '</td>' +
                        for (m = 0; m < data_major.length; m++) {
                            if (response[i].teacher_code_id == data_major[m].teamaj_teacherid) {
                                html += '(' + data_major[m].major_id + ') ' + data_major[m].major_name + '<br>';
                            }
                        }
                        html += '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].teacher_code_id + '" data2="' + response[i].major_id + '" data3="' + response[i].major_faculty + '" class="item-edit">แก้ไข</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    });

    $('#btnClose').click(function (e) {
        e.preventDefault();
        $("#List_Major").empty();
    });

    $('#IconClose').click(function (e) {
        e.preventDefault();
        $("#List_Major").empty();
    });

});