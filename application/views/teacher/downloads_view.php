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
        echo assets_css('bootstrap_css/bootstrap-clockpicker.min.css');
        echo assets_js('aegis_js/te_downloads.js');
        echo assets_js('bootstrap_js/bootstrap-clockpicker.min.js');
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

        <!-- Modal -->
        <div class="modal fade" id="addMenudownload" tabindex="-1" role="dialog" aria-labelledby="addMenudownloadLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                        <div class="modal-content">
                                <div class="modal-header">
                                        <h5 class="modal-title" id="addMenudownloadLabel">เพิ่มเมนูอัปโหลด</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                        </button>
                                </div>
                                <div class="modal-body">
                                        <div class="floating text-left">
                                                <!-- <label for="CMenudownload">ชื่อเมนู อัปโหลด</label> -->
                                                <input aria-describedby="CMenudownloadHelp" class="form-control" id="CMenudownload" placeholder="ชื่อเมนู อัปโหลด" type="text">
                                                <div class="invalid-feedback">
                                                        *กรุณากรอกชื่อเมนู
                                                </div>
                                        </div>
                                        <form>
                                                <div class="row mt-3 mb-3">
                                                        <div class="col-7">
                                                                <label for="datePick">
                                                                        <input class="form-control text-black" name="pickdatelabel" id="datePick" placeholder="Pick a date" type="text">
                                                                </label>
                                                        </div>
                                                        <div class="col">
                                                                <div class="input-group clockpicker" data-placement="left" data-align="top" data-autoclose="true">
                                                                        <input type="text" class="form-control" id="timePick" placeholder="Pick a time">
                                                                        <span class="input-group-addon">
                                                                                <span class="glyphicon glyphicon-time"></span>
                                                                        </span>
                                                                </div>
                                                        </div>
                                                </div>
                                        </form>
                                        <div class="input-group mt-4" id="summernote">
                                                <!-- <textarea class="form-control" id="discription_menu" placeholder="รายละเอียดเมนู อัปโหลด" rows="10"></textarea> -->
                                        </div>
                                </div>
                                <div class="modal-footer">
                                        <button type="button" id="btnModalClose" class="btn btn-secondary" data-dismiss="modal">ปิด</button>
                                        <button type="button" id="btnModalSave" class="btn btn-primary">สร้าง</button>
                                </div>
                        </div>
                </div>
        </div>

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


        <div class="col text-center mt-3">
                <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
                        <div class="navbar-brand" href="#">
                                <span style="font-size: 1.2em;">
                                        <i class="fas fa-chalkboard"></i></span>
                                <span style="font-size: 0.8em;">
                                        &nbsp; อัปโหลด
                                </span>
                        </div>
                        <!-- <form class="form-inline">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn btn-secondary my-2 my-sm-0" type="submit">
                                <span style="font-size: 1.1em;">
                                        <i class="fas fa-search"></i></span>
                                &nbsp;ค้นหา
                        </button>
                </form> -->
                        <button class="btn btn btn-secondary my-2 my-sm-0" data-toggle="modal" id="Modal_Add" data-target="#addMenudownload">
                                <span style="font-size: 1.1em;">
                                        <i class="fas fa-plus"></i></span>
                                &nbsp;เพิ่มเมนูอัปโหลด
                        </button>
                </nav>

                <div class="container-fluid mx-auto text-left">
                        <ul class="nav nav-justified nav-tabs mt-3" id="justifiedTab" role="tablist">
                                <li class="nav-item">
                                        <a aria-controls="home" aria-selected="true" class="nav-link active" data-toggle="tab" href="#home" id="home-tab" role="tab">เมนูไฟล์</a>
                                </li>
                                <li class="nav-item">
                                        <a aria-controls="profile" aria-selected="false" class="nav-link" data-toggle="tab" href="#profile" id="profile-tab" role="tab">แสดงเฉพาะไฟล์</a>
                                </li>
                        </ul>
                        <div class="tab-content" id="justifiedTabContent">
                                <div aria-labelledby="home-tab" class="tab-pane fade show active" id="home" role="tabpanel">
                                        <div class="list-group mt-3 showMenuDownload" id="accordionOne">
                                        </div>
                                </div>
                                <div aria-labelledby="profile-tab" class="tab-pane fade" id="profile" role="tabpanel">
                                        <div class="jumbotron jumbotron-fluid mt-3">

                                        </div>
                                </div>
                        </div>
                </div>


</body>

</html>