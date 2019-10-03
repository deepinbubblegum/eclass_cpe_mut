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
        <?php echo assets_js('aegis_js/std_select.js'); ?>
</head>

<body>
        <div class="col text-center mt-3">
                <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
                        <div class="navbar-brand" href="#">
                                <span style="font-size: 1.2em;">
                                        <i class="fas fa-chalkboard"></i></span>
                                <span style="font-size: 0.8em;">
                                        &nbsp;<span class="titlehearder d-inline-block text-truncate" id="header"></span>
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
                                        <a aria-controls="home" aria-selected="true" class="nav-link active" data-toggle="tab" href="#home" id="home-tab" role="tab">ประกาศ</a>
                                </li>
                                <li class="nav-item">
                                        <a aria-controls="profile" aria-selected="false" class="nav-link" data-toggle="tab" href="#profile" id="profile-tab" role="tab">เพื่อนในชั้นเรียน</a>
                                </li>
                        </ul>
                        <div class="tab-content" id="justifiedTabContent">
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
                                <div aria-labelledby="profile-tab" class="tab-pane fade" id="profile" role="tabpanel">
                                        <div class="jumbotron jumbotron-fluid mt-3">
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                                <span class="chip mt-1 mr-1 ml-1 mb-1"><i class="chip-icon">C</i>Chip Label</span>
                                        </div>
                                </div>
                        </div>
                </div>
</body>

</html>