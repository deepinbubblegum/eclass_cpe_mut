$(document).ready(function () {


        /******************************* highlight Navbar ************************************* */
        var Navbar_Side_highlight = ['side_Anc', 'side_score', 'side_uploads', "side_downloads", "side_media", "side_quiz", "side_vote"];
        for (z = 0; z < Navbar_Side_highlight.length; z++) {
                var elementRemove = document.getElementById(Navbar_Side_highlight[z]);
                elementRemove.classList.remove("bg-info");
        }

        var Navbar_highlight = ['Anc', 'score', 'uploads', "downloads", "media", "quiz", "vote"];
        for (y = 0; y < Navbar_highlight.length; y++) {
                var elementRemove = document.getElementById(Navbar_highlight[y]);
                elementRemove.classList.remove("bg-info");
        }

        // $('#score').classList.add(".bg-primary");
        var element = document.getElementById("media");
        element.classList.add("bg-info");
        var element = document.getElementById("side_media");
        element.classList.add("bg-info");
        /******************************************************************** */


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
                var controls = [
                        'play-large', // ปุ่มเล่นขนาดใหญ่อยู่ตรงกลาง
                        'restart', // เริ่มเล่นใหม่
                        'rewind', // กรอกลับตามเวลาค้นหา (ค่าเริ่มต้น 10 วินาที)
                        'play', // เล่น / หยุดการเล่นชั่วคราว
                        'fast-forward', // กรอไปข้างหน้าด้วยเวลาค้นหา (ค่าเริ่มต้น 10 วินาที)
                        'progress', // แถบความคืบหน้าและตัวปรับสำหรับการเล่นและการบัฟเฟอร์
                        'current-time', // เวลาปัจจุบันของการเล่น
                        'duration', // ระยะเวลาเต็มของสื่อ
                        'mute', // สลับปิดเสียง
                        'volume', // การควบคุมระดับเสียง
                        // 'captions', // สลับคำอธิบายภาพ
                        'settings', // เมนูการตั้งค่า
                        'pip', // ภาพในภาพ (ปัจจุบัน Safari เท่านั้น)
                        'airplay', // ออกอากาศ (ปัจจุบัน Safari เท่านั้น)
                        'download', // แสดงปุ่มดาวน์โหลดพร้อมลิงก์ไปยังแหล่งที่มาปัจจุบันหรือ URL ที่กำหนดเองที่คุณระบุในตัวเลือกของคุณ
                        'fullscreen', // สลับเต็มหน้าจอ
                ];

                Plyr.setup('video', {
                        controls
                });
                Plyr.setup('audio', {
                        controls
                });
        }

});