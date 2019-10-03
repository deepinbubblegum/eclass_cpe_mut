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
    <?php echo assets_js('aegis_js/manage_te/te_annouce.js'); ?>
</head>

<body>
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

    <!-- Modal Add -->
    <div class="modal fade bd-example-modal-lg" id="Modal" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <form id="AnnouceForm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="Textarea">หัวข้อประกาศ</label>
                            <input class="form-control" id="Headtext">
                        </div>

                        <div class="form-group">
                            <label for="Textarea">เนื้อหาประกาศ</label>
                            <textarea class="form-control" id="Textarea" rows="5"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="EndDatePicker"><span class="text-info"> <i class="far fa-calendar-alt"></i></span> <span class="text-black">เลือกวันสิ้นสุดประกาศ (หากไม่เลือกวันจะเป็นการประกาศตลอด) </span>
                                <input class="form-control text-black" id="EndDatePicker" name="EndDatePicker" placeholder="yyyy-mm-dd" type="text"></label>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-dark" data-dismiss="modal">ปิด</button>
                        <button type="button" class="btn btn-info" id="save">บันทึกข้อมูล</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- End Modal Add -->


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
                    &nbsp; <span class="titlehearder d-inline-block text-truncate" id="header"></span>
                </span>
            </div>
            <form class="form-inline">
                <button class="btn btn btn-info my-2 my-sm-0" type="submit" id="Add_annouce">
                    <span style="font-size: 1.1em;">
                        <i class="fas fa-plus-circle"></i>
                        &nbsp;เพิ่มข้อมูลข่าวประกาศ
                    </span>
                </button>
            </form>
        </nav>

        <div class="container-fluid mx-auto">

            <ul class="nav nav-justified nav-tabs mt-3" id="justifiedTab" role="tablist">
                <li class="nav-item">
                    <a aria-controls="home" aria-selected="true" class="nav-link active" data-toggle="tab" href="#home" id="home-tab" role="tab">ประกาศ</a>
                </li>
                <li class="nav-item">
                    <a aria-controls="profile" aria-selected="false" class="nav-link" data-toggle="tab" href="#profile" id="profile-tab" role="tab">เพื่อนในชั้นเรียน</a>
                </li>
            </ul>
            <div class="tab-content" id="justifiedTabContent">
                <div aria-labelledby="home-tab" class="tab-pane fade show active" id="home" role="tabpanel">
                    <div class="list-group mt-3" id="accordionOne">

                    </div>
                </div>
                <div aria-labelledby="profile-tab" class="tab-pane fade" id="profile" role="tabpanel">
                    <div class="jumbotron jumbotron-fluid mt-3">
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                        <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                    </div>
                </div>
            </div>
        </div>
</body>

</html>