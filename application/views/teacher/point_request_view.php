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
        subject_id = '<?php echo $subject_id; ?>';
        semester = '<?php echo $semester; ?>';
    </script>

    <?php echo assets_js('aegis_js/manage_te/te_point_request.js'); ?>

</head>

<body>

    <div class="col text-center mt-3">
        <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
            <div class="navbar-brand" href="#">
                <span style="font-size: 1.2em;">
                    <i class="fas fa-chalkboard"></i></span>
                <span style="font-size: 0.8em;">
                    &nbsp; ขอแลกคะแนน
                </span>
            </div>
            <!-- <form class="form-inline">
                <button class="btn btn btn-info my-2 my-sm-0" type="submit" id="Add_annouce">
                    <span style="font-size: 1.1em;">
                        <i class="fas fa-plus-circle"></i>
                        &nbsp;นักศึกษาขอแลกคะแนน
                    </span>
                </button>
            </form> -->
        </nav>

        <div class="container-fluid mx-auto">

            <ul class="nav nav-justified nav-tabs mt-3" id="justifiedTab" role="tablist">
                <li class="nav-item">
                    <a aria-controls="home" aria-selected="true" class="nav-link active" data-toggle="tab" href="#home" id="home-tab" role="tab">นักศึกษาขอแลกคะแนน</a>
                </li>
                <!-- <li class="nav-item">
                    <a aria-controls="profile" aria-selected="false" class="nav-link" data-toggle="tab" href="#profile" id="profile-tab" role="tab">เพื่อนในชั้นเรียน</a>
                </li> -->
            </ul>

            <div class="tab-content" id="justifiedTabContent">
                <div aria-labelledby="home-tab" class="tab-pane fade show active" id="home" role="tabpanel">
                    <div class="list-group mt-3" id="accordionOne">
                        <div class="text-left mt-2 mb-2">
                            <button type="button" id="confirmAll" class="btn btn-primary"><i class="far fa-check-circle"></i> รับทราบทั้งหมด </button>
                        </div><br>
                        <div class="table-responsive">
                            <table class="table table-striped text-left">
                                <thead>
                                    <tr>
                                        <th scope="col">รหัสนักศึกษา</th>
                                        <th scope="col">ชื่อ - สกุล</th>
                                        <th scope="col">คะแนนที่ขอแลก</th>
                                        <th scope="col">การรับทราบ</th>
                                    </tr>
                                </thead>
                                <tbody id="TbodyPoint">

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        </div>
</body>

</html>