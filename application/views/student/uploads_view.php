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
        echo assets_js('aegis_js/uploads_drag_drop.js');
        ?>
</head>

<body>
        <div class="col text-center mt-3">
                <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
                        <div class="navbar-brand" href="#">
                                <span style="font-size: 1.2em;">
                                        <i class="fas fa-chalkboard"></i></span>
                                <span style="font-size: 0.8em;">
                                        <!-- &nbsp; อัปโหลด -->
                                        &nbsp; <span id="header"></span>
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
                </nav>

                <div class="container-fluid mx-auto text-left">
                        <ul class="nav nav-justified nav-tabs mt-3" id="justifiedTab" role="tablist">
                                <li class="nav-item">
                                        <a aria-controls="home" aria-selected="true" class="nav-link active" data-toggle="tab" href="#home" id="home-tab" role="tab">อัปโหลดไฟล์</a>
                                </li>
                                <li class="nav-item">
                                        <a aria-controls="uploaded" aria-selected="false" class="nav-link" data-toggle="tab" href="#uploaded" id="uploaded-tab" role="tab">ไฟล์อัปโหลดแล้ว</a>
                                </li>
                        </ul>
                        <div class="tab-content" id="justifiedTabContent">
                                <div aria-labelledby="home-tab" class="tab-pane fade show active" id="home" role="tabpanel">
                                        <div class="list-group mt-3 showMenuUpload" id="accordionOne">
                                        </div>
                                </div>
                                <div aria-labelledby="uploaded-tab" class="tab-pane fade" id="uploaded" role="tabpanel">
                                                <div class="list-group mt-3 showfilesupload" id="accordiontwo">
                                                        
                                                </div>
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
                <!-- End Modal upload -->
</body>

</html>