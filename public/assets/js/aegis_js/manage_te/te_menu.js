$(document).ready(function() {
    none();
    var url = $(location).attr('href').split("/");
    $('#selectMenu').change(function(e) {
        rinkafu = $('#selectMenu').val();
        console.log(rinkafu);
        if (rinkafu == 1) {
            console.log('Annouce');
            ShowDataAnnouce();
            $('#menuEText').text('ANNOUCE');
            $('#inputForm').show();
        } else if (rinkafu == 2) {
            console.log('Score');
            $('#menuEText').text('SCORE');
            none();
        } else if (rinkafu == 3) {
            console.log('Download');
            $('#menuEText').text('DOWNLOAD');
            showMenuDownload();
            $('#inputForm').show();
        } else if (rinkafu == 4) {
            console.log('Upload');
            $('#menuEText').text('UPLOAD');
            showMenuUpload();
            $('#inputForm').show();
        } else if (rinkafu == 5) {
            console.log('Video');
            $('#menuEText').text('VIDEO');
            none();
        } else if (rinkafu == 6) {
            console.log('Quiz');
            $('#menuEText').text('QUIZ');
            none();
        } else if (rinkafu == 7) {
            console.log('Poll');
            $('#menuEText').text('POLL');
            none();
        } else {
            console.log('none');
            $('#menuEText').text('NONE');
            none();
        }
    });

    function none() {
        $('.showMenu').html('');
        $('#inputForm').hide();
    }

    function ShowDataAnnouce() {
        $.ajax({
            type: "POST",
            url: "/" + url[3] + "/Te_annouce/Show_Data_ctl",
            data: '&semester=' + semester + '&subject=' + subject_id,
            dataType: "json",
            // url: '/' + url[3] + '/Std_select/Show_Data_ctl/' + subject_id + '-' + semester,
            // dataType: "json",
            success: function(response) {
                console.log(response);
                var html = '';
                var i;
                var date_end;
                data_annouce = response;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        if (response[i].annouce_time_end == "0000-00-00") {
                            date_end = "ประกาศตลอด";
                        } else {
                            date_end = response[i].annouce_time_end;
                        }

                        if (i == 0) {
                            html += '<div class="expansion-panel list-group-item show">' +
                                '<a aria-controls="collapse' + i + '" aria-expanded="true" class="expansion-panel-toggler collapsed text-left" data-toggle="collapse" href="#collapse' + i + '" id="' + response[i].annouce_id + '">' +
                                '<div class="d-flex justify-content-start">' +
                                '<span style="font-size: 17px; color: blue;"">' +
                                '<i class="fas fa-tools mr-2" id="iconEdit" value="' + i + '" title="แก้ไขประกาศ"> </i>' +
                                '</span>' +
                                '<span style="font-size: 17px; color: red;"">' +
                                '<i class="fas fa-trash-alt mr-2" id="iconDelete" value="' + i + '" title="ลบประกาศ"> </i>' +
                                '</span>' +
                                '<span class="text-left">' + response[i].annouce_name + '</span>' +
                                '</div>' +
                                '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                                '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                                '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                                '</div>' +
                                '</a>' +
                                '<div aria-labelledby="' + response[i].annouce_id + '" class="collapse show" data-parent="#accordionOne" id="collapse' + i + '">' +
                                '<div class="expansion-panel-body text-left">' +
                                response[i].annouce_discription +
                                '</div>' +
                                '<div class="navdrawer-divider"></div>' +
                                '<div class="d-flex text-muted">' +
                                '<div class="p-2"> <small>ประกาศเมื่อ : ' + response[i].annouce_time_start + '</small> </div>' +
                                '<div class="ml-auto p-2"> <small> วันสิ้นสุดการประกาศ : ' + date_end + '</small> </div>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                        } else {
                            html += '<div class="expansion-panel list-group-item">' +
                                '<a aria-controls="collapse' + i + '" aria-expanded="true" class="expansion-panel-toggler collapsed text-left" data-toggle="collapse" href="#collapse' + i + '" id="' + response[i].annouce_id + '">' +
                                '<div class="d-flex justify-content-start">' +
                                '<span style="font-size: 17px; color: blue;"">' +
                                '<i class="fas fa-tools mr-2" id="iconEdit" value="' + i + '" title="แก้ไขประกาศ"> </i>' +
                                '</span>' +
                                '<span style="font-size: 17px; color: red;"">' +
                                '<i class="fas fa-trash-alt mr-2" id="iconDelete" value="' + i + '" title="ลบประกาศ"> </i>' +
                                '</span>' +
                                '<span class="text-left">' + response[i].annouce_name + '</span>' +
                                '</div>' +
                                '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                                '<i class="collapsed material-icons">keyboard_arrow_down</i>' +
                                '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                                '</div>' +
                                '</a>' +
                                '<div aria-labelledby="' + response[i].annouce_id + '" class="collapse" data-parent="#accordionOne" id="collapse' + i + '">' +
                                '<div class="expansion-panel-body text-left">' +
                                response[i].annouce_discription +
                                '</div>' +
                                '<div class="navdrawer-divider"></div>' +
                                '<div class="d-flex text-muted">' +
                                '<div class="p-2"> <small>ประกาศเมื่อ : ' + response[i].annouce_time_start + '</small> </div>' +
                                '<div class="ml-auto p-2"> <small> วันสิ้นสุดการประกาศ : ' + date_end + '</small> </div>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                        }
                    }
                }
                $('#accordionOne').html(html);
            }
        });
    }

    function showMenuUpload() {
        $.ajax({
            url: '/' + url[3] + '/Te_upload/showMenuUpload/' + subject_id + '-' + semester,
            dataType: "json",
            success: function(response) {
                getMenu = response;
                console.log(response);
                var html = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<div class="expansion-panel list-group-item" >' +
                            '<a aria-controls="collapse' + i + '" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapse' + i + '" id="heading' + i + '">' +
                            response[i].menuDowName +
                            '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                            '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                            '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                            '</div>' +
                            '</a>' +
                            '<div aria-labelledby="headingOne" class="collapse" data-parent="#accordionOne" id="collapse' + i + '">' +
                            '<div class="expansion-panel-body">' +
                            response[i].menuDowDescripition +
                            '<div id="uploads_files">' +
                            '<div id="uploads_files">' +
                            '<div class="dropzone" id="dropzone' + i + '"><input type="file" id="FileInput' + i + '[]" style="display:none;" multiple="">' +
                            '<p class="droptext text-justify text-center font-weight-bold">Drop file here or click to upload</p>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<button class="btn btn-success my-1" id="btnUpload' + i + '">Upload</button>' +
                            '<button class="btn btn-success my-1" id="btnClearAll' + i + '">Clear All</button>' +
                            '<div id="uploadeds_files' + i + '">' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }
                }
                $('.showMenu').html(html);
            }
        });

    }

    function showMenuDownload() {
        $.ajax({
            url: '/' + url[3] + '/Te_download/showMenuDownload/' + subject_id + '-' + semester,
            dataType: "json",
            success: function(response) {
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
                            response[i].menuUpDescripition +
                            '<div id="menuDowId-' + response[i].menuUpId + '">' +
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
                            '</div>' +
                            '</div>';
                    }
                }
                $('.showMenu').html(html);
            }
        });

    }


});