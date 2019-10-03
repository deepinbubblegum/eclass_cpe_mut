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
        echo assets_css('aegis_css/uploads_drag_drop.css');
        echo assets_js('plyr_js/plyr.js');
        echo assets_js('aegis_js/video_player.js');
        echo assets_js('aegis_js/manage_te/te_video_upload.js');
        ?>

</head>

<body>
        <div class="col text-center mt-3">
                <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
                        <div class="navbar-brand" href="#">
                                <span style="font-size: 1.2em;">
                                        <i class="fas fa-chalkboard"></i></span>
                                <span style="font-size: 0.8em;">
                                        &nbsp; วิดีโอ
                                </span>
                        </div>
                        <button class="btn btn btn-secondary my-2 my-sm-0" data-toggle="modal" data-target="#addMenuVideo">
                                <span style="font-size: 1.1em;">
                                        <i class="fas fa-plus"></i></span>
                                &nbsp;เพิ่มเมนูวิดีโอ
                        </button>
                </nav>
                <!-- Modal -->
                <div class="modal fade" id="addMenuVideo" tabindex="-1" role="dialog" aria-labelledby="addMenuVideoLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="addMenuVideoLabel">เพิ่มเมนูวิดีโอ</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                </button>
                                        </div>
                                        <div class="modal-body">
                                                <div class="floating text-left">
                                                        <!-- <label for="CMenuVideo">ชื่อเมนู วิดีโอ</label> -->
                                                        <input aria-describedby="CMenuVideoHelp" class="form-control" id="CMenuVideo" placeholder="ชื่อเมนู วิดีโอ" type="text">
                                                        <div class="invalid-feedback">
                                                                *กรุณากรอกชื่อเมนู
                                                        </div>
                                                </div>

                                                <div class="input-group mt-3">
                                                        <textarea class="form-control" id="discription_menu" placeholder="รายละเอียดเมนู วิดีโอ" rows="10"></textarea>
                                                </div>
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">ปิด</button>
                                                <button type="button" id="create_menu_video" class="btn btn-primary">สร้าง</button>
                                        </div>
                                </div>
                        </div>
                </div>

                <div class="container-fluid">
                        <div aria-labelledby="home-tab" class="tab-pane fade show active" id="home" role="tabpanel">
                                <div class="list-group mt-3 showMenu_vd_Upload text-left" id="accordionOne">
                                        <div class="expansion-panel list-group-item show">
                                                <a aria-controls="collapseOne" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapseOne" id="headingOne">
                                                        Expansion panel item #1
                                                        <div class="expansion-panel-icon ml-3 text-black-secondary">
                                                                <i class="collapsed-show material-icons">keyboard_arrow_down</i>
                                                                <i class="collapsed-hide material-icons">keyboard_arrow_up</i>
                                                        </div>
                                                </a>
                                                <div aria-labelledby="headingOne" class="collapse show" data-parent="#accordionOne" id="collapseOne">
                                                        <div class="expansion-panel-body">
                                                                <div id="uploads_files">
                                                                        <div id="uploads_files">
                                                                                <div class="dropzone" id="dropzone"><input type="file" id="FileInput[]" style="display:none;" multiple="">
                                                                                        <p class="droptext text-justify text-center font-weight-bold">Drop file here or click to upload</p>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                <div class="dropdown-divider"></div>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="expansion-panel list-group-item">
                                                <a aria-controls="collapseTwo" aria-expanded="false" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapseTwo" id="headingTwo">
                                                        Expansion panel item #2
                                                        <div class="expansion-panel-icon ml-3 text-black-secondary">
                                                                <i class="collapsed-show material-icons">keyboard_arrow_down</i>
                                                                <i class="collapsed-hide material-icons">keyboard_arrow_up</i>
                                                        </div>
                                                </a>
                                                <div aria-labelledby="headingTwo" class="collapse" data-parent="#accordionOne" id="collapseTwo">
                                                        <div class="expansion-panel-body">
                                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="expansion-panel list-group-item">
                                                <a aria-controls="collapseThree" aria-expanded="false" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapseThree" id="headingThree">
                                                        Expansion panel item #3
                                                        <div class="expansion-panel-icon ml-3 text-black-secondary">
                                                                <i class="collapsed-show material-icons">keyboard_arrow_down</i>
                                                                <i class="collapsed-hide material-icons">keyboard_arrow_up</i>
                                                        </div>
                                                </a>
                                                <div aria-labelledby="headingThree" class="collapse" data-parent="#accordionOne" id="collapseThree">
                                                        <div class="expansion-panel-body">
                                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>

                <!-- Modal -->
                <div class="modal fade bd-example-modal-lg" id="modalUploads" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">อัปโหลดวิดีโอ</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                </button>
                                        </div>
                                        <div class="modal-body">
                                                <div id="uploads_files">
                                                        <div id="uploads_files">
                                                                <div class="dropzone" id="dropzone"><input type="file" id="FileInput[]" style="display:none;" multiple="">
                                                                        <p class="droptext text-justify text-center font-weight-bold">Drop file here or click to upload</p>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary">Send message</button>
                                        </div>
                                </div>
                        </div>
                </div>

                <!-- Modal -->
                <div class="modal fade container-fluid" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="video">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalCenterTitle">ชื่อวิดีโอ</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                </button>
                                        </div>
                                        <div class="modal-body">
                                                <video controls crossorigin playsinline poster="https://s3.eu-central-1.amazonaws.com/pipe.public.content/poster.png">
                                                        <source src="<?php echo base_url('video/abc.mp4'); ?>" type="video/mp4" size="720">
                                                        <source src="<?php echo base_url('video/abc.mp4'); ?>" type="video/mp4" size="1080">

                                                        <!-- Caption files -->
                                                        <!-- <track kind="captions" label="English" srclang="en" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt" default>
                                                <track kind="captions" label="Thailand" srclang="th" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"> -->
                                                        <!-- Fallback for browsers that don't support the <video> element -->
                                                        <center class="mt-2" style="font-size: 18px">
                                                                <a href="<?php echo base_url('video/abc.mp4'); ?>" download><i class="far fa-arrow-alt-circle-down"></i> Download</a>
                                                        </center>
                                                </video>
                                                <!-- <video class="embed-responsive embed-responsive-16by9" controls poster="https://s3.eu-central-1.amazonaws.com/pipe.public.content/poster.png">
                                                <source class="embed-responsive-item" src="<?php echo base_url('video/abc.mp4'); ?>" type="video/mp4" />
                                                <p>Web Browser นี้ยังไม่รองรับ HTML Video</p>
                                        </video> -->
                                        </div>
                                        <div class="modal-footer">
                                        </div>
                                </div>
                        </div>
                </div>
</body>

</html>