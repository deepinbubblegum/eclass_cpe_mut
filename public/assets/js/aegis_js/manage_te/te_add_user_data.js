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

    $('#titleNameTxt').text("จัดการข้อมูลนักศึกษา");
    $('#findByTxt').text("ค้นหาด้วย");
    $('#btnFindTxt').text("ค้นหา");
    $('#saveModalTxt').text("SAVE_MODAL");
    $('#delModalTxt').text("ยืนยันการลบข้อมูล");
    $('#tableTitleTxt').text("จัดการข้อมูลนักศึกษา");
    $('#rowPerPageTxt').text("Rows per page:");

    var btnAddText = 'เพิ่มข้อมูลสาขา';
    var btnEditText = 'แก้ไขข้อมูลสาขา';

    var pagingSize = [10, 25, 50, 100];

    var dropSearchValue = [
        //[VALUE,TEXT]
        ['substd_stdid', 'รหัสนักศึกษา'],
        ['std_Tname', 'ชื่อนักศึกษา(TH)'],
        ['std_Ename', 'ชื่อนักศึกษา(EN)'],
        ['substd_sec', 'SEC'],
        // ['std_email', 'EMAIL'],
        // ['std_major', 'MAJOR'],
        // ['std_permission', 'PERMISSION']
    ];

    //head of table
    var theadGenValue = ['รหัสนักศึกษา', 'ชื่อนักศึกษา(TH)', 'ชื่อนักศึกษา(EN)', "SEC"];

    var formData = ["#substd_stdid", "#std_Tname", "#std_Ename", "#substd_sec"];

    var inModelValue = [
        //['TEXT','ID','NAME','HOLDER']
        ['รหัสนักศึกษา', 'substd_stdid', 'substd_stdid', 'รหัสนักศึกษา'],
        ['SEC', 'substd_sec', 'substd_sec', 'SEC'],
        // ['std_Tname', 'std_Tname', 'std_Tname', 'std_Tname'],
        // ['std_Ename', 'std_Ename', 'std_Ename', 'std_Ename'],
        // ['std_email', 'std_email', 'std_email', 'std_email']
    ];

    var popData = ["#popupID", "#popupTname", "#popupEname", "#popupSec"];

    var popValue = [
        //[POP_ID,POP_TEXT]
        ['popupID', 'กรุณาระบุไอดี'],
        ['popupTname', 'กรุณาระบุชื่อ'],
        ['popupEname', 'กรุณาระบุไอดี'],
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
            url: "/" + url[3] + "/Teacher_add_student/Show_Max_Data_ctl",
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
            url: "/" + url[3] + "/Teacher_add_student/Show_Data_ctl",
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].substd_stdid + '" id="' + response[i].substd_stdid + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].substd_stdid + i + '">' + response[i].substd_stdid + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].std_Tname + '</td>' +
                            '<td>' + response[i].std_Ename + '</td>' +
                            '<td>' + response[i].substd_sec + '</td>' +
                            // '<td>' + response[i].std_email + '</td>' +
                            // '<td>' + response[i].major_name + '</td>' +
                            // '<td>' + response[i].permission_name + '</td>' +
                            // '<td><a value="' + i + '" data="' + response[i].substd_stdid + '" class="item-edit">Edit</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    }
    //--------------------------------------------END_CANT_TOUCH_THIS--------------------------------------------//

    //--------------------------------------------START_BASIC_TOOLS--------------------------------------------//

    $("#inputFile").on("change", function() {
        html = '';
        _files = $(this)[0].files;
        // var _listFileName = "";
        // if (_files.length > 0) {
        //     var _fileName = [];
        //     $.each(_files, function(k, v) {
        //         _fileName[k] = v.name;
        //         console.log(_fileName[k])
        //     });
        //     _listFileName = _fileName.join(",");
        // }

        // $.ajax({
        //     url: "../Admin_permission/Show_Data_ctl",
        //     dataType: "json",
        //     success: function(response) {
        //         var html = '';
        //         var i;
        //         if (response != null) {
        //             for (i = 0; i < response.length; i++) {
        //                 html += '<option value="' + response[i].permission_id + '">' + response[i].permission_name + '</option>';
        //             }
        //         }
        //         $('#permissionSelectAddcsv').html(html);
        //     }
        // });

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

    $('#btnUpload').click(function(e) {
        e.preventDefault();
        // $permiss = $("#permissionSelectAddcsv :selected").val();
        var snacktxt = '';
        var form_data = new FormData();
        form_data.append('file', _files[0]);
        form_data.append('subject_id', subject_id);
        form_data.append('semester', semester);
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                html = '';
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        console.log(percentComplete);
                        html = '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: ' + percentComplete + '%">' + percentComplete + '%</div>';
                        if (percentComplete === 100) {
                            html = '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: ' + percentComplete + '%">Complete</div>';
                            setTimeout(function() {
                                $('#Modalcsv').modal('hide');
                            }, 1200);
                        }
                        $('#progressupload').html(html);
                    }
                }, false);

                return xhr;
            },
            type: "POST",
            url: '/' + url[3] + '/Teacher_add_student/Add_Data_ctl_csv',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function(response) {
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
            error: function(response) {
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

    $('#btnAdd').click(function(e) {
        e.preventDefault();
        iurl = '/' + url[3] + '/Teacher_add_student/Add_Data_ctl';
        $('#Modal').find('.modal-title').text('เพิ่มข้อมูลผู้ใช้งาน');
        $('#Modal').find('#btnSave').text('เพิ่มข้อมูลผู้ใช้งาน');
        $('#Modal').modal('show');
        // $.ajax({
        //     url: "/"+ url[3] + "/Teacher_add_student/Show_Data_ctl",
        //     dataType: "json",
        //     success: function(response) {
        //         var html = '';
        //         var i;
        //         if (response != null) {
        //             for (i = 0; i < response.length; i++) {
        //                 html += '<option value="' + response[i].major_id + '">' + response[i].major_name + '</option>';
        //             }
        //         }
        //         $('#majorSelectAdd').html(html);
        //     }
        // });
        // $.ajax({
        //     url: "/"+ url[3] + "/Teacher_add_student/Show_Data_ctl",
        //     dataType: "json",
        //     success: function(response) {
        //         var html = '';
        //         var i;
        //         if (response != null) {
        //             for (i = 0; i < response.length; i++) {
        //                 html += '<option value="' + response[i].permission_id + '">' + response[i].permission_name + '</option>';
        //             }
        //         }
        //         $('#permissionSelectAdd').html(html);
        //     }
        // });
    });

    $('#btnAddcsv').click(function(e) {
        e.preventDefault();
        $('#Modalcsv').modal('show');
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
            if (iurl == '/' + url[3] + '/Teacher_add_student/Add_Data_ctl') {
                txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
            } else {
                txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
                txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
            }
            data = $('#formAdd').serialize();
            // data2 = $("#majorSelectAdd :selected").val();
            // data3 = $("#permissionSelectAdd :selected").val();
            $.ajax({
                type: "POST",
                url: iurl,
                data: data + '&subject_id=' + subject_id + '&semester=' + semester,
                success: function(response) {
                    document.getElementById('substd_stdid').value = "";
                    formDataValClr();
                    show_data();
                    if (iurl != '/' + url[3] + '/Teacher_add_student/Add_Data_ctl') {
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

    $('#showAllData').on('click', '.item-edit', function() {
        iddata = $(this).attr('data');
        ivalue = $(this).attr('value');
        $('#substd_stdid').val(datatable[ivalue].substd_stdid);
        $('#std_Tname').val(datatable[ivalue].std_Tname);
        $('#std_Ename').val(datatable[ivalue].std_Ename);
        $('#std_email').val(datatable[ivalue].std_email);
        $('#Modal').modal('show');
        $('#Modal').find('.modal-title').text('แก้ไขข้อมูลผู้ใช้งาน');
        $('#Modal').find('#btnSave').text('แก้ไขข้อมูลผู้ใช้งาน');
        iurl = '/' + url[3] + '/Teacher_add_student/Edit_Data_ctl';
        $.ajax({
            url: "/" + url[3] + "/Teacher_add_student/Show_Data_ctl",
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].major_id + '">' + response[i].major_name + '</option>';
                    }
                }
                $('#majorSelectAdd').html(html);
                // alert(datatable[ivalue].faculty_id);
                $('#majorSelectAdd').val(datatable[ivalue].major_id);
            }
        });
        $.ajax({
            url: "/" + url[3] + "/Teacher_add_student/Show_Data_ctl",
            dataType: "json",
            success: function(response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].permission_id + '">' + response[i].permission_name + '</option>';
                    }
                }
                $('#permissionSelectAdd').html(html);
                // alert(datatable[ivalue].faculty_id);
                $('#permissionSelectAdd').val(datatable[ivalue].permission_id);
            }
        });
    });

    $('#btnClose').click(function(e) {
        formDataValClr();
        document.getElementById('majorSelectAdd').value = datatable[0].major_id;
        document.getElementById('permissionSelectAdd').value = datatable[0].permission_id;
        hideAllPop();
    });

    $('#btnSearch').click(function(e) {
        e.preventDefault();
        data = $('#SearchName').val();
        data2 = $('#select_search').val();
        $.ajax({
            type: "POST",
            url: "/" + url[3] + "/Teacher_add_student/Search_Show_Data_ctl",
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
                            '<input type="checkbox" name="checkitem" class="custom-control-input" value="' + response[i].substd_stdid + '" id="' + response[i].substd_stdid + i + '">' +
                            '<label class="custom-control-label" for="' + response[i].substd_stdid + i + '">' + response[i].substd_stdid + '</label>' +
                            '</div>' +
                            '</th>' +
                            '<td>' + response[i].std_Tname + '</td>' +
                            '<td>' + response[i].std_Ename + '</td>' +
                            '<td>' + response[i].substd_sec + '</td>' +
                            // '<td>' + response[i].std_email + '</td>' +
                            // '<td>' + response[i].major_name + '</td>' +
                            // '<td>' + response[i].permission_name + '</td>' +
                            // '<td><a value="' + i + '" data="' + response[i].substd_stdid + '" class="item-edit">Edit</a></td>' +
                            '</tr>';
                    }
                }
                $('#showAllData').html(html);
            }
        });
    });

    $('#btnDel').click(function(e) {
        e.preventDefault();
        _deldata = selectchb();
        var subject = [subject_id];
        var semes = [semester];
        console.log(_deldata);
        if (_deldata.length > 0) {
            $.ajax({
                type: "POST",
                url: "/" + url[3] + "/Teacher_add_student/Delete_Data_ctl",
                data: {
                    _deldata,
                    subject,
                    semes
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