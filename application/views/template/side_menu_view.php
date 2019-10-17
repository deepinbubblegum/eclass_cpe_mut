<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <?php echo assets_js('aegis_js/std_ticket.js'); ?>
</head>

<body>
        <div class="container-fluid">
                <div class="row">
                        <div class="col su-sidebar">
                                <div aria-hidden="true" class="navdrawer navdrawer-permanent navdrawer-permanent-clipped mt-3" id="navdrawerPermanentClipped" tabindex="-1">
                                        <div class="navdrawer-content">
                                                <nav class="navdrawer-nav">
                                                        <a class="nav-item nav-link" href="<?php echo base_url(''); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-home"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;หน้าแรก
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" href="<?php echo base_url('subject'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-atlas"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;รายวิชา
                                                                </span>
                                                        </a>
                                                        <?php
                                                        if ($this->session->ses_status != 'teacher' && $this->session->ses_status != 'admin') {
                                                                echo '<a class="nav-item nav-link" href="' . base_url('barcode') . '" target="_blank">
                                                                        <span style="font-size: 1.5em;">
                                                                                <i class="fas fa-tachometer-alt"></i></span>
                                                                        <span style="font-size: 1.2em;">
                                                                                &nbsp;&nbsp;พิมพ์บาร์โค้ด
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
                                                        <?php
                                                        if ($this->session->ses_status != 'teacher' && $this->session->ses_status != 'admin') {
                                                                echo '<div class="navdrawer-divider"></div>
                                                                <a class="nav-item nav-link" id="ticket" data-toggle="modal" data-target="#modal_ticket">
                                                                        <span style="font-size: 1.5em;">
                                                                                <i class="fas fa-ticket-alt"></i></span>
                                                                        <span style="font-size: 1.2em;">
                                                                                &nbsp;&nbsp;กรอกรหัสคะแนน
                                                                        </span>
                                                                </a>';
                                                        }
                                                        ?>
                                                        <div class="navdrawer-divider"></div>
                                                        <a href="">
                                                                <p class="navdrawer-subheader"><i class="fas fa-exclamation-circle"></i>&nbsp;คู่มือใช้งานเว็บไซต์</p>
                                                        </a>
                                                </nav>
                                        </div>
                                </div>
                        </div>
</body>

</html>