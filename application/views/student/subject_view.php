<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge"> 
        <?php echo assets_js('aegis_js/std_subject.js'); ?>
</head>

<body>
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
                        วิชาหลัก
                        <div class="card-deck mt-3" id="showSubject">
                        </div>

                        <div class="navdrawer-divider"></div>
                        วิชาพิเศษ
                        <div class="card-deck mt-3" id="showSubject_Special">
                        </div>
                </div>
</body>

</html>