$(document).ready(function () {

        var _files;
        var url = $(location).attr('href').split("/");
        show_media();

        function show_media() {
                var html = '';
                $.ajax({
                        type: "POST",
                        url: "/" + url[3] + "/Te_media/show_media",
                        data: {
                                subject_id: subject_id,
                                semester: semester
                        },
                        dataType: "json",
                        success: function (response) {
                                console.log(response);
                                for (index = 0; index < response.length; index++) {
                                        if (response[index]['media_type'] == 'video') {
                                                html += '<div class="expansion-panel list-group-item">' +
                                                        '<a aria-controls="' + response[index]['media_id'] + '" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#' + response[index]['media_id'] + '" id="headingOne">' +
                                                        '<i class="far fa-file-video"></i>' + response[index]['media_show_name'] +
                                                        '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                                                        '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                                                        '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                                                        '</div>' +
                                                        '</a>' +
                                                        '<div aria-labelledby="' + response[index]['media_id'] + '" class="collapse" data-parent="#accordionOne" id="' + response[index]['media_id'] + '">' +
                                                        '<div class="expansion-panel-body">' +
                                                        '<p>'+response[index]['media_detail_txt']+'</p>'+
                                                        '<video controls crossorigin playsinline>"' +
                                                        '<source src="' + window.location.protocol + '//' + window.location.hostname + '/media_uploads/video/souce_video/' + response[index]['media_real_name'] + '" type="video/mp4">' +
                                                        '<center class="mt-2" style="font-size: 18px">' +
                                                        '<a href="' + window.location.protocol + '//' + window.location.hostname + '/media_uploads/video/souce_video/' + response[index]['media_real_name'] + '" download><i class="far fa-arrow-alt-circle-down"></i> Download</a>' +
                                                        '</center>' +
                                                        '</video>' +
                                                        '</div>' +
                                                        '</div>' +
                                                        '</div>';
                                        } else if (response[index]['media_type'] == 'audio') {
                                                html += '<div class="expansion-panel list-group-item">' +
                                                        '<a aria-controls="' + response[index]['media_id'] + '" aria-expanded="false" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#' + response[index]['media_id'] + '" id="headingTwo">' +
                                                        '<i class="far fa-file-audio"></i>' + response[index]['media_show_name'] +
                                                        '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                                                        '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                                                        '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                                                        '</div>' +
                                                        '</a>' +
                                                        '<div aria-labelledby="headingTwo" class="collapse" data-parent="#accordionOne" id="' + response[index]['media_id'] + '">' +
                                                        '<div class="expansion-panel-body">' +
                                                        '<p>'+response[index]['media_detail_txt']+'</p>'+
                                                        '<audio id="player" style="width: 100%;" controls>' +
                                                        '<source src="' + window.location.protocol + '//' + window.location.hostname + '/media_uploads/audio/souce_audio/' + response[index]['media_real_name'] + '" type="audio/mp3" />' +
                                                        '</audio>' +
                                                        '</div>' +
                                                        '</div>' +
                                                        '</div>';
                                        } else {
                                                html += '<div class="expansion-panel list-group-item">' +
                                                        '<a aria-controls="' + response[index]['media_id'] + '" aria-expanded="false" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#' + response[index]['media_id'] + '" id="headingThree">' +
                                                        '<i class="far fa-file-image"></i>' + response[index]['media_show_name'] +
                                                        '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                                                        '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                                                        '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                                                        '</div>' +
                                                        '</a>' +
                                                        '<div aria-labelledby="headingThree" class="collapse" data-parent="#accordionOne" id="' + response[index]['media_id'] + '">' +
                                                        '<div class="expansion-panel-body">' +
                                                        '<p>'+response[index]['media_detail_txt']+'</p>'+
                                                        '<img src="' + window.location.protocol + '//' + window.location.hostname + '/media_uploads/image/souce_image/' + response[index]['media_real_name'] + '" class="img-fluid" alt="Responsive image">' +
                                                        '</div>' +
                                                        '</div>' +
                                                        '</div>';
                                        }

                                }
                                $('#accordionOne').html(html);
                                player();
                        }
                });
        }

        function player() {
                Plyr.setup('video');
                Plyr.setup('audio');
        }

        // ---------------function video-upload--------------
        $('#video_file').change(function (e) {
                e.preventDefault();
                html = '';
                _files = $(this)[0].files;
                console.log(_files[0].name);
                $(this).next("label").text(_files[0].name);
        });

        $('#btn_save_video').click(function (e) {
                e.preventDefault();
                var form_data = new FormData();
                form_data.append('file', _files[0]);
                form_data.append('video_name', $('#video_name').val());
                form_data.append('discription_video', $('#discription_video').val());
                form_data.append('subject_id', subject_id);
                form_data.append('semester', semester);
                console.log(form_data);
                $('#upload_process').modal('show');
                $.ajax({
                        xhr: function () {
                                var xhr = new window.XMLHttpRequest();
                                html = '';
                                xhr.upload.addEventListener("progress", function (evt) {
                                        if (evt.lengthComputable) {
                                                $('#file_video').modal('hide');
                                                var percentComplete = evt.loaded / evt.total;
                                                percentComplete = parseInt(percentComplete * 100);
                                                console.log(percentComplete);
                                                html = '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: ' + percentComplete + '%">' + percentComplete + '%</div>';
                                                if (percentComplete === 100) {
                                                        html = '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: ' + percentComplete + '%">Complete</div>';
                                                        setTimeout(function () {
                                                        }, 1200);
                                                }
                                                $('#progressupload').html(html);
                                        }
                                }, false);

                                return xhr;
                        },
                        type: "POST",
                        url: "/" + url[3] + "/Te_media/upload_video_ctl",
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        dataType: "json",
                        success: function (response) {
                                show_media();
                                $('#upload_process').modal('hide');
                                $('#video_name').val('');
                                $('#discription_video').val('');
                                $('#video_file').val('');
                        }
                });
        });

        // ---------------function audio-upload--------------
        $('#audio_file').change(function (e) {
                e.preventDefault();
                html = '';
                _files = $(this)[0].files;
                console.log(_files[0].name);
                $(this).next("label").text(_files[0].name);
        });

        $('#btn_save_audio').click(function (e) {
                e.preventDefault();
                var form_data = new FormData();
                form_data.append('file', _files[0]);
                form_data.append('audio_name', $('#audio_name').val());
                form_data.append('discription_audio', $('#discription_audio').val());
                form_data.append('subject_id', subject_id);
                form_data.append('semester', semester);
                console.log(form_data);
                $('#upload_process').modal('show');
                $.ajax({
                        xhr: function () {
                                var xhr = new window.XMLHttpRequest();
                                html = '';
                                xhr.upload.addEventListener("progress", function (evt) {
                                        if (evt.lengthComputable) {
                                                $('#file_audio').modal('hide');
                                                var percentComplete = evt.loaded / evt.total;
                                                percentComplete = parseInt(percentComplete * 100);
                                                console.log(percentComplete);
                                                html = '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: ' + percentComplete + '%">' + percentComplete + '%</div>';
                                                if (percentComplete === 100) {
                                                        html = '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: ' + percentComplete + '%">Complete</div>';
                                                        setTimeout(function () {
                                                                $('#upload_process').modal('hide');
                                                        }, 1200);
                                                }
                                                $('#progressupload').html(html);
                                        }
                                }, false);

                                return xhr;
                        },
                        type: "POST",
                        url: "/" + url[3] + "/Te_media/upload_audio_ctl",
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        dataType: "json",
                        success: function (response) {
                                show_media();
                                $('#audio_name').val('');
                                $('#discription_audio').val('');
                                $('#audio_file').val('');
                        }
                });
        });

        // ---------------function image-upload--------------
        $('#image_file').change(function (e) {
                e.preventDefault();
                html = '';
                _files = $(this)[0].files;
                console.log(_files[0].name);
                $(this).next("label").text(_files[0].name);
        });

        $('#btn_save_image').click(function (e) {
                e.preventDefault();
                var form_data = new FormData();
                form_data.append('file', _files[0]);
                form_data.append('image_name', $('#image_name').val());
                form_data.append('discription_image', $('#discription_image').val());
                form_data.append('subject_id', subject_id);
                form_data.append('semester', semester);
                console.log(form_data);
                $('#upload_process').modal('show');
                $.ajax({
                        xhr: function () {
                                var xhr = new window.XMLHttpRequest();
                                html = '';
                                xhr.upload.addEventListener("progress", function (evt) {
                                        if (evt.lengthComputable) {
                                                $('#file_image').modal('hide');
                                                var percentComplete = evt.loaded / evt.total;
                                                percentComplete = parseInt(percentComplete * 100);
                                                console.log(percentComplete);
                                                html = '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: ' + percentComplete + '%">' + percentComplete + '%</div>';
                                                if (percentComplete === 100) {
                                                        html = '<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: ' + percentComplete + '%">Complete</div>';
                                                        setTimeout(function () {
                                                                $('#upload_process').modal('hide');
                                                        }, 1200);
                                                }
                                                $('#progressupload').html(html);
                                        }
                                }, false);

                                return xhr;
                        },
                        type: "POST",
                        url: "/" + url[3] + "/Te_media/upload_image_ctl",
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        dataType: "json",
                        success: function (response) {
                                show_media();
                                $('#image_name').val('');
                                $('#discription_image').val('');
                                $('#image_file').val('');
                        }
                });
        });

});