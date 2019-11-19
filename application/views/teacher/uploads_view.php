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
        echo assets_css('aegis_css/uploads_drag_drop.css');
        echo assets_js('aegis_js/te_uploads.js');
        ?>
        <style>
                .f34r-bg-n-txt {
                        background-color: rgba(0, 150, 136, 0.7);
                        color: white;
                }

                .f34r-txt-white {
                        color: white;
                }

                .f34r-txt-black {
                        color: black;
                }

                .f34r-txt-think {
                        color: rgba(0, 150, 136, 0.7)
                }
        </style>
</head>

<body>
        <div class="col text-center mt-3">
                <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
                        <div class="navbar-brand" href="#">
                                <span style="font-size: 1.2em;">
                                        <i class="fas fa-chalkboard"></i></span>
                                <span style="font-size: 0.8em;">
                                        &nbsp; DOWNLOADS
                                </span>
                        </div>
                        <button class="btn btn btn-secondary my-2 my-sm-0" data-toggle="modal" data-target="#addMenuupload">
                                <span style="font-size: 1.1em;">
                                        <i class="fas fa-plus"></i></span>
                                &nbsp;เพิ่มเมนูดาวน์โหลด
                        </button>
                </nav>
                <!-- Modal Delete -->
                <div class="modal fade" id="ModalDelete" tabindex="-1" role="dialog" aria-labelledby="ModalDelete" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="ModalDelete">ยืนยันการลบข้อมูล (<span id="txtDel"> </span>)</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                </button>
                                        </div>
                                        <div class="modal-body">
                                                <button type="button" class="btn btn-danger" id="Delete">ลบข้อมูล</button>
                                                <button type="button" class="btn btn-info" data-dismiss="modal">ปิด</button>
                                        </div>
                                        <div class="modal-footer">

                                        </div>
                                </div>
                        </div>
                </div>
                <!-- End Modal Delete -->
                <!-- Modal -->
                <div class="modal fade" id="addMenuupload" tabindex="-1" role="dialog" aria-labelledby="addMenuuploadLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="addMenuuploadLabel">เพิ่มเมนูดาวน์โหลด</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                </button>
                                        </div>
                                        <div class="modal-body">
                                                <div class="floating text-left">
                                                        <!-- <label for="CMenuupload">ชื่อเมนู ดาวน์โหลด</label> -->
                                                        <input aria-describedby="CMenuuploadHelp" class="form-control" id="CMenuupload" placeholder="ชื่อเมนู ดาวน์โหลด" type="text">
                                                        <div class="invalid-feedback">
                                                                *กรุณากรอกชื่อเมนู
                                                        </div>
                                                </div>

                                                <div class="input-group mt-3">
                                                        <textarea class="form-control" id="discription_menu" placeholder="รายละเอียดเมนู ดาวน์โหลด" rows="10"></textarea>
                                                </div>
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" id="btnModalClose" class="btn btn-secondary" data-dismiss="modal">ปิด</button>
                                                <button type="button" id="btnModalSave" class="btn btn-primary">สร้าง</button>
                                        </div>
                                </div>
                        </div>
                </div>

                <!-- modal -->
                <div class="modal fade bd-example-modal-lg" id="progress_modal" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static" aria-labelledby="progress_modal" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="progress_modalLabel">
                                                        กำลังอัปโหลดข้อมูล...
                                                </h5>
                                        </div>
                                        <div class="modal-body">
                                                <div id="progressupload"></div>
                                        </div>
                                </div>
                        </div>
                </div>
                <!-- End Modal Delete -->

                <div class="container-fluid mx-auto text-left">
                        <ul class="nav nav-justified nav-tabs mt-3" id="justifiedTab" role="tablist">
                                <li class="nav-item">
                                        <a aria-controls="home" aria-selected="true" class="nav-link active" data-toggle="tab" href="#home" id="home-tab" role="tab">อัปโหลดไฟล์</a>
                                </li>
                                <li class="nav-item">
                                        <a aria-controls="profile" aria-selected="false" class="nav-link" data-toggle="tab" href="#profile" id="profile-tab" role="tab">ไฟล์อัปโหลดแล้ว</a>
                                </li>
                        </ul>
                        <div class="tab-content" id="justifiedTabContent">
                                <div aria-labelledby="home-tab" class="tab-pane fade show active" id="home" role="tabpanel">
                                        <div class="list-group mt-3 showMenuUpload" id="accordionOne">
                                        </div>
                                </div>
                                <div aria-labelledby="profile-tab" class="tab-pane fade" id="profile" role="tabpanel">
                                        <div aria-labelledby="home-tab" class="tab-pane fade show active" id="home" role="tabpanel">
                                                <div class="list-group mt-3 showUploaded" id="accordionTwo">
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
</body>

</html>