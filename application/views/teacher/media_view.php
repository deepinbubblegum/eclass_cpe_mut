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
        echo assets_css('plyr_css/plyr.css');
        echo assets_css('aegis_css/video-mes.css');
        echo assets_css('aegis_css/uploads_drag_drop.css');
        echo assets_js('plyr_js/plyr.js');
        echo assets_js('aegis_js/video_player.js');
        echo assets_js('aegis_js/manage_te/te_video_upload.js');
        ?>

</head>

<body>
        <div class="col text-center mt-3">
                <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
                        <div class="navbar-brand" href="#">
                                <span style="font-size: 1.2em;">
                                        <i class="fas fa-chalkboard"></i></span>
                                <span style="font-size: 0.8em;">
                                        &nbsp; สื่อสารสนเทศ
                                </span>
                        </div>
                        <button class="btn btn-secondary my-2 my-sm-0">
                                <span style="font-size: 1.1em;">
                                        <i class="fas fa-plus"></i></span>
                                &nbsp;เพิ่ม
                        </button>
                </nav>

                <div class="container-fluid">
                       
                </div>
</body>

</html>