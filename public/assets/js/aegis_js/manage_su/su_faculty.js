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
    var element = document.getElementById("admin_side_faculty");
    element.classList.add("bg-danger");
    var element = document.getElementById("admin_faculty");
    element.classList.add("bg-danger");
    /******************************************************************** */


    var iddata;
    var iurl;
    var datatable;
    var txtsnack;

    var limit = 10;
    var start = 0;
    var currentPage = 1;

    //--------------------------------------------START_FUNCTION_GEN--------------------------------------------//
    $('#titleNameTxt').text("จัดการข้อมูลคณะ");
    $('#findByTxt').text("ค้นหาด้วย");
    $('#btnFindTxt').text("ค้นหา");
    $('#saveModalTxt').text("SAVE_MODAL");
    $('#delModalTxt').text("ยืนยันการลบข้อมูล");
    $('#tableTitleTxt').text("จัดการข้อมูลคณะ");
    $('#rowPerPageTxt').text("Rows per page:");

    var btnAddText = 'เพิ่มข้อมูลคณะ';
    var btnEditText = 'แก้ไขข้อมูลคณะ';

    var dropSearchValue = [
        //[VALUE,TEXT]
        ['faculty_id', 'รหัสคณะ'],
        ['faculty_name', 'ชื่อคณะ']
    ];

    var theadGenValue = ['รหัสคณะ', 'ชื่อคณะ', 'ตัวเลือก'];

    inModelValue = [
        //['TEXT','ID','NAME','HOLDER']
        ['รหัสคณะ', 'faculty_ID', 'faculty_ID', 'รหัส'],
        ['ชื่อคณะ', 'faculty_Name', 'faculty_Name', 'ชื่อ']
    ];

    var formData = ["#faculty_ID", "#faculty_Name"];

    var popData = ["#popupID", "#popupName"];

    var popValue = [
        //[POP_ID,POP_TEXT]
        ['popupID', 'กรุณาระบุรหัสคณะ'],
        ['popupName', 'กรุณาระบุชื่อคณะ']
    ];

    var Sort = [
        ['faculty_id', 'ASC', 'รหัสคณะ A > Z'],
        ['faculty_id', 'DESC', 'รหัสคณะ Z > A'],
        ['faculty_name', 'ASC', 'ชื่อคณะ ก > ฮ'],
        ['faculty_name', 'DESC', 'ชื่อคณะ ฮ > ก']
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
    show_data();
    ShowSort();

    popGen();
    hideAllPop();

    //--------------------------------------------START_CANT_TOUCH_THIS--------------------------------------------//
    function show_data() {
        $.ajax({
            url: "../Admin_faculty/Show_Data_ctl",
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].faculty_id + '" id="' + response[i].faculty_name + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].faculty_name + i + '"> ' + response[i].faculty_id + ' </label>' +
                            '</div>' +
                            '</th>' +
                            '<td> ' + response[i].faculty_name + ' </td>' +
                            '<td><a value="' + i + '" data="' + response[i].faculty_id + '" class="item-edit" >แก้ไข</a></td>' +
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
            url: "../Admin_faculty/Search_Show_Data_ctl",
            data: "&data=" + data + "&search=" + data2,
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].faculty_id + '" id="' + response[i].faculty_name + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].faculty_name + i + '"> ' + response[i].faculty_id + ' </label>' +
                            '</div>' +
                            '</th>' +
                            '<td> ' + response[i].faculty_name + ' </td>' +
                            '<td><a value="' + i + '" data="' + response[i].faculty_id + '" class="item-edit" >แก้ไข</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    });

    //--------------------------------------------END_CANT_TOUCH_THIS--------------------------------------------//
    $(document).keyup(function (e) {
        if ($('#Modal').is(':visible') == true) {
            if (e.keyCode === 13) $('#btnSave').click(); // enter
            if (e.keyCode === 27) $('#btnClose').click(); // esc
            console.log('Some Key Pressed');
        }
    });

    $('#btnAdd').click(function (e) {
        e.preventDefault();
        iurl = '../Admin_faculty/Add_Data_ctl';
        $('#Modal').find('.modal-title').text(btnAddText);
        $('#Modal').modal('show');
    });

    $('#btnClose').click(function (e) {
        formDataValClr();
        hideAllPop();
    });

    $('#showAllData').on('click', '.item-edit', function () {
        iddata = $(this).attr('data');
        ivalue = $(this).attr('value');

        $(formData[0]).val(datatable[ivalue].faculty_id);
        $(formData[1]).val(datatable[ivalue].faculty_name);

        $('#Modal').modal('show');
        $('#Modal').find('.modal-title').text(btnEditText);

        iurl = '../Admin_faculty/Edit_Data_ctl';
    });

    $('#btnSave').click(function (e) {
        var result = '';
        var check = '';
        var data = '';

        for (i = 0; i < $(formData).length; i++) {
            if ($(formData[i]).val() == '') {
                $(popData[i]).show();

            } else {
                $(popData[i]).hide();
                result += i;
            }
            check += i;
        }
        console.log(result, check);
        if (check == result) {
            e.preventDefault();

            FormData = $('#formAdd').find('input:text').each(function () {
                $(this).val($.trim($(this).val()));
            });
            // data = $('#formAdd').serialize();
            data = FormData.serialize();
            // faculty_ID = $.trim($('#faculty_ID').val());
            // faculty_Name = $.trim($('#faculty_Name').val());

            if (iurl == '../Admin_faculty/Add_Data_ctl') {
                txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';

            } else {
                txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
                data += '&org_id=' + iddata;
                // data = '&org_id=' + iddata;
                $('#Modal').modal('hide');
            }

            $.ajax({
                type: "POST",
                url: iurl,
                data: data,
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    formDataValClr();
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
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // console.log(XMLHttpRequest);
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
    });

    $('#btnDel').click(function (e) {
        e.preventDefault();

        $data = selectchb();
        if ($data.length > 0) {
            $.ajax({
                type: "POST",
                url: "../Admin_faculty/Delete_Data_ctl",
                data: {
                    $data
                },
                dataType: "json",
                success: function (response) {
                    console.log(response);
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

    $(".dropdown-menu.sort a ").click(function () {
        data = $(this).attr('data-1');
        sort = $(this).attr('data-2');

        $.ajax({
            type: 'POST',
            url: "../Admin_faculty/Show_Sort_ctl",
            data: '&data=' + data + '&sort=' + sort,
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].faculty_id + '" id="' + response[i].faculty_name + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].faculty_name + i + '"> ' + response[i].faculty_id + ' </label>' +
                            '</div>' +
                            '</th>' +
                            '<td> ' + response[i].faculty_name + ' </td>' +
                            '<td><a value="' + i + '" data="' + response[i].faculty_id + '" class="item-edit" >แก้ไข</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    });
});