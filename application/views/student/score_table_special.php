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
        <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
        <meta content="initial-scale=1, shrink-to-fit=no, width=device-width" name="viewport">

        <!-- CSS -->
        <!-- Add Material font (Roboto) and Material icon as needed -->
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i|Roboto+Mono:300,400,700|Roboto+Slab:300,400,700"
                rel="stylesheet">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> 

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
            'aegis_css/te.css',
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
        echo assets_js('aegis_js/std_tableScoreSpecial.js');
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

    <!--  -->
        <!-- Large modal -->  
                <div id="exampleModal" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                        <div class="modal-header">
                                                <h5 id="exampleModalLabel"class="modal-title">Modal title</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                </button>
                                        </div>
                                        <div class="modal-body">
                                                <div style="width:100%; height:100%;">
                                                        <canvas id="score_show"></canvas>
                                                </div>
                                                <br>
                                                <div id="f34r-here">
                                                    Tables here 

                                                </div>
                                                <!-- <table class="table table-striped mt-2">
                                                        <tbody>
                                                                <tr>
                                                                        <td>รายละเอียด</td>
                                                                        <td>จำนวน</td>
                                                                        <td>หน่วย</td>
                                                                </tr>
                                                                <tr>
                                                                        <td>จำนวนนักศึกษาทั้งหมด</td>
                                                                        <td>16</td>
                                                                        <td>คน</td>
                                                                </tr>
                                                                <tr>
                                                                        <td>ค่าต่ำสุด</td>
                                                                        <td>5</td>
                                                                        <td>คะแนน</td>
                                                                </tr>
                                                                <tr>
                                                                        <td>ค่าสูงสุด</td>
                                                                        <td>17</td>
                                                                        <td>คะแนน</td>
                                                                </tr>
                                                                <tr>
                                                                        <td>ค่าเฉลี่ย</td>
                                                                        <td>9.75</td>
                                                                        <td>คะแนน</td>
                                                                </tr>
                                                                <tr>
                                                                        <td>ค่าเบี่ยงเบนมาตรฐาน</td>
                                                                        <td>3.455</td>
                                                                        <td></td>
                                                                </tr>
                                                                <tr>
                                                                        <td>ค่าเฉลี่ย (ไม่รวมคะแนนศูนย์)</td>
                                                                        <td>9.75</td>
                                                                        <td>คะแนน</td>
                                                                </tr>
                                                                <tr>
                                                                        <td>คะแนน SD</td>
                                                                        <td>3.455</td>
                                                                        <td></td>
                                                                </tr>
                                                                <tr>
                                                                        <td>คะแนนเต็ม</td>
                                                                        <td>10</td>
                                                                        <td>คะแนน</td>
                                                                </tr>
                                                                <tr>
                                                                        <td>ต่ำกว่าครึ่ง</td>
                                                                        <td>0</td>
                                                                        <td>คน</td>
                                                                </tr>
                                                                <tr>
                                                                        <td>คิดเป็น</td>
                                                                        <td>0</td>
                                                                        <td>เปอร์เซ็น</td>
                                                                </tr>
                                                                <tr>
                                                                        <td>มากว่าครึ่งขึ้นไป</td>
                                                                        <td>16</td>
                                                                        <td>คน</td>
                                                                </tr>
                                                                <tr>
                                                                        <td>คิดเป็น</td>
                                                                        <td>100</td>
                                                                        <td>เปอร์เซ็น</td>
                                                                </tr>
                                                                <tr>
                                                                        <td>จากทั้งหมด</td>
                                                                        <td>16</td>
                                                                        <td>คน (ไม่รวมคะแนนลบ)</td>
                                                                </tr>
                                                        </tbody>
                                                </table> -->
                                        </div>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                        data-dismiss="modal">Close</button> 
                                        </div> 
                                </div>
                        </div>
                </div>
        </div>
    <!--  -->
</body>

</html>