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
        $multi_assets_js = array(
                'jsQR/jsQR.js',
                'jsQR/qr_reader.js'
        );
        echo assets_js($multi_assets_js);
        ?>
</head>

<body>

        <!-- Modal ticket-->
        <div class="modal fade text-left" id="modal_ticket" tabindex="-1" role="dialog" aria-labelledby="modal_ticketLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                        <div class="modal-content">
                                <div class="modal-header">
                                        <h5 class="modal-title" id="modal_ticketLabel">กรอกรหัสคะแนน</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                        </button>
                                </div>
                                <div class="modal-body">
                                        <form>
                                                <canvas class="mx-auto" id="canvas" style="border: 1px solid rgb(14, 168, 234); width: 100%; height: 100%;" ></canvas>
                                                <div class="form-group mt-1">
                                                        <div class="floating-label">
                                                                <label for="Ticket"><i class="fas fa-hashtag"></i>&nbsp;&nbsp;รหัสใบงาน</label>
                                                                <input aria-describedby="TicketHelp" class="form-control" id="Ticket" name="Ticket" placeholder=" XXXX-XXXX-XXXX-XXXX" type="text" autocomplete="off">
                                                                <div id='txtShowReturn'>
                                                                        *กรุณากรอกรหัสใบงาน
                                                                </div>
                                                        </div>
                                                </div>
                                        </form>
                                </div>
                                <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" id="btn_start_reader">QR Code Scan</button>
                                        <button type="button" class="btn btn-primary" id="btnTicketSave">บันทึก</button>
                                </div>
                        </div>
                </div>
        </div>

        </div>
        </div>
</body>

</html>