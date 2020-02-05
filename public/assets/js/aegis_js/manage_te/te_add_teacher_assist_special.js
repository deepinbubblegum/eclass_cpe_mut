$(document).ready(function() {
    var iddata;
    var iurl;
    var datatable;
    var txtsnack;
    var _files;
    var url = $(location).attr('href').split("/");
    var limit = 10;
    var start = 0;
    var currentPage = 1;
    var teacherdata;
    var permissiondata;

    // 1.showAllData
    // 2.formAdd
    // 3.modaldel

    $('#titleNameTxt').text("จัดการข้อมูลอาจารย์ผู้ช่วย");
    $('#findByTxt').text("ค้นหาด้วย");
    $('#btnFindTxt').text("ค้นหา");
    $('#saveModalTxt').text("SAVE_MODAL");
    $('#delModalTxt').text("ยืนยันการลบข้อมูล");
    $('#tableTitleTxt').text("จัดการข้อมูลอาจารย์ผู้ช่วย");
    $('#rowPerPageTxt').text("Rows per page:");

    var btnAddText = 'เพิ่มข้อมูลอาจารย์ผู้ช่วย';
    var btnEditText = 'แก้ไขข้อมูลอาจารย์ผู้ช่วย';

    var pagingSize = [10, 25, 50, 100];

    var dropSearchValue = [
        //[VALUE,TEXT]
        ['teacher_code_id', 'ID'],
        ['teacher_Tname', 'TNAME'],
        ['teacher_Ename', 'ENAME'],
        ['per_name', 'PERMISSION']
        // ['user_email', 'EMAIL'],
        // ['user_major', 'MAJOR'],
        // ['user_permission', 'PERMISSION']
    ];

    //head of table
    var theadGenValue = ['รหัสอาจารย์ผู้ช่วย', 'ชื่อ-สกุล (TH)', 'ชื่อ-สกุล (EN)', 'ชื่อระดับสิทธิ์', 'เลขระดับสิทธิ์', 'Option'];

    var formData = ["#Teacher_code_id", "#per_name"];

    var inModelValue = [
        //['TEXT','ID','NAME','HOLDER']
        // ['substd_stdid', 'substd_stdid', 'substd_stdid', 'substd_stdid'],
        // ['substd_sec', 'substd_sec', 'substd_sec', 'substd_sec'],
        // ['user_Tname', 'user_Tname', 'user_Tname', 'user_Tname'],
        // ['user_Ename', 'user_Ename', 'user_Ename', 'user_Ename'],
        // ['user_email', 'user_email', 'user_email', 'user_email']
    ];

    var popData = ["#popupID", "#popupTname", "#popupEname", "#popupSec"];

    var popValue = [
        //[POP_ID,POP_TEXT]
        ['popupTeacher', 'กรุณาระบุอาจารย์'],
        ['popupPermission', 'กรุณาระบุระดับสิทธิ์'],
        // ['popupEmail', 'กรุณาระบุชื่อสาขา']
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
        html += '<div class="col-md-4 mb-3" >' +
            '<label>Permission</label>' +
            '<select id="selectAddPermission" class="form-control">' +
            '</select>' +
            '</div>';
        html += '<div class="col-md-4 mb-3" >' +
            '<label>Teacher</label>' +
            '<select id="selectAddTeacher" class="form-control">' +
            '</select>' +
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

    function gen_teacher() {
        $.ajax({
            // type: "POST",
            // data: '&subject_id=' + subject_id,
            url: "/" + url[3] + "/Te_teacher_assist/Teacher__Special_Data_Add",
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].teacher_code_id + '">' + response[i].de_Tname + " " +  response[i].teacher_Tname + '</option>';
                    }
                }
                $('#selectAddTeacher').html(html);
                // $('#selectAddTeacher').change(function(e) {
                //     thisSubject = $("#selectAddTeacher :selected").val();
                //     console.log('selectAddTeacher', thisSubject);
                // });
            }
        });
    }

    function gen_permission() {
        $.ajax({
            type: "POST",
            data: '&subject_id=' + subject_id + '&semester=' + semester,
            url: "/" + url[3] + "/Te_teacher_assist/Permission_Data_Add",
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].per_id + '">' + response[i].per_name + '</option>';
                    }
                }
                $('#selectAddPermission').html(html);
            }
        });
    }

    //---------------------------------------------END_FUNCTION_GEN---------------------------------------------//

    inModelGen();

    dropPag();
    dropSearch();
    theadGen();
    show_data();

    popGen();
    hideAllPop();

    gen_teacher();
    gen_permission();

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
            type: "POST",
            data: '&subject_id=' + subject_id + '&semester=' + semester,
            url: "/" + url[3] + "/Te_teacher_assist/Show_Max_Data_ctl",
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
                console.log(start, limit);
                disableArrow(currentPage, pageMax);
            }
        });

        $.ajax({
            type: "POST",
            data: "&start=" + start + "&limit=" + limit + "&subject_id=" + subject_id + '&semester=' + semester,
            url: "/" + url[3] + "/Te_teacher_assist/Show_Data_ctl",
            dataType: "json",
            success: function(response) {
                console.log(response);
                datatable = response;
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" data="' + response[i].teacher_code_id + '" value="' + response[i].per_id + '" id="' + response[i].teacher_code_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].teacher_code_id + i + '">' + response[i].teacher_code_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].teacher_Tname + '</td>' +
                            '<td>' + response[i].teacher_Ename + '</td>' +
                            '<td>' + response[i].per_name + '</td>' +
                            '<td>' + response[i].per_bit + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].per_id + '" data2="' + response[i].teacher_code_id + '" class="item-edit">Edit</a></td>' +
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
            url: "/" + url[3] + "/Te_teacher_assist/Search_Show_Data_ctl",
            data: "&data=" + data + "&search=" + data2 + "&subject_id=" + subject_id + '&semester=' + semester,
            dataType: "json",
            success: function(response) {
                console.log(response);
                datatable = response;
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" data="' + response[i].teacher_code_id + '" value="' + response[i].per_id + '" id="' + response[i].teacher_code_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].teacher_code_id + i + '">' + response[i].teacher_code_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].teacher_Tname + '</td>' +
                            '<td>' + response[i].teacher_Ename + '</td>' +
                            '<td>' + response[i].per_name + '</td>' +
                            '<td>' + response[i].per_bit + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].per_id + '" data2="' + response[i].teacher_code_id + '" class="item-edit">Edit</a></td>' +
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
        iurl = '/' + url[3] + '/Te_teacher_assist/Add_Data_ctl';
        $('#Modal').find('.modal-title').text('เพิ่มข้อมูลอาจารย์ผู้ช่วย');
        $('#Modal').find('#btnSave').text('เพิ่มข้อมูลอาจารย์ผู้ช่วย');
        $('#Modal').modal('show');

    });

    $('#btnSave').click(function(e) {
        e.preventDefault();
        if (iurl == '/' + url[3] + '/Te_teacher_assist/Add_Data_ctl') {
            txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
            txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
        } else {
            txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
            txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
        }

        data = $("#selectAddTeacher :selected").val();
        data2 = $("#selectAddPermission :selected").val();
        $.ajax({
            type: "POST",
            url: iurl,
            data: "&subject_id=" + subject_id + '&semester=' + semester + '&teacher=' + data + '&permission=' + data2 + '&teacher_org=' + teacherdata + '&permission_org=' + permissiondata,
            success: function() {
                if (iurl == '/' + url[3] + '/Te_teacher_assist/Edit_Data_ctl') {
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

        teacherdata = datatable[ivalue].teacher_code_id;
        $('#selectAddTeacher').val(datatable[ivalue].teacher_code_id);

        permissiondata = datatable[ivalue].per_id;
        $('#selectAddPermission').val(datatable[ivalue].per_id);

        $('#Modal').find('.modal-title').text(btnEditText);
        $('#Modal').find('#btnSave').text('Save');
        $('#Modal').modal('show');
        iurl = '/' + url[3] + '/Te_teacher_assist/Edit_Data_ctl';
    });

    $('#btnDel').click(function(e) {
        e.preventDefault();
        data_per = select();
        data_teacher = select_teacher();
        // alert(data3);
        if (data_teacher.length > 0) {
            $.ajax({
                type: "POST",
                url: '/' + url[3] + '/Te_teacher_assist/Delete_Data_ctl',
                data: {
                    data_per,
                    data_teacher,
                    subject_id,
                    semester,
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

    function select() {
        var item = [];
        $('input[name^=checkitem]:checked').each(function() {
            item.push($(this).val());
        });
        return item;
    }

    function select_teacher() {
        var item = [];
        $('input[name^=checkitem]:checked').each(function() {
            item.push($(this).attr('data'));
        });
        return item;
    }


});