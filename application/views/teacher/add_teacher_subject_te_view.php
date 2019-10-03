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
    ?>
</head>

<body>
    <div class="col text-center mt-3">
        <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
            <div class="navbar-brand" href="#">
                <span style="font-size: 1.2em;">
                    <i class="fas fa-tachometer-alt"></i></span>
                <span style="font-size: 0.8em;">
                    &nbsp;ข้อมูลอาจารย์ประจำวิชาสอน
                </span>
            </div>
            <div class="form-inline">

                <input class="form-control mr-sm-2" id="SearchName" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-primary my-2 my-sm-0" id="btnSearch">
                    <span style="font-size: 1.1em;">
                        <i class="fas fa-search"></i></span>
                    &nbsp;ค้นหา
                </button>
            </div>
        </nav>

                <!-- Modal -->
                <div class="modal fade text-left" id="Modal" tabindex="-1" role="dialog" aria-labelledby="Modal" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">ข้อมูลอาจารย์ประจำวิชาสอน</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <form id="Teacher_subject_Form_add">
                    <div class="modal-body">
                        <form class="needs-validation" novalidate>
                            <div class="form-row">
                                <div class="col-md-4 mb-3">
                                    <label>Semester</label>
                                    <select class="form-control" id="Semester_Form_add_option">

                                    </select>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label>Subject</label>
                                    <select class="form-control" id="Subject_Form_add_option">

                                    </select>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label>Subject</label>
                                    <select class="form-control" id="Teacher_Form_add_option">

                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    </form>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">ปิด</button>
                        <button type="button" id="btnSave" class="btn btn-primary">เพิ่มอาจารย์</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Modal -->


        <!-- Modal Delete -->
        <div class="modal fade text-left" id="modaldel" tabindex="-1" role="dialog" aria-labelledby="modaldel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">ยืนยันการลบข้อมูล</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        ต้องการลบข้อมูลที่เลือกหรือไม่
                        <br>
                        <button type="button" class="btn btn-default mt-3" data-dismiss="modal">ปิด</button>
                        <button type="button" id="btnDel" class="btn btn-danger mt-3">ลบข้อมูล</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Modal Delete -->


        <div class="container-fluid mt-3" style="max-height: auto; min-width: 335px;">

            <div class="card mt-3 text-left">
                <div class="card-header d-flex pr-0">
                    <h5 class="card-title mb-0">ข้อมูลอาจารย์ประจำวิชาสอน</h5>
                    <div class="card-actions ml-auto py-0">

                        <div class="dropdown">
                            <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline my-0" data-toggle="dropdown" id="cardTableDrop2" type="button"><i class="material-icons">more_vert</i></button>
                            <div aria-labelledby="cardTableDrop2" class="dropdown-menu dropdown-menu-right menu">
                                <a class="dropdown-item" href="#" id="btnAdd">Add</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#modaldel">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table mb-0">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" name="selectall" id="selectall" >
                                        <label class="custom-control-label" for="selectall"> Semester </label>
                                    </div>
                                </th>
                                <th scope="col">Subject</th>
                                <th scope="col">Teacher</th>
                                <th scope="col">Edit</th>
                            </tr>
                        </thead>
                        <tbody id="ShowTeacherSubject">

                        </tbody>
                    </table>
                </div>
                <hr class="my-0 w-100">
                <div class="card-actions align-items-center justify-content-end">
                    <span class="align-self-center mb-1 mx-1 text-muted">Rows per page:</span>
                    <div class="dropdown">
                        <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline dropdown-toggle" data-toggle="dropdown" type="button">3</button>
                        <div class="dropdown-menu dropdown-menu-right menu">
                            <a class="dropdown-item active" href="#">3</a>
                            <a class="dropdown-item" href="#">10</a>
                            <a class="dropdown-item" href="#">100</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Show all</a>
                        </div>
                    </div>
                    <span class="align-self-center mb-1 mr-2 text-muted">1-3 of 300</span>
                    <a class="btn btn-outline" href="#"><i class="material-icons">chevron_left</i></a>
                    <a class="btn btn-outline" href="#"><i class="material-icons">chevron_right</i></a>
                </div>
            </div>

        </div>

</body>

</html>