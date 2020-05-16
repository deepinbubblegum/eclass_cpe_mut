<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>

<body>
        <div class="container-fluid">
                <div class="row">
                        <div class="col su-sidebar">
                                <div aria-hidden="true" class="navdrawer navdrawer-permanent navdrawer-permanent-clipped mt-3" id="navdrawerPermanentClipped" tabindex="-1">
                                        <div class="navdrawer-content">
                                                <nav class="navdrawer-nav">
                                                        <!-- <a class="nav-item nav-link" href="<?php echo base_url('admin'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-tachometer-alt"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;แผงควบคุม
                                                                </span>
                                                        </a> -->
                                                        <a class="nav-item nav-link" id="admin_side_Anc" href="<?php echo base_url('admin/announce'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-bullhorn"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('announcement')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_Anc_course" href="<?php echo base_url('admin/course'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-book-open"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('course')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_Anc_services" href="<?php echo base_url('admin/services'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-hand-holding-heart"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('services')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_Anc_personnel" href="<?php echo base_url('admin/announce_personnel'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-user-tie"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('personnel')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_Anc_about_us" href="<?php echo base_url('admin/announce_about_us'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-users"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('about_us')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_faculty" href="<?php echo base_url('admin/faculty'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-tree"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('faculty_info')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_major" href="<?php echo base_url('admin/major'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fab fa-pagelines"></i></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('branch_info')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_semester" href="<?php echo base_url('admin/semester'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-clipboard-list"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('semester_info')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_subject" href="<?php echo base_url('admin/subject'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-book"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('subject_info')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_subsem" href="<?php echo base_url('admin/subsemester'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-book-open"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('term_sub_of_sem_info')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_student" href="<?php echo base_url('admin/student_data'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-tachometer-alt"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('student_info')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_teacher" href="<?php echo base_url('admin/teacher_data'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-users"></i></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('teacher_info')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_admin" href="<?php echo base_url('admin/admin_data'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-users"></i></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('admin_info')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_teamaj" href="<?php echo base_url('admin/teacher_major_data'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-users"></i></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('te_barnch_info')?>
                                                                </span>
                                                        </a>
                                                        <!-- <a class="nav-item nav-link" id="admin_Anc" href="<?php echo base_url('admin/permission'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-fingerprint"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;ข้อมูลระดับสิทธิ์
                                                                </span>
                                                        </a> -->

                                                        <a class="nav-item nav-link" id="admin_side_teasub" href="<?php echo base_url('admin/teacher_subject'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-chalkboard-teacher"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('te_sub_info')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_degree" href="<?php echo base_url('admin/teacher_degree'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-chalkboard-teacher"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('info_academic')?>
                                                                </span>
                                                        </a>
                                                        <div class="navdrawer-divider"></div>
                                                        <a href="">
                                                                <p class="navdrawer-subheader"><i class="fas fa-exclamation-circle"></i></i>&nbsp;<?=lang('web_manual')?></p>
                                                        </a>
                                                </nav>
                                        </div>
                                </div>
                        </div>

</body>

</html>