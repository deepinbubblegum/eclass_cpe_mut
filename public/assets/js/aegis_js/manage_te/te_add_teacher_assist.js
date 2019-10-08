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

    // 1.showAllData
    // 2.formAdd
    // 3.modaldel

    $('#titleNameTxt').text("จัดการข้อมูลอาจารย์ผู้ช่วย");
    $('#findByTxt').text("ค้นหาด้วย");
    $('#btnFindTxt').text("ค้นหา");
    $('#saveModalTxt').text("SAVE_MODAL");
    $('#delModalTxt').text("ยืนยันการลดข้อมูล");
    $('#tableTitleTxt').text("จัดการข้อมูลอาจารย์ผู้ช่วย");
    $('#rowPerPageTxt').text("Rows per page:");

    var btnAddText = 'เพิ่มข้อมูลอาจารย์ผู้ช่วย';
    var btnEditText = 'แก้ไขข้อมูลอาจารย์ผู้ช่วย';

    var pagingSize = [10, 25, 50, 100];

    var dropSearchValue = [
        //[VALUE,TEXT]
        ['teacher_code_id', 'ID'],
        ['user_Tname', 'TNAME'],
        ['user_Ename', 'ENAME'],
        // ['user_email', 'EMAIL'],
        // ['user_major', 'MAJOR'],
        // ['user_permission', 'PERMISSION']
    ];

    //head of table
    var theadGenValue = ['Teacher_code_id', 'user_Tname', 'user_Ename', 'per_name', 'per_bit', 'Option'];

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

    //---------------------------------------------END_FUNCTION_GEN---------------------------------------------//

    inModelGen();

    dropPag();
    dropSearch();
    theadGen();
    //show_data();

    popGen();
    hideAllPop();

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

});