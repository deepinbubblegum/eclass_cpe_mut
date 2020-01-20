<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <?php
        echo assets_js('aegis_js/manage_te/te_subject.js');
        echo assets_js('jquery_js/jquery-ui.js');
        echo assets_js('cropper_js/cropper.js');
        echo assets_css('cropper_css/cropper.css');
        echo assets_js('jquery_js/jquery-cropper.js');
        ?>

        <style>
                .placeholder {
                        border: 2.5px double gray;
                        /* background-color: white; */
                        -webkit-box-shadow: 0px 0px 10px #888;
                        -moz-box-shadow: 0px 0px 10px #888;
                        box-shadow: 0px 0px 10px #888;
                }

                .hide {
                        display: none;
                }

                img {
                        max-width: 100%;
                }
        </style>
</head>

<body>
        <?php

        //$this->session->unset_userdata('ses_permission');

        //print_r($this->session->userdata());
        ?>
        <!-- Modal -->
        <div class="modal fade bd-example-modal-lg" style="z-index:1000" id="cropper_img" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                                <div class="modal-header">
                                        <!-- <div>
                                                <input type="file" id="file-input">
                                        </div> -->

                                        <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                        <span class="input-group-text">เลือกรูป</span>
                                                </div>
                                                <div class="custom-file">
                                                        <input type="file" class="custom-file-input" id="file-input" accept="image/*" >
                                                        <label class="custom-file-label" id="file-input_label" for="file-input">เลือกไฟล์</label>
                                                </div>
                                        </div>
                                </div>
                                <div class="modal-body">
                                        <div class="row">
                                                <div class="col-sm-8">
                                                        <div class="result img-w" id="display_crop"></div>
                                                </div>
                                                <div class="col img-result">
                                                        <label class="text_lable text-black hide">ตัวอย่าง</label>
                                                        <img class="cropped" src="" alt="">
                                                </div>
                                        </div>

                                </div>
                                <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-target="#cropper_img" data-dismiss="modal">ปิด</button>
                                        <button type="button" id="save_crop" class="btn btn-primary save hide">บันทึก</button>
                                </div>
                        </div>
                </div>
        </div>
        <!-- end Modal -->

        <!-- Modal -->
        <div class="modal fade" id="Modal_Add_subject" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="Modal_Add_subject" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                                <div class="modal-header">
                                        <h4 class="modal-title">เพิ่มข้อมูลวิชาที่เปิดสอนประจำเทอม</h4>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="IconClose"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <form id="Subject_semester_Form_add">
                                        <div class="modal-body">
                                                <form class="needs-validation" novalidate>
                                                        <div class="form-row">
                                                                <div class="col-sm-3 mb-2">
                                                                        <label>Semester</label>
                                                                        <select class="form-control" id="Semester_Form_add_option">

                                                                        </select>
                                                                </div>
                                                                <div class="col-sm mb-2">
                                                                        <label>Subject</label>
                                                                        <select class="form-control" id="Subject_Form_add_option">
                                                                        </select>
                                                                </div>

                                                                <div class="col-sm-2 mb-2">
                                                                        <label>เพิ่มรูปหน้าปก</label>
                                                                        <button type="button" class="btn" id="start_crop">
                                                                                <i class="fas fa-plus-circle"> รูปหน้าปก</i>
                                                                        </button>
                                                                </div>
                                                        </div>

                                                        <div class="form-row mt-3">
                                                                <div class="col-sm-5 mb-2">
                                                                        <div class="custom-control custom-switch mb-2">
                                                                                <input class="custom-control-input" id="customSwitchCopy" type="checkbox">
                                                                                <span class="custom-control-track"></span>
                                                                                <label class="custom-control-label" for="customSwitchCopy">คัดลอกข้อมูลจากวิชาเทอมก่อนหน้า</label>
                                                                        </div>

                                                                        
                                                                </div>

                                                                <div class="col-sm-3 mb-2">
                                                                        <div class="custom-control custom-switch mb-2">
                                                                                <input class="custom-control-input" id="customSwitch" type="checkbox">
                                                                                <span class="custom-control-track"></span>
                                                                                <label class="custom-control-label" for="customSwitch">เพิ่มวิชาเรียนร่วม</label>
                                                                        </div>
                                                                </div>
                                                        </div>

                                                        <div class="form-row mt-1" id="Class_Copy">
                                                                <div class="col-sm mb-1">
                                                                        <label>ปีการศึกษา</label>
                                                                        <select class="form-control" id="SemesterCopy_add_option">

                                                                        </select>
                                                                </div>

                                                                <div class="col-sm mb-1">
                                                                        <label>วิชาที่ต้องการคัดลอกข้อมูล</label>
                                                                        <select class="form-control" id="SubjectCopy_add_option">

                                                                        </select>
                                                                </div>
                                                        </div>

                                                        <div class="form-row mt-3" id="Class_Join">
                                                                <!-- <div class="col-sm mb-1">
                                                                        <label>Subject</label>
                                                                        <select class="form-control" id="SubjectJoin_add_option">

                                                                        </select>
                                                                </div> -->
                                                                <div class="col-sm mb-1">
                                                                        <form>
                                                                                <div class="form-group">
                                                                                        <label for="SubjectJoin_add_option">เพิ่มรายวิชาเรียนร่วม</label>
                                                                                        <select class="form-control" id="SubjectJoin_add_option">

                                                                                        </select>
                                                                                        <span style="font-size: 1.5rem;" id="add_Subjoin">
                                                                                                <span style="color: #ff4081;">
                                                                                                        <a><i class="fas fa-plus-circle"></i></a>
                                                                                                </span>
                                                                                        </span>
                                                                                        <span style="font-size: 1.5rem;" id="add_DelSubjoin">
                                                                                                <span style="color: #ff4081;">
                                                                                                        <a><i class="fas fa-minus-circle"></i></a>
                                                                                                </span>
                                                                                        </span>
                                                                                </div>
                                                                                <div class="form-group">
                                                                                        <label for="SubjectJoin">รายวิชาเรียนร่วมที่เพิ่ม</label>
                                                                                        <select multiple class="form-control" id="SubjectJoin">

                                                                                        </select>
                                                                                </div>
                                                                        </form>
                                                                </div>
                                                        </div>
                                                </form>
                                        </div>
                                </form>
                                <div class="modal-footer">
                                        <button type="button" id="btnCloseAdd" class="btn btn-default" data-dismiss="modal">ปิด</button>
                                        <button type="button" id="btnSave" class="btn btn-primary">เพิ่มวิชา</button>
                                </div>
                        </div>
                </div>
        </div>
        <!-- End Modal -->

        <!-- Modal Edit Subject Join -->
        <div class="modal fade" id="Modal_Edit_subject_join" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="Modal_Edit_subject_join" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                                <div class="modal-header">
                                        <h4 class="modal-title">แก้ไขข้อมูลวิชาเรียนร่วม</h4>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="IconClose"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <form id="Subject_semester_Form_edit">
                                        <div class="modal-body">
                                                <form class="needs-validation" novalidate>
                                                        <div class="form-row">
                                                                <div class="col-sm-3 mb-2">
                                                                        <label>Semester</label>
                                                                        <p id="ShowSemester_Edit"></p>
                                                                </div>
                                                                <div class="col-sm mb-2">
                                                                        <label>Subject</label>
                                                                        <p id="ShowSubject_Edit"></p>
                                                                </div>
                                                        </div>

                                                        <div class="form-row" id="Class_Join">
                                                                <!-- <div class="col-sm mb-1">
                                                                        <label>Subject</label>
                                                                        <select class="form-control" id="SubjectJoin_add_option">

                                                                        </select>
                                                                </div> -->
                                                                <div class="col-sm mb-1">
                                                                        <form>
                                                                                <div class="form-group">
                                                                                        <label for="SubjectJoin_Edit_option">เพิ่มรายวิชาเรียนร่วม</label>
                                                                                        <select class="form-control" id="SubjectJoin_Edit_option">

                                                                                        </select>
                                                                                        <span style="font-size: 1.5rem;" id="Edit_Subjoin">
                                                                                                <span style="color: #ff4081;">
                                                                                                        <a><i class="fas fa-plus-circle"></i></a>
                                                                                                </span>
                                                                                        </span>
                                                                                        <span style="font-size: 1.5rem;" id="Edit_DelSubjoin">
                                                                                                <span style="color: #ff4081;">
                                                                                                        <a><i class="fas fa-minus-circle"></i></a>
                                                                                                </span>
                                                                                        </span>
                                                                                </div>
                                                                                <div class="form-group">
                                                                                        <label for="SubjectJoin_Edit">รายวิชาเรียนร่วมที่เพิ่ม</label>
                                                                                        <select multiple class="form-control" id="SubjectJoin_Edit">

                                                                                        </select>
                                                                                </div>
                                                                        </form>
                                                                </div>
                                                        </div>
                                                </form>
                                        </div>
                                </form>
                                <div class="modal-footer">
                                        <button type="button" id="btnCloseAdd" class="btn btn-default" data-dismiss="modal">ปิด</button>
                                        <button type="button" id="btnSave_EditSubJoin" class="btn btn-primary">แก้ไขวิชาเรียนร่วม</button>
                                </div>
                        </div>
                </div>
        </div>
        <!-- End Modal -->

        <div class="col text-center mt-3">
                <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
                        <div class="navbar-brand" href="#">
                                <span style="font-size: 1.2em;">
                                        <i class="fas fa-chalkboard"></i></span>
                                <span style="font-size: 0.8em;">
                                        &nbsp; รายวิชา
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
                        <form class="form-inline">
                                <select name="yearterm" id="yearterm" class="form-control">

                                </select>

                        </form>
                </nav>

                <div class="container-fluid mx-auto">
                        <div calss="mt-3"> วิชาหลัก </div>
                        <div class="card-deck mt-3" id="showSubject">
                        </div>
                        <div class="navdrawer-divider"></div>
                        วิชาช่วยสอน
                        <div class="card-deck mt-3" id="showSubject_assist">
                        </div>

                        <div class="navdrawer-divider"></div>
                        วิชาพิเศษ
                        <div class="card-deck mt-3" id="showSubject_Special">
                        </div>
                </div>

</body>

</html>