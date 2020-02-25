<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>eclass : มหาวิทยาลัยเทคโนโลยีมหานคร</title>
        <?php
        $multi_assets_css = array(
                'bootstrap_css/material.css',
                'bootstrap_css/material_pugin.css',
                '../fontawesome/css/all.css',
                'aegis_css/cpe-mes.css',
                // 'aegis_css/font_Mitr.css',
                'aegis_css/font_sarabun.css',
                'aegis_css/material-font-icon.css',
                'chart_css/Chart.css',
                'aegis_css/su.css',
                'snackbar_css/snackbar.min.css',
                'summernote_css/summernote-bs4.min.css'
        );

        $multi_assets_js = array(
                'jquery_js/jquery-3.4.1.js',
                'popper_js/popper.js',
                'bootstrap_js/bootstrap.js',
                'bootstrap_js/material.js',
                'chart_js/Chart.js',
                'snackbar_js/snackbar.min.js',
                'aegis_js/user_uses.js',
                'aegis_js/langSwitching.js',
                'summernote_js/summernote-bs4.min.js',
                // 'summernote/dist/summernote-bs4.min.js'
        );
        echo assets_css($multi_assets_css);
        echo assets_js($multi_assets_js);
        ?>
</head>

<body class="bg-light h-100" style="font-family: 'Sarabun', sans-serif;">
        <div class="navbar w-100 sticky-top navbar-dark navbar-full doc-navbar-default mainnavbar" style="min-width: 375px; width:100%;">
                <!-- ปุ่มด้านซ้าย -->

                <button aria-controls="navdrawer-left-admin" aria-expanded="false" aria-label="Toggle Navdrawer" class="navbar-toggler menu-left-admin" data-target="#navdrawer-left-admin" data-toggle="navdrawer">
                        <span style="font-size: 1.5em;"><i class="fas fa-bars"></i></span>
                </button>

                <div class="mr-auto">
                        <a href="<?php echo base_url() ?>">
                                <div class="navbar-brand ml-2 mr-2 mt-2 mb-1">
                                        <?php
                                        echo assets_img('logo-white.png', array(
                                                'class' => 'logo_mut d-inline-block align-top',
                                                'height' => '44px',
                                                'width' => 'auto',
                                                'alt' => '',
                                        ));
                                        ?>
                                </div>
                        </a>
                </div>
                <div class="ml-auto" id='langSocket'>
                        <span id='btnLangTh'>
                                <div class="chip chip-action chip-color">
                                        <?php
                                        echo assets_img('th.svg', array(
                                                'class' => 'chip-img',
                                                'alt' => 'Chip Image',
                                        ));
                                        ?>
                                        TH
                                </div>
                        </span>
                        <span id='btnLangEn'>
                                <div class="chip chip-action chip-color">
                                        <?php
                                        echo assets_img('us.svg', array(
                                                'class' => 'chip-img',
                                                'alt' => 'Chip Image',
                                        ));
                                        ?>
                                        EN
                                </div>
                        </span>
                        <!-- ปุ่มด้านขวา -->
                        <button type="button" class="btn btn-sm btn-outline-light btn-toggler-sm" aria-controls="navdrawer-right" aria-expanded="false" aria-label="Toggle Navdrawer" data-target="#navdrawer-right" data-toggle="navdrawer">
                                <?php
                                if (isset($this->session->ses_id)) {
                                        echo  '<a class="title_message">
                                                <span style="font-size: 1.2em;">' . $this->session->ses_tname . ' </span>
                                                &nbsp;
                                                </a>
                                                <span style="font-size: 1.5em;">
                                                        <i class="far fa-user"></i>
                                                </span>';
                                } else {
                                        echo  '<a class="title_message">
                                                <span style="font-size: 1.2em;">ลงชื่อเข้าใช้ </span>
                                                &nbsp;
                                                </a>
                                                <span style="font-size: 1.5em;">
                                                        <i class="fas fa-sign-in-alt"></i>
                                                </span>';
                                }
                                ?>
                        </button>
                </div>
        </div>

        <!-- navdrawer ด้านซ้าย -->
        <div class="navdrawer navdrawer-left-admin" id="navdrawer-left-admin" tabindex="-1" style="display: none;" aria-hidden="true">
                <div class="navdrawer-content">
                        <div class="navdrawer-header">
                                <div class="navbar-brand px-0">
                                        <span style="font-size: 1.1em;">
                                                <i class="fas fa-th-list"></i></span>&nbsp;&nbsp;&nbsp;เมนู
                                </div>

                        </div>
                        <nav class="navdrawer-nav">
                                <!-- <a class="nav-item nav-link" href="<?php echo base_url('admin'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-tachometer-alt"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;แผงควบคุม
                                        </span>
                                </a> -->
                                <a class="nav-item nav-link" href="<?php echo base_url('admin/announce'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-bullhorn"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;ประกาศ
                                        </span>
                                </a>
                                <a class="nav-item nav-link" href="<?php echo base_url('admin/faculty'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-tree"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;ข้อมูลคณะ
                                        </span>
                                </a>
                                <a class="nav-item nav-link" href="<?php echo base_url('admin/major'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fab fa-pagelines"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;ข้อมูลสาขา
                                        </span>
                                </a>
                                <a class="nav-item nav-link" href="<?php echo base_url('admin/semester'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-clipboard-list"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;ข้อมูลปีการศึกษา
                                        </span>
                                </a>
                                <a class="nav-item nav-link" href="<?php echo base_url('admin/subject'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-book"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;ข้อมูลวิชา
                                        </span>
                                </a>
                                <a class="nav-item nav-link" href="<?php echo base_url('admin/subsemester'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-book-open"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;ข้อมูลวิชาประจำเทอม
                                        </span>
                                </a>
                                <a class="nav-item nav-link" href="<?php echo base_url('admin/student_data'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-barcode"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;ข้อมูลนักศึกษา
                                        </span>
                                </a>
                                <a class="nav-item nav-link" href="<?php echo base_url('admin/teacher_data'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-barcode"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;ข้อมูลอาจารย์
                                        </span>
                                </a>
                                <a class="nav-item nav-link" href="<?php echo base_url('admin/admin_data'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-users"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;ข้อมูลแอดมิน
                                        </span>
                                </a>
                                <!-- <a class="nav-item nav-link" href="<?php echo base_url('admin/permission'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-fingerprint"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;ข้อมูลระดับสิทธิ์
                                        </span>
                                </a> -->
                                <a class="nav-item nav-link" href="<?php echo base_url('admin/teacher_major_data'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-chalkboard-teacher"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;ข้อมูลอาจารย์ประจำสาขา
                                        </span>
                                </a>
                                <a class="nav-item nav-link" href="<?php echo base_url('admin/teacher_subject'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-chalkboard-teacher"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;ข้อมูลอาจารย์ประจำวิชา
                                        </span>
                                </a>
                                <a class="nav-item nav-link" href="<?php echo base_url('admin/teacher_degree'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-chalkboard-teacher"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;ข้อมูลตำแหน่งวิชาการ
                                        </span>
                                </a>
                                <div class="navdrawer-divider"></div>
                                <a href="">
                                        <p class="navdrawer-subheader"><i class="fas fa-exclamation-circle"></i>&nbsp;คู่มือใช้งานเว็บไซต์</p>
                                </a>
                        </nav>
                </div>
        </div>

        <!-- navdrawer ด้านขวา -->
        <div class="navdrawer navdrawer-right" id="navdrawer-right" tabindex="-1" style="display: none;" aria-hidden="true">
                <div class="navdrawer-content">
                        <div class="navdrawer-header">
                                <div class="navbar-brand px-0">
                                        <?php
                                        if (isset($this->session->ses_tname)) {
                                                echo '<span style="font-size: 1.1em;">
                                                <i class="far fa-user"></i>
                                                </span>&nbsp;&nbsp;' . $this->session->ses_tname;
                                        } else {
                                                echo '<span style="font-size: 1.1em;">
                                                <i class="fas fa-sign-in-alt"></i>
                                                </span>&nbsp;&nbsp;ลงชื่อเข้าใช้';
                                        }
                                        ?>
                                </div>
                        </div>
                        <nav class="navdrawer-nav">
                                <div class="container">
                                        <?php
                                        if (isset($this->session->ses_tname)) {
                                                echo '<div class="mb-2 mt-2">รหัส : '.$this->session->ses_id.'</div>';
                                                echo '<div class="mb-2 mt-2">ชื่อ : '.$this->session->ses_THdegree.$this->session->ses_tname.'</div>';
                                                echo '<div class="mb-3 mt-2">สถานะ : '.$this->session->ses_statustext.'</div>';
                                                echo '<button type="button" id="te_user" class="btn btn-primary btn-lg btn-block mb-3 mt-2">รายละเอียดบัญชีผู้ใช้งาน</button>';
                                                echo '<button type="button" id="Signout_btn" class="btn btn-danger btn-lg btn-block">ออกจากระบบ</button>';
                                        } else {
                                                echo '<form id="sigin_form">
                                                <div class="form-group">
                                                <div class="floating-label">
                                                <label for="Username"><i class="fas fa-lock"></i>&nbsp;&nbsp;ชื่อผู้ใช้</label>
                                                <input aria-describedby="UsernameHelp" class="form-control" id="Username" name="Username" placeholder=" ชื่อผู้ใช้ หรือ ID" type="text" autocomplete="off">
                                                <div class="invalid-feedback">
                                                        *กรุณาลงชื่อเข้าใช้งาน
                                                </div>
                                                </div>
                                                </div>
                                                <div class="form-group">
                                                        <div class="floating-label">
                                                                <label for="Password"><i class="fas fa-key"></i>&nbsp;&nbsp;รหัสผู้ใช้</label>
                                                                <input aria-describedby="PasswordHelp" class="form-control" id="Password" name="Password" placeholder=" รหัสผู้ใช้ หรือ Password" type="Password" autocomplete="off">
                                                                <div class="invalid-feedback">
                                                                        *กรุณากรอกรหัส
                                                                </div>
                                                        </div>
                                                </div>
                                                </form>
                                                <button type="button" id="Signin_btn" class="btn btn-primary btn-lg btn-block">ลงชื่อเข้าใช้</button>';
                                        }
                                        ?>
                                </div>
                        </nav>
                        <div class="container">
                                <div class="navdrawer-divider"></div>
                                <?php
                                if (isset($this->session->ses_tname)) {
                                        echo '<a href="#" id="set_user">' .
                                                // '<p class="navdrawer-subheader fixed-bottom">เปลี่ยนรหัสผ่าน</p>' .
                                                '</a>';
                                }
                                ?>
                        </div>
                </div>
        </div>
        <?php
        if (isset($this->session->ses_tname)) {
                echo assets_js('aegis_js/setting_user.js');
                echo '<div class="modal fade bd-example-modal-lg" id="te_user_setting" tabindex="-1" role="dialog" aria-labelledby="te_user_setting" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                                <div class="modal-header">
                                        <h5 class="modal-title">รายละเอียดบัญชีผู้ใช้งาน </h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                        </button>
                                </div>
                                <div class="modal-body">
                                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                                                <li class="nav-item">
                                                        <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">รายละเอียดบัญชีผู้ใช้</a>
                                                </li>
                                                <li class="nav-item">
                                                        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">ตั้งค่ารหัสผู้ใช้</a>
                                                </li>
                                        </ul>
                                        <div class="tab-content" id="myTabContent">
                                                <div class="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                        <div class="ml-2 mb-2 mt-2">รหัส : ' . $this->session->ses_id . '</div>
                                                        <div class="ml-2 mb-2 mt-2">ชื่อ : ' . $this->session->ses_THdegree . $this->session->ses_tname . '</div>
                                                        <div class="ml-2 mb-3 mt-2">สถานะ : ' . $this->session->ses_statustext . '</div>
                                                        <div class="ml-2 mb-3 mt-2">สังกัดสาขา :
                                                                <span  id="techer_major_show">
                                                                </span>
                                                        </div>
                                                </div>
                                                <div class="tab-pane fade mt-4 ml-2" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                                        <div class="form-group">
                                                                <label for="label_old_passwd">รหัสผู้ใช้เดิม</label>
                                                                <input type="password" class="form-control" id="old_passwd">
                                                        </div>

                                                        <div class="form-group">
                                                                <label for="label_passwd">รหัสผู้ใช้ใหม่</label>
                                                                <input type="password" class="form-control" id="Passwd">
                                                        </div>

                                                        <div class="form-group">
                                                                <label for="label_passwd_ck">ยืนยัน รหัสผู้ใช้ใหม่</label>
                                                                <input type="password" class="form-control" id="Passwd_ck">
                                                        </div>
                                                        <div class="modal-footer">
                                                                <button type="button" id="save_changes" class="btn btn-primary">Save changes</button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
                </div>';
        }
        ?>
</body>

</html>