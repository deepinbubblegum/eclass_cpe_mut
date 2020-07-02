<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Error 404 Notfound</title>
        <?php
        $multi_assets_css = array(
                'bootstrap_css/material.css',
                'bootstrap_css/material_pugin.css',
        );

        $multi_assets_js = array(
                'jquery_js/jquery-3.4.1.js',
                'popper_js/popper.js',
                'bootstrap_js/bootstrap.js',
                'bootstrap_js/material.js',
        );
        echo assets_css($multi_assets_css);
        echo assets_js($multi_assets_js);
        ?>

        <style>
                .jumbotron {
                        height: 100vh;
                }

                .figure{
                        margin-top: 5%;
                }
        </style>

        <script>
                var timeout = 3000;
                setTimeout(() => {
                        document.location.href="/";
                }, timeout);
        </script>
</head>

<body class="bg-light h-100" style="font-family: 'Sarabun', sans-serif;">
        <div class='jumbotron text-center'>
                <figure class="figure">
                        <figcaption class="figure-caption">
                                <h1 class="display-1"><b>404</b></h1>
                                <h4 class="display-4">ขออภัย ไม่พบหน้าเว็บไซต์ที่คุณต้องการ</h4>
                                <hr class="my-1">
                        </figcaption>
                </figure>
                
                <div>
                        <a href="<?php echo base_url(); ?>" class="btn btn-raised btn-warning btn-lg text-white">กลับสู่หน้าแรก</a>
                </div>
        </div>
</body>

</html>