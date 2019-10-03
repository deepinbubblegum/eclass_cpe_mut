<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>eclass : มหาวิทยาลัยเทคโนโลยีมหานคร</title>
        <script>
            subject_id = '<?php echo $subject_id; ?>';
            semester = '<?php echo $semester; ?>';
            point_id = '<?php echo $point_id; ?>';
        </script>
        <?php
        $multi_assets_css = array(
            'bootstrap_css/material.css',
            'bootstrap_css/material_pugin.css',
            '../fontawesome/css/all.css',
            'aegis_css/cpe-mes.css',
            'aegis_css/font_Mitr.css',
            'aegis_css/material-font-icon.css',
            'chart_css/Chart.css',
            'aegis_css/user.css',
            'snackbar_css/snackbar.min.css'
        );

        $multi_assets_js = array(
            'jquery_js/jquery-3.4.1.js',
            'popper_js/popper.js',
            'bootstrap_js/bootstrap.js',
            'bootstrap_js/material.js',
            'chart_js/Chart.js',
            'snackbar_js/snackbar.min.js',
            'aegis_js/user_uses.js',
            'aegis_js/langSwitching.js'
        );
        echo assets_css($multi_assets_css);
        echo assets_js($multi_assets_js);
        echo assets_js('aegis_js/std_tableScore.js');
        ?>
    </head>

<body>
    <h3 id="overTable">Lecture CPEN1010 25611</h3>
    <div id="tableScoreZone">
        <table class="table table-hover">
            <thead id="theadScoreZone"> 
            </thead>
            <tbody id="tbodyScoreZone"> 
            </tbody>
    </div>
</body>

</html>