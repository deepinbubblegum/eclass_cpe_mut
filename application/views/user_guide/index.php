<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title><?php echo lang('title')?></title>
        <?php
        $multi_assets_css = array(
                'bootstrap_css/material.css',
                'bootstrap_css/material_pugin.css',
                '../fontawesome/css/all.css',
                'aegis_css/cpe-mes.css',
                'aegis_css/font_Mitr.css',
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
<body>

<button data-target="#navdrawerPermanent" data-toggle="navdrawer" data-type="permanent" type="button">Launch permanent drawer</button>

<div aria-hidden="true" class="navdrawer navdrawer-permanent" id="navdrawerPermanent" tabindex="-1">...</div>

</body>
</html>