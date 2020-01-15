$(document).ready(function () {
    var iddata;
    var iurl;
    var datatable;

    var limit = 10;
    var start = 0;
    var currentPage = 1;

    $('#titleNameTxt').text("จัดการข้อมูลอาจารย์");
    $('#findByTxt').text("ค้นหาด้วย");
    $('#btnFindTxt').text("ค้นหา");
    $('#saveModalTxt').text("SAVE_MODAL");
    $('#delModalTxt').text("ยืนยันการลบข้อมูล");
    $('#tableTitleTxt').text("จัดการข้อมูลอาจารย์");
    $('#rowPerPageTxt').text("Rows per page:");

    var btnAddText = 'เพิ่มข้อมูลสาขา';
    var btnEditText = 'แก้ไขข้อมูลสาขา';

    var pagingSize = [10, 25, 50, 100];
    dropGen();

    var theadGenValue = ['Teacher ID', 'Teacher Name(EN)', 'Teacher Name(TH)', 'E-mail', 'Username', 'option'];

    var formData = ["#teacher_code_id", "#teacher_Tname", "#teacher_Ename", "#teacher_email", "#teacher_username"];

    var popData = ["#popupID", "#popupTname", "#popupEname", "#popupEmail", "#popupusername"];

    var popValue = [
        //[POP_ID,POP_TEXT]
        ['popupID', 'กรุณาระบุไอดี'],
        ['popupTname', 'กรุณาระบุชื่อ(TH)'],
        ['popupEname', 'กรุณาระบุชื่อ(EN)'],
        ['popupEmail', 'กรุณาระบุอีเมล'],
        ['popupusername', 'กรุณาระบุชื่อผู้ใช้']
    ];

    var inModelValue = [
        //['TEXT','ID','NAME','HOLDER']
        ['Teacher ID', 'teacher_code_id', 'teacher_code_id', 'Teacher ID'],
        ['Name(EN)', 'teacher_Ename', 'teacher_Ename', 'Name(EN)'],
        ['Name(TH)', 'teacher_Tname', 'teacher_Tname', 'Name(TH)'],
        ['Email', 'teacher_email', 'teacher_email', 'Email'],
        ['Username', 'teacher_username', 'teacher_username', 'Username']
    ];

    var dropSearchValue = [
        //[VALUE,TEXT]
        ['teacher_code_id', 'รหัสอาจารย์'],
        ['teacher_Tname', 'ชื่ออาจารย์(TH)'],
        ['teacher_Ename', 'ชื่ออาจารย์(EN)'],
        ['teacher_email', 'EMAIL'],
        ['teacher_username', 'USERNAME'],
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
        for (i = 0; i < inModelValue.length; i++) {
            html += '<div class="col-md-4 mb-3" >' +
                '<label>' + inModelValue[i][0] + '</label>' +
                '<input type="text" type="text" id="' + inModelValue[i][1] + '" name="' + inModelValue[i][2] + '" class="form-control" placeholder="' + inModelValue[i][3] + '">' +
                '</div>';
        }
        html += '<div class="col-md-4 mb-3" id="facultySelect">' +
            '<label>Faculty</label>' +
            '<select id="facultySelectAdd" class="form-control"></select>' +
            '</div>';
        html += '<div class="col-md-4 mb-3" id="majorSelect">' +
            '<label>Major</label>' +
            '<select id="majorSelectAdd" class="form-control"></select>' +
            '</div>';
        html += '<div class="col-md-4 mb-3" id="degreeSelect">' +
            '<label>Degree</label>' +
            '<select id="degreeSelectAdd" class="form-control"></select>' +
            '</div>';
        // html += '<div class="col-md-4 mb-3" >' +
        //     '<label>Permission</label>' +
        //     '<select id="permissionSelectAdd" class="form-control"></select>' +
        //     '</div>';
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

    //---------------------------------------------END_FUNCTION_GEN---------------------------------------------//

    inModelGen();

    dropSearch();
    theadGen();
    show_data();

    popGen();
    hideAllPop();

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
        show_data();
    });

    $('#chevron_right').click(function () {
        limit = $('.row_active').text();
        start = start + (limit * 1);
        currentPage++;
        show_data();
    });

    $('#chevron_left').click(function () {
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

    /*-------------------------------------------*/
    function show_data() {
        $.ajax({
            url: "../Admin_teacher/Show_Max_Data_ctl",
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
            url: "../Admin_teacher/Show_Data_ctl",
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].teacher_code_id + '" id="' + response[i].teacher_code_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].teacher_code_id + i + '">' + response[i].teacher_code_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].de_Ename + " " + response[i].teacher_Ename + '</td>' +
                            '<td>' + response[i].de_Tname + " " + response[i].teacher_Tname + '</td>' +
                            '<td>' + response[i].teacher_email + '</td>' +
                            '<td>' + response[i].teacher_username + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].teacher_code_id + '" class="item-edit">Edit</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    }


    $('#btnAdd').click(function (e) {
        e.preventDefault();
        iurl = '../Admin_teacher/Add_Data_ctl';
        $('#majorSelect').show();
        $('#facultySelect').show();
        $('#Modal').find('.modal-title').text('เพิ่มข้อมูลอาจารย์');
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
            url: "../Admin_degree/Show_Data_ctl",
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].de_id + '">' + response[i].de_Tname + '</option>';
                    }
                }
                $('#degreeSelectAdd').html(html);
            }
        });
    });

    $('#btnClose').click(function (e) {
        e.preventDefault();
        document.getElementById('teacher_code_id').value = "";
        document.getElementById('teacher_Tname').value = "";
        document.getElementById('teacher_Ename').value = "";
        document.getElementById('teacher_email').value = "";
        document.getElementById('teacher_username').value = "";
    });

    $(document).on('keyup', function (e) {
        if (e.keyCode == 27) {
            document.getElementById('teacher_code_id').value = "";
            document.getElementById('teacher_Tname').value = "";
            document.getElementById('teacher_Ename').value = "";
            document.getElementById('teacher_email').value = "";
            document.getElementById('teacher_username').value = "";
        }
    });

    $('#facultySelectAdd').change(function () {
        //alert($('#facultySelectAdd').val());
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
                        html += '<option value="' + response[i].major_id + '">' + response[i].major_name + '</option>';
                    }
                }
                $('#majorSelectAdd').html(html);
            }
        });
    }


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
            if (iurl == '../Admin_teacher/Add_Data_ctl') {
                txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
            } else {
                txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
            }

            FormData = $('#formAdd').find('input:text').each(function(){
                $(this).val($.trim($(this).val()));
            });

            data = FormData.serialize();
            data2 = $("#majorSelectAdd :selected").val();
            data3 = $("#degreeSelectAdd :selected").val();

            $.ajax({
                type: "POST",
                url: iurl,
                data: data + '&major_id=' + data2 + '&degree=' + data3 + '&org_id=' + iddata,
                success: function (response) {
                    document.getElementById('teacher_code_id').value = "";
                    document.getElementById('teacher_Tname').value = "";
                    document.getElementById('teacher_Ename').value = "";
                    document.getElementById('teacher_email').value = "";
                    document.getElementById('teacher_username').value = "";
                    //document.getElementById('majorSelectAdd').value = datatable[0].major_id;
                    show_data();
                    if (iurl != '../Admin_teacher/Add_Data_ctl') {
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
        org = datatable[ivalue].teacher_code_id;
        $('#teacher_code_id').val(datatable[ivalue].teacher_code_id);
        $('#teacher_Tname').val(datatable[ivalue].teacher_Tname);
        $('#teacher_Ename').val(datatable[ivalue].teacher_Ename);
        $('#teacher_email').val(datatable[ivalue].teacher_email);
        $('#teacher_username').val(datatable[ivalue].teacher_username);
        $('#majorSelect').hide();
        $('#facultySelect').hide();
        $('#Modal').modal('show');
        $('#Modal').find('.modal-title').text('แก้ไขข้อมูลอาจารย์');
        $('#Modal').find('#btnSave').text('แก้ไขข้อมูลอาจารย์');
        iurl = '../Admin_teacher/Edit_Data_ctl';
        // $.ajax({
        //     url: "../Admin_major/Show_Data_ctl",
        //     dataType: "json",
        //     success: function(response) {
        //         var html = '';
        //         var i;
        //         if (response != null) {
        //             for (i = 0; i < response.length; i++) {
        //                 html += '<option value="' + response[i].major_id + '">' + response[i].major_name + '</option>';
        //             }
        //         }
        //         $('#Major_Form_add_option').html(html);
        //         // alert(datatable[ivalue].faculty_id);
        //         $('#Major_Form_add_option').val(datatable[ivalue].major_id);
        //     }
        // });
        $.ajax({
            url: "../Admin_degree/Show_Data_ctl",
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].de_id + '">' + response[i].de_Tname + '</option>';
                    }
                }
                $('#degreeSelectAdd').html(html);
                $('#degreeSelectAdd').val(datatable[ivalue].de_id);
            }
        });
    });

    $('#btnSearch').click(function (e) {
        e.preventDefault();
        data1 = $('#select_search').val();
        data2 = $('#SearchName').val();
        $.ajax({
            type: "POST",
            url: "../Admin_teacher/Search_Show_Data_ctl",
            data: "&data=" + data1 + "&search=" + data2,
            dataType: "json",
            success: function (response) {
                datatable = response;
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].teacher_code_id + '" id="' + response[i].teacher_code_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].teacher_code_id + i + '">' + response[i].teacher_code_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].de_Ename + " " + response[i].teacher_Ename + '</td>' +
                            '<td>' + response[i].de_Tname + " " + response[i].teacher_Tname + '</td>' +
                            '<td>' + response[i].teacher_email + '</td>' +
                            '<td>' + response[i].teacher_username + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].teacher_code_id + '" class="item-edit">Edit</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    });

    $('#btnDel').click(function (e) {
        e.preventDefault();
        $data = selectchb();
        if ($data.length > 0) {
            $.ajax({
                type: "POST",
                url: "../Admin_teacher/Delete_Data_ctl",
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

    function selectchb() {
        var item = [];
        $('input[name^=checkitem]:checked').each(function () {
            item.push($(this).val());
        });
        return item;
    }
});