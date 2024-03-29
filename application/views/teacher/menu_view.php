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
    echo assets_css('aegis_css/uploads_drag_drop.css');
    echo assets_js('aegis_js/manage_te/te_menu.js');
    ?>
</head>

<body>
    <div class="col text-center mt-3">
        <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
            <div class="navbar-brand" href="#">
                <span style="font-size: 1.2em;">
                    <i class="fas fa-chalkboard"></i></span>
                <span style="font-size: 0.8em;">
                    &nbsp; MENU : EDIT <span id="menuEText">MENU</span> 
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
        <br>
        <div class="container-fluid mx-auto text-left">
            <div>Select Menu</div>
            <select class="browser-default custom-select" id="selectMenu">
                <option value="0" selected>None</option>
                <option value="1">Annouce</option>
                <option value="2">Score</option>
                <option value="3">Download</option>
                <option value="4">Upload</option>
                <option value="5">Video</option>
                <option value="6">Quiz</option>
                <option value="7">Poll</option>
            </select>
            <br>
            <span id="inputForm">
                Menu Name: <input type="text" name="FirstName" value="" id="txtMenuName"> 
                Menu Description : <input type="text" name="LastName" value="" id="txtMenuDesc">
                <input type="button" value="Save" id="btnMenuSave">
            </span>
            <div class="tab-content" id="justifiedTabContent">
                <div aria-labelledby="home-tab" class="tab-pane fade show active" id="home" role="tabpanel">
                    <div class="list-group mt-3 showMenu" id="accordionOne">
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
                                    <button class="btn btn-danger my-1" id="btnClearAll">Clear All</button>
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