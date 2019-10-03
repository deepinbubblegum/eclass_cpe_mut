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
    echo assets_js('aegis_js/manage_te/te_menu_point.js');
    ?>

</head>

<body>
    <div class="col text-center mt-3">
        <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
            <div class="navbar-brand" id="txt_title" href="#">
                <span style="font-size: 1.2em;">
                    <i class="fas fa-tachometer-alt"></i></span>
                <span class="txt" id="txtsubject_name" style="font-size: 0.8em;">
                    &nbsp;รายวิชา
                </span>
            </div>
            <div class="form-inline">
                <input class="form-control mr-sm-2" id="SearchName" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-primary my-2 my-sm-0 mr-1 ml-1" id="btnSearch">
                    <span style="font-size: 1.1em;">
                        <i class="fas fa-search"></i></span>
                    &nbsp;ค้นหา
                </button>
                <button class="btn btn-primary my-2 my-sm-0 mr-1 ml-1" id="btnAdd">
                    <span style="font-size: 1.1em;">
                    </span>
                    &nbsp;เพิ่ม
                </button>
            </div>
        </nav>

        <!-- Modal Add Card -->
        <div class="modal fade text-left" id="Modal" tabindex="-1" role="dialog" aria-labelledby="Modal" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">เพิ่มข้อมูล</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <form id="Subject_semester_Form_add">
                        <div class="modal-body">
                            <form class="needs-validation" novalidate>
                                <div class="form-row">
                                    <div class="col-md-4 mb-3">
                                        <label>FullName</label>
                                        <input type="text" class="form-control" id="FullName" placeholder="Lecture01">
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <label>MiniName</label>
                                        <input type="text" class="form-control" id="MiniName" placeholder="Lec01">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" id="btnSave" class="btn btn-primary">เพิ่มช่องคะแนน</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Modal -->

        <!-- Modal Add Point -->
        <div class="modal fade text-left" id="Modal_Add_Point" tabindex="-1" role="dialog" aria-labelledby="Modal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">กรอกคะแนน</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <form id="Form_Add_Point">
                        <div class="modal-body">
                            <form class="needs-validation" novalidate>
                                <div class="form">
                                    <label>คะแนนที่ได้</label>
                                    <input type="text" class="form-control" id="Point" placeholder="คะแนน" value="1">
                                    <label>รหัสนักศึกษา</label>
                                    <input type="text" class="form-control" id="id_std" placeholder="59xxxxxxx" value="">
                                </div>
                            </form>
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" id="btnAddPoint" class="btn btn-primary">เพิ่มคะแนน</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Modal -->

        <!-- Modal Show Point -->
        <div class="modal fade text-left" id="Modal_Show_Point_Student" tabindex="-1" role="dialog" aria-labelledby="Modal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">กรอกคะแนน</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <form>
                        <div class="modal-body table-responsive">
                            <table class="table table-striped" id="table_point_std">
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" name="selectall" id="selectall">
                                                <label class="custom-control-label" for="selectall"> รหัสนักศึกษา </label>
                                            </div>
                                        </th>
                                        <th scope="col">คะแนนที่ได้</th>
                                    </tr>
                                </thead>
                                <tbody id="Form_Show_Point_Student">

                                </tbody>
                            </table>
                            <button class="btn btn-primary my-2 my-sm-0 mr-1 ml-1" id="btnDelete_point_std"> ลบข้อมูล </button>
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Modal -->

        <span>
            <input type="hidden" id="semester" value="<?php echo $_GET['semester']; ?>">
            <input type="hidden" id="subject" value="<?php echo $_GET['subject']; ?>">
            <input type="hidden" id="menu_id" value="<?php echo $_GET['id']; ?>">
        </span>

        <div class="container-fluid mt-3" id="ShowDataPoint" style="max-height: auto; min-width: 335px;">

        </div>

</body>

</html>