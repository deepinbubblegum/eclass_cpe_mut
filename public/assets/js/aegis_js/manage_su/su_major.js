$(document).ready(function() {
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
    $('#titleNameTxt').text("จัดการข้อมูลสาขา");
    $('#findByTxt').text("ค้นหาด้วย");
    $('#btnFindTxt').text("ค้นหา");
    $('#saveModalTxt').text("SAVE_MODAL");
    $('#delModalTxt').text("ยืนยันการลบข้อมูล");
    $('#tableTitleTxt').text("จัดการข้อมูลสาขา");
    $('#rowPerPageTxt').text("Rows per page:");

    var btnAddText = 'เพิ่มข้อมูลสาขา';
    var btnEditText = 'แก้ไขข้อมูลสาขา';

    var pagingSize = [10, 25, 50, 100];

    var dropSearchValue = [
        //[VALUE,TEXT]
        ['major_id', 'รหัสสาขา'],
        ['major_name', 'ชื่อสาขา'],
        ['faculty_name', 'คณะ']
    ];

    //head of table
    var theadGenValue = ['Major ID', 'Major Name', 'Faculty', 'Option'];

    var inModelValue = [
        //['TEXT','ID','NAME','HOLDER']
        ['major ID', 'major_ID', 'major_ID', 'ID'],
        ['major Name', 'major_Name', 'major_Name', 'NAME']
    ];

    var formData = ["#major_ID", "#major_Name"];



    var popData = ["#popupID", "#popupName"];

    var popValue = [
        //[POP_ID,POP_TEXT]
        ['popupID', 'กรุณาระบุรหัสสาขา'],
        ['popupName', 'กรุณาระบุชื่อสาขา']
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
            '<label>Faculty</label>' +
            '<select id="selectAdd" class="form-control"></select>' +
            '</div>';
        html += '</div>';

        $('#inModelBody').html(html);
        $.ajax({
            url: "../Admin_faculty/Show_Data_ctl",
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].faculty_id + '">' + response[i].faculty_name + '</option>';
                    }
                }
                $('#selectAdd').html(html);
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
    function show_data() {
        $.ajax({
            url: "../Admin_major/Show_Max_Data_ctl",
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
            url: "../Admin_major/Show_Data_ctl",
            dataType: "json",
            success: function(response) {
                datatable = response;
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<tr>' +
                            '<th>' +
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].major_id + '" id="' + response[i].faculty_name + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].faculty_name + i + '">' + response[i].major_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].major_name + '</td>' +
                            '<td>' + response[i].faculty_name + '</td>' +
                            '<td><a data="' + response[i].major_id + '" value="' + i + '" class="item-edit">Edit</a></td>' +
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
            url: "../Admin_major/Search_Show_Data_ctl",
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
                            '<div class="custom-control custom-checkbox">' +
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].major_id + '" id="' + response[i].faculty_name + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].faculty_name + i + '">' + response[i].major_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].major_name + '</td>' +
                            '<td>' + response[i].faculty_name + '</td>' +
                            '<td><a data="' + response[i].major_id + '" class="item-edit">Edit</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    });

    //--------------------------------------------END_CANT_TOUCH_THIS--------------------------------------------//

    //--------------------------------------------START_BASIC_TOOLS--------------------------------------------//
    $(document).keyup(function(e) {
        if ($('#Modal').is(':visible') == true) {
            if (e.keyCode === 13) $('#btnSave').click(); // enter
            if (e.keyCode === 27) $('#btnClose').click(); // esc
            console.log('Some Key Pressed');
        }
    });

    $('#btnAdd').click(function(e) {
        e.preventDefault();
        iurl = '../Admin_major/Add_Data_ctl';

        $('#Modal').find('.modal-title').text(btnAddText);
        $('#Modal').modal('show');

    });

    $('#btnClose').click(function(e) {
        formDataValClr();
        hideAllPop();
        $('#selectAdd').val(datatable[0].faculty_id);
    });

    $('#showAllData').on('click', '.item-edit', function() {
        iddata = $(this).attr('data');
        ivalue = $(this).attr('value');
        console.log('1' + iddata);
        $('#major_ID').val(datatable[ivalue].major_id);
        $('#major_Name').val(datatable[ivalue].major_name);
        $('#selectAdd').val(datatable[ivalue].faculty_id);

        $('#Modal').modal('show');
        $('#Modal').find('.modal-title').text(btnEditText);

        iurl = '../Admin_major/Edit_Data_ctl';
    });

    $('#btnSave').click(function(e) {
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

            // data = $('#formAdd').serialize();
            major_ID = $.trim($('#major_ID').val());
            major_Name = $.trim($('#major_Name').val());
            data2 = $("#selectAdd :selected").val();

            if (iurl == '../Admin_major/Add_Data_ctl') {
                txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
            } else {
                txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
                $('#Modal').modal('hide');
            }

            $.ajax({
                type: "POST",
                url: iurl,
                data: '&major_ID='+ major_ID + '&major_Name=' + major_Name + '&faculty_id=' + data2 + '&org_id=' + iddata,
                success: function(response) {
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
        }
    });

    $('#btnDel').click(function(e) {
        e.preventDefault();
        $data = selectchb();
        if ($data.length > 0) {
            $.ajax({
                type: "POST",
                url: "../Admin_major/Delete_Data_ctl",
                data: {
                    $data
                },
                success: function(response) {
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
    //--------------------------------------------END_BASIC_TOOLS--------------------------------------------//
});