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
    echo assets_js('aegis_js/manage_te/te_point_special.js');
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

    <style>
        .picker-day-today {
            color: #2196f3;
        }

        .picker-day.picker-day-selected {
            background-color: #2196f3;
        }

        btn-flat-primary,
        .btn-flat-primary:active,
        .btn-flat-primary:focus,
        .btn-flat-primary:hover,
        .btn-outline-primary,
        .btn-outline-primary:active,
        .btn-outline-primary:focus,
        .btn-outline-primary:hover {
            color: #2196f3;
        }

        .picker-date-display {
            background-color: #2196f3;
        }
    </style>
</head>

<body>

    <!-- Modal Delete MENUPoint-->
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
                    <button type="button" class="btn btn-danger" id="DeleteMenu">ลบข้อมูล</button>
                    <button type="button" class="btn btn-info" data-dismiss="modal">ปิด</button>
                </div>
                <div class="modal-footer">

                </div>
            </div>
        </div>
    </div>
    <!-- End Modal Delete -->

    <!-- Modal Delete Point Student -->
    <div class="modal fade" id="ModalDeletePS" tabindex="-1" role="dialog" aria-labelledby="ModalDeletePS" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalDeletePS">ยืนยันการลบข้อมูล (<span id="txtDelPS"> </span>)</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <button type="button" class="btn btn-danger" id="DeletePS">ลบข้อมูล</button>
                    <button type="button" class="btn btn-info" data-dismiss="modal">ปิด</button>
                </div>
                <div class="modal-footer">

                </div>
            </div>
        </div>
    </div>
    <!-- End Modal Delete -->

    <!-- Modal Add -->
    <div class="modal fade bd-example-modal-lg" id="ModaladdMenuSPoint" tabindex="-1" role="dialog" aria-labelledby="addMenuSPointModal" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <form id="AnnouceForm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addMenuSPointModal">เพิ่มเมนูแลกคะแนน</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="Textarea">หัวข้อเมนูแลกคะแนน</label>
                            <input class="form-control" id="Headtext">
                        </div>

                        <div class="form-group">
                            <label for="Textarea">จำนวนวิชาที่นักศึกษาแลกคะแนนได้</label>
                            <input class="form-control" id="NumSubject"></input>
                        </div>

                        <div class="form-group">
                            <label for="Textarea">ช่องคะแนนในการแลก</label>
                            <select class="form-control" id="SelectSetpoint">
                                <option>Sum1</option>
                                <option>Sum2</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="EndDatePicker"><span class="text-info"> <i class="far fa-calendar-alt"></i></span> <span class="text-black">เลือกวันสิ้นสุดการขอแลกคะแนน </span>
                                <input class="form-control text-black" id="EndDatePicker" name="EndDatePicker" placeholder="yyyy-mm-dd" type="text"></label>
                        </div>

                        <div class="form-row mt-4">
                            <div class="col">
                                <label for="Textarea">เพิ่มวิชาที่ไม่ได้เปิดวิชาประจำเทอมในระบบ</label>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="col-md-4 mb-3">
                                <label>คณะ</label>
                                <select id="SelectFacultyAdd" class="form-control">
                                    <!-- <option selected>Choose...</option>
                                    <option>...</option> -->
                                </select>

                            </div>
                            <div class="col-md-4 mb-3">
                                <label>สาขา</label>
                                <select id="SelectMajorAdd" class="form-control">
                                    <!-- <option selected>Choose...</option>
                                    <option>...</option> -->
                                </select>

                            </div>
                            <div class="col-md-4 mb-3">
                                <label>วิชา</label>
                                <select id="SelectSubjectAdd" class="form-control">
                                    <!-- <option selected>Choose...</option>
                                    <option>...</option> -->
                                </select>

                            </div>
                        </div>

                        <div class="form-row">
                            <div class="col-md-4 mb-3">
                                <button type="button" class="btn btn-info btn-sm" id="AddSub">เพิ่มวิชา</button>
                                <button type="button" class="btn btn-info btn-sm" id="AddsubAll">เพิ่มทั้งหมด</button>
                            </div>
                        </div>


                        <div class="form-group">
                            <label for="SubjectJoin">รายชื่อวิชาที่เพิ่ม</label>
                            <select multiple class="form-control" id="SubjectAdd">

                            </select>
                        </div>

                        <div class="form-row">
                            <div class="col-md-4 mb-3">
                                <button type="button" class="btn btn-danger btn-sm" id="DelSub">ลบวิชาที่เลือก</button>
                                <button type="button" class="btn btn-danger btn-sm" id="DelsubAll">ลบทั้งหมด</button>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-dark" id="btnclose" data-dismiss="modal">ปิด</button>
                        <button type="button" class="btn btn-info" id="btnsave">บันทึกข้อมูล</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- End Modal Add -->

    <div class="col text-center mt-3">
        <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
            <div class="navbar-brand" href="#">
                <span style="font-size: 1.2em;">
                    <i class="fas fa-chalkboard"></i></span>
                <span style="font-size: 0.8em;">
                    &nbsp; SPECIAL POINT
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
            <button class="btn btn btn-info my-2 my-sm-0" id="Modaladd">
                <span style="font-size: 1.1em;">
                    <i class="fas fa-plus"></i></span>
                &nbsp; เพิ่มเมนูแลกคะแนน
            </button>
        </nav>




        <div class="container-fluid mx-auto">

            <ul class="nav nav-justified nav-tabs mt-3" id="justifiedTab" role="tablist">
                <li class="nav-item">
                    <a aria-controls="home" aria-selected="true" class="nav-link active" data-toggle="tab" href="#home" id="home-tab" role="tab">เมนูแลกคะแนน</a>
                </li>
                <li class="nav-item">
                    <a aria-controls="profile" aria-selected="false" class="nav-link" data-toggle="tab" href="#profile" id="profile-tab" role="tab">นักศึกษาขอแลกคะแนน</a>
                </li>
            </ul>
            <div class="tab-content" id="justifiedTabContent">
                <div aria-labelledby="home-tab" class="tab-pane fade show active" id="home" role="tabpanel">
                    <div class="list-group mt-3" id="accordionMenu">

                    </div>
                </div>

                <div aria-labelledby="profile-tab" class="tab-pane fade show" id="profile" role="tabpanel">
                    <div class="list-group mt-3" id="accordionStdRequest">

                        <div class="expansion-panel list-group-item show">
                            <a aria-controls="collapse0" aria-expanded="true" class="expansion-panel-toggler text-left" data-toggle="collapse" href="#collapse0" id="PS001">
                                <div class="d-flex justify-content-start">
                                    <span class="text-left"> TEST </span>
                                </div>
                                <div class="expansion-panel-icon ml-3 text-black-secondary"><i class="collapsed material-icons">keyboard_arrow_down</i><i class="collapsed-hide material-icons">keyboard_arrow_up</i></div>
                            </a>

                            <div aria-labelledby="PS001" class="collapse show" data-parent="#accordionStdRequest" id="collapse0">

                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </div>

</body>

</html>