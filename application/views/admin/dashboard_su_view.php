<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>

<body>
        <div class="col text-center mt-3">
                <nav class="navbar navbar-light " style="max-height: auto; min-width: 335px; background-color: #dadfe4;">
                        <div class="navbar-brand" href="#">
                                <span style="font-size: 1.2em;">
                                        <i class="fas fa-tachometer-alt"></i></span>
                                <span style="font-size: 0.8em;">
                                        &nbsp;แผงควบคุม
                                </span>
                        </div>
                        <!-- <form class="form-inline">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn btn-secondary my-2 my-sm-0" type="submit">
                                <span style="font-size: 1.1em;">
                                        <i class="fas fa-search"></i></span>
                                &nbsp;ค้นหา
                        </button>
                </form> -->
                </nav>

                <div class="container-fluid">
                        <div class="card-deck mt-3">

                                <div class="card" style="max-height: auto; min-width: 300px">
                                        <div class="card-body">
                                                <h5 class="card-title">ผู้เข้าชมเว็บไซต์</h5>
                                                <canvas id="UserBar" style="max-height:300px; max-width: 95%"></canvas>
                                                <div><?php echo ('จำนวนผู้เข้าใช้งาน') ?></div>
                                                <script>
                                                        var barChartUsers = {
                                                                labels: [''],
                                                                datasets: [{
                                                                        label: ' ทัวไป',
                                                                        backgroundColor: '#42a5f5',
                                                                        borderColor: '#2196f3',
                                                                        borderWidth: 1,
                                                                        data: [50]
                                                                }, {
                                                                        label: ' นักศึกษา',
                                                                        backgroundColor: '#66bb6a',
                                                                        borderColor: '#4caf50',
                                                                        borderWidth: 1,
                                                                        data: [68]
                                                                }, {
                                                                        label: ' อาจารย์',
                                                                        backgroundColor: '#26a69a',
                                                                        borderColor: '#009688',
                                                                        borderWidth: 1,
                                                                        data: [38]
                                                                }]
                                                        };
                                                        
                                                        var ctx = document.getElementById('UserBar');
                                                        var UserBar = new Chart(ctx, {
                                                                type: 'bar',
                                                                data: barChartUsers,
                                                                options: {
                                                                        scales: {
                                                                                yAxes: [{
                                                                                        ticks: {
                                                                                                beginAtZero: true,

                                                                                        }
                                                                                }]
                                                                        },
                                                                }
                                                        });
                                                </script>
                                        </div>
                                </div>

                                <div class="card" style="height: auto; min-width: 300px">
                                        <div class="card-body">
                                                <h5 class="card-title">พื้นที่เหลือในระบบ</h5>
                                                <canvas id="freedoughnut" style="max-height:300px; max-width: 95%"></canvas>

                                                <?php
                                                $diskTotal = sprintf("%01.2f", (disk_total_space("/var/www") / 1073741824));
                                                $diskFree = sprintf("%01.2f", (disk_free_space("/var/www") / 1073741824));
                                                $diskUses = sprintf("%01.2f", $diskTotal - (disk_free_space("/var/www") / 1073741824));

                                                $dupercent = sprintf("%01.2f", (($diskUses / $diskTotal) * 100));
                                                $dfpercent = sprintf("%01.2f", (($diskFree / $diskTotal) * 100));

                                                echo '<script type="text/javascript">';

                                                echo "var dt = '$diskTotal';";
                                                echo "var df = '$diskFree';";
                                                echo "var du = '$diskUses';";

                                                echo "var dupercent = '$dupercent';";
                                                echo "var dfpercent = '$dfpercent';";
                                                echo '</script>';
                                                ?>

                                                <div><?php echo ($diskFree . " GB free of " . $diskTotal . " GB") ?></div>

                                                <script type="text/javascript">
                                                        doughnut = {
                                                                datasets: [{
                                                                        data: [du, df],
                                                                        backgroundColor: ['#003c8f', '#bec5b7']
                                                                }],

                                                                labels: ['ใช้ ' + dupercent + '%', 'ว่าง ' + dfpercent + '%', ]
                                                        };
                                                        var ctx = document.getElementById('freedoughnut');
                                                        var free = new Chart(ctx, {
                                                                type: 'doughnut',
                                                                data: doughnut,
                                                                options: {
                                                                        responsive: true,
                                                                }
                                                        });
                                                </script>
                                        </div>
                                </div>

                        </div>
                        <div class="card mb-3" style="height: auto; min-width: 300px">
                                <div class="card-body">
                                        <!-- <h5 class="card-title">Special title treatment</h5> -->
                                                <?php
                                                $output = shell_exec('free');

                                                echo $output;
                                                echo "<pre>$output</pre>";
                                                ?>
                                </div>
                        </div>

                </div>
</body>

</html>