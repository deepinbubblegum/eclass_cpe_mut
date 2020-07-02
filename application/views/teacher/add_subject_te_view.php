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
    echo assets_js('aegis_js/manage_te/te_add_subject.js');
    ?>
</head>

<body>
    <div class="col text-center mt-3">
        <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
            <div class="navbar-brand" href="#">
                <span style="font-size: 1.2em;">
                    <i class="far fa-address-card"></i></span>
                <span style="font-size: 0.8em;">
                    &nbsp;รายวิชาสอนประจำเทอมสำหรับหัวหน้ารายวิชา
                </span>
            </div>
            <div class="form-inline">
                <form id="">
                    <span style="font-size: 1.1em;">
                        ปีการศึกษา
                        <select class="form-control mr-3" id="Semester_Form_option">

                        </select>
                    </span>
                </form>
                <input class="form-control mr-sm-2" id="SearchName" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn btn-primary my-2 my-sm-0" id="btnSearch">
                    <span style="font-size: 1.1em;">
                        <i class="fas fa-search"></i></span>
                    &nbsp;ค้นหา
                </button>
            </div>
        </nav>


        <!-- Modal -->
        <div class="modal fade text-left" id="Modal_Add_subject" tabindex="-1" role="dialog" aria-labelledby="Modal" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">เพิ่มข้อมูลวิชาที่เปิดสอนประจำเทอม</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
                                </div>
                            </form>
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">ปิด</button>
                        <button type="button" id="btnSave" class="btn btn-primary">เพิ่มวิชา</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Modal -->

        <div class="container-fluid mt-3" style="max-height: auto; min-width: 335px;">
            <div class="row">
                <div class="col">
                    <button class="btn btn-primary float-left" id="btnAdd">
                        เพิ่มรายวิชาสอนประจำเทอม
                    </button>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col" id="ShowDataSubject">

                </div>
            </div>
        </div>

</body>

</html>