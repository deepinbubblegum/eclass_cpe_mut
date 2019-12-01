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
        echo assets_js('aegis_js/video_player.js');
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
                                        &nbsp; สื่อสารสนเทศ
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
                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#file_img"><i class="far fa-file-image"></i> เพิ่มรูปภาพ</a>
                                </div>
                        </div>
                </nav>

                <div class="container-fluid">

                        <div class="list-group mt-3 showMenu_vd_Upload text-left" id="accordionOne">
                                <div class="expansion-panel list-group-item">
                                        <a aria-controls="collapseOne" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapseOne" id="headingOne">
                                                <i class="far fa-file-video"></i>วิดีโอ
                                                <div class="expansion-panel-icon ml-3 text-black-secondary">
                                                        <i class="collapsed-show material-icons">keyboard_arrow_down</i>
                                                        <i class="collapsed-hide material-icons">keyboard_arrow_up</i>
                                                </div>
                                        </a>
                                        <div aria-labelledby="headingOne" class="collapse" data-parent="#accordionOne" id="collapseOne">
                                                <div class="expansion-panel-body">
                                                        <video controls crossorigin playsinline poster="https://s3.eu-central-1.amazonaws.com/pipe.public.content/poster.png">
                                                                <source src="<?php echo base_url('video/360/ac.mp4'); ?>" type="video/mp4" size="360">
                                                                <source src="<?php echo base_url('video/480/ac.mp4'); ?>" type="video/mp4" size="480">
                                                                <source src="<?php echo base_url('video/720/abc.mp4'); ?>" type="video/mp4" size="720">
                                                                <source src="<?php echo base_url('video/1080/abc.mp4'); ?>" type="video/mp4" size="1080">

                                                                <!-- Caption files -->
                                                                <!-- <track kind="captions" label="English" srclang="en" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt" default>
                                                                <track kind="captions" label="Thailand" srclang="th" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"> -->
                                                                <!-- Fallback for browsers that don't support the <video> element -->
                                                                <center class="mt-2" style="font-size: 18px">
                                                                        <a href="<?php echo base_url('video/abc.mp4'); ?>" download><i class="far fa-arrow-alt-circle-down"></i> Download</a>
                                                                </center>
                                                        </video>
                                                </div>
                                        </div>
                                </div>
                                <div class="expansion-panel list-group-item">
                                        <a aria-controls="collapseTwo" aria-expanded="false" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapseTwo" id="headingTwo">
                                                <i class="far fa-file-audio"></i>เสียง
                                                <div class="expansion-panel-icon ml-3 text-black-secondary">
                                                        <i class="collapsed-show material-icons">keyboard_arrow_down</i>
                                                        <i class="collapsed-hide material-icons">keyboard_arrow_up</i>
                                                </div>
                                        </a>
                                        <div aria-labelledby="headingTwo" class="collapse" data-parent="#accordionOne" id="collapseTwo">
                                                <div class="expansion-panel-body">
                                                        <audio id="player" style="width: 100%;" controls>
                                                                <source src="https://server19.workerserverbl.com/online/mp3.php?id=32706429&mp3=%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%9A%E0%B8%B1%E0%B8%87%E0%B9%80%E0%B8%AD%E0%B8%B4%E0%B8%8D%20-%20BASHER.mp3&quality=sd&token1=99d033d2c0aaaf1ac02a0802893f1918&token2=1575131338&isPhoto=false" type="audio/mp3" />
                                                                <source src="/path/to/audio.ogg" type="audio/ogg" />
                                                        </audio>
                                                </div>
                                        </div>
                                </div>
                                <div class="expansion-panel list-group-item">
                                        <a aria-controls="collapseThree" aria-expanded="false" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapseThree" id="headingThree">
                                                <i class="far fa-file-image"></i>รูปภาพ
                                                <div class="expansion-panel-icon ml-3 text-black-secondary">
                                                        <i class="collapsed-show material-icons">keyboard_arrow_down</i>
                                                        <i class="collapsed-hide material-icons">keyboard_arrow_up</i>
                                                </div>
                                        </a>
                                        <div aria-labelledby="headingThree" class="collapse" data-parent="#accordionOne" id="collapseThree">
                                                <div class="expansion-panel-body">
                                                <img src="https://pixabay.com/get/57e8d7414c51aa14f6d1867dda6d49214b6ac3e456567448762e7bd493/elephant-1822636_1920.jpg" class="img-fluid" alt="Responsive image">
                                                </div>
                                        </div>
                                </div>
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
                                                                <span class="input-group-text" id="video_name"> ชื่อวิดีโอ</span>
                                                        </div>
                                                        <input type="text" class="form-control" aria-label="Default" aria-describedby="video_name">
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
                                                        <div class="custom-file">
                                                                <input type="file" class="custom-file-input" id="video_file" accept="video/*">
                                                                <label class="custom-file-label" for="video_file"></label>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">ปิด</button>
                                                <button type="button" id="save_file_video" class="btn btn-primary">บันทึก</button>
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
                                                                <span class="input-group-text" id="audio_name"> ชื่อเสียง</span>
                                                        </div>
                                                        <input type="text" class="form-control" aria-label="Default" aria-describedby="audio_name">
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
                                                        <div class="custom-file">
                                                                <input type="file" class="custom-file-input" id="audio_file" accept="audio/*">
                                                                <label class="custom-file-label" for="audio_file"></label>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">ปิด</button>
                                                <button type="button" id="save_audio" class="btn btn-primary">บันทึก</button>
                                        </div>
                                </div>
                        </div>
                </div>
                <!--end modal audio -->

                <!-- modal img -->
                <div class="modal fade bd-example-modal-lg" id="file_img" tabindex="-1" role="dialog" aria-labelledby="file_img_label" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="file_img_label"><i class="far fa-file-image"></i> เพิ่มสื่อสารสนเทศรูปภาพ</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                </button>
                                        </div>
                                        <div class="modal-body">
                                                <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                                <span class="input-group-text" id="image_name"> ชื่อรูปภาพ</span>
                                                        </div>
                                                        <input type="text" class="form-control" aria-label="Default" aria-describedby="image_name">
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
                                                                <input type="file" class="custom-file-input" id="image_file" accept="image/*">
                                                                <label class="custom-file-label" for="image_file"></label>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">ปิด</button>
                                                <button type="button" id="save_image" class="btn btn-primary">บันทึก</button>
                                        </div>
                                </div>
                        </div>
                </div>
                <!--end modal img -->
</body>

</html>