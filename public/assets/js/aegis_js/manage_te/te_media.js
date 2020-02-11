$(document).ready(function () {

        year = semester.substr(0, 4);
        part = semester.substr(4, 1);
        $('#header').text('สื่อสารสนเทศ : ' + subject_id + ' - ' + year + '/' + part);

        var check_name = [];
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
                                check_name = response;
                                console.log(response);
                                for (index = 0; index < response.length; index++) {
                                        if (response[index]['media_type'] == 'video') {
                                                html += '<div class="expansion-panel list-group-item">' +
                                                        '<a aria-controls="' + response[index]['media_id'] + '" aria-expanded="true" class="sortableMenu expansion-panel-toggler collapsed" data1="' + response[index].media_id + '" data-toggle="collapse" href="#' + response[index]['media_id'] + '" id="headingOne">' +
                                                        // '<i class="far fa-file-video"></i>' + response[index]['media_show_name'] +
                                                        '<div class="d-flex justify-content-start">' +
                                                        '<span style="font-size: 17px; color: blue;"">' +
                                                        '<i class="fas fa-tools mr-2 iconEdit" value="' + response[index]['media_id'] + '" title="แก้ไข"> </i>' +
                                                        '</span>' +
                                                        '<span style="font-size: 17px; color: red;"">' +
                                                        '<i class="fas fa-trash-alt mr-2 iconDelete" value="' + response[index]['media_id'] + '" tittle_name="' + response[index]['media_show_name'] + '" title="ลบ"> </i>' +
                                                        '</span>' +
                                                        '<span class="text-left">' + response[index]['media_show_name'] + '</span>' +
                                                        '</div>' +

                                                        '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                                                        '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                                                        '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                                                        '</div>' +
                                                        '</a>' +
                                                        '<div aria-labelledby="' + response[index]['media_id'] + '" class="collapse" data-parent="#accordionOne" id="' + response[index]['media_id'] + '">' +
                                                        '<div class="expansion-panel-body">' +
                                                        '<p>' + response[index]['media_detail_txt'] + '</p>' +
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
                                                        '<a aria-controls="' + response[index]['media_id'] + '" aria-expanded="false" class="sortableMenu expansion-panel-toggler collapsed" data1="' + response[index].media_id + '" data-toggle="collapse" href="#' + response[index]['media_id'] + '" id="headingTwo">' +
                                                        // '<i class="far fa-file-audio"></i>' + response[index]['media_show_name'] +
                                                        '<div class="d-flex justify-content-start">' +
                                                        '<span style="font-size: 17px; color: blue;"">' +
                                                        '<i class="fas fa-tools mr-2 iconEdit" value="' + response[index]['media_id'] + '" title="แก้ไขประกาศ"> </i>' +
                                                        '</span>' +
                                                        '<span style="font-size: 17px; color: red;"">' +
                                                        '<i class="fas fa-trash-alt mr-2 iconDelete" value="' + response[index]['media_id'] + '" tittle_name="' + response[index]['media_show_name'] + '" title="ลบประกาศ"> </i>' +
                                                        '</span>' +
                                                        '<span class="text-left">' + response[index]['media_show_name'] + '</span>' +
                                                        '</div>' +

                                                        '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                                                        '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                                                        '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                                                        '</div>' +
                                                        '</a>' +
                                                        '<div aria-labelledby="headingTwo" class="collapse" data-parent="#accordionOne" id="' + response[index]['media_id'] + '">' +
                                                        '<div class="expansion-panel-body">' +
                                                        '<p>' + response[index]['media_detail_txt'] + '</p>' +
                                                        '<audio id="player" style="width: 100%;" controls>' +
                                                        '<source src="' + window.location.protocol + '//' + window.location.hostname + '/media_uploads/audio/souce_audio/' + response[index]['media_real_name'] + '" type="audio/mp3" />' +
                                                        '</audio>' +
                                                        '</div>' +
                                                        '</div>' +
                                                        '</div>';
                                        } else {
                                                html += '<div class="expansion-panel list-group-item">' +
                                                        '<a aria-controls="' + response[index]['media_id'] + '" aria-expanded="false" class="sortableMenu expansion-panel-toggler collapsed" data1="' + response[index].media_id + '" data-toggle="collapse" href="#' + response[index]['media_id'] + '" id="headingThree">' +
                                                        // '<i class="far fa-file-image"></i>' + response[index]['media_show_name'] +
                                                        '<div class="d-flex justify-content-start">' +
                                                        '<span style="font-size: 17px; color: blue;"">' +
                                                        '<i class="fas fa-tools mr-2 iconEdit" value="' + response[index]['media_id'] + '" title="แก้ไขประกาศ"> </i>' +
                                                        '</span>' +
                                                        '<span style="font-size: 17px; color: red;"">' +
                                                        '<i class="fas fa-trash-alt mr-2 iconDelete" value="' + response[index]['media_id'] + '" tittle_name="' + response[index]['media_show_name'] + '" title="ลบประกาศ"> </i>' +
                                                        '</span>' +
                                                        '<span class="text-left">' + response[index]['media_show_name'] + '</span>' +
                                                        '</div>' +

                                                        '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                                                        '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                                                        '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                                                        '</div>' +
                                                        '</a>' +
                                                        '<div aria-labelledby="headingThree" class="collapse" data-parent="#accordionOne" id="' + response[index]['media_id'] + '">' +
                                                        '<div class="expansion-panel-body">' +
                                                        '<p>' + response[index]['media_detail_txt'] + '</p>' +
                                                        '<img src="' + window.location.protocol + '//' + window.location.hostname + '/media_uploads/Image/souce_image/' + response[index]['media_real_name'] + '" class="img-fluid" alt="Responsive image">' +
                                                        '</div>' +
                                                        '</div>' +
                                                        '</div>';
                                        }
                                }
                                $('#accordionOne').html(html);
                                sortMenu();
                                player();
                                edit_del_init();
                        }
                });

        }

        var edit_id = '';
        var delete_id = '';

        function edit_del_init() {
                $('.iconEdit').click(function (e) {
                        e.preventDefault();
                        console.log($(this).attr('value'));
                        edit_id = $(this).attr('value');
                        $.ajax({
                                type: "POST",
                                url: "/" + url[3] + "/Te_media/get_edit",
                                data: {
                                        edit_id: edit_id,
                                        subject_id: subject_id,
                                        semester: semester
                                },
                                dataType: "json",
                                success: function (response) {
                                        console.log(response);
                                        $('#edit_name').val(response[0]['media_show_name']);
                                        $('#discription').val(response[0]['media_detail_txt']);
                                }
                        });
                        $('#edit_media').modal('show');
                });

                $('.iconDelete').click(function (e) {
                        e.preventDefault();
                        delete_id = $(this).attr('value');
                        $('#delete_media').modal('show');
                        $('#show_delete_tittle').text('ต้องการจะลบ ' + $(this).attr('tittle_name') + ' หรือไม่ ?');

                });
        }

        $('#btn_delete_media').click(function () {
                $.ajax({
                        type: "POST",
                        url: "/" + url[3] + "/Te_media/del_media_ctl",
                        data: {
                                delete_id: delete_id
                        },
                        dataType: "json",
                        success: function (response) {
                                if (response == true) {
                                        show_media();
                                        $('#delete_media').modal('hide');
                                }
                        }
                });
        });

        $('#btn_edit_media').click(function () {
                $.ajax({
                        type: "POST",
                        url: "/" + url[3] + "/Te_media/edit_update_data",
                        data: {
                                edit_id: edit_id,
                                subject_id: subject_id,
                                semester: semester,
                                edit_name: $('#edit_name').val(),
                                discription: $('#discription').val()
                        },
                        dataType: "json",
                        success: function (response) {
                                console.log(response);
                                show_media();
                                $('#edit_media').modal('hide');
                        }
                });
        });

        function player() {
                Plyr.setup('video');
                Plyr.setup('audio');
        }

        // ---------------function video-upload--------------
        $('#video_file').change(function (e) {
                e.preventDefault();
                html = '';
                _files = $(this)[0].files;
                // console.log(_files[0].name);
                $(this).next("label").text(_files[0].name);
        });

        $('#btn_save_video').click(function (e) {
                e.preventDefault();
                console.log('OK');
                for (index = 0; index < check_name.length; index++) {
                        if ($('#video_name').val() == check_name[index]['media_show_name']) {
                                console.log('dup');
                                SnackCall('ชื่อไฟล์ซ้ำ')
                                return false;
                        }
                }
                if($('#video_name').val() == ""){
                        SnackCall('กรุณากำหนดชื่อไฟล์')
                        return false;
                }
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
                                                                $('#upload_process').modal('hide');
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
                                console.log(response);
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
                // console.log(_files[0].name);
                $(this).next("label").text(_files[0].name);
        });

        $('#btn_save_audio').click(function (e) {
                e.preventDefault();
                // console.log('OK');
                for (index = 0; index < check_name.length; index++) {
                        if ($('#audio_name').val() == check_name[index]['media_show_name']) {
                                console.log('dup');
                                SnackCall('ชื่อไฟล์ซ้ำ')
                                return false;
                        }
                }
                if($('#audio_name').val() == ''){
                        SnackCall('กรุณากำหนดชื่อไฟล์')
                        return false;
                }
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
                // console.log(_files[0].name);
                $(this).next("label").text(_files[0].name);
        });

        $('.dropdown-item').click(function (e) { 
                e.preventDefault();
                $('#image_file').next("label").text('');
                $('#audio_file').next("label").text('');
                $('#video_file').next("label").text('');
        });

        $('#btn_save_image').click(function (e) {
                e.preventDefault();
                // console.log('OK');
                for (index = 0; index < check_name.length; index++) {
                        if ($('#image_name').val() == check_name[index]['media_show_name']) {
                                console.log('dup');
                                SnackCall('ชื่อไฟล์ซ้ำ')
                                return false;
                        }
                }

                if($('#image_name').val() == ''){
                        SnackCall('กรุณากำหนดชื่อไฟล์')
                        return false;
                }

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

        // let status = '';
        // function check_dup(name_menu) {
        //         for (index = 0; index < check_name.length; index++) {
        //                 if (name_menu == check_name[index]['media_show_name']) {
        //                         console.log('dup');
        //                         SnackCall('ชื่อไฟล์ซ้ำ')
        //                         status = false;
        //                         break;
        //                 } else {
        //                         status = true;
        //                 }
        //         }
        //         return status;
        // }

        function SnackCall(SnackText) {
                Snackbar.show({
                        actionText: 'close',
                        pos: 'top-center',
                        actionTextColor: '#4CAF50',
                        backgroundColor: '#323232',
                        width: 'auto',
                        text: SnackText
                });
        }

        function sortMenu() {
                var sortMenuIDArray = [];
                var ArraySemester = [];
                var ArraySubject = [];
                $(".DragMenu").sortable({
                    tolerance: 'pointer',
                    revert: 'invalid',
                    placeholder: 'p-2 f34r-bg-n-txt sortableMenu placeholder',
                    forceHelperSize: true,
                    stop: function() {
                        $.map($(this).find('a.sortableMenu'), function(el) {
                            var MenuDowid = $(el).attr('data1');
                            sortMenuIDArray.push(MenuDowid);
                            ArraySubject.push(subject_id);
                            ArraySemester.push(semester);
                        });
                        console.log(sortMenuIDArray);
                        $.ajax({
                            type: "POST",
                            url: '/' + url[3] + '/Te_media/SortMenu',
                            data: { sortMenuIDArray, ArraySemester, ArraySubject },
                            success: function() {
                                sortMenuIDArray = [];
                                ArraySemester = [];
                                ArraySubject = [];
                                show_media();
                            }
                        });
                    }
                });
            }
});