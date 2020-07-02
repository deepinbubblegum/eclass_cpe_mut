$(document).ready(function () {


    /******************************* highlight Navbar ************************************* */
    var Navbar_Side_highlight = ['admin_side_Anc', 'admin_side_Anc_course', 'admin_side_Anc_services', 'admin_side_Anc_personnel', 'admin_side_Anc_about_us', 'admin_side_Anc_course', 'admin_side_Anc_services', 'admin_side_Anc_personnel', 'admin_side_Anc_about_us', 'admin_side_faculty', 'admin_side_major', "admin_side_semester", "admin_side_subject", "admin_side_subsem", "admin_side_student", "admin_side_teacher", "admin_side_admin", "admin_side_teamaj", "admin_side_teasub", "admin_side_degree"];
    for (z = 0; z < Navbar_Side_highlight.length; z++) {
        var elementRemove = document.getElementById(Navbar_Side_highlight[z]);
        elementRemove.classList.remove("bg-danger");
    }

    var Navbar_highlight = ['admin_Anc', 'admin_Anc_course', 'admin_Anc_services', 'admin_Anc_personnel', 'admin_Anc_about_us', 'admin_Anc_course', 'admin_Anc_services', 'admin_Anc_personnel', 'admin_Anc_about_us', 'admin_faculty', 'admin_major', "admin_semester", "admin_subject", "admin_subsem", "admin_student", "admin_teacher", "admin_admin", "admin_teamaj", "admin_teasub", "admin_degree"];
    for (y = 0; y < Navbar_highlight.length; y++) {
        var elementRemove = document.getElementById(Navbar_highlight[y]);
        elementRemove.classList.remove("bg-danger");
    }

    // $('#score').classList.add(".bg-primary");
    var element = document.getElementById("admin_side_student");
    element.classList.add("bg-danger");
    var element = document.getElementById("admin_student");
    element.classList.add("bg-danger");
    /******************************************************************** */


    var iddata;
    var iurl;
    var datatable;
    var txtsnack;
    var _files;

    var limit = 10;
    var start = 0;
    var currentPage = 1;

    var csv_upload;
    // 1.showAllData
    // 2.formAdd
    // 3.modaldel

    $('#titleNameTxt').text("จัดการข้อมูลนักศึกษา");
    $('#findByTxt').text("ค้นหาด้วย");
    $('#btnFindTxt').text("ค้นหา");
    $('#saveModalTxt').text("SAVE_MODAL");
    $('#delModalTxt').text("ยืนยันการลบข้อมูล");
    $('#tableTitleTxt').text("จัดการข้อมูลนักศึกษา");
    $('#rowPerPageTxt').text("Rows per page:");

    // var btnAddText = 'เพิ่มข้อมูลสาขา';
    // var btnEditText = 'แก้ไขข้อมูลสาขา';

    var pagingSize = [10, 25, 50, 100];

    var dropSearchValue = [
        //[VALUE,TEXT]
        ['std_code_id', 'รหัส'],
        ['std_Tname', 'ชื่อ ภาษาไทย'],
        ['std_Ename', 'ชื่อ ภาษาอังกฤษ'],
        ['std_email', 'อีเมล'],
        ['faculty_name', 'ชื่อคณะ'],
        ['std_major', 'ชื่อสาขา']
    ];

    //head of table
    var theadGenValue = ['รหัส', 'ชื่อ (TH)', 'ชื่อ (EN)', 'อีเมล', 'คณะ', 'สาขา', 'ตัวเลือก'];

    var formData = ["#std_code_id", "#std_Tname", "#std_Ename", "#std_email"];

    var inModelValue = [
        //['TEXT','ID','NAME','HOLDER']
        ['รหัส', 'std_code_id', 'std_code_id', ''],
        ['ชื่อ (ไทย)', 'std_Tname', 'std_Tname', ''],
        ['ชื่อ (อังกฤษ)', 'std_Ename', 'std_Ename', ''],
        ['อีเมล', 'std_email', 'std_email', '']
    ];

    var popData = ["#popupID", "#popupTname", "#popupEname", "#popupEmail"];

    var popValue = [
        //[POP_ID,POP_TEXT]
        ['popupID', 'กรุณาระบุไอดี'],
        ['popupTname', 'กรุณาระบุชื่อ'],
        ['popupEname', 'กรุณาระบุไอดี'],
        ['popupEmail', 'กรุณาระบุชื่อสาขา']
    ];

    var Sort = [
        ['std_code_id', 'ASC', 'รหัสนักศึกษา มาก > น้อย'],
        ['std_code_id', 'DESC', 'รหัสนักศึกษา น้อย > มาก'],
        ['std_Tname', 'ASC', 'ชื่อ(TH) ก > ฮ'],
        ['std_Tname', 'DESC', 'ชื่อ(TH) ฮ > ก'],
        ['std_Ename', 'ASC', 'ชื่อ(EN) A > Z'],
        ['std_Ename', 'DESC', 'ชื่อ(EN) Z > A'],
        ['faculty_name', 'ASC', 'คณะ A > Z'],
        ['faculty_name', 'DESC', 'คณะ Z > A'],
        ['major_name', 'ASC', 'สาขา A > Z'],
        ['major_name', 'DESC', 'สาขา Z > A'],
    ];

    function formDataValClr() {
        for (i = 0; i < $(formData).length; i++) {
            $(formData[i]).val("");
        }
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
        for (i = 0; i < inModelValue.length; i++) {
            html += '<div class="col-md-4 mb-3" >' +
                '<label>' + inModelValue[i][0] + '</label>' +
                '<input type="text" type="text" id="' + inModelValue[i][1] + '" name="' + inModelValue[i][2] + '" class="form-control" placeholder="' + inModelValue[i][3] + '">' +
                '</div>';
        }

        html += '<div class="col-md-4 mb-3" >' +
            '<label>คณะ</label>' +
            '<select id="facultySelectAdd" class="form-control"></select>' +
            '</div>';

        html += '<div class="col-md-4 mb-3" >' +
            '<label>สาขา</label>' +
            '<select id="majorSelectAdd" class="form-control"></select>' +
            '</div>';
        html += '</div>';
        $('#inModelBody').html(html);
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

    function fileSizeCal(inputFileSize) {
        fileB = inputFileSize / 1; //make it to int
        fileKB = inputFileSize / 1024;
        fileMB = fileKB / 1024;
        fileGB = fileMB / 1024;
        fileTB = fileGB / 1024;
        fileSizeReturn = 0;

        if (fileB >= 1 && fileB < 1024) {
            fileSizeReturn = fileB.toFixed(2) + ' Bytes';
        } else
        if (fileKB >= 1 && fileKB < 1024) {
            fileSizeReturn = fileKB.toFixed(2) + ' KB';
        } else
        if (fileMB >= 1 && fileMB < 1024) {
            fileSizeReturn = fileMB.toFixed(2) + ' MB';
        } else
        if (fileGB >= 1 && fileGB < 1024) {
            fileSizeReturn = fileGB.toFixed(2) + ' GB';
        } else
        if (fileTB >= 1 && fileTB < 1024) {
            fileSizeReturn = fileTB.toFixed(2) + ' TB';
        }
        return fileSizeReturn;
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

    getFaculty();

    dropPag();
    dropSearch();
    theadGen();
    show_data();
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
            show_data();
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
            show_data();
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
            show_data();
        } else {
            LimitSearch();
        }
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
            url: "../Admin_student_data/Show_Max_Data_ctl",
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
                console.log(start, limit);
                disableArrow(currentPage, pageMax);
            }
        });

        $.ajax({
            type: "POST",
            data: "&start=" + start + "&limit=" + limit,
            url: "../Admin_student_data/Show_Data_ctl",
            dataType: "json",
            success: function (response) {
                datatable = response;
                var html = '';
                var i;
                if (response != null) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].std_code_id + '" id="' + response[i].std_code_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].std_code_id + i + '">' + response[i].std_code_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].std_Tname + '</td>' +
                            '<td>' + response[i].std_Ename + '</td>' +
                            '<td>' + response[i].std_email + '</td>' +
                            '<td>' + response[i].faculty_name + '</td>' +
                            '<td>' + response[i].major_name + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].std_code_id + '" class="item-edit">แก้ไข</a></td>' +
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
            url: "../Admin_student_data/Show_Max_Search_Data_ctl",
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
                console.log(start, limit);
                disableArrow(currentPage, pageMax);
            }
        });

        $.ajax({
            type: "POST",
            url: "../Admin_student_data/Search_Show_Data_ctl",
            data: "&data=" + data + "&search=" + data2 + "&start=" + start + "&limit=" + limit,
            dataType: "json",
            success: function (response) {
                datatable = response;
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].std_code_id + '" id="' + response[i].std_code_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].std_code_id + i + '">' + response[i].std_code_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].std_Tname + '</td>' +
                            '<td>' + response[i].std_Ename + '</td>' +
                            '<td>' + response[i].std_email + '</td>' +
                            '<td>' + response[i].faculty_name + '</td>' +
                            '<td>' + response[i].major_name + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].std_code_id + '" class="item-edit">แก้ไข</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    });

    function LimitSearch() {
        data = $('#SearchName').val();
        data2 = $('#select_search').val();

        $.ajax({
            type: "POST",
            url: "../Admin_student_data/Show_Max_Search_Data_ctl",
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
                console.log(start, limit);
                disableArrow(currentPage, pageMax);
            }
        });

        $.ajax({
            type: "POST",
            url: "../Admin_student_data/Search_Show_Data_ctl",
            data: "&data=" + data + "&search=" + data2 + "&start=" + start + "&limit=" + limit,
            dataType: "json",
            success: function (response) {
                datatable = response;
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].std_code_id + '" id="' + response[i].std_code_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].std_code_id + i + '">' + response[i].std_code_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].std_Tname + '</td>' +
                            '<td>' + response[i].std_Ename + '</td>' +
                            '<td>' + response[i].std_email + '</td>' +
                            '<td>' + response[i].faculty_name + '</td>' +
                            '<td>' + response[i].major_name + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].std_code_id + '" class="item-edit">แก้ไข</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    }

    //--------------------------------------------END_CANT_TOUCH_THIS--------------------------------------------//

    //--------------------------------------------START_BASIC_TOOLS--------------------------------------------//

    $("#inputFile").on("change", function () {
        html = '';
        _files = $(this)[0].files;

        var size = fileSizeCal(_files[0].size);
        console.log(_files[0].name + ' ' + size);
        $(this).next("label").text(_files[0].name);
        html =
            '<li href="#" class="list-group-item d-flex justify-content-between align-items-center list-group-item-action mb-2 mt-2">' +
            '<span class="mr-2 mb-0" style="font-size: 28px;">' +
            '<i class="fas fa-file-csv"></i>' +
            '<span class="mr-2 text-black" style="font-size: 18px;"> ' + _files[0].name + '</span>' +
            '<div class="mt-0">' +
            '<small class="mr-2 text-black-50" style="font-size: 12px;"> size : ' + fileSizeCal(_files[0].size) + '</small>' +
            '<small class="mr-2 text-black-50" style="font-size: 12px;">type : ' + _files[0].type + '</small>' +
            '</div>' +
            '</span>' +
            '<span>' +
            '<!-- <button class="btn btn-float btn-danger my-1"><i class="far fa-trash-alt"></i></button>' +
            '<button class="btn btn-float btn-success my-1"><i class="fas fa-check"></i></button>' +
            '<button class="btn btn-float btn-danger my-1"><i class="fas fa-undo-alt"></i></button> -->' +
            '</span>' +
            '</li>';
        $('#filedetail').html(html);
    });

    $('#btnUpload').click(function (e) {
        e.preventDefault();
        csv_upload = '';
        var snacktxt = '';
        var form_data = new FormData();
        form_data.append('file', _files[0]);
        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                html = '';
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        console.log(percentComplete);
                        html = '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: ' + percentComplete + '%">' + percentComplete + '%</div>';
                        if (percentComplete === 100) {
                            html = '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: ' + percentComplete + '%">Complete</div>';
                            setTimeout(function () {
                                $('#Modalcsv').modal('hide');
                                // console.log(csv_upload.length);
                                if (csv_upload != '') {
                                    csv_log_error();
                                }
                            }, 1200);
                        }
                        $('#progressupload').html(html);
                    }
                }, false);

                return xhr;
            },
            type: "POST",
            url: '../Admin_student_data/Add_Data_ctl_csv',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json',
            success: function (response) {
                csv_upload = response;
                console.log(response);
                if (response == '<p>upload_invalid_filetype</p>') {
                    snacktxt = 'ไม่สามารถอ่านไฟล์ได้ ' + response;

                } else if (response == '<p>upload_invalid_filesize</p>') {
                    snacktxt = 'ไฟล์มีขนาดใหญ่เกินไป ' + response;
                } else {
                    snacktxt = 'อับโหลดข้อมูลจากไฟล์สำเร็จ';
                }

                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: snacktxt
                });
                show_data();
            },
            error: function (response) {
                console.log(response);
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: 'อับโหลดข้อมูลจากไฟล์ไม่สำเร็จ :' + response
                });
            }
        });
    });

    $('#facultySelectAdd').change(function (e) {
        e.preventDefault();
        getMajor();
    });

    function csv_log_error() {
        html_log = '';
        for (let index = 0; index < csv_upload.length; index++) {
            html_log += '<tr>' +
                '<td>' + csv_upload[index]['line_error'] + '</td>' +
                '<td>' + csv_upload[index]['std_code_id'] + '</td>' +
                '<td>' + csv_upload[index]['std_Tname'] + '</td>' +
                '<td>' + csv_upload[index]['std_Ename'] + '</td>' +
                '<td>' + csv_upload[index]['std_email'] + '</td>' +
                '<td>' + csv_upload[index]['std_major'] + '</td>' +
                '<td>' + csv_upload[index]['log_error'].message + '</td>' +
                '</tr>'
        }
        $('#log_error_tr').html(html_log);
        $('#log_csv_error').modal('show');
    }


    function getFaculty() {
        $.ajax({
            url: "../Admin_student_data/Show_Data_faculty",
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
                getMajor();
                //$('#facultySelectAdd').val(datatable[ivalue].faculty_id);
            }
        });
    }

    function getMajor() {
        facultySelect = $('#facultySelectAdd :selected').val();
        $.ajax({
            type: "POST",
            url: "../Admin_student_data/Show_Data_Major",
            data: '&facultySelect=' + $('#facultySelectAdd :selected').val(),
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].major_id + '">' + response[i].major_name + '</option>';
                    }
                }
                $('#majorSelectAdd').html(html);
            }
        });
    }

    function getFacultyEdit(Fa_id) {
        $.ajax({
            url: "../Admin_student_data/Show_Data_faculty",
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
                $('#facultySelectAdd').val(Fa_id);
            }
        });
    }

    function getMajorEdit(major_id) {
        facultySelect = $('#facultySelectAdd :selected').val();
        $.ajax({
            type: "POST",
            url: "../Admin_student_data/Show_Data_Major",
            data: '&facultySelect=' + $('#facultySelectAdd :selected').val(),
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].major_id + '">' + response[i].major_name + '</option>';
                    }
                }
                $('#majorSelectAdd').html(html);
                $('#majorSelectAdd').val(major_id);
            }
        });
    }

    $('#btnAdd').click(function (e) {
        e.preventDefault();
        iurl = '../Admin_student_data/Add_Data_ctl';
        $('#Modal').find('.modal-title').text('เพิ่มข้อมูลผู้ใช้งาน');
        $('#Modal').find('#btnSave').text('เพิ่มข้อมูลผู้ใช้งาน');
        $('#Modal').modal('show');
    });

    $('#btnAddcsv').click(function (e) {
        e.preventDefault();
        $('#Modalcsv').modal('show');
    });

    $('#btnSave').click(function (e) {
        e.preventDefault();
        var result = '';
        var check = '';
        var FormData = '';

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
            if (iurl == '../Admin_student_data/Add_Data_ctl') {
                txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
            } else {
                txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
            }

            FormData = $('#formAdd').find('input:text').each(function () {
                $(this).val($.trim($(this).val()));
            });

            data = FormData.serialize();
            data2Encode = $("#majorSelectAdd :selected").val();
            data2 = encodeURIComponent(data2Encode);

            $.ajax({
                type: "POST",
                url: iurl,
                data: data + '&majorSelect=' + data2 + '&org_id=' + iddata,
                success: function (response) {
                    document.getElementById('std_code_id').value = "";
                    formDataValClr();
                    show_data();
                    if (iurl != '../Admin_student_data/Add_Data_ctl') {
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
                    if (XMLHttpRequest.statusText == 'Conflict') {
                        txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ข้อมูลซ้ำ ';
                        Snackbar.show({
                            actionText: 'close',
                            pos: 'top-center',
                            actionTextColor: '#4CAF50',
                            backgroundColor: '#323232',
                            width: 'auto',
                            text: txtsnackerr + ' )'
                        });
                    } else {
                        Snackbar.show({
                            actionText: 'close',
                            pos: 'top-center',
                            actionTextColor: '#4CAF50',
                            backgroundColor: '#323232',
                            width: 'auto',
                            text: txtsnackerr + errorThrown + ' )'

                        });
                    }
                }
            });
        }
    });

    $('#showAllData').on('click', '.item-edit', function () {
        iddata = $(this).attr('data');
        ivalue = $(this).attr('value');
        $('#std_code_id').val(datatable[ivalue].std_code_id);
        $('#std_Tname').val(datatable[ivalue].std_Tname);
        $('#std_Ename').val(datatable[ivalue].std_Ename);
        $('#std_email').val(datatable[ivalue].std_email);
        console.log(datatable[ivalue].faculty_id, datatable[ivalue].major_id);
        $('#facultySelectAdd').val(datatable[ivalue].faculty_id);
        getFacultyEdit(datatable[ivalue].faculty_id);
        // $('#facultySelectAdd').find('option[value="'+datatable[ivalue].faculty_id+'"]').attr('selected','selected');
        getMajorEdit(datatable[ivalue].major_id);
        $('#majorSelectAdd').val(datatable[ivalue].major_id);
        $('#Modal').modal('show');
        $('#Modal').find('.modal-title').text('แก้ไขข้อมูลผู้ใช้งาน');
        $('#Modal').find('#btnSave').text('แก้ไขข้อมูลผู้ใช้งาน');
        iurl = '../Admin_student_data/Edit_Data_ctl';
    });

    $('#btnClose').click(function (e) {
        formDataValClr();
        //document.getElementById('majorSelectAdd').value = datatable[0].major_id;
        hideAllPop();
        getFaculty();
    });

    $(document).on('keyup', function (e) {
        if (e.keyCode == 27) {
            formDataValClr();
            //document.getElementById('majorSelectAdd').value = datatable[0].major_id;
            hideAllPop();
            getFaculty();
        }
    });


    $('#btnDel').click(function (e) {
        e.preventDefault();
        $data = selectchb();
        if ($data.length > 0) {
            $.ajax({
                type: "POST",
                url: "../Admin_student_data/Delete_Data_ctl",
                data: {
                    $data
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

    function uncheck() {
        $('input[name^=checkitem]:checked').each(function () {
            $(this).prop("checked", false)
        });
    }

    function selectchb() {
        var item = [];
        $('input[name^=checkitem]:checked').each(function () {
            item.push($(this).val());
        });
        return item;
    }

    $('#resetPasswd').click(function (e) {
        e.preventDefault();
        $data = selectchb();
        if ($data.length > 0) {
            // $('#datauserlist').text('ID:' + $data);
            $('#modelreset').modal('show');
        } else {
            Snackbar.show({
                actionText: 'ปิด',
                pos: 'top-center',
                actionTextColor: '#4CAF50',
                backgroundColor: '#323232',
                width: 'auto',
                text: 'กรุณาเลือกข้อมูลต้องการจะคืนค่ารหัสผ่านเริ่มต้น'
            });
        }
        // uncheck();
    });

    $('#btnReset').click(function (e) {
        e.preventDefault();
        $data = selectchb();
        $.ajax({
            type: "POST",
            url: "../Admin_student_data/Passwdre_Data_ctl",
            data: {
                $data
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                Snackbar.show({
                    actionText: 'ปิด',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: 'คืนค่ารหัสผ่านเริ่มต้นแล้ว'
                });
            }
        });
        uncheck();
        $('#modelreset').modal('hide');
    });


    $(".dropdown-menu.sort a ").click(function () {
        data = $(this).attr('data-1');
        sort = $(this).attr('data-2');
        // alert(limit);
        $.ajax({
            type: 'POST',
            url: "../Admin_student_data/Show_Sort_ctl",
            data: '&data=' + data + '&sort=' + sort + '&start=' + start + '&limit=' + limit,
            dataType: "json",
            success: function (response) {
                datatable = response;
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].std_code_id + '" id="' + response[i].std_code_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].std_code_id + i + '">' + response[i].std_code_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].std_Tname + '</td>' +
                            '<td>' + response[i].std_Ename + '</td>' +
                            '<td>' + response[i].std_email + '</td>' +
                            '<td>' + response[i].faculty_name + '</td>' +
                            '<td>' + response[i].major_name + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].std_code_id + '" class="item-edit">แก้ไข</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    });
    //--------------------------------------------END_BASIC_TOOLS--------------------------------------------//
});