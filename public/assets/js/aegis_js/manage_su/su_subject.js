$(document).ready(function () {
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

    //--------------------------------------------START_FUNCTION_GEN--------------------------------------------//
    $('#titleNameTxt').text("จัดการข้อมูลวิชา");
    $('#findByTxt').text("ค้นหาด้วย");
    $('#btnFindTxt').text("ค้นหา");
    $('#saveModalTxt').text("SAVE_MODAL");
    $('#delModalTxt').text("ยืนยันการลบข้อมูล");
    $('#tableTitleTxt').text("จัดการข้อมูลวิชา");
    $('#rowPerPageTxt').text("Rows per page:");

    var btnAddText = 'เพิ่มข้อมูลวิชา';
    var btnEditText = 'แก้ไขข้อมูลวิชา';

    var pagingSize = [10, 25, 50, 100];

    var dropSearchValue = [
        //[VALUE,TEXT]
        ['subject_id', 'รหัสวิชา'],
        ['subject_name', 'ชื่อวิชา'],
        ['major_name', 'สาขา'],
    ];
    //head of table
    var theadGenValue = ['รหัสวิชา', 'ชื่อวิชา', 'สาขา', 'ตัวเลือก'];

    var formData = ["#subject_id", "#subject_name", "#major_name"];

    var inModelValue = [
        //['TEXT','ID','NAME','HOLDER']
        ['รหัสวิชา', 'subject_id', 'subject_id', 'รหัสวิชา'],
        ['ชื่อวิชา', 'subject_name', 'subject_name', 'ชื่อวิชา']
    ];

    var popData = ["#popupID", "#popupSname"];

    var popValue = [
        //[POP_ID,POP_TEXT]
        ['popupID', 'กรุณาระบุไอดี'],
        ['popupSname', 'กรุณาระบุชื่อวิชา']
    ];

    var Sort = [
        ['subject_id', 'ASC', 'รหัสวิชา A > Z'],
        ['subject_id', 'DESC', 'รหัสวิชา Z > A'],
        ['subject_name', 'ASC', 'ชื่อวิชา A > Z'],
        ['subject_name', 'DESC', 'ชื่อวิชา Z > A'],
        ['subject_major', 'ASC', 'สาขา A > Z'],
        ['subject_major', 'DESC', 'สาขา Z > A']
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
            if (i == 1) {
                html += '<div class="col-md-8 mb-3" >' +
                    '<label>' + inModelValue[i][0] + '</label>' +
                    '<input type="text" type="text" id="' + inModelValue[i][1] + '" name="' + inModelValue[i][2] + '" class="form-control" placeholder="' + inModelValue[i][3] + '">' +
                    '</div>';
            } else {
                html += '<div class="col-md-4 mb-3" >' +
                    '<label>' + inModelValue[i][0] + '</label>' +
                    '<input type="text" type="text" id="' + inModelValue[i][1] + '" name="' + inModelValue[i][2] + '" class="form-control" placeholder="' + inModelValue[i][3] + '">' +
                    '</div>';
            }
        }
        html += '<div class="col-md-4 mb-3" id="facultySelect">' +
            '<label>คณะ</label>' +
            '<select id="facultySelectAdd" class="form-control"></select>' +
            '</div>';
        html += '<div class="col-md-8 mb-3" >' +
            '<label>สาขา</label>' +
            '<select id="selectAddMajor" class="form-control"></select>' +
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
            url: "../Admin_subject/Show_Max_Data_ctl",
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
            url: "../Admin_subject/Show_Data_ctl",
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].subject_id + '" id="' + response[i].major_name + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].major_name + i + '">' + response[i].subject_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].subject_name + '</td>' +
                            '<td>(' + response[i].major_id + ') ' + response[i].major_name + '</td>' +
                            '<td><a data="' + response[i].subject_id + '" data2="' + response[i].major_id + '" data3="' + response[i].major_faculty + '" value="' + i + '" class="item-edit">แก้ไข</a></td>' +
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
            url: "../Admin_subject/Show_Max_Search_Data_ctl",
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
            url: "../Admin_subject/Search_Show_Data_ctl",
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].subject_id + '" id="' + response[i].major_name + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].major_name + i + '">' + response[i].subject_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].subject_name + '</td>' +
                            '<td>(' + response[i].major_id + ') ' + response[i].major_name + '</td>' +
                            '<td><a data="' + response[i].subject_id + '" data2="' + response[i].major_id + '" data3="' + response[i].major_faculty + '" value="' + i + '" class="item-edit">แก้ไข</a></td>' +
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
            url: "../Admin_subject/Show_Max_Search_Data_ctl",
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
            url: "../Admin_subject/Search_Show_Data_ctl",
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].subject_id + '" id="' + response[i].major_name + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].major_name + i + '">' + response[i].subject_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].subject_name + '</td>' +
                            '<td>(' + response[i].major_id + ') ' + response[i].major_name + '</td>' +
                            '<td><a data="' + response[i].subject_id + '" data2="' + response[i].major_id + '" data3="' + response[i].major_faculty + '" value="' + i + '" class="item-edit">แก้ไข</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
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
        if (e.keyCode === 13) $('#btnSearch').click(); // enter
    });

    $('#btnClose').click(function (e) {
        formDataValClr();
        hideAllPop();
        $('#selectAdd').val(datatable[0].major_id);
    });

    $('#btnAdd').click(function (e) {
        e.preventDefault();
        iurl = '../Admin_subject/Add_Data_ctl';
        $('#Modal').find('.modal-title').text(btnAddText);
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
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].major_id + '">(' + response[i].major_id + ') ' + response[i].major_name + '</option>';
                    }
                }
                $('#selectAddMajor').html(html);
            }
        });
    }

    $('#btnSave').click(function (e) {
        e.preventDefault();
        var result = '';
        var check = '';
        var org_id = '';

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
            // data = $('#formAdd').serialize();
            subject_id = $.trim($('#subject_id').val());
            subject_name = $.trim($('#subject_name').val());
            data2Encode = $("#selectAddMajor :selected").val();
            data2 = encodeURIComponent(data2Encode);
            if (iurl == '../Admin_subject/Add_Data_ctl') {
                txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
            } else {
                txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
                // data += '&org_id=' + iddata;
                org_id = iddata;
                $('#Modal').modal('hide');
            }

            $.ajax({
                type: "POST",
                url: iurl,
                data: '&subject_id=' + subject_id + '&subject_name=' + subject_name + '&major_id=' + data2 + '&org_id=' + org_id,
                success: function (response) {
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

    $('#showAllData').on('click', '.item-edit', function () {
        iddata = $(this).attr('data');
        iddata2 = $(this).attr('data2');
        iddata3 = $(this).attr('data3');
        ivalue = $(this).attr('value');
        $('#subject_id').val(datatable[ivalue].subject_id);
        $('#subject_name').val(datatable[ivalue].subject_name);
        $('#Modal').modal('show');
        $('#Modal').find('.modal-title').text(btnEditText);

        iurl = '../Admin_subject/Edit_Data_ctl';
        $.ajax({
            type: "POST",
            url: "../Admin_major/Select_major",
            data: '&datamajor=' + iddata3,
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
                $('#selectAddMajor').html(html);
                $('#selectAddMajor').val(iddata2);
            }
        });
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
    });


    $('#btnDel').click(function (e) {
        e.preventDefault();
        $data = selectchb();
        if ($data.length > 0) {
            $.ajax({
                type: "POST",
                url: "../Admin_subject/Delete_Data_ctl",
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

    $(".dropdown-menu.sort a ").click(function () {
        data = $(this).attr('data-1');
        sort = $(this).attr('data-2');
        // alert(limit);
        $.ajax({
            type: 'POST',
            url: "../Admin_subject/Show_Sort_ctl",
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].subject_id + '" id="' + response[i].major_name + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].major_name + i + '">' + response[i].subject_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].subject_name + '</td>' +
                            '<td>(' + response[i].major_id + ') ' + response[i].major_name + '</td>' +
                            '<td><a data="' + response[i].subject_id + '" data2="' + response[i].major_id + '" data3="' + response[i].major_faculty + '" value="' + i + '" class="item-edit">แก้ไข</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    });
    //--------------------------------------------END_BASIC_TOOLS--------------------------------------------//
});