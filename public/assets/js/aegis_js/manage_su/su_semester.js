$(document).ready(function () {


    /******************************* highlight Navbar ************************************* */
    var Navbar_Side_highlight = ['admin_side_Anc', 'admin_side_faculty', 'admin_side_major', "admin_side_semester", "admin_side_subject", "admin_side_subsem", "admin_side_student", "admin_side_teacher", "admin_side_admin", "admin_side_teamaj", "admin_side_teasub", "admin_side_degree"];
    for (z = 0; z < Navbar_Side_highlight.length; z++) {
        var elementRemove = document.getElementById(Navbar_Side_highlight[z]);
        elementRemove.classList.remove("bg-danger");
    }

    var Navbar_highlight = ['admin_Anc', 'admin_faculty', 'admin_major', "admin_semester", "admin_subject", "admin_subsem", "admin_student", "admin_teacher", "admin_admin", "admin_teamaj", "admin_teasub", "admin_degree"];
    for (y = 0; y < Navbar_highlight.length; y++) {
        var elementRemove = document.getElementById(Navbar_highlight[y]);
        elementRemove.classList.remove("bg-danger");
    }

    // $('#score').classList.add(".bg-primary");
    var element = document.getElementById("admin_side_semester");
    element.classList.add("bg-danger");
    var element = document.getElementById("admin_semester");
    element.classList.add("bg-danger");
    /******************************************************************** */


    var iddata;
    var iurl;
    var datatable;
    var txtsnack;

    var limit = 10;
    var start = 0;
    var currentPage = 1;

    // 1.showAllData
    // 2.formAdd
    // 3.modaldel
    yearNow = new Date().getFullYear() + 543;

    //--------------------------------------------START_FUNCTION_GEN--------------------------------------------//
    $('#titleNameTxt').text("จัดการข้อมูลปีการศึกษา");
    $('#findByTxt').text("ค้นหาด้วย");
    $('#btnFindTxt').text("ค้นหา");
    $('#saveModalTxt').text("SAVE_MODAL");
    $('#delModalTxt').text("ยืนยันการลบข้อมูล");
    $('#tableTitleTxt').text("จัดการข้อมูลปีการศึกษา");
    $('#rowPerPageTxt').text("Rows per page:");

    var btnAddText = 'เพิ่มข้อมูลปีการศึกษา';
    var btnEditText = 'แก้ไขข้อมูลปีการศึกษา';

    var pagingSize = [10, 25, 50, 100];

    var dropSearchValue = [
        //[VALUE,TEXT]
        ['semester_year', 'ปี'],
        ['semester_part', 'เทอม'],
        ['semester_name', 'ปีการศึกษา']
    ];

    //head of table
    var theadGenValue = ['ปี', 'เทอม', 'ปีการศึกษา', 'ตัวเลือก'];

    var formData = ["#semester_ID", "#semester_Year", "#semester_Part", "#semester_Name"];

    var inModelValue = [
        //['TEXT','ID','NAME','HOLDER']
        ['Semester_ID', 'semester_ID', 'semester_ID', 'ID'],
        ['Semester_Name', 'semester_Name', 'semester_Name', 'Name'],
        ['ปีการศึกษา', 'semester_Year', 'semester_Year', 'ปี'],
    ];

    var popData = ["#popupID", "#popupYear"];

    var popValue = [
        //[POP_ID,POP_TEXT]
        ['popupID', 'กรุณาระบุไอดี'],
        ['popupYear', 'กรุณาระบุปี']
    ];

    var Sort = [
        ['semester_year', 'ASC', 'ปีการศึกษา น้อย > มาก'],
        ['semester_year', 'DESC', 'ปีการศึกษา มาก > น้อย']
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
                '<input type="number" onKeyPress="if(this.value.length==4) return false;" id="' + inModelValue[i][1] + '" name="' + inModelValue[i][2] + '" class="form-control" placeholder="' + inModelValue[i][3] + '">' +
                '</div>';
        }
        html += '<div class="col-md-4 mb-3" >' +
            '<label>เทอม</label>' +
            '<select id="selectAdd" class="form-control">';
        for (i = 1; i <= 3; i++) {
            html += '<option value="' + i + '">' + i + '</option>';
        }
        html += '</select>' +
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

    popGen();
    hideAllPop();

    $('#semester_ID').parent().hide(); //want to show only semester_Year and semester_Part
    $('#semester_Name').parent().hide();
    //--------------------------------------------START_PAGINATION_ELEMENT--------------------------------------------//


    $("#semester_Year").keypress(function (event) {
        var ew = event.which;
        if (ew == 101)
            return false;
        if (ew == 45)
            return false;
        if (ew == 43)
            return false;
        // return true;
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
            url: "../Admin_semester/Show_Max_Data_ctl",
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
            data: "&start=" + start + "&limit=" + limit,
            url: "../Admin_semester/Show_Data_ctl",
            dataType: "json",
            success: function (datatableear) {
                datatable = datatableear;
                var html = '';
                var i;
                if (datatableear != null) {
                    for (i = 0; i < datatableear.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox" >' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + datatableear[i].semester_id + '" id="' + datatableear[i].semester_id + '">' +
                            '<label class="custom-control-label" for="' + datatableear[i].semester_id + '"> ' + datatableear[i].semester_year + ' </label>' +
                            '</div>' +
                            '</th>' +
                            '<td id="">' + datatableear[i].semester_part + '</td>' +
                            '<td id="">' + datatableear[i].semester_name + '</td>' +
                            '<td><a data="' + datatableear[i].semester_id + '" value="' + i + '" class="item-edit">แก้ไข</a></td>' +
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
            url: "../Admin_semester/Show_Max_Data_Search_ctl",
            data: "&data=" + data + "&search=" + data2,
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
            url: "../Admin_semester/Search_Show_Data_ctl",
            data: "&data=" + data + "&search=" + data2 + "&start=" + start + "&limit=" + limit,
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox" >' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].semester_id + '" id="' + response[i].semester_id + '">' +
                            '<label class="custom-control-label" for="' + response[i].semester_id + '"> ' + response[i].semester_year + ' </label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].semester_part + '</td>' +
                            '<td>' + response[i].semester_name + '</td>' +
                            '<td><a data="' + response[i].semester_id + '" value="' + i + '" class="item-edit">แก้ไข</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            },
        });
    });

    function LimitSearch() {
        data = $('#SearchName').val();
        data2 = $('#select_search').val();

        $.ajax({
            type: "POST",
            url: "../Admin_semester/Show_Max_Data_Search_ctl",
            data: "&data=" + data + "&search=" + data2,
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
            url: "../Admin_semester/Search_Show_Data_ctl",
            data: "&data=" + data + "&search=" + data2 + "&start=" + start + "&limit=" + limit,
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox" >' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].semester_id + '" id="' + response[i].semester_id + '">' +
                            '<label class="custom-control-label" for="' + response[i].semester_id + '"> ' + response[i].semester_year + ' </label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].semester_part + '</td>' +
                            '<td>' + response[i].semester_name + '</td>' +
                            '<td><a data="' + response[i].semester_id + '" value="' + i + '" class="item-edit">แก้ไข</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            },
        });
    }

    //--------------------------------------------END_CANT_TOUCH_THIS--------------------------------------------//

    //--------------------------------------------START_BASIC_TOOLS--------------------------------------------//
    $(document).keyup(function (e) {
        if ($('#Modal').is(':visible') == true) {
            if (e.keyCode === 13) $('#btnSave').click(); // enter
            if (e.keyCode === 27) $('#btnClose').click(); // esc
            console.log('Some Key Pressed');
        }
    });

    $('#btnAdd').click(function (e) {
        e.preventDefault();
        iurl = "../Admin_semester/Add_Data_ctl";
        $('#Modal').find('.modal-title').text(btnAddText);
        $('#Modal').modal('show');
    });

    $('#btnClose').click(function (e) {
        formDataValClr();
        hideAllPop();
        $('#selectAdd').val(datatable[0].semester_part);
    });

    $('#showAllData').on('click', '.item-edit', function () {
        iddata = $(this).attr('data');
        ivalue = $(this).attr('value');

        //$(formData[0]).val(datatable[ivalue].semester_id);
        //$(formData[3]).val(datatable[ivalue].semester_name);
        $(formData[1]).val(datatable[ivalue].semester_year); //get year
        $('#selectAdd').val(datatable[ivalue].semester_part);

        $('#Modal').find('.modal-title').text(btnEditText);
        $('#Modal').modal('show');
        iurl = '../Admin_semester/Edit_Data_ctl';
    });

    $('#btnSave').click(function (e) {
        e.preventDefault();
        dataYear = $.trim($('#semester_Year').val());
        if (dataYear < yearNow) {
            // alert(dataYear + '<' + yearNow);
            $('#ConfirmModalTxt').text('ปีที่บันทึกน้อยกว่าปีบัจจุบัน ต้องการบันทึกข้อมูลหรือไม่');
            $('#modalConfirm').modal('show');
        } else {
            AddSemester();
        }
        // AddSemester();
    });

    $('#btnConfirm').click(function (e) {
        e.preventDefault();
        $('#modalConfirm').modal('hide');
        AddSemester();
    });

    function AddSemester() {
        var result = '';
        var check = '';
        for (i = 0; i < $(formData).length; i++) {
            if ($(formData[i]).val() == '') {
                $(popData[i]).show();

            } else if ($.isNumeric($(formData[1]).val()) == false) {
                $(popData[1]).show();
            } else {
                $(popData[i]).hide();
                result += i;
            }
            check += i;
        }
        console.log(check, result);
        if ('12' == result) {

            dataYear = $.trim($('#semester_Year').val());
            dataPart = $("#selectAdd :selected").val();
            dataID = dataYear + dataPart;
            dataName = dataYear + '/' + dataPart;
            data = 'semester_id=' + dataID + '&semester_year=' + dataYear + '&semester_part=' + dataPart + '&semester_name=' + dataName;

            console.log(data);

            if (iurl == '../Admin_semester/Add_Data_ctl') {
                txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
            } else {
                txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
            }

            $.ajax({
                type: "POST",
                url: iurl,
                data: data + '&org_semester_id=' + iddata,
                success: function () {
                    if (iurl == '../Admin_semester/Edit_Data_ctl') {
                        $('#Modal').modal('hide');
                    }
                    show_data();
                    document.getElementById("semester_Year").value = "";
                    document.getElementById("selectAdd").value = 1;
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
    }

    $('#btnDel').click(function (e) {
        e.preventDefault();
        $data = selectchb();
        if ($data.length > 0) {
            $.ajax({
                type: "POST",
                url: "../Admin_semester/Delete_Data_ctl",
                data: {
                    $data
                },
                success: function (datatable) {
                    show_data();
                    $('#modaldel').modal('hide');
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
        show_data();
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
            url: "../Admin_semester/Show_Sort_ctl",
            data: '&data=' + data + '&sort=' + sort + '&start=' + start + '&limit=' + limit,
            dataType: "json",
            success: function (datatableear) {
                datatable = datatableear;
                var html = '';
                var i;
                if (datatableear != null) {
                    for (i = 0; i < datatableear.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox" >' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + datatableear[i].semester_id + '" id="' + datatableear[i].semester_id + '">' +
                            '<label class="custom-control-label" for="' + datatableear[i].semester_id + '"> ' + datatableear[i].semester_year + ' </label>' +
                            '</div>' +
                            '</th>' +
                            '<td id="">' + datatableear[i].semester_part + '</td>' +
                            '<td id="">' + datatableear[i].semester_name + '</td>' +
                            '<td><a data="' + datatableear[i].semester_id + '" value="' + i + '" class="item-edit">แก้ไข</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    });
    //--------------------------------------------END_BASIC_TOOLS--------------------------------------------//
});