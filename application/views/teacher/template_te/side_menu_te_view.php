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
        echo assets_js('cropper_js/cropper.js');
        echo assets_css('cropper_css/cropper.css');
        echo assets_js('jquery_js/jquery-cropper.js');
        ?>
</head>

<body>
        <div class="container-fluid">
                <div class="row">
                        <div class="col su-sidebar">
                                <div aria-hidden="true" class="navdrawer navdrawer-permanent navdrawer-permanent-clipped mt-3" id="navdrawerPermanentClipped" tabindex="-1">
                                        <div class="navdrawer-content">
                                                <nav class="navdrawer-nav">
                                                        <a class="nav-item nav-link" id="btn_add" data-toggle="modal" data-target="#Modal_Add_subject">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="far fa-address-card"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;เพิ่มวิชาสอนประจำเทอม
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" href="<?php echo base_url('teacher'); ?>">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="far fa-address-book"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;รายวิชาสอน
                                                                </span>
                                                        </a>
                                                        <a class="nav-item nav-link" href="<?php echo base_url('countdown'); ?>" target="_blank">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="fas fa-stopwatch"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;นาฬิกาจับเวลา
                                                                </span>
                                                        </a>

                                                        <a class="nav-item nav-link" id="start_crop" data-toggle="modal" data-target="#cropper_img">
                                                                <span style="font-size: 1.5em;">
                                                                        <i class="far fa-address-card"></i></span>
                                                                <span style="font-size: 1.2em;">
                                                                        &nbsp;&nbsp;
                                                                </span>
                                                        </a>

                                                        <div class="navdrawer-divider"></div>
                                                        <a href="">
                                                                <p class="navdrawer-subheader"><i class="fas fa-exclamation-circle"></i>&nbsp;คู่มือใช้งานเว็บไซต์</p>
                                                        </a>
                                                        <div class="navdrawer-divider"></div>
                                                        <span id="side_menu_subject">

                                                        </span>
                                                </nav>
                                        </div>
                                </div>
                        </div>

                        <div class="modal fade bd-example-modal-lg" id="cropper_img" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                        <div class="modal-content">
                                                <div class="modal-body">
                                                        <div>
                                                                <img id="image_preview" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/245f4571-14d4-4069-90a7-259b2971229f/dd8hkax-2446974f-4e52-4f85-8fb0-314ca6328ae8.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI0NWY0NTcxLTE0ZDQtNDA2OS05MGE3LTI1OWIyOTcxMjI5ZlwvZGQ4aGtheC0yNDQ2OTc0Zi00ZTUyLTRmODUtOGZiMC0zMTRjYTYzMjhhZTguanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.F2j_UIzKu9FXgQqRZOREorUYn-TBFGmfaebZCCFjqL8">
                                                        </div>
                                                </div>
                                                <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-target="#cropper_img" data-dismiss="modal">ปิด</button>
                                                        <button type="button" id="save_crop" class="btn btn-primary">บันทึก</button>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        <style>
                                #image_preview {
                                        display: block;
                                        max-width: 100%;
                                }
                        </style>

                        <script>
                                $('#start_crop').click(function(e) {
                                        e.preventDefault();
                                        start_crop();
                                });

                                function encodeImageFileAsURL(element) {
                                        var file = element;
                                        var reader = new FileReader();
                                        reader.onloadend = function() {
                                                console.log('RESULT', reader.result)
                                        }
                                        reader.readAsDataURL(file);
                                }

                                function start_crop() {
                                        var $image = document.getElementById('image_preview');
                                        var cropper = new Cropper($image, {
                                                aspectRatio: 16 / 9,
                                                crop(event) {
                                                        console.log(event.detail.x);
                                                        console.log(event.detail.y);
                                                        console.log(event.detail.width);
                                                        console.log(event.detail.height);
                                                        console.log(event.detail.rotate);
                                                        console.log(event.detail.scaleX);
                                                        console.log(event.detail.scaleY);
                                                },
                                        })
                                        cropper.crop();
                                        $('#save_crop').click(function(e) {
                                                e.preventDefault();
                                                cropper.getCroppedCanvas().toBlob(function(blob) {
                                                        var formData = new FormData();
                                                        formData.append("Image", blob)
                                                        console.log(blob);
                                                        // encodeImageFileAsURL(blob);
                                                        toDataURL(blob, function(dataUrl) {
                                                                console.log('RESULT:', dataUrl)
                                                        })
                                                })
                                        });
                                }
                        </script>
</body>

</html>