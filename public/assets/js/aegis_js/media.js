$(document).ready(function () {

        year = semester.substr(0, 4);
        part = semester.substr(4, 1);
        $('#header').text('สื่อสารสนเทศ : ' + subject_id + ' - ' + year + '/' + part);

        var _files;
        var url = $(location).attr('href').split("/");
        show_media();

        function show_media() {
                var html = '';
                $.ajax({
                        type: "POST",
                        url: "/" + url[3] + "/Std_media/show_media",
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
                                                        '<a aria-controls="' + response[index]['media_id'] + '" aria-expanded="false" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#' + response[index]['media_id'] + '" id="headingTwo">' +
                                                        '<i class="far fa-file-audio"></i>' + response[index]['media_show_name'] +
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
                                                        '<a aria-controls="' + response[index]['media_id'] + '" aria-expanded="false" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#' + response[index]['media_id'] + '" id="headingThree">' +
                                                        '<i class="far fa-file-image"></i>' + response[index]['media_show_name'] +
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
                                player();
                        }
                });
        }

        function player() {
                Plyr.setup('video');
                Plyr.setup('audio');
        }

});