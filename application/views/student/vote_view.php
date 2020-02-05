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
                subject_id =  '<?php echo $subject_id; ?>';
                semester =  '<?php echo $semester; ?>';
        </script>
        <?php echo assets_js('aegis_js/std_vote.js'); ?>
        <style>
                .f34r-bg-n-txt {
                        background-color: rgba(0, 150, 136, 0.7);
                        color: white;
                }

                .f34r-bg-p-txt {
                        background-color: rgba(153, 204, 102, 1);
                        color: white;
                }

                .f34r-bg-o-txt {
                        background-color: rgba(255, 153, 102, 1);
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


                .placeholder {
                        border: 40px solid;
                        background-color: white;
                        -webkit-box-shadow: 0px 0px 10px #888;
                        -moz-box-shadow: 0px 0px 10px #888;
                        box-shadow: 0px 0px 10px #888;
                }

                .sortableItem {
                        height: 94px;
                        /* weight: 94px; */
                }

                .drag {
                        margin-top: 1em;
                }

                /* .sortableItem {cursor: pointer;} */
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
                                                        <label for="Textarea">หัวข้อโหวต</label>
                                                        <input class="form-control" id="Headtext">
                                                </div>

                                                <div class="form-group">
                                                        <label for="Textarea">รายละเอียดช่องโหวต</label>
                                                        <textarea class="form-control" id="Textarea" rows="5"></textarea>
                                                </div>

                                                <div class="form-group">
                                                        <label for="Textarea" class="mt-3 mb-3">menuVoteStatus</label>
                                                        <!-- <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" id="checkBox00">
                                                                <label class="custom-control-label" for="checkBox00">สุ่มสลับตัวเลือกโหวต</label>
                                                        </div> -->
                                                        <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" id="checkBox01">
                                                                <label class="custom-control-label" for="checkBox01">ปิดไม่ให้นักศึกษาทำโหวต</label>
                                                        </div>
                                                        <!-- <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" id="checkBox02">
                                                                <label class="custom-control-label" for="checkBox02">ปิดไม่ให้นักศึกษาดูคะแนนโหวต</label>
                                                        </div>
                                                        <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" id="checkBox03">
                                                                <label class="custom-control-label" for="checkBox03">ปิดไม่ให้นักศึกษาดูโหวตที่ทำไปแล้ว</label>
                                                        </div> -->
                                                </div>

                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-dark" id="btnModalClose" data-dismiss="modal">ปิด</button>
                                                <button type="button" class="btn btn-info" id="btnModalSave">บันทึกข้อมูล</button>
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
                                                        <label for="Textarea">headerVoteName</label>
                                                        <input class="form-control" id="addFieldHQN"> 
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

        <!-- MODAL_TICKET -->
        <div class="modal fade bd-example-modal-lg" id="addChoice" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                        <form id="ticketField">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 class="modal-title" id="addChoiceLabel">Modal title</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                </button>
                                        </div>
                                        <div class="modal-body">
                                                <div class="form-group">
                                                        <label for="Textarea">choiceVoteText</label>
                                                        <input class="form-control" id="choiceVoteText">
                                                        <label for="Textarea">choiceVotePoint</label>
                                                        <input class="form-control" id="choiceVotePoint">
                                                </div>

                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-dark" id="choiceClose" data-dismiss="modal">ปิด</button>
                                                <button type="button" class="btn btn-info" id="choiceSave">บันทึกข้อมูล</button>
                                        </div>
                                </div>
                        </form>
                </div>
        </div>
        <!-- END MODAL_TICKET -->

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
                                        &nbsp; โหวต
                                </span>
                        </div>
                </nav>

                <div class="container-fluid mx-auto text-left">

                        <ul class="nav nav-justified nav-tabs mt-3" id="justifiedTab" role="tablist">
                                <li class="nav-item">
                                        <a aria-controls="home" aria-selected="true" class="nav-link active" data-toggle="tab" href="#home" id="home-tab" role="tab">โหวต</a>
                                </li>
                                <!-- <li class="nav-item">
                                        <a aria-controls="profile" aria-selected="false" class="nav-link" data-toggle="tab" href="#profile" id="profile-tab" role="tab">โหวต</a>
                                </li> -->
                        </ul>
                        <div class="tab-content" id="justifiedTabContent">
                                <div aria-labelledby="home-tab" class="tab-pane fade show active" id="home" role="tabpanel">
                                        <div class="list-group mt-3 showMenuVote" id="accordionOne">
                                                <div class="expansion-panel list-group-item">
                                                        <a aria-controls="collapseOne" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapseOne" id="headingOne">
                                                                Vote #1
                                                                <div class="expansion-panel-icon ml-3 text-black-secondary">
                                                                        <i class="collapsed-show material-icons">keyboard_arrow_down</i>
                                                                        <i class="collapsed-hide material-icons">keyboard_arrow_up</i>
                                                                </div>
                                                        </a>
                                                        <div aria-labelledby="headingOne" class="collapse" data-parent="#accordionOne" id="collapseOne">
                                                                <div class="expansion-panel-body text-center">
                                                                        <h4>ข้อที่ 1 ไก่มีกี่ขา ?</h4>
                                                                        <label class="mt-2">
                                                                                <input type="radio" name="test" class="card-input-element d-none">
                                                                                <div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center">
                                                                                        <h5>2 ขา</h5>
                                                                                </div>
                                                                        </label>
                                                                        <label class="mt-2">
                                                                                <input type="radio" name="test" class="card-input-element d-none">
                                                                                <div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center">
                                                                                        <h5>4 ขา</h5>
                                                                                </div>
                                                                        </label>
                                                                        <label class="mt-2">
                                                                                <input type="radio" name="test" class="card-input-element d-none">
                                                                                <div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center">
                                                                                        <h5>2 ขา</h5>
                                                                                </div>
                                                                        </label>
                                                                        <label class="mt-2">
                                                                                <input type="radio" name="test" class="card-input-element d-none">
                                                                                <div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center">
                                                                                        <h5>2 ขา</h5>
                                                                                </div>
                                                                        </label>
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
</body>

</html>