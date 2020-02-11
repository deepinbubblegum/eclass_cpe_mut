<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <script>
                subject_id = '<?php echo $subject_id; ?>';
                semester = '<?php echo $semester; ?>';
        </script>
        <?php
        echo assets_css('plyr_css/plyr.css');
        echo assets_css('aegis_css/video-mes.css');
        echo assets_js('plyr_js/plyr.js');
        // echo assets_js('aegis_js/video_player.js');
        echo assets_js('aegis_js/manage_te/te_media.js');
        ?>
</head>

<body>
        <div class="col text-center mt-3">
                <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
                        <div class="navbar-brand" href="#">
                                <span style="font-size: 1.2em;">
                                        <i class="fas fa-photo-video"></i>
                                </span>
                                <span style="font-size: 0.8em;">
                                        <!-- &nbsp; สื่อสารสนเทศ -->
                                        &nbsp; <span id="header"></span>
                                </span>
                        </div>

                        <!-- Default dropleft button -->
                        <div class="btn-group my-2 my-sm-0">
                                <button type="button" class="btn btn-secondary dropdown-toggle " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        เพิ่มสื่อสารสนเทศ
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                        <!-- Dropdown menu links -->
                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#file_video"><i class="far fa-file-video"></i> เพิ่มวิดีโอ</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#file_audio"><i class="far fa-file-audio"></i> เพิ่มเสียง</a>
                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#file_image"><i class="far fa-file-image"></i> เพิ่มรูปภาพ</a>
                                </div>
                        </div>
                </nav>

                <div class="container-fluid">
                        <div class="list-group mt-3 showMenu_vd_Upload text-left" id="accordionOne">

                        </div>

                </div>

                <!-- modal video -->
                <div class="modal fade bd-example-modal-lg" id="file_video" tabindex="-1" role="dialog" aria-labelledby="file_video_label" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="file_video_label"><i class="far fa-file-video"></i> เพิ่มสื่อสารสนเทศวิดีโอ</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                </button>
                                        </div>
                                        <div class="modal-body">
                                                <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                                <span class="input-group-text"> ชื่อวิดีโอ</span>
                                                        </div>
                                                        <input type="text" class="form-control" id="video_name" aria-label="Default" aria-describedby="video_name">
                                                </div>
                                                <div class="input-group mb-3 mt-1">
                                                        <div class="input-group-prepend">
                                                                <span class="input-group-text"> รายละเอียด</span>
                                                        </div>
                                                        <textarea class="form-control" id="discription_video" aria-label=" รายละเอียด"></textarea>
                                                </div>
                                                <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                                <span class="input-group-text"> ไฟล์วิดีโอ</span>
                                                        </div>
                                                        <div class="custom-file text-left">
                                                                <input type="file" class="custom-file-input" id="video_file" accept="video/mp4">
                                                                <label class="custom-file-label" for="video_file"></label>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">ปิด</button>
                                                <button type="button" id="btn_save_video" class="btn btn-primary">บันทึก</button>
                                        </div>
                                </div>
                        </div>
                </div>
                <!--end modal video -->

                <!-- modal audio -->
                <div class="modal fade bd-example-modal-lg" id="file_audio" tabindex="-1" role="dialog" aria-labelledby="file_audio_label" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="file_audio_label"><i class="far fa-file-audio"></i> เพิ่มสื่อสารสนเทศเสียง</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                </button>
                                        </div>
                                        <div class="modal-body">
                                                <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                                <span class="input-group-text"> ชื่อไฟล์เสียง</span>
                                                        </div>
                                                        <input type="text" class="form-control" id="audio_name" aria-label="Default" aria-describedby="audio_name">
                                                </div>
                                                <div class="input-group mb-3 mt-1">
                                                        <div class="input-group-prepend">
                                                                <span class="input-group-text"> รายละเอียด</span>
                                                        </div>
                                                        <textarea class="form-control" id="discription_audio" aria-label=" รายละเอียด"></textarea>
                                                </div>
                                                <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                                <span class="input-group-text"> ไฟล์เสียง</span>
                                                        </div>
                                                        <div class="custom-file text-left">
                                                                <input type="file" class="custom-file-input" id="audio_file" accept="audio/mp3">
                                                                <label class="custom-file-label" for="audio_file"></label>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">ปิด</button>
                                                <button type="button" id="btn_save_audio" class="btn btn-primary">บันทึก</button>
                                        </div>
                                </div>
                        </div>
                </div>
                <!--end modal audio -->

                <!-- modal img -->
                <div class="modal fade bd-example-modal-lg" id="file_image" tabindex="-1" role="dialog" aria-labelledby="file_image_label" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="file_image_label"><i class="far fa-file-image"></i> เพิ่มสื่อสารสนเทศรูปภาพ</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                </button>
                                        </div>
                                        <div class="modal-body">
                                                <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                                <span class="input-group-text"> ชื่อรูปภาพ</span>
                                                        </div>
                                                        <input type="text" class="form-control" id="image_name" aria-label="Default" aria-describedby="image_name">
                                                </div>
                                                <div class="input-group mb-3 mt-1">
                                                        <div class="input-group-prepend">
                                                                <span class="input-group-text"> รายละเอียด</span>
                                                        </div>
                                                        <textarea class="form-control" id="discription_image" aria-label=" รายละเอียด"></textarea>
                                                </div>
                                                <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                                <span class="input-group-text"> ไฟล์รูปภาพ</span>
                                                        </div>
                                                        <div class="custom-file">
                                                                <input type="file" class="custom-file-input" id="image_file" accept="image/jpeg, image/png">
                                                                <label class="custom-file-label" for="image_file"></label>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">ปิด</button>
                                                <button type="button" id="btn_save_image" class="btn btn-primary">บันทึก</button>
                                        </div>
                                </div>
                        </div>
                </div>
                <!--end modal img -->

                <!-- modal process -->
                <div class="modal fade bd-example-modal-lg" id="upload_process" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby=upload_process_label" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="upload_process_label"> กำลังอัปโหลด</h5>
                                        </div>
                                        <div class="modal-body">
                                                <div id="progressupload"></div>
                                        </div>
                                </div>
                        </div>
                </div>
                <!--end modal process -->

                <!-- modal edit -->
                <div class="modal fade bd-example-modal-lg" id="edit_media" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby=edit_media_label" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="edit_media_label"> แก้ไขรายละเอียด</h5>
                                        </div>
                                        <div class="modal-body">
                                                <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                                <span class="input-group-text"> ชื่อ</span>
                                                        </div>
                                                        <input type="text" class="form-control" id="edit_name" aria-label="Default" aria-describedby="edit_name">
                                                </div>
                                                <div class="input-group mb-3 mt-1">
                                                        <div class="input-group-prepend">
                                                                <span class="input-group-text"> รายละเอียด</span>
                                                        </div>
                                                        <textarea class="form-control" id="discription" aria-label=" รายละเอียด"></textarea>
                                                </div>
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">ปิด</button>
                                                <button type="button" id="btn_edit_media" class="btn btn-primary">บันทึก</button>
                                        </div>
                                </div>
                        </div>
                </div>
                <!--end modal edit -->

                <!-- modal delete -->
                <div class="modal fade bd-example-modal-lg" id="delete_media" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby=delete_media_label" aria-hidden="true">
                        <div class="modal-dialog">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="delete_media_label"> ต้องการลบ หรือไม่?</h5>
                                        </div>
                                        <div class="modal-body text-left">
                                                <h5 id="show_delete_tittle" value="">
                                                </h5>
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">ปิด</button>
                                                <button type="button" id="btn_delete_media" class="btn btn-primary">ลบ</button>
                                        </div>
                                </div>
                        </div>
                </div>
                <!--end modal delete -->
</body>

</html>