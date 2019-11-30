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
        //echo assets_js('aegis_js/manage_te/te_hied_TeacherAssist.js');
        ?>
        <script>
                subject_id = '<?php echo $subject_id; ?>';
                semester = '<?php echo $semester; ?>';
        </script>

        <?php
                // print_r($this->session->userdata());
                $bit = $this->session->userdata('ses_permission');
                // echo substr($bit, 2, 1);
                // echo "///";
                // echo $bit;
        ?>

</head>

<body>
        <div class="container-fluid">
                <div class="row">
                        <div class="col su-sidebar">
                                <div aria-hidden="true" class="navdrawer navdrawer-permanent navdrawer-permanent-clipped mt-3" id="navdrawerPermanentClipped" tabindex="-1">
                                        <div class="navdrawer-content">
                                                <nav class="navdrawer-nav">
                                                        <a class="nav-item nav-link" href="<?php echo base_url('teacher'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-arrow-left"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;เลือกรายวิชา
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" href="<?php echo base_url('te_select/annouce/') . $subject_id . '-' . $semester; ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-chalkboard"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;ประกาศถึงนักศึกษา
                                                                </span>
                                                        </a>

                                                        <?php
                                                        if (substr($bit, 3, 1) == 1 || $bit == 0) {
                                                                echo '<a class="nav-item nav-link" id="score" href="'; echo base_url('te_select/score/') . $subject_id . '-' . $semester .'">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-star-half-alt"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;คะแนน
                                                                </span>
                                                                </a>';
                                                        }
                                                        ?>

                                                        <?php
                                                        if (substr($bit, 1, 1) == 1 || $bit == 0) {
                                                                echo '<a class="nav-item nav-link" id="downloads" href=" '; echo base_url('te_select/downloads/') . $subject_id . '-' . $semester. '">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-download"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;อับโหลด
                                                                </span>
                                                                </a>';
                                                        }
                                                        ?>

                                                        <?php
                                                        if (substr($bit, 2, 1) == '1' || $bit == '0') {
                                                                echo '<a class="nav-item nav-link" id="uploads" href=" ';  echo base_url('te_select/uploads/') . $subject_id . '-' . $semester. '">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-upload"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;ดาวน์โหลด
                                                                </span>
                                                                </a>';
                                                        }
                                                        ?>
                                                        
                                                        
                                                        <?php
                                                        if (substr($bit, 0, 1) == '1' || $bit == '0') {
                                                                echo '<a class="nav-item nav-link" id="media" href="'; echo base_url("te_select/media/") . $subject_id . '-' . $semester. '">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-play"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;สื่อสารสนเทศ
                                                                </span>
                                                                </a>';
                                                        }
                                                        ?>

                                                        <?php
                                                        if (substr($bit, 4, 1) == '1' || $bit == '0') {
                                                                echo '<a class="nav-item nav-link" id="quiz_vote" href="'; echo base_url('te_select/quiz_vote/') . $subject_id . '-' . $semester. '">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-poll"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;แบบทดสอบ & โหวต
                                                                </span>
                                                                </a>';
                                                        }
                                                        ?>
                                                                                            
                                                        
                                                        <a class="nav-item nav-link" href="<?php echo base_url('countdown'); ?>" target="_blank">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-stopwatch"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;นาฬิกาจับเวลา
                                                                </span>
                                                        </a>
                                                        <div class="navdrawer-divider" id="line"></div>

                                                        <?php
                                                        if( $bit == '0'){
                                                                echo '<a class="nav-item nav-link" id="add_permission" href="'; echo base_url('te_select/add_permission/') . $subject_id . '-' . $semester .'">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-user-shield"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;เพิ่มระดับสิทธิ์อาจารย์ผู้ช่วย
                                                                </span>
                                                                </a>';
                                                        }
                                                        ?>

                                                        <?php
                                                        if( $bit == '0'){
                                                                echo '<a class="nav-item nav-link" id="add_teacher_assist" href="'; echo base_url('te_select/add_teacher_assist/') . $subject_id . '-' . $semester. '">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-users"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;เพิ่มอาจารย์ผู้ช่วย
                                                                </span>
                                                                </a>';
                                                        }
                                                        ?>

                                                        <a class="nav-item nav-link" id="add_student" href="<?php echo base_url('te_select/add_student/') . $subject_id . '-' . $semester; ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-users"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;เพิ่มนักศึกษาในวิชา
                                                                </span>
                                                        </a>

                                                        <!-- <a class="nav-item nav-link" href="#">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-user-tie"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;เพิ่มอาจารย์ผู้ช่วย
                                                                </span>
                                                        </a> -->
                                                        <!-- <a class="nav-item nav-link" id="ticket" data-toggle="modal" data-target="#modal_ticket">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-ticket-alt"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;กรอกรหัสคะแนน
                                                                </span>
                                                        </a> -->
                                                        <div class="navdrawer-divider"></div>
                                                        <!-- <a class="nav-item nav-link" href="<?php echo base_url('te_select/menu/') . $subject_id . '-' . $semester; ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-plus-square"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;สร้างเมนู
                                                                </span>
                                                        </a> -->
                                                        <a href="">
                                                                <p class="navdrawer-subheader"><i class="fas fa-exclamation-circle"></i>&nbsp;คู่มือใช้งานเว็บไซต์</p>
                                                        </a>
                                                </nav>
                                        </div>
                                </div>
                        </div>


</body>

</html>