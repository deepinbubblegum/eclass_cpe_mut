<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <?php echo assets_js('aegis_js/manage_su/su_announce.js') ?>
</head>

<body>
        <div class="col text-center mt-3">
                <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
                        <div class="navbar-brand" href="#">
                                <span style="font-size: 1.2em;">
                                        <i class="fas fa-chalkboard"></i></span>
                                <span style="font-size: 0.8em;">
                                        &nbsp; ประกาศ
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
                                        <a aria-controls="announce" aria-selected="true" class="nav-link active" data-toggle="tab" href="#announce" id="announce-tab" role="tab">ประกาศ</a>
                                </li>
                                <li class="nav-item">
                                        <a aria-controls="announced" aria-selected="false" class="nav-link" data-toggle="tab" href="#announced" id="announced-tab" role="tab">ประกาศแล้ว</a>
                                </li>
                        </ul>
                        <div class="tab-content mt-3 text-left" id="justifiedTabContent">
                                <div aria-labelledby="announce-tab" class="tab-pane fade show active" id="announce" role="tabpanel">
                                        <div class="card">
                                                <div class="card-header">

                                                        <div class="form-row">
                                                                <div class="form-group col-md-8">
                                                                        <div class="floating">
                                                                                <label for="Titlename" class="text-black">ชื่อเรื่อง</label>
                                                                                <input aria-describedby="TitlenameHelp" class="form-control text-black" id="Titlename" placeholder=" ชื่อเรื่อง หรือ ชื่อประกาศ" type="text" autocomplete="off">
                                                                                <div class="invalid-feedback">
                                                                                        *กรุณากำหนดหัวเรื่อง
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                <div class="form-group col-md-4">
                                                                        <div class="floating">
                                                                                <label class="text-black" for="set_e_date">วันสิ้นสุดประกาศ:
                                                                                        <input aria-describedby="set_e_dateHelp" name="pickdatelabel" class="form-control picker-input text-black" id="set_e_date" placeholder="*หากไม่กำหนดเวลาสิ้นสุดหน้าประกาศจะคงอยู่ตลอด" type="date">
                                                                                </label>
                                                                                <div class="invalid-feedback">
                                                                                        *กรุณากำหนดเวลา
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                                <div class="card-body">
                                                        <div class="form-group">
                                                                <div class="input-group">
                                                                        <textarea class="form-control" id="textareacontent" placeholder="รายละเอียดเนื้อหาประกาศ" rows="20"></textarea>
                                                                </div>
                                                        </div>
                                                        <div class="mr-auto text-right">
                                                                <button class="btn btn-success" id="save" type="button">บันทึก</button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                <div aria-labelledby="announced-tab" class="tab-pane fade" id="announced" role="tabpanel">
                                        <div class="list-group mt-3" id="accordionOne">
                                                <div id="show_data_announce"> </div>

                                        </div>
                                </div>

                                <!-- Modal -->
                                <div class="modal fade" id="and_delModal" tabindex="-1" role="dialog" aria-labelledby="and_delModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                        <div class="modal-header">
                                                                <h5 class="modal-title" id="and_delModalLabel">ลบข้อมูล</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                </button>
                                                        </div>
                                                        <div class="modal-body">
                                                                <h5 id="title_anc"></h5>
                                                        </div>
                                                        <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">ปิด</button>
                                                                <button type="button" id="del_anc" value="" class="btn btn-primary">ลบข้อมูล</button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                                <!-- Modal -->
                                <div class="modal fade bd-edit-modal-lg" id="and_editModal" tabindex="-1" role="dialog" aria-labelledby="and_editModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                                <div class="modal-content">
                                                        <div class="modal-header">
                                                                <h5 class="modal-title" id="and_editModalLabel">แก้ไข</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                </button>
                                                        </div>
                                                        <div class="modal-body">
                                                                <div class="form-row">
                                                                        <div class="form-group col-md-8">
                                                                                <div class="floating has-value">
                                                                                        <label for="Titlename">ชื่อเรื่อง</label>
                                                                                        <input aria-describedby="TitlenameHelp" class="form-control" id="Titlename_edit" placeholder=" ชื่อเรื่อง หรือ ชื่อประกาศ" type="text" autocomplete="off">
                                                                                        <div class="invalid-feedback">
                                                                                                *กรุณากำหนดหัวเรื่อง
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                        <div class="form-group col-md-4">
                                                                                <div class="floating">
                                                                                        <label class="text-black" for="set_e_date_edit">เวลาสิ้นสุดประกาศ:
                                                                                                <input aria-describedby="set_e_date_editHelp" name="pickdatelabel" class="form-control picker-input text-black" id="set_e_date_edit" placeholder="*หากไม่กำหนดเวลาสิ้นสุดหน้าประกาศจะคงอยู่ตลอด" type="date">
                                                                                        </label>
                                                                                        <div class="invalid-feedback">
                                                                                                *กรุณากำหนดเวลา
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>

                                                                <div class="input-group">
                                                                        <textarea class="form-control" id="textareacontent_edit" placeholder="รายละเอียดเนื้อหาประกาศ" rows="20"></textarea>
                                                                </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">ปิด</button>
                                                                <button type="button" id="anc_edit_btn" value="" class="btn btn-primary">แก้ไขข้อมูล</button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
</body>

</html>