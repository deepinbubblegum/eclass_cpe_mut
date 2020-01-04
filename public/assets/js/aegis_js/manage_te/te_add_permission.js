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

    $('#titleNameTxt').text("จัดการข้อมูลระดับสิทธิ์อาจารย์ผู้ช่วย");
    $('#findByTxt').text("ค้นหาด้วย");
    $('#btnFindTxt').text("ค้นหา");
    $('#saveModalTxt').text("SAVE_MODAL");
    $('#delModalTxt').text("ยืนยันการลบข้อมูล");
    $('#tableTitleTxt').text("จัดการข้อมูลระดับสิทธิ์อาจารย์ผู้ช่วย");
    $('#rowPerPageTxt').text("Rows per page:");

    var btnAddText = 'เพิ่มข้อมูลระดับสิทธิ์อาจารย์ผู้ช่วย';
    var btnEditText = 'แก้ไขข้อมูลระดับสิทธิ์อาจารย์ผู้ช่วย';

    var pagingSize = [10, 25, 50, 100];

    var dropSearchValue = [
        //[VALUE,TEXT]
        ['per_name', 'NAME'],
        ['per_bit', 'BIT'],
        // ['user_email', 'EMAIL'],
        // ['user_major', 'MAJOR'],
        // ['user_permission', 'PERMISSION']
    ];

    //head of table
    var theadGenValue = ['per_id', 'per_name', 'per_bit', 'Option'];

    var formData = ["#per_name"];

    var inModelValue = [
        //['TEXT','ID','NAME','HOLDER']
        ['per_name', 'per_name', 'per_name', 'per_name'],
        // ['user_Tname', 'user_Tname', 'user_Tname', 'user_Tname'],
        // ['user_Ename', 'user_Ename', 'user_Ename', 'user_Ename'],
        // ['user_email', 'user_email', 'user_email', 'user_email']
    ];

    var inModelPermis = [
        ['video', 'video', 'video', 'สื่อสารสนเทศ'],
        ['upload', 'upload', 'upload', 'อัปโหลด'],
        ['download', 'download', 'download', 'ดาวน์โหลด'],
        ['point', 'point', 'point', 'คะแนน'],
        ['Chkvote', 'Chkvote', 'Chkvote', 'โหวต'],
        ['Chkquiz', 'Chkquiz', 'Chkquiz', 'แบบทดสอบ'],
        ['pointR', 'pointR', 'pointR', 'นักศึกษาแลกคะแนน'],
        ['permission', 'permission', 'permission', 'เพิ่มระดับสิทธิ์อาจารย์ผู้ช่วย'],
        ['assist', 'assist', 'assist', 'เพิ่มอาขารย์ผู้ช่วย'],
        ['std', 'std', 'std', 'เพิ่มนักศึกษาในวิชา'],
    ];

    var popData = ["#popupName"];

    var popValue = [
        //[POP_ID,POP_TEXT]
        ['popupName', 'กรุณาระบุชื่อระดับสิทธิ์'],
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
        for (i = 0; i < inModelValue.length; i++) {
            html += '<div class="col-md-5 mb-3" >' +
                '<label>' + inModelValue[i][0] + '</label>' +
                '<input type="text" type="text" id="' + inModelValue[i][1] + '" name="' + inModelValue[i][2] + '" class="form-control" placeholder="' + inModelValue[i][3] + '">' +
                '</div>';
        }
        html += '</div>';
        html += '<div class="form-row" >';
        for (a = 0; a < inModelPermis.length; a++) {
            html += '<div class="col-md-3 mt-2">' +
                '<div class="custom-control custom-checkbox custom-control-inline">' +
                '<input type="checkbox" class="custom-control-input" name="checkper" id="' + inModelPermis[a][1] + '">' +
                '<label class="custom-control-label float-left" for="' + inModelPermis[a][2] + '">' + inModelPermis[a][3] + '</label>' +
                '</div>' +
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
            type: "POST",
            data: '&subject_id=' + subject_id + '&semester=' + semester,
            url: "/" + url[3] + "/Teacher_add_permission/Show_Max_Data_ctl",
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
            url: "/" + url[3] + "/Teacher_add_permission/Show_Data_ctl",
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" data="' + response[i].per_semester + '" data2="' + response[i].per_subject + '" value="' + response[i].per_id + '" id="' + response[i].per_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].per_id + i + '">' + response[i].per_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].per_name + '</td>' +
                            '<td>' + response[i].per_bit + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].per_id + '" data2="' + response[i].per_bit + '" class="item-edit">Edit</a></td>' +
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
            url: "/" + url[3] + "/Teacher_add_permission/Search_Show_Data_ctl",
            data: "&data=" + data + "&search=" + data2,
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" data="' + response[i].per_semester + '" data2="' + response[i].per_subject + '" value="' + response[i].per_id + '" id="' + response[i].per_id + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].per_id + i + '">' + response[i].per_id + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].per_name + '</td>' +
                            '<td>' + response[i].per_bit + '</td>' +
                            '<td><a value="' + i + '" data="' + response[i].per_id + '" data2="' + response[i].per_bit + '" class="item-edit">Edit</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    });

    //--------------------------------------------END_CANT_TOUCH_THIS--------------------------------------------//
    $('#Modal').on('hidden.bs.modal', function() {
        $(formData[0]).val("");
        $('input[name^=checkper]').each(function() {
            $(this).prop('checked', false);
        });
    });


    $('#btnAdd').click(function(e) {
        e.preventDefault();
        iurl = '/' + url[3] + '/Teacher_add_permission/Add_Data_ctl';
        $('#Modal').find('.modal-title').text('เพิ่มข้อมูลระดับสิทธิ์อาจารย์ผู้ช่วย');
        $('#Modal').find('#btnSave').text('เพิ่มข้อมูลระดับสิทธิ์');
        $('#Modal').modal('show');

    });

    $('#showAllData').on('click', '.item-edit', function() {
        iddata = $(this).attr('data');
        bit = $(this).attr('data2');
        ivalue = $(this).attr('value');

        $(formData[0]).val(datatable[ivalue].per_name);
        var per = bit;
        $('input[name^=checkper]').each(function(index) {
            var a = per.substr(index, 1)
            if (a == '1') {
                $(this).prop('checked', true);
            }
        });

        $('#Modal').modal('show');
        $('#Modal').find('.modal-title').text(btnEditText);
        $('#Modal').find('#btnSave').text('แก้ไข้อมูลระดับสิทธิ์');

        iurl = '/' + url[3] + '/Teacher_add_permission/Edit_Data_ctl';
    });

    $('#btnSave').click(function(e) {
        e.preventDefault();
        var permis = '';
        var result = '';
        var check = '';

        $('input[name^=checkper]').each(function() {
            if ($(this).prop("checked") == true) {
                permis += '1'
            } else if ($(this).prop("checked") == false) {
                permis += '0'
            }
        });

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
            data = $('#per_name').val();
            if (iurl == '/' + url[3] + '/Teacher_add_permission/Add_Data_ctl') {
                txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
            } else {
                txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
            }
            $.ajax({
                type: "POST",
                url: iurl,
                data: '&namepermis=' + data + '&bit=' + permis + '&subject_id=' + subject_id + '&semester=' + semester + '&id=' + iddata,
                success: function(response) {
                    formDataValClr();
                    show_data();
                    if (iurl != '/' + url[3] + '/Teacher_add_permission/Add_Data_ctl') {
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
        //$semester = selectchb_semes();
        //$subject_id = selectchb_sub();
        if ($data.length > 0) {
            $.ajax({
                type: "POST",
                url: '/' + url[3] + '/Teacher_add_permission/Delete_Data_ctl',
                data: { $data, subject_id, semester },
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

    function selectchb_semes() {
        var item = [];
        $('input[name^=checkitem]:checked').each(function() {
            item.push($(this).attr('data'));
        });
        return item;
    }

    function selectchb_sub() {
        var item = [];
        $('input[name^=checkitem]:checked').each(function() {
            item.push($(this).attr('data2'));
        });
        return item;
    }

});