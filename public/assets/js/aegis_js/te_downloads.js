$(document).ready(function () {


    /******************************* highlight Navbar ************************************* */
    var Navbar_Side_highlight = ['side_Anc', 'side_score', 'side_uploads', "side_downloads", "side_media", "side_quiz", "side_vote", "side_pointRequest", "side_add_permission", "side_add_teacher_assist", "side_add_student"];
    for (z = 0; z < Navbar_Side_highlight.length; z++) {
        var elementRemove = document.getElementById(Navbar_Side_highlight[z]);
        elementRemove.classList.remove("bg-primary-light");
    }

    var Navbar_highlight = ['Anc', 'score', 'uploads', "downloads", "media", "quiz", "vote", "pointRequest", "add_permission", "add_teacher_assist", "add_student"];
    for (y = 0; y < Navbar_highlight.length; y++) {
        var elementRemove = document.getElementById(Navbar_highlight[y]);
        elementRemove.classList.remove("bg-primary-light");
    }

    // $('#score').classList.add(".bg-primary");
    var element = document.getElementById("downloads");
    element.classList.add("bg-primary-light");
    var element = document.getElementById("side_downloads");
    element.classList.add("bg-primary-light");
    /******************************************************************** */


    year = semester.substr(0, 4);
    part = semester.substr(4, 1);
    $('#header').text('งานที่มอบหมาย : ' + subject_id + ' - ' + year + '/' + part);


    var url = $(location).attr('href').split("/");
    console.log('te_download');
    $('input[name^="pickdatelabel"]').pickdate({
        cancel: 'Clear',
        closeOnCancel: true,
        // containerHidden: 'body',
        format: 'yyyy-mm-dd',
        formatSubmit: 'yyyy-mm-dd',
        selectMonths: true,
        selectYears: true,
    });
    $('.clockpicker').clockpicker();

    $('#summernote').summernote({
        dialogsInBody: true,
        codeviewFilter: false,
        codeviewIframeFilter: true,
        placeholder: 'รายละเอียดเมนู อัปโหลด',
        tabsize: 1,
        height: 200,
        toolbar: [
            ['style', ['style']],
            // ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            // ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ]
    });

    $('#summernote').summernote('code', '');

    var formData = ["#CMenudownload", "#datePick", "#timePick"];

    var popData = ["#popupHead", "#popupDate", "#popupTime"];

    var popValue = [
        //[POP_ID,POP_TEXT]
        ['popupHead', 'กรุณาระบุชื่อเมนูอัปโหลด'],
        ['popupDate', 'กรุณาระบุชื่อวันส่ง'],
        ['popupTime', 'กรุณาระบุชื่อเวลา']
    ];

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

    popGen();
    hideAllPop();


    $('#Modal_Add').click(function (e) {
        e.preventDefault();
        $('#summernote').summernote('code', '');
        $('#CMenudownload').val('');
        $('#datePick').val('');
        $('#timePick').val('')
    });

    function file_ico(type) {
        html_ico = '';
        type = type.split("/");
        switch (type[0]) {
            case 'application':
                switch (type[1]) {
                    case 'msword':
                        html_ico = '<i class="fas fa-file-word"></i>';
                        break;
                    case 'vnd.ms-powerpoint':
                        html_ico = '<i class="fas fa-file-powerpoint"></i>';
                    case 'vnd.ms-excel':
                        html_ico = '<i class="fas fa-file-csv"></i>';
                        break;
                    case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                        html_ico = '<i class="fas fa-file-excel"></i>';
                        break;
                    case 'pdf':
                        html_ico = '<i class="fas fa-file-pdf"></i>';
                        break;
                    case 'zip':
                    case 'x-tar':
                    case 'x-rar-compressed':
                    case 'x-7z-compressed':
                    case 'x-zip-compressed':
                    case 'x-ace-compressed':
                        html_ico = '<i class="fas fa-file-archive"></i>';
                        break;
                    default:
                        html_ico = '<i class="fas fa-file"></i>';
                        break;
                }
                break;
            case 'text':
                switch (type[1]) {
                    case 'csv':
                        html_ico = '<i class="fas fa-file-csv"></i>';
                        break;
                    default:
                        html_ico = '<i class="fas fa-file-alt"></i>';
                        break;
                }
                break;
            case 'video':
                html_ico = '<i class="far fa-file-video"></i>';
                break;
            case 'image':
                html_ico = '<i class="fas fa-file-image"></i>';
                break;
            case 'audio':
                html_ico = '<i class="fas fa-file-audio"></i>';
                break;
            default:
                html_ico = '<i class="far fa-file"></i>';
                break;
        }
        return html_ico;
    }

    function fileSizeCal(inputFileSize) {
        //console.log(inputFileSize);
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

    showMenuDownload();

    var getData, getMenu;

    function showMenuDownload() {
        $.ajax({
            url: '/' + url[3] + '/Te_download/showMenuDownload/' + subject_id + '-' + semester,
            dataType: "json",
            success: function (response) {
                getMenu = response;
                console.log(response);
                var html = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<div class="expansion-panel list-group-item" >' +
                            '<a aria-controls="collapse' + i + '" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapse' + i + '" id="heading' + i + '">' +
                            response[i].menuUpName +
                            '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                            '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                            '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                            '</div>' +
                            '</a>' +
                            '<div aria-labelledby="heading' + i + '" class="collapse" data-parent="#accordionOne" id="collapse' + i + '">' +
                            '<div class="expansion-panel-body">' +
                            /* --------BTN-------- */
                            //'<span style="font-size: 1.7em;"><a href="/Te_select/scoreTable/' + subject_id + '-' + semester + '-' + response[i].menuUpId + '" id="showInMenu-' + response[i].menuUpId + '" href="#" class="f34r-txt-black"><i class="fas fa-star"></a></i></span>&nbsp;' +
                            '<span style="font-size: 1.7em;"><a id="allDownload-' + response[i].menuUpId + '" href="/Te_download/dowZip/' + subject_id + '-' + semester + '-' + response[i].menuUpId + '" class="f34r-txt-black"><i class="fas fa-download"></a></i></span>&nbsp;' +
                            //'<span style="font-size: 1.7em;"><a id="impInMenu-' + response[i].menuUpId + '" href="#" class="f34r-txt-black"><i class="fas fa-file-import"></a></i></span>&nbsp;' +
                            //'<span style="font-size: 1.7em;"><a id="expInMenu-' + response[i].menuUpId + '" href="#" class="f34r-txt-black"><i class="fas fa-file-export"></a></i></span>&nbsp;' +
                            '<span style="font-size: 1.7em;"><a id="delMenu-' + response[i].menuUpId + '" href="#" class="f34r-txt-black"><i class="fas fa-trash-alt"></a></i></span>&nbsp;' +
                            '<span style="font-size: 1.7em;"><a id="editMenu-' + response[i].menuUpId + '" href="#" class="f34r-txt-black"><i class="fas fa-edit"></a></i></span>&nbsp;' +
                            /* --------BTN-------- */
                            '<br>' +
                            response[i].menuUpDescripition +
                            '<div id="menuUpId-' + response[i].menuUpId + '">' +
                            '<li href="#" class="list-group-item d-flex justify-content-between align-items-center list-group-item-action mb-2 mt-2">' +
                            '<span class="mr-2 mb-0" style="font-size: 28px;">' +
                            '<i class="fas fa-file-download"></i>' +
                            '<span class="mr-2 text-black" style="font-size: 18px;">ทดสอบ</span>' +
                            '<div class="mt-0">' +
                            '<small class="mr-2 text-black-50" style="font-size: 12px;">size : 20GB</small>' +
                            '<small class="mr-2 text-black-50" style="font-size: 12px;">type : pdf</small>' +
                            '</div>' +
                            '</span>' +
                            '<span>' +
                            '<button class="btn btn-float btn-info my-1"><i class="fas fa-download"></i></button>' +
                            '</span>' +
                            '</li>' +
                            '</div>' +
                            '</div>' +

                            '<div class="navdrawer-divider"></div>' +
                            '<div class="d-flex text-muted">' +
                            '<div class="p-2"> <small>ประกาศเมื่อ : ' + response[i].menuUpTimeStart + '</small> </div>' +
                            '<div class="ml-auto p-2"> <small> กำหนดส่ง : ' + response[i].menuUpTimeEnd + '</small> </div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +

                            '</div>' +
                            '</div>';
                    }
                }
                $('.showMenuDownload').html(html);
                for (i = 0; i < getMenu.length; i++) {
                    show_data(i);
                }
                $.each(getMenu, function (i, p) {
                    //$('#showInMenu-' + getMenu[i].menuUpId).click(function(e) {}); use da href
                    // $('#impInMenu-' + getMenu[i].menuUpId).click(function(e) {});
                    // $('#expInMenu-' + getMenu[i].menuUpId).click(function(e) {});
                    $('#delMenu-' + getMenu[i].menuUpId).click(function (e) {
                        delPid = getMenu[i].menuUpId;
                        $("#txtDel").text('Menu:' + getMenu[i].menuUpName);
                        $("#ModalDelete").modal('show');
                    });
                    $('#editMenu-' + getMenu[i].menuUpId).click(function (e) {
                        console.log('editMenu');
                        e.preventDefault();
                        //console.log(getMenu[i]);
                        $('#CMenudownload').val(getMenu[i].menuUpName);
                        splitData = getMenu[i].menuUpTimeEnd.split(" ");
                        console.log(splitData)
                        $('#datePick').val(splitData[0]);
                        splitTime = splitData[1].split(':');
                        $('#timePick').val(splitTime[0] + ':' + splitTime[1]);
                        // $('#discription_menu').val(getMenu[i].menuUpDescripition);
                        $('#summernote').summernote('code', getMenu[i].menuUpDescripition);
                        $('#btnModalSave').text('ยืนยันการแก้ไข');
                        $('#addMenudownloadLabel').text('แก้ไขเมนู');
                        $('#addMenudownload').modal('show');
                        menuUpdate = 'UPDATE';
                        editMenuId = getMenu[i].menuUpId;
                    });
                });
            }
        });
    }

    var delPid;
    $('#Delete').click(function (e) {
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Te_download/delMenu',
            data: '&semester=' + semester + '&subject=' + subject_id + '&menuID=' + delPid,
            success: function () {
                // console.log('Deleted Successfully');
                showMenuDownload();
            }
        });
        delPid = '';

        $("#ModalDelete").modal('hide');
    });

    var editMenuId;
    var menuUpdate = 0;
    $('#btnModalSave').click(function (e) {
        e.preventDefault();
        namemenu = $('#CMenudownload').val();
        date = $('#datePick').val();
        time = $('#timePick').val() + ':00';
        // discrip = $('#discription_menu').val();
        discrip = $('#summernote').summernote('code');
        if (menuUpdate == 'UPDATE') {
            iurl = "/" + url[3] + "/Te_download/editMenu";
        } else {
            iurl = '/' + url[3] + '/Te_download/create_menu';
        }

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

            var form_data = new FormData();
            form_data.append('namemenu', namemenu);
            form_data.append('date', date);
            form_data.append('time', time);
            form_data.append('discrip', discrip);
            form_data.append('subject_id', subject_id);
            form_data.append('semester', semester);
            form_data.append('editId', editMenuId);

            $.ajax({
                type: "POST",
                url: iurl,
                // data: "&namemenu=" + namemenu + "&date=" + date + "&time=" + time + "&discrip=" + discrip + "&subject_id=" + subject_id + "&semester=" + semester + "&editId=" + editMenuId,
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                success: function (response) {
                    showMenuDownload();
                    $('#CMenudownload').val('');
                    $('#datePick').val('');
                    $('#timePick').val('')
                    // $('#discription_menu').val('');
                    $('#summernote').summernote('code', '');
                    $('#addMenudownload').modal('hide');
                    $('#addMenudownloadLabel').text('เพิ่มเมนูอัปโหลด');
                    for (i = 0; i < $(formData).length; i++) {
                        $(popData[i]).hide();
                    }
                    menuUpdate = 0;
                }
            });
        }
    });

    function show_data(popUp) {
        $.ajax({
            url: '/' + url[3] + '/Te_download/showDownloadList/' + subject_id + '-' + semester + '-' + getMenu[popUp].menuUpId,
            dataType: "json",
            success: function (response) {
                getData = response;
                var html = "";
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<li href="#" class="list-group-item d-flex flex-wrap justify-content-between align-items-center list-group-item-action mb-2 mt-2" id="UploadedFile' + i + '">' +
                            '<span class="mr-2 mb-0" style="font-size: 28px;">' + file_ico(response[i].fileType) +
                            '<span class="mr-2 text-black" style="font-size: 18px;"> ' + response[i].fileName + '</span>' +
                            '<div class="mt-0">' +
                            '<small class="mr-2 text-black-50" style="font-size: 12px;"> Size : ' + fileSizeCal(response[i].fileSize) + '</small>' +
                            '<small class="mr-2 text-black-50" style="font-size: 12px;"> Type : ' + response[i].fileType + '</small>' +
                            '<small class="mr-2 text-black-50" style="font-size: 12px;"> Uploaded on : ' + response[i].fileTimestamp + '</small>' +
                            '</div>' +
                            '</span>' +
                            '<span>' +
                            '<!-- <button class="btn btn-float btn-danger my-1"><i class="far fa-trash-alt"></i></button>' +
                            '<button class="btn btn-float btn-success my-1"><i class="fas fa-check"></i></button>' +
                            '<button class="btn btn-float btn-danger my-1"><i class="fas fa-undo-alt"></i></button> -->' +
                            '</span>' +
                            '<span>' +
                            '<a class="btn btn-success btn-block mr-1 ml-1 mt-1" href="/Te_download/download/' + subject_id + '-' + semester + '-' + getMenu[popUp].menuUpId + '-' + response[i].fileName + '">download</a>' +
                            //'<a class="btn btn-danger btn-block mr-1 ml-1 mt-1" id="" href="/Te_download/delete/' + subject_id + '-' + semester + '-' + getMenu[popUp].menuUpId + '-' + response[i].fileName + '">delete</a>' +
                            '<a class="btn btn-block btn-danger mr-1" id="DelFile-' + getMenu[popUp].menuUpId + '-' + i + '" href="#">delete</a>' +
                            '</span>' +
                            '</li>';
                    }
                }
                $('#menuUpId-' + getMenu[popUp].menuUpId).html(html);

                $.each(response, function (i, v) {
                    $('#DelFile-' + getMenu[popUp].menuUpId + '-' + i).click(function (e) {
                        DelUrl = '/' + url[3] + '/Te_download/delete/' + subject_id + '-' + semester + '-' + getMenu[popUp].menuUpId + '-' + response[i].fileName;
                        thisButton = '#DelFile-' + getMenu[popUp].menuUpId + '-' + i;
                        $('#txtDelFile').text(response[i].fileName);
                        $("#ModalDeleteFile").modal('show');
                    });
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
    }

    thisButton = '';
    $('#DeleteFile').click(function () {
        delFile(DelUrl);
    });
    returnTxt = 'ลบสำเร็จ';

    function delFile(DelUrl) {
        $.ajax({
            url: DelUrl,
            dataType: "json",
            success: function (response) {
                console.log(DelUrl);
                var RemoveFile = DelUrl.split('-')[3];
                console.log(RemoveFile)
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: returnTxt
                });
                $(thisButton).parent().parent().remove();
            },
            error: function (response) {
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: returnTxt
                });
                $(thisButton).parent().parent().remove();
            },
        });
        $("#ModalDeleteFile").modal('hide');
    }

    $('#btnModalClose').click(function (e) {
        $('#CMenudownload').val('');
        $('#datePick').val('');
        $('#timePick').val('')
        $('#discription_menu').val('');
        $('#addMenudownloadLabel').text('เพิ่มเมนูอัปโหลด');
        for (i = 0; i < $(formData).length; i++) {
            $(popData[i]).hide();
        }
        menuUpdate = 0;
    });

    $('#IconClose').click(function (e) {
        $('#CMenudownload').val('');
        $('#datePick').val('');
        $('#timePick').val('')
        $('#discription_menu').val('');
        $('#addMenudownloadLabel').text('เพิ่มเมนูอัปโหลด');
        for (i = 0; i < $(formData).length; i++) {
            $(popData[i]).hide();
        }
        menuUpdate = 0;
    });


});