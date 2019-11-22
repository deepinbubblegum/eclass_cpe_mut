$(document).ready(function () {
    var url = $(location).attr('href').split("/");

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
            url: '/' + url[3] + '/Std_download/showMenuDownload/' + subject_id + '-' + semester,
            dataType: "json",
            success: function (response) {
                getMenu = response;
                console.log(response);
                var html = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        if (i == 0) {
                            html += '<div class="expansion-panel list-group-item show" >';
                        } else {
                            html += '<div class="expansion-panel list-group-item " >';
                        }
                        html += '<a aria-controls="collapse' + i + '" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapse' + i + '" id="heading' + i + '">' +
                            response[i].menuDowName +
                            '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                            '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                            '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                            '</div>' +
                            '</a>';
                        if (i == 0) {
                            html += '<div aria-labelledby="heading' + i + '" class="collapse show" data-parent="#accordionOne" id="collapse' + i + '">';
                        } else {
                            html += '<div aria-labelledby="heading' + i + '" class="collapse" data-parent="#accordionOne" id="collapse' + i + '">';
                        }
                        html += '<div class="expansion-panel-body">' +
                            response[i].menuDowDescrpition +
                            '<div id="menuDowId-' + response[i].menuDowId + '">' +
                            '</div></div></div></div>';
                    }
                }
                $('.showMenuDownload').html(html);
                for (i = 0; i < getMenu.length; i++) {
                    show_data(i);
                }
            }
        });

    }

    function show_data(popUp) {
        $.ajax({
            url: '/' + url[3] + '/Std_download/showDownloadList/' + subject_id + '-' + semester + '-' + getMenu[popUp].menuDowId,
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
                            '<div><a class="btn btn-block btn-primary" href="/Std_download/download/' + subject_id + '-' + semester + '-' + getMenu[popUp].menuDowId + '-' + response[i].fileName + '"><i class="fas fa-download"></i> Download</a></div>' +
                            '</span>' +
                            '</li>';
                    }
                }
                $('#menuDowId-' + getMenu[popUp].menuDowId).html(html);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
    }
});