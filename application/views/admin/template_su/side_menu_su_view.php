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
                                                                        &nbsp;&nbsp;ประกาศ
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_faculty" href="<?php echo base_url('admin/faculty'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-tree"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;ข้อมูลคณะ
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_major" href="<?php echo base_url('admin/major'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fab fa-pagelines"></i></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;ข้อมูลสาขา
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_semester" href="<?php echo base_url('admin/semester'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-clipboard-list"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;ข้อมูลปีการศึกษา
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_subject" href="<?php echo base_url('admin/subject'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-book"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;ข้อมูลวิชา
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_subsem" href="<?php echo base_url('admin/subsemester'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-book-open"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;ข้อมูลวิชาประจำเทอม
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_student" href="<?php echo base_url('admin/student_data'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-tachometer-alt"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;ข้อมูลนักศึกษา
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_teacher" href="<?php echo base_url('admin/teacher_data'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-users"></i></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;ข้อมูลอาจารย์
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_admin" href="<?php echo base_url('admin/admin_data'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-users"></i></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;ข้อมูลผู้ดูแลระบบ
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_teamaj" href="<?php echo base_url('admin/teacher_major_data'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-users"></i></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;ข้อมูลอาจารย์ประจำสาขา
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
                                                                        &nbsp;&nbsp;ข้อมูลอาจารย์ประจำวิชา
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="admin_side_degree" href="<?php echo base_url('admin/teacher_degree'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-chalkboard-teacher"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;ข้อมูลตำแหน่งวิชาการ
                                                                </span>
                                                        </a>
                                                        <div class="navdrawer-divider"></div>
                                                        <a href="">
                                                                <p class="navdrawer-subheader"><i class="fas fa-exclamation-circle"></i></i>&nbsp;คู่มือใช้งานเว็บไซต์</p>
                                                        </a>
                                                </nav>
                                        </div>
                                </div>
                        </div>

</body>

</html>