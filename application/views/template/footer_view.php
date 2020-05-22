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
                $('#ticket').click(function(e) {
                        e.preventDefault();
                        $('#navdrawer-left-admin').navdrawer('hide');
                });
        </script>

        <?php
        echo assets_css('bootstrap_css/bootstrap-pugin.css');
        echo assets_js('jsQR/jsQR.js');
        echo assets_js('jsQR/qr_reader.js');
        ?>
</head>

<body>

        <!-- Modal ticket-->
        <div class="modal fade text-left" id="modal_ticket" tabindex="-1" role="dialog" aria-labelledby="modal_ticketLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                        <div class="modal-content">
                                <div class="modal-header">
                                        <h5 class="modal-title" id="modal_ticketLabel"><?=lang('enter_the_score_code')?></h5>
                                        <!-- data-dismiss="modal" -->
                                        <button type="button" class="close" id="qr_close" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                        </button>
                                </div>
                                <div class="modal-body">
                                        <form>
                                                <!-- <canvas class="mx-auto" id="qr_canvas" style="border: 1px solid rgb(14, 168, 234); width: 100%; height: 100%;"></canvas> -->
                                                <video id="video" autoplay playsinline></video>
                                                <div class="my-1">
                                                        <!-- <label class="mr-sm-2" for="inlineFormCustomSelect">Cameras</label> -->
                                                        <select id="select_camera" class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                                        </select>
                                                </div>
                                                <div class="form-group position-relative mt-1">
                                                        <div class="floating-label" id="floating-lable-label">
                                                                <label for="Ticket"><i class="fas fa-hashtag"></i>&nbsp;&nbsp;<?=lang('ticket_code')?></label>
                                                                <input aria-describedby="TicketHelp" class="form-control" id="Ticket" name="Ticket" placeholder=" XXXX-XXXX-XXXX-XXXX" type="text" maxlength="24" autocomplete="off">
                                                                <span class="form-clear d-none"><i class="material-icons"><?=lang('clear')?></i></span>
                                                                <div id='txtShowReturn'>
                                                                        <?=lang('pls_en_the_tick_code')?>
                                                                </div>
                                                        </div>
                                                </div>
                                        </form>
                                </div>
                                <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" id="btn_start_reader"><?=lang('QR_Code_Scan')?></button>
                                        <button type="button" class="btn btn-primary" id="btnTicketSave"><?=lang('save')?></button>
                                </div>
                        </div>
                </div>
        </div>

        </div>
        </div>
</body>

</html>