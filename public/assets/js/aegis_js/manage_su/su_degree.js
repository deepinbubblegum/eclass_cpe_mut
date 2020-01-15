$(document).ready(function () {
    var iddata;
    var iurl;
    var datatable;
    var txtsnack;

    var limit = 10;
    var start = 0;
    var currentPage = 1;

    //--------------------------------------------START_FUNCTION_GEN--------------------------------------------//
    $('#titleNameTxt').text("จัดการข้อมูลระดับอาจารย์");
    $('#findByTxt').text("ค้นหาด้วย");
    $('#btnFindTxt').text("ค้นหา");
    $('#saveModalTxt').text("SAVE_MODAL");
    $('#delModalTxt').text("ยืนยันการลบข้อมูล");
    $('#tableTitleTxt').text("จัดการข้อมูลระดับอาจารย์");
    $('#rowPerPageTxt').text("Rows per page:");

    var btnAddText = 'เพิ่มข้อมูลระดับอาจารย์';
    var btnEditText = 'แก้ไขข้อมูลระดับอาจารย์';

    var dropSearchValue = [
        //[VALUE,TEXT]
        ['de_grade', 'ระดับอาจารย์'],
        ['de_Tname', 'ชื่อระดับอาจารย์ภาษาไทย'],
        ['de_Ename', 'ชื่อระดับอาจารย์ภาษาอังกฤษ']
    ];

    var theadGenValue = ['Grade', 'Degree TName', 'Degree EName', 'Option'];

    inModelValue = [
        //['TEXT','ID','NAME','HOLDER']
        ['Grade', 'Grade', 'Grade', 'Grade'],
        ['Degree TName', 'Degree_TName', 'Degree_TName', 'Thai NAME'],
        ['Degree EName', 'Degree_EName', 'Degree_EName', 'English NAME']
    ];

    var formData = ["#Grade", "#Degree_TName", "#Degree_EName"];

    var popData = ["#popupID", "#popupTName", "#popupEName"];

    var popValue = [
        //[POP_ID,POP_TEXT]
        ['popupID', 'กรุณาระบุระดับอาจารย์ให้ถูกต้อง'],
        ['popupTName', 'กรุณาระบุชื่อระดับอาจารย์(TH)'],
        ['popupEName', 'กรุณาระบุชื่อระดับอาจารย์(EN)']
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

    //---------------------------------------------END_FUNCTION_GEN---------------------------------------------//

    inModelGen();

    dropSearch();
    theadGen();
    show_data();

    popGen();
    hideAllPop();

    //--------------------------------------------START_CANT_TOUCH_THIS--------------------------------------------//

    function show_data() {
        $.ajax({
            url: "../Admin_degree/Show_Data_ctl",
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].de_id + '" id="' + response[i].de_Ename + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].de_Ename + i + '"> ' + response[i].de_grade + ' </label>' +
                            '</div>' +
                            '</th>' +
                            '<td> ' + response[i].de_Tname + ' </td>' +
                            '<td> ' + response[i].de_Ename + ' </td>' +
                            '<td><a value="' + i + '" data="' + response[i].de_id + '" class="item-edit" >Edit</a></td>' +
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
            url: "../Admin_degree/Search_Show_Data_ctl",
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].de_id + '" id="' + response[i].de_Ename + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].de_Ename + i + '"> ' + response[i].de_grade + ' </label>' +
                            '</div>' +
                            '</th>' +
                            '<td> ' + response[i].de_Tname + ' </td>' +
                            '<td> ' + response[i].de_Ename + ' </td>' +
                            '<td><a value="' + i + '" data="' + response[i].de_id + '" class="item-edit" >Edit</a></td>' +
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
        iurl = '../Admin_degree/Add_Data_ctl';
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

        $(formData[0]).val(datatable[ivalue].de_grade);
        $(formData[1]).val(datatable[ivalue].de_Tname);
        $(formData[2]).val(datatable[ivalue].de_Ename);


        $('#Modal').modal('show');
        $('#Modal').find('.modal-title').text(btnEditText);

        iurl = '../Admin_degree/Edit_Data_ctl';
    });

    $('#btnSave').click(function (e) {
        var result = '';
        var check = '';
        var FormData = '';

        for (i = 0; i < $(formData).length; i++) {
            if ($(formData[i]).val() == '') {
                $(popData[i]).show();
            } else if (i == 0 && $.isNumeric($(formData[0]).val()) == false) {
                $(popData[0]).show();
            } else {
                $(popData[i]).hide();
                result += i;
            }
            check += i;
        }

        console.log(result, check);
        if (check == result) {
            e.preventDefault();
            FormData = $('#formAdd').find('input:text').each(function(){
                $(this).val($.trim($(this).val()));
            });
            data = FormData.serialize();
            
            if (iurl == '../Admin_degree/Add_Data_ctl') {
                txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';

            } else {
                txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
                data += '&org_id=' + iddata;
                $('#Modal').modal('hide');
            }

            $.ajax({
                type: "POST",
                url: iurl,
                data: data,
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
                url: "../Admin_degree/Delete_Data_ctl",
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