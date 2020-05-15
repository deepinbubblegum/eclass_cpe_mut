<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title><?php echo lang('title') ?></title>
        <?php
        $multi_assets_css = array(
                'bootstrap_css/material.css',
                'bootstrap_css/material_pugin.css',
                '../fontawesome/css/all.css',
                'aegis_css/cpe-mes.css',
                // 'aegis_css/font_Mitr.css',
                'aegis_css/font_sarabun.css',
                'aegis_css/material-font-icon.css',
                'aegis_css/user.css',
                'aegis_css/f34r.css',
                'snackbar_css/snackbar.min.css'
        );

        $multi_assets_js = array(
                'jquery_js/jquery-3.4.1.js',
                'popper_js/popper.js',
                'bootstrap_js/bootstrap.js',
                'bootstrap_js/material.js',
                'snackbar_js/snackbar.min.js',
                'aegis_js/user_uses.js',
                'aegis_js/langSwitching.js'
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
                                        ($this->session->lang == 'en') ? $name_user = $this->session->ses_ename : $name_user = $this->session->ses_tname;
                                        echo  '<a class="title_message">
                                                <span style="font-size: 1.2em;">' . $name_user . ' </span>
                                                &nbsp;
                                                </a>
                                                <span style="font-size: 1.5em;">
                                                        <i class="far fa-user"></i>
                                                </span>';
                                } else {
                                        echo  '<a class="title_message">
                                                <span style="font-size: 1.2em;">' . lang('sign_in') . ' </span>
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
                                                <i class="fas fa-th-list"></i></span>&nbsp;&nbsp;&nbsp;<?php echo lang('menu') ?>
                                </div>

                        </div>
                        <nav class="navdrawer-nav">
                                <a class="nav-item nav-link" href="<?php echo base_url(''); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-home"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;<?php echo lang('home_page') ?>
                                        </span>
                                </a>
                                <?php
                                if ($this->session->ses_status == 'student') {
                                        echo '<a class="nav-item nav-link" href="' . base_url('subject') . '?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-atlas"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;' . lang('course') .
                                                '</span>
                                        </a>';
                                }
                                ?>
                                <?php
                                if ($this->session->ses_status == 'student') {
                                        echo '<a class="nav-item nav-link" href="' . base_url('barcode') . '" target="_blank">
                                                        <span style="font-size: 1.5em;">
                                                                <i class="fas fa-tachometer-alt"></i></span>
                                                        <span style="font-size: 1.2em;">
                                                                &nbsp;&nbsp;' . lang('print_barcode') . '
                                                        </span>
                                                        </a>';
                                }
                                ?>
                                <a class="nav-item nav-link" href="<?php echo base_url('countdown'); ?>" target="_blank">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-stopwatch"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;<?php echo lang('stopwatch') ?>
                                        </span>
                                </a>
                                <?php
                                if ($this->session->ses_status == 'student') {
                                        echo '<div class="navdrawer-divider"></div>
                                                <a class="nav-item nav-link" id="ticket" data-toggle="modal" data-target="#modal_ticket">
                                                        <span style="font-size: 1.5em;">
                                                                <i class="fas fa-ticket-alt"></i></span>
                                                        <span style="font-size: 1.2em;">
                                                                &nbsp;&nbsp;' . lang('enter_the_score_code') . '
                                                        </span>
                                                </a>';
                                }
                                ?>

                                <a class="nav-item nav-link" href="<?php echo base_url('course'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-book-open"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;<?php echo lang('course') ?>
                                        </span>
                                </a>

                                <a class="nav-item nav-link" href="<?php echo base_url('services'); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-hand-holding-heart"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;<?php echo lang('services') ?>
                                        </span>
                                </a>

                                <a class="nav-item nav-link" href="<?php echo base_url(''); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-user-tie"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;<?php echo lang('personnel') ?>
                                        </span>
                                </a>

                                <a class="nav-item nav-link" href="<?php echo base_url(''); ?>">
                                        <span style="font-size: 1.5em;">
                                                <i class="fas fa-users"></i></span>
                                        <span style="font-size: 1.2em;">
                                                &nbsp;&nbsp;<?php echo lang('about_us') ?>
                                        </span>
                                </a>

                                <div class="navdrawer-divider"></div>
                                <a href="">
                                        <p class="navdrawer-subheader"><i class="fas fa-exclamation-circle"></i>&nbsp;<?= lang('web_manual') ?></p>
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
                                                </span>&nbsp;&nbsp;' . lang('sign_in');
                                        }
                                        ?>
                                </div>
                        </div>
                        <nav class="navdrawer-nav">
                                <div class="container">
                                        <?php
                                        if (isset($this->session->ses_tname)) {
                                                echo '<div class="mb-2 mt-2">' . lang('id') . ' : ' . $this->session->ses_id . '</div>';
                                                echo '<div class="mb-2 mt-2">' . lang('name') . ' : ' . $this->session->ses_THdegree . $this->session->ses_tname . '</div>';
                                                echo '<div class="mb-3 mt-2">' . lang('status') . ' : ' . $this->session->ses_statustext . '</div>';
                                                if ($this->session->ses_status == 'teacher' || $this->session->ses_status == 'admin') {
                                                        echo '<a href="' . base_url('teacher') . '"><button type="button" id="" class="btn btn-info btn-lg btn-block">' . lang('manager_page') . '</button></a>';
                                                        // echo '<div class="navdrawer-divider mt-3"></div>';
                                                        echo '<button type="button" id="te_user" class="btn btn-primary btn-lg btn-block mt-2">' . lang('account_details') . '</button>';
                                                } else {
                                                        echo '<button type="button" id="user" class="btn btn-primary btn-lg btn-block mt-2">' . lang('account_details') . '</button>';
                                                }
                                                echo '<button type="button" id="Signout_btn" class="btn btn-danger btn-lg btn-block">' . lang('sign_out') . '</button>';
                                        } else {
                                                echo '<div class="form-group">
                                                                <div class="floating-label">
                                                                <label for="Username"><i class="fas fa-lock"></i>&nbsp;&nbsp;' . lang('username') . '</label>
                                                                <input aria-describedby="UsernameHelp" class="form-control" id="Username" name="Username" placeholder=" ' . lang('username_or_id') . '" type="text" autocomplete="off">
                                                                <div class="invalid-feedback">
                                                                        ' . lang('please_sign_in') . '
                                                                </div>
                                                        </div>
                                                </div>
                                                
                                                <div class="form-group">
                                                        <div class="floating-label">
                                                                <label for="Password"><i class="fas fa-key"></i>&nbsp;&nbsp;' . lang('user_pass') . '</label>
                                                                <input aria-describedby="PasswordHelp" class="form-control" id="Password" name="Password" placeholder=" ' . lang('passuser_or_password') . '" type="Password" autocomplete="off">
                                                                <div class="invalid-feedback">
                                                                        ' . lang('please_enter_the_code') . '
                                                                </div>
                                                        </div>
                                                </div>
                                                <button type="button" id="Signin_btn" class="btn btn-primary btn-lg btn-block">' . lang('sign_in') . '</button>';
                                        }
                                        ?>
                                </div>
                        </nav>

                        <div class="container">
                                <div class="navdrawer-divider"></div>
                        </div>
                </div>
        </div>

        <?php
        echo assets_js('aegis_js/setting_user.js');
        echo '<div class="modal fade bd-example-modal-lg" id="te_user_setting" tabindex="-1" role="dialog" aria-labelledby="te_user_setting" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                                <div class="modal-header">
                                        <h5 class="modal-title">' . lang('account_details') . ' </h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                        </button>
                                </div>
                                <div class="modal-body">
                                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                                                <li class="nav-item">
                                                        <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">' . lang('account_details') . '</a>
                                                </li>
                                                <li class="nav-item">
                                                        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">' . lang('set_user_id') . '</a>
                                                </li>
                                        </ul>
                                        <div class="tab-content" id="myTabContent">
                                                <div class="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                        <div class="ml-2 mb-2 mt-2">' . lang('id') . ' : ' . $this->session->ses_id . '</div>
                                                        <div class="ml-2 mb-2 mt-2">' . lang('name') . ' : ' . $this->session->ses_THdegree . $this->session->ses_tname . '</div>
                                                        <div class="ml-2 mb-3 mt-2">' . lang('status') . ' : ' . $this->session->ses_statustext . '</div>';
        if ($this->session->ses_status == 'teacher' || $this->session->ses_status == 'admin') {
                echo '<div class="ml-2 mb-3 mt-2">' . lang('brance_with') . ' :
                                                                        <span  id="techer_major_show">
                                                                        </span>
                                                                </div>';
        }
        echo '</div>
                                                <div class="tab-pane fade mt-4 ml-2" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                                        <div class="form-group">
                                                                <label for="label_old_passwd">' . lang('old_password') . '</label>
                                                                <input type="password" class="form-control" id="old_passwd">
                                                        </div>

                                                        <div class="form-group">
                                                                <label for="label_passwd">' . lang('password') . '</label>
                                                                <input type="password" class="form-control" id="Passwd">
                                                        </div>

                                                        <div class="form-group">
                                                                <label for="label_passwd_ck">' . lang('confirm_new_passwd') . '</label>
                                                                <input type="password" class="form-control" id="Passwd_ck">
                                                        </div>
                                                        <div class="modal-footer">
                                                                <button type="button" id="save_changes" class="btn btn-primary">' . lang('save_changes') . '</button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
                </div>';
        ?>
</body>


</html>