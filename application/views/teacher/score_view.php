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
        <?php echo assets_js('aegis_js/manage_te/te_score.js'); ?>
        <style>
                .f34r-bg-n-txt {
                        background-color: rgba(0, 150, 136, 0.7);
                        color: white;
                }

                .f34r-bg-p-txt{
                        background-color:rgba(153,204,102,1);
                        color: white;
                }

                .f34r-bg-o-txt{
                        background-color:rgba(255,153,102,1);
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
</head>

<body>
        <!-- Modal Add -->
        <div class="modal fade bd-example-modal-lg" id="Modal" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                        <form id="scoreForm">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="ModalLabel">Modal title</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                </button>
                                        </div>
                                        <div class="modal-body">
                                                <div class="form-group">
                                                        <label for="Textarea">หัวข้อคะแนน</label>
                                                        <input class="form-control" id="Headtext">
                                                </div>

                                                <div class="form-group">
                                                        <label for="Textarea">รายละเอียดช่องคะแนน</label>
                                                        <textarea class="form-control" id="Textarea" rows="5"></textarea>
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

        <!-- MODAL_ADD_FIELD -->
        <div class="modal fade bd-example-modal-lg" id="addField" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                        <form id="scoreField">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="addFieldLabel">Modal title</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                </button>
                                        </div>
                                        <div class="modal-body">
                                                <div class="form-group">
 
                                                        <!-- <div class="custom-control custom-radio">
                                                        <input type="radio" class="custom-control-input" id="defaultGroupExample1" name="groupOfDefaultRadios" checked>
                                                        <label class="custom-control-label" for="defaultGroupExample1">แสดงรหัสใบงาน</label>
                                                        </div>
 
                                                        <div class="custom-control custom-radio">
                                                        <input type="radio" class="custom-control-input" id="defaultGroupExample2" name="groupOfDefaultRadios">
                                                        <label class="custom-control-label" for="defaultGroupExample2">แสดงผลการคำนวณตามสูตร</label>
                                                        </div>
 
                                                        <div class="custom-control custom-radio">
                                                        <input type="radio" class="custom-control-input" id="defaultGroupExample3" name="groupOfDefaultRadios">
                                                        <label class="custom-control-label" for="defaultGroupExample3">แสดงคะแนนจากไฟล์รายชื่อนักศึกษา</label>
                                                        </div> -->
                                                        <label for="Textarea">setpoint_option</label>
                                                        <form class="form-inline">
                                                                <select name="optionSet" id="optionSet" class="form-control">
                                                                        <!-- <option value="25611" id="25611">Ticket</option>
                                                                        <option value="25612" id="25612">Formula</option>
                                                                        <option value="25612" id="25612">Import CSV</option> -->
                                                                </select>
                                                        </form>

                                                        <label for="Textarea">setpoint_fullname</label>
                                                        <input class="form-control" id="addFieldFN">
                                                        <label for="Textarea">setpoint_mininame</label>
                                                        <input class="form-control" id="addFieldMN">
                                                        <!-- <label for="Textarea">setpoint_ticket</label> -->
                                                        <!-- <input class="form-control" id="addFieldTK"> --> 
                                                        <label for="Textarea">setpoint_maxpoint</label>
                                                        <input class="form-control" id="addFieldMP">
                                                        <!--  -->
                                                        <div class="custom-control custom-checkbox mt-3 mb-2">
                                                        <input type="checkbox" class="custom-control-input" id="addFieldTK">
                                                        <label class="custom-control-label" for="addFieldTK">เปิดให้กรอกคะแนน</label>
                                                        </div>
                                                        <!--  -->  
                                                </div>

                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-dark" id="fieldClose" data-dismiss="modal">ปิด</button>
                                                <button type="button" class="btn btn-info" id="fieldSave">บันทึกข้อมูล</button>
                                        </div>
                                </div>
                        </form>
                </div>
        </div>
        <!-- End MODAL_ADD_FIELD -->

        <!-- MODAL_GEN_TICKET -->
        <div class="modal fade bd-example-modal-lg" id="genTicket" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                        <form id="genTicketField">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="genTicketLabel">Gen Ticket Modal</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                </button>
                                        </div>
                                        <div class="modal-body">
                                                <div class="form-group">
                                                        <label for="Textarea">Ticket Discription</label>
                                                        <input class="form-control" id="ticket_discrip">
                                                        <label for="Textarea">Ticket Discription</label>
                                                        <input class="form-control" id="ticket_point">
                                                        <label for="Textarea">Number of Ticket</label>
                                                        <input class="form-control" id="ticketNumber">
                                                </div>

                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-dark" id="genTicketClose" data-dismiss="modal">ปิด</button>
                                                <button type="button" class="btn btn-info" id="genTicketSave">บันทึกข้อมูล</button>
                                        </div>
                                </div>
                        </form>
                </div>
        </div>
        <!-- END MODAL_GEN_TICKET -->

        <!-- MODAL_TICKET -->
        <div class="modal fade bd-example-modal-lg" id="addTicket" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                        <form id="ticketField">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="addTicketLabel">Modal title</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                </button>
                                        </div>
                                        <div class="modal-body">
                                                <div class="form-group">
                                                        <label for="Textarea">addTicket_userId</label>
                                                        <input class="form-control" id="addTicketUID">
                                                        <label for="Textarea">addTicket_point</label>
                                                        <input class="form-control" id="addTicketP">
                                                </div>

                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-dark" id="ticketClose" data-dismiss="modal">ปิด</button>
                                                <button type="button" class="btn btn-info" id="ticketSave">บันทึกข้อมูล</button>
                                        </div>
                                </div>
                        </form>
                </div>
        </div>
        <!-- END MODAL_TICKET -->

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
                                        &nbsp; SCORE
                                </span>

                        </div>
                        <form class="form-inline">
                                <button class="btn btn btn-info my-2 my-sm-0" type="submit" id="btnAddScore">
                                        <span style="font-size: 1.1em;">
                                                <i class="fas fa-plus-circle"></i>
                                                &nbsp;เพิ่มเมนูคะแนน
                                        </span>
                                </button>
                        </form>
                </nav>

                <div class="container-fluid mx-auto text-left">
                        <ul class="nav nav-justified nav-tabs mt-3" id="justifiedTab" role="tablist">
                                <li class="nav-item">
                                        <a aria-controls="home" aria-selected="true" class="nav-link active" data-toggle="tab" href="#home" id="home-tab" role="tab">เมนูคะแนน</a>
                                </li>
                                <li class="nav-item">
                                        <a aria-controls="profile" aria-selected="false" class="nav-link" data-toggle="tab" href="#profile" id="profile-tab" role="tab">เมนู</a>
                                </li>
                        </ul>
                        <div class="tab-content" id="justifiedTabContent">
                                <div aria-labelledby="home-tab" class="tab-pane fade show active" id="home" role="tabpanel">
                                        <div class="list-group mt-3 showMenuScore" id="accordionOne">
                                                <div class="expansion-panel list-group-item show">
                                                        <a aria-controls="collapseOne" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapseOne" id="headingOne">
                                                                การบ้านครั้งที่ #1
                                                                <div class="expansion-panel-icon ml-3 text-black-secondary">
                                                                        <i class="collapsed-show material-icons">keyboard_arrow_down</i>
                                                                        <i class="collapsed-hide material-icons">keyboard_arrow_up</i>
                                                                </div>
                                                        </a>
                                                        <div aria-labelledby="headingOne" class="collapse show" data-parent="#accordionOne" id="collapseOne">
                                                                <div class="expansion-panel-body">
                                                                        รายละเอียดการบ้าน
                                                                        <div id="uploads_files">
                                                                                <div id="uploads_files">
                                                                                        <div class="dropzone" id="dropzone"><input type="file" id="FileInput[]" style="display:none;" multiple="">
                                                                                                <p class="droptext text-justify text-center font-weight-bold">Drop file here or click to upload</p>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                        <button class="btn btn-success my-1" id="btnUpload">Upload</button>
                                                                        <button class="btn btn-success my-1" id="btnClearAll">Clear All</button>
                                                                        <div id="uploadeds_files">
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                                <div class="expansion-panel list-group-item">
                                                        <a aria-controls="collapseTwo" aria-expanded="false" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapseTwo" id="headingTwo">
                                                                การบ้านครั้งที่ #2
                                                                <div class="expansion-panel-icon ml-3 text-black-secondary">
                                                                        <i class="collapsed-show material-icons">keyboard_arrow_down</i>
                                                                        <i class="collapsed-hide material-icons">keyboard_arrow_up</i>
                                                                </div>
                                                        </a>
                                                        <div aria-labelledby="headingTwo" class="collapse" data-parent="#accordionOne" id="collapseTwo">
                                                                <div class="expansion-panel-body">
                                                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                                </div>
                                                        </div>
                                                </div>
                                                <div class="expansion-panel list-group-item">
                                                        <a aria-controls="collapseThree" aria-expanded="false" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapseThree" id="headingThree">
                                                                การบ้านครั้งที่ #3
                                                                <div class="expansion-panel-icon ml-3 text-black-secondary">
                                                                        <i class="collapsed-show material-icons">keyboard_arrow_down</i>
                                                                        <i class="collapsed-hide material-icons">keyboard_arrow_up</i>
                                                                </div>
                                                        </a>
                                                        <div aria-labelledby="headingThree" class="collapse" data-parent="#accordionOne" id="collapseThree">
                                                                <div class="expansion-panel-body">
                                                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                <div aria-labelledby="profile-tab" class="tab-pane fade" id="profile" role="tabpanel">
                                        <div aria-labelledby="home-tab" class="tab-pane fade show active" id="home" role="tabpanel">
                                                <div class="list-group mt-3" id="accordionOne">
                                                        <div class="expansion-panel list-group-item show">
                                                                <a aria-controls="collapseOne" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapseOne" id="headingOne">
                                                                        Expansion panel item #1
                                                                        <div class="expansion-panel-icon ml-3 text-black-secondary">
                                                                                <i class="collapsed-show material-icons">keyboard_arrow_down</i>
                                                                                <i class="collapsed-hide material-icons">keyboard_arrow_up</i>
                                                                        </div>
                                                                </a>
                                                                <div aria-labelledby="headingOne" class="collapse show" data-parent="#accordionOne" id="collapseOne">
                                                                        <div class="expansion-panel-body">
                                                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        <div class="expansion-panel list-group-item">
                                                                <a aria-controls="collapseTwo" aria-expanded="false" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapseTwo" id="headingTwo">
                                                                        Expansion panel item #2
                                                                        <div class="expansion-panel-icon ml-3 text-black-secondary">
                                                                                <i class="collapsed-show material-icons">keyboard_arrow_down</i>
                                                                                <i class="collapsed-hide material-icons">keyboard_arrow_up</i>
                                                                        </div>
                                                                </a>
                                                                <div aria-labelledby="headingTwo" class="collapse" data-parent="#accordionOne" id="collapseTwo">
                                                                        <div class="expansion-panel-body">
                                                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        <div class="expansion-panel list-group-item">
                                                                <a aria-controls="collapseThree" aria-expanded="false" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapseThree" id="headingThree">
                                                                        Expansion panel item #3
                                                                        <div class="expansion-panel-icon ml-3 text-black-secondary">
                                                                                <i class="collapsed-show material-icons">keyboard_arrow_down</i>
                                                                                <i class="collapsed-hide material-icons">keyboard_arrow_up</i>
                                                                        </div>
                                                                </a>
                                                                <div aria-labelledby="headingThree" class="collapse" data-parent="#accordionOne" id="collapseThree">
                                                                        <div class="expansion-panel-body">
                                                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
</body>

</html>