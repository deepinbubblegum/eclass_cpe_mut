$(document).ready(function () {

    year = semester.substr(0, 4);
    part = semester.substr(4, 1);
    $('#header').text('งานที่มอบหมาย : ' + subject_id + ' - ' + year + '/' + part);

    //$('#btnUpload').hide();
    //$('#btnClearAll').hide();
    var getFile = [];
    var gerMenu = [];
    var checker = [];
    var nameCollector = [];
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
    showMenuUpload();

    function showMenuUpload() {
        $.ajax({
            url: '/' + url[3] + '/Std_upload/showMenuUpload/' + subject_id + '-' + semester,
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
                            html += '<div class="expansion-panel list-group-item" >';
                        }
                        html += '<a aria-controls="collapse' + i + '" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapse' + i + '" id="heading' + i + '">' +
                            response[i].menuUpName +
                            '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                            '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                            '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                            '</div>' +
                            '</a>';
                        if (i == 0) {
                            html += '<div aria-labelledby="headingOne" class="collapse show" data-parent="#accordionOne" id="collapse' + i + '">';
                        } else {
                            html += '<div aria-labelledby="headingOne" class="collapse" data-parent="#accordionOne" id="collapse' + i + '">';
                        }
                        html += '<div class="expansion-panel-body">' +
                            response[i].menuUpDescripition +
                            '<div id="uploads_files">' +
                            '<div id="uploads_files">' +
                            '<div class="dropzone" id="dropzone' + i + '"><input type="file" id="FileInput' + i + '[]" style="display:none;" multiple="">' +
                            '<p class="droptext text-justify text-center font-weight-bold">Drop file here or click to upload</p>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<button class="btn btn-success my-1" id="btnUpload' + i + '">Upload</button>' +
                            '<button class="btn btn-danger my-1" id="btnClearAll' + i + '">Clear All</button>' +
                            '<div id="uploadeds_files' + i + '">' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }
                }
                $('.showMenuUpload').html(html);

                $.each(response, function (i, v) {
                    gen(document.getElementById('dropzone' + i), document.getElementById('FileInput' + i + '[]'), 'FileInput' + i + '[]', i);
                    $('#btnClearAll' + i).click(function (e) {
                        //upload(0,pos);
                        //$('#btnUpload').hide();
                        //$('#btnClearAll').hide();
                    });

                    $('#btnUpload' + i).click(function (e) {
                        e.preventDefault();
                        uploadBtn(i)
                    });
                });
                // for (i = 0; i < getMenu.length; i++) {
                //     show_data(i);
                // }
            }
        });

    }

    function gen(dropzone, dropzone_click, fileInput, pos) {

        dropzone_click.onchange = function (e) {
            console.log($(this)[0].files.length);
            if ($(this)[0].files.length > 0) {
                console.log('a');
                e.preventDefault();
                upload($(this)[0].files, pos);
            } else {
                console.log('no files selected');
            }
        }

        dropzone.onclick = function () {
            document.getElementById(fileInput).click();
        }

        dropzone.onmouseover = function () {
            this.className = 'dropzone dragover';
            return false;
        }

        dropzone.onmouseleave = function () {
            this.className = 'dropzone';
            return false;
        }

        dropzone.ondrop = function (e) {
            e.preventDefault();
            this.className = 'dropzone';
            upload(e.dataTransfer.files, pos)
        }

        dropzone.ondragover = function () {
            this.className = 'dropzone dragover dropover';
            return false;
        }

        dropzone.ondragleave = function () {
            this.className = 'dropzone';
            return false;
        }
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

    function upload(_files, pos) {
        html = '';
        getFile[pos] = _files;
        // var _listFileName = "";
        if (_files.length > 0) {
            console.log('if');
            var _fileName = [];
            $.each(_files, function (k, v) {
                _fileName[k] = v.name;
                html +=
                    '<li href="#" class="list-group-item d-flex justify-content-between align-items-center list-group-item-action mb-2 mt-2" id="UploadedFile' + k + pos + '">' +
                    '<span class="mr-2 mb-0" style="font-size: 28px;">' +
                    file_ico(_files[k].type) +
                    '<span class="mr-2 text-black" style="font-size: 18px;"> ' + _files[k].name + '</span>' +
                    '<div class="mt-0">' +
                    '<small class="mr-2 text-black-50" style="font-size: 12px;"> size : ' + fileSizeCal(_files[k].size) + '</small>' +
                    '<small class="mr-2 text-black-50" style="font-size: 12px;">type : ' + _files[k].type + '</small>' +
                    '</div>' +
                    '</span>' +
                    '<span>' +
                    '<!-- <button class="btn btn-float btn-danger my-1"><i class="far fa-trash-alt"></i></button>' +
                    '<button class="btn btn-float btn-success my-1"><i class="fas fa-check"></i></button>' +
                    '<button class="btn btn-float btn-danger my-1"><i class="fas fa-undo-alt"></i></button> -->' +
                    '</span>' +
                    '<button class="btn btn-danger my-1" id="btnRemove' + k + pos + '" style="">Remove</button>' +
                    '</li>';
            });
            //$('#btnUpload').show();
            //$('#btnClearAll').show();
            $('#uploadeds_files' + pos).html(html);
            //console.log(pos + '<- this is pos in html'); 
            checker[pos] = 0;
            if (!nameCollector[pos]) nameCollector[pos] = []
            $.each(_files, function (k, v) {
                //console.log(pos + '<- this is pos in rbtn'); 
                nameCollector[pos][k] = v.name;
                $('#btnRemove' + k + pos).click(function (e) {
                    //console.log(pos + '<- this is pos when click rbtn'); 
                    nameCollector[pos][k] = null;
                    console.log(nameCollector);
                    $('#UploadedFile' + k + pos).remove();
                    checker[pos]--;
                    if (checker[pos] == 0) {
                        upload(0, pos);
                        //$('#btnUpload').hide();
                        //$('#btnClearAll').hide();
                    }
                });
                checker[pos]++;
            });
        } else {
            console.log('else');
            $('#uploadeds_files' + pos).html(html);
        }
    }

    function uploadBtn(pos) {
        var checked = [];
        for (i = 0, c = 0; i < getFile[pos].length; i++) {
            if (nameCollector[pos][i] != null) {
                checked[c] = i;
                c++;
            }
        }

        var form_data = new FormData();

        for (i = 0; i < checked.length; i++) {
            ty = getFile[pos][checked[i]].name.split(".");
            var str = new String(getFile[pos][checked[i]].name).replace('.' + ty[ty.length - 1], "");
            for (sl = 0; sl < str.length; sl++) {
                str = str.replace(" ", "_");
            }
            str += '.' + ty[ty.length - 1];

            var type = new String(getFile[pos][checked[i]].type);
            if (type.length == 0) {
                console.log('ifParameter');
                type = "Unknow";
            }

            data = "&data1=" + str /*getFile[checked[i]].name.replace(" ", "-")*/ + "&data2=" + getFile[pos][checked[i]].size + "&data3=../uploads/file/" + subject_id + semester + "&data4=" + type + "&data5=" + getMenu[pos].menuUpId + "&data6=" + subject_id + "&data7=" + semester /*+ "&getFile=" + arr*/ ;

            form_data.append('file[]', getFile[pos][checked[i]]);
            $.ajax({
                type: "POST",
                url: '/' + url[3] + '/Std_upload/Upload',
                data: data,
                //data: "&data1=" + getFile,
                dataType: "json",
                success: function (response) {
                    alert("Success!");
                }
            });
        }
        $('#progress_modal').modal('show');
        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                html = '';
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        percentComplete = parseInt(percentComplete * 100);
                        console.log(percentComplete);
                        html = '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: ' + percentComplete + '%"></div>' + percentComplete + '%';
                        if (percentComplete === 100) {
                            html = '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: ' + percentComplete + '%"></div>Complete';
                            setTimeout(function () {
                                $('#progress_modal').modal('hide');
                            }, 1200);
                        }
                        $('#progressupload').html(html);
                    }
                }, false);

                return xhr;
            },
            type: "POST",
            url: '/' + url[3] + '/Std_upload/UploadFile/' + subject_id + '-' + semester + '-' + getMenu[pos].menuUpId,
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function (response) {
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
            },
            error: function (response) {
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

        nameCollector[pos] = [];
        upload(0, pos);
        //$('#btnUpload').hide();
        //$('#btnClearAll').hide();
    }

});