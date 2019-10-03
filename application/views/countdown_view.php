<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php 
     $multi_js = array(
        'p5_js/p5.min.js',
        'aegis_js/countdown.js',
        'snackbar_js/snackbar.min.js'
     );
     echo assets_css('snackbar_css/snackbar.min.css');
     echo assets_js($multi_js);
    ?>
    <title>นับเวลาถอยหลัง</title>
</head>

<body class="text-success bg-dark">
    <div class="container-fluid  text-center my-5">
        <h1 style="font-size:14vw; letter-spacing: 10px" id="display_count">00:00:00</h1>
        <div class="progress my-5" style="height: 5px;">
            <div class="progress-bar progress-bar-striped progress-bar-animated-normal" id="progress_bar" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0"
                aria-valuemax="100">
            </div>
        </div>
        <div class="text-center mx-auto my-5">
            <button type="button" style="font-size:1.5vw;" id="Start" onclick="timerstart()" class="btn text-dark bg-success btn-lg"
                hidden>เริ่มนับถอยหลัง</button>
            <button type="button" style="font-size:1.5vw;" id="Stop" onclick="timerstop()" class="btn text-dark bg-danger btn-lg"
                hidden>หยุดนับถอยหลัง</button>
            <!-- Button trigger modal -->
            <button type="button" style="font-size:1.5vw;" class="btn text-white bg-info btn-lg" data-toggle="modal" data-target="#settime">กำหนดเวลาเริ่มต้น</button>
            <!-- Modal -->
            <div class="modal fade" id="settime" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="Title">กำหนดเวลา</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form class="form-inline">

                            <div class="container">
                                <input type="number" id="Hoursset" min="0" max="9999" class="form-control form-control-lg mr-sm-2 ml-sm-2"
                                    placeholder="ชั่วโมง">
                                <input type="number" id="Minutesset" min="0" max="60" class="form-control form-control-lg mr-sm-2 ml-sm-2"
                                    placeholder="นาที">
                                <input type="number" id="Secondsset" min="0" max="60" class="form-control form-control-lg mr-sm-2 ml-sm-2"
                                    placeholder="วินาที">
                            </div>

                        </form>
                        <div class="modal-footer">
                            <button type="button" class="btn text-dark bg-danger mr-sm-2 ml-sm-2" data-dismiss="modal">ปิด</button>
                            <button type="button" id='id_apply' class="btn text-dark bg-info mr-sm-2 ml-sm-2" onclick="timerset()"
                                data-dismiss="modal">นำไปใช้</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p id="displayclocktime" class="display-3"></p>
        <p id="displaytoday" class="display-4"></p>
    </div>
</body>

</html>