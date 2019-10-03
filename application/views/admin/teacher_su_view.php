<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php echo assets_js('aegis_js/manage_su/su_teacher.js'); ?>
</head>

<body>
    <div class="col text-center mt-3">
        <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
            <div class="navbar-brand" href="#">
                <span style="font-size: 1.2em;">
                    <i class="fas fa-tachometer-alt"></i></span>
                <span style="font-size: 0.8em;">
                    &nbsp;จัดการข้อมูลอาจารย์
                </span>
            </div>
            <form class="form-inline">
                <input class="form-control mr-sm-2" id="SearchName" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn btn-secondary my-2 my-sm-0" id="btnSearch" type="submit">
                    <span style="font-size: 1.1em;">
                        <i class="fas fa-search"></i></span>
                    &nbsp;ค้นหา
                </button>
            </form>
        </nav>



        <!-- Modal -->
        <div class="modal fade text-left" id="Modal" tabindex="-1" role="dialog" aria-labelledby="Modal" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">เพิ่มข้อมูลอาจารย์</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <form id="Teacher_Form_add">
                        <div class="modal-body">
                            <form class="needs-validation" novalidate>
                                <div class="form-row">
                                    <div class="col-md-4 mb-3">
                                        <label>ID Teacher</label>
                                        <input type="text" type="text" id='id_teacher' name='id_teacher' class="form-control" placeholder="ID Teacher">
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <label>First Name</label>
                                        <input type="text" type="text" id='name_teacher' name='name_teacher' class="form-control" placeholder="First Name">
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <label for="validationTooltip02">Last Name</label>
                                        <input type="text" class="form-control" id='lastname_teacher' name='lastname_teacher' placeholder="Last Name" required>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-md-4 mb-3">
                                        <label for="validationTooltip02">Email</label>
                                        <input type="text" class="form-control" id='email_teacher' name='email_teacher' placeholder="Email" required>
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <label for="validationTooltip03">Username</label>
                                        <input type="text" class="form-control" id='username_teacher' name='username_teacher' placeholder="Username" required>
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <label>Major</label>
                                        <select class="custom-select mr-sm-2" id="Major_Form_add_option">

                                        </select>
                                    </div>
                                </div>
                            </form>
                            <div class="form-row">
                                <div class="col-md-4 mb-3">
                                    <label>Permission</label>
                                    <select class="form-control" id="Permission_Form_add_option">

                                    </select>
                                </div>
                            </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal"> ปิด </button>
                    <button type="button" id="btnSave" class="btn btn-primary"> เพิ่มข้อมูลอาจารย์ </button>
                </div>
            </div>
        </div>
    </div>
    <!-- End Modal -->

    <!-- Modal Delete-->
    <div class="modal fade text-left" id="modaldel" tabindex="-1" role="dialog" aria-labelledby="modaldel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">ยืนยันการลบข้อมูล</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">ปิด</button>
                    <button type="button" class="btn btn-primary" id="btnDel">ลบข้อมูล</button>
                </div>
            </div>
        </div>
    </div>
    <!-- End Modal -->


    <div class="container-fluid mt-3" style="max-height: auto; min-width: 335px;">

        <div class="card mt-3 text-left">
            <div class="card-header d-flex pr-0">
                <h5 class="card-title mb-0">ข้อมูลอาจารย์</h5>
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
                                    <input type="checkbox" class="custom-control-input" name="selectall" id="selectall">
                                    <label class="custom-control-label" for="selectall"> ID Teacher </label>
                                </div>
                            </th>
                            <th scope="col">EName</th>
                            <th scope="col">TName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Major</th>
                            <th scope="col">Permission</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody id="ShowTeacherTable">

                    </tbody>
                </table>
            </div>
            <hr class="my-0 w-100">
            <div class="card-actions align-items-center justify-content-end">
                <span class="align-self-center mb-1 mx-1 text-muted">Rows per page:</span>
                <div class="dropdown">
                    <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline dropdown-toggle row_active" data-toggle="dropdown" type="button" id="row_active">10</button>
                    <div class="dropdown-menu dropdown-menu-right menu" id="rowsetmenu">
                        <button class="dropdown-item row_set" value="10">10</button>
                        <button class="dropdown-item row_set" value="25">25</button>
                        <button class="dropdown-item row_set" value="50">50</button>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item row_set" value="">Show all</a>
                    </div>
                </div>
                <span class="align-self-center mb-1 mr-2 text-muted" id="showstart_limit">1-10 of 300</span>
                <a class="btn btn-outline" id="chevron_left"><i class="material-icons">chevron_left</i></a>
                <a class="btn btn-outline" id="chevron_right"><i class="material-icons">chevron_right</i></a>
            </div>
        </div>
    </div>
</body>

</html>