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
    <?php echo assets_js('aegis_js/std_score_request.js'); ?>
</head>

<body>
    <!-- MODAL_SHOW_POINT -->
    <div class="modal fade bd-example-modal-lg" id="showPoint" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <form>
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="showPointLabel">Show Score</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" id="showPointZone">

                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- END MODAL_SHOW_POINT -->


    <div class="col text-center mt-3">
        <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
            <div class="navbar-brand" href="#">
                <span style="font-size: 1.2em;">
                    <i class="fas fa-chalkboard"></i></span>
                <span style="font-size: 0.8em;">
                    &nbsp; แลกคะแนนพิเศษ
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


        <div class="container-fluid mx-auto">

            <ul class="nav nav-justified nav-tabs mt-3" id="justifiedTab" role="tablist">
                <li class="nav-item">
                    <a aria-controls="home" aria-selected="true" class="nav-link active" data-toggle="tab" href="#home" id="home-tab" role="tab">เมนูแลกคะแนนพิเศษ</a>
                </li>
                <li class="nav-item">
                    <a aria-controls="profile" aria-selected="false" class="nav-link" data-toggle="tab" href="#profile" id="profile-tab" role="tab">ผลการขอแลกคะแนน</a>
                </li>
            </ul>
            <div class="tab-content" id="justifiedTabContent">
                <div aria-labelledby="home-tab" class="tab-pane fade show active" id="home" role="tabpanel">
                    <div class="list-group mt-3" id="accordionMenu">

                        <!-- <div class="expansion-panel list-group-item">
                <a aria-controls="collapse" aria-expanded="true" class="expansion-panel-toggler collapsed text-left" data-toggle="collapse" href="#collapse" id="response[i].menuPS_id">
                    <div class="d-flex justify-content-start">
                        <span style="font-size: 17px; color: blue;">
                            <i class="fas fa-tools mr-2" id="iconEdit" value="i" title="แก้ไขประกาศ"> </i>
                        </span>
                        <span style="font-size: 17px; color: red;">
                            <i class="fas fa-trash-alt mr-2" id="iconDelete" value="i" title="ลบประกาศ"> </i>
                        </span>
                        <span class="text-left"> response[i].menuPS_header </span>
                    </div>
                    <div class="expansion-panel-icon ml-3 text-black-secondary">
                        <i class="collapsed material-icons">keyboard_arrow_down</i>
                        <i class="collapsed-hide material-icons">keyboard_arrow_up</i>
                    </div>
                </a>
                <div aria-labelledby="response[i].menuPS_id" class="collapse" data-parent="#accordionMenu" id="collapse">
                    <div class="expansion-panel-body text-left">
                        response[i].menuPS_subject
                    </div>
                </div>
            </div> -->

                    </div>
                </div>

                <div aria-labelledby="profile-tab" class="tab-pane fade show" id="profile" role="tabpanel">
                    <div class="list-group mt-3" id="accordionTeacherConfirm">

                        <div class="expansion-panel list-group-item show">
                            <a aria-controls="collapse0" aria-expanded="true" class="expansion-panel-toggler text-left" data-toggle="collapse" href="#collapse0" id="PS001">
                                <div class="d-flex justify-content-start">
                                    <span class="text-left"> TEST </span>
                                </div>
                                <div class="expansion-panel-icon ml-3 text-black-secondary"><i class="collapsed material-icons">keyboard_arrow_down</i><i class="collapsed-hide material-icons">keyboard_arrow_up</i></div>
                            </a>

                            <div aria-labelledby="PS001" class="collapse show" data-parent="#accordionTeacherConfirm" id="collapse0">
                                   
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <div style="display:none">
            <div id="tableScoreZone">
                <table class="table table-hover">
                    <thead id="theadScoreZone">
                    </thead>
                    <tbody id="tbodyScoreZone">
                    </tbody>
            </div>
        </div>

</body>

</html>