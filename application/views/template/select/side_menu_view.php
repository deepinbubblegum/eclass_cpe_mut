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
                                                        <a class="nav-item nav-link" href="<?php echo base_url('subject'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-arrow-left"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('choose_courses')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="side_Anc" href="<?php echo base_url('select/annouce/') . $subject_id . '-' . $semester; ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-chalkboard"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('announce_students')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="side_score" href="<?php echo base_url('select/score/') . $subject_id . '-' . $semester; ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-star-half-alt"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('score')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="side_downloads" href="<?php echo base_url('select/downloads/') . $subject_id . '-' . $semester; ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-download"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('teaching_files')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="side_uploads" href="<?php echo base_url('select/uploads/') . $subject_id . '-' . $semester; ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-upload"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('assignment')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="side_media" href="<?php echo base_url('select/media/') . $subject_id . '-' . $semester; ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-play"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('information_media')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="side_quiz" href="<?php echo base_url('select/quiz/') . $subject_id . '-' . $semester; ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-poll"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('quiz')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" id="side_vote" href="<?php echo base_url('select/vote/') . $subject_id . '-' . $semester; ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-poll"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('vote')?>
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" href="<?php echo base_url('countdown'); ?>" target="_blank">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-stopwatch"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('stopwatch')?>
                                                                </span>
                                                        </a>
                                                        <div class="navdrawer-divider"></div>
                                                        <a class="nav-item nav-link" id="ticket" data-toggle="modal" data-target="#modal_ticket">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-ticket-alt"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;<?=lang('enter_the_score_code')?>
                                                                </span>
                                                        </a>
                                                        <div class="navdrawer-divider"></div>
                                                        <a href="">
                                                                <p class="navdrawer-subheader"><i class="fas fa-exclamation-circle"></i>&nbsp;<?=lang('web_manual')?></p>
                                                        </a>
                                                </nav>
                                        </div>
                                </div>
                        </div>
</body>

</html>