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
    echo assets_js('aegis_js/manage_te/te_add_user_data.js');
    ?>
    <style>
        .modal-dialog {
            overflow-y: initial !important
        }

        .modal-body {
            max-height: calc(100vh - 150px);
            overflow-y: auto;
        }
    </style>
</head>

<body>
    <div class="col text-center mt-3">
        <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
            <div class="navbar-brand" href="#">
                <span style="font-size: 1.2em;">
                    <i class="fas fa-tachometer-alt"></i></span>
                <span style="font-size: 0.8em;">
                    &nbsp;<span class="title-name" id="titleNameTxt">TITLE_NAME</span>
                </span>
            </div>
            <div class="form-inline">
                <span style="font-size: 1.2em;">
                    &nbsp;<span id="findByTxt">FIND_BY</span>&nbsp;
                </span>
                <select class="custom-select mr-sm-2" id="select_search">
                    <!-- dropSearch(); -->
                    <option>SELECT_SEARCH_TEXT</option>
                </select>
                <input class="form-control mr-sm-2" id="SearchName" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn btn-secondary my-2 my-sm-0" id="btnSearch">
                    <span style="font-size: 1.1em;">
                        <i class="fas fa-search"></i>
                        <span id="btnFindTxt">BTN_FIND_TEXT</span>
                    </span>
                </button>
            </div>
        </nav>

        <!-- Modal log_csv-->
        <div class="modal fade text-left" id="log_csv_error" tabindex="-1" role="dialog" aria-labelledby="log_csv_error" aria-hidden="true" data-keyboard="false">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="header_log"><i class="fas fa-exclamation-triangle"></i> แจ้งเตือนข้อมูลผิดพลาด</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="table text-nowrap">
                            <table class="table mb-0" style="overflow-y: scroll; max-height:85%; margin-top: 50px; margin-bottom:50px;">
                                <thead>
                                    <tr>
                                        <th scope="col">Error Line</th>
                                        <th scope="col">ST_CODE</th>
                                        <th scope="col">SECT_CODE</th>
                                        <th scope="col">Log_error</th>
                                    </tr>
                                </thead>
                                <tbody id='log_error_tr'>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>
        <!-- End Modal -->

        <!-- Modal -->
        <div class="modal fade text-left" id="Modal" tabindex="-1" role="dialog" aria-labelledby="Modal" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="saveModalTxt">SAVE_MODAL_TITLE</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <form id="formAdd">
                        <!--EDIT_FORM_ADD -->
                        <div class="modal-body">
                            <form class="needs-validation" novalidate>
                                <div id="inModelBody">
                                    <!-- inModelGen(); -->
                                </div>
                            </form>
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" id="btnSave" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Modal -->

        <!-- Modal CSV-->
        <div class="modal fade text-left" id="Modalcsv" tabindex="-1" role="dialog" aria-labelledby="Modalcsv" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="saveModalTxt">เพิ่มไฟล์ CSV</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <form class="needs-validation" novalidate>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Upload</span>
                                </div>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="inputFile" name="inputFile" enctype="multipart/form-data" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                    <label class="custom-file-label" for="inputFile">Choose file</label>
                                </div>
                                <!-- <div class="col-md-4 mb-3">
                                    <label>Permission</label>
                                    <select id="permissionSelectAddcsv" class="form-control"></select>
                                </div> -->
                            </div>
                        </form>

                        <div class="progress mt-2" id="progressupload">
                        </div>

                        <ul class="list-group mt-2" id="filedetail">
                        </ul>

                    </div>
                    <div class="modal-footer">
                        <button type="button" id="btnClose" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" id="btnUpload" class="btn btn-primary">Upload</button>
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
                        <h4 class="modal-title" id="delModalTxt">DELETE_MODAL_TITLE</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" id="btnDel" class="btn btn-primary">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Modal -->

        <div class="container-fluid mt-3" style="max-height: auto; min-width: 335px;">

            <div class="card mt-3 text-left">
                <div class="card-header d-flex pr-0" id="table-title">
                    <h5 class="card-title mb-0"><span id="tableTitleTxt">TABLE_TITLE</span></h5>
                    <div class="card-actions ml-auto py-0">
                        <div class="dropdown">
                            <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline my-0" data-toggle="dropdown" id="cardTableDrop2" type="button"><i class="material-icons">more_vert</i></button>
                            <div aria-labelledby="cardTableDrop2" class="dropdown-menu dropdown-menu-right menu">
                                <a class="dropdown-item" id="btnAdd">Add</a>
                                <a class="dropdown-item" id="btnAddcsv">Add (File csv)</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" data-toggle="modal" data-target="#modaldel">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table mb-0">
                        <thead id="tableHead">
                            <!-- theadGen(); -->
                        </thead>
                        <tbody id="showAllData">
                            <!-- show_data(); -->
                        </tbody>
                    </table>
                </div>
                <hr class="my-0 w-100">
                <div class="card-actions align-items-center justify-content-end">
                    <span class="align-self-center mb-1 mx-1 text-muted" id="rowPerPageTxt">ROW_PER_PAGE_TEXT</span>
                    <div class="dropdown">
                        <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline dropdown-toggle row_active" data-toggle="dropdown" type="button" id="row_active">10</button>
                        <div class="dropdown-menu dropdown-menu-right menu" id="rowsetmenu">
                            <!-- dropPag(); -->
                        </div>
                    </div>
                    <span class="align-self-center mb-1 mr-2 text-muted" id="showstart_limit">PAGINATION_BOTTOM_TEXT</span>
                    <a class="btn btn-outline" id="chevron_left"><i class="material-icons">chevron_left</i></a>
                    <a class="btn btn-outline" id="chevron_right"><i class="material-icons">chevron_right</i></a>
                </div>
            </div>
        </div>
</body>

</html>