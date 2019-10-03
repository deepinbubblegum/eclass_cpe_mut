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
        echo assets_js('aegis_js/manage_te/te_menu_news.js');
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
                <button class="btn btn-primary my-2 my-sm-0" id="btnSearch">
                    <span style="font-size: 1.1em;">
                        <i class="fas fa-search"></i></span>
                    &nbsp;ค้นหา
                </button>
            </div>
        </nav>

        <span>
            <input type="hidden" id="semester" value="<?php echo $_GET['semester']; ?>">
            <input type="hidden" id="subject" value="<?php echo $_GET['subject']; ?>">
        </span>

        <div class="container-fluid mt-3" style="max-height: auto; min-width: 335px;">
            <span id="data">

            </span>
        </div>

</body>

</html>