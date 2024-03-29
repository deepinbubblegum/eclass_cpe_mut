$(document).ready(function () {
    // alert(semester);

    year = semester.substr(0, 4);
    part = semester.substr(4, 1);
    $('#header').text('ขอแลกคะแนน : ' + subject_id + ' - ' + year + '/' + part);

    var url = $(location).attr('href').split("/");
    var dataStdPoint = '';
    ShowMenu();

    /******************************* highlight Navbar ************************************* */
    var Navbar_Side_highlight = ['side_Anc', 'side_score', 'side_uploads', "side_downloads", "side_media", "side_quiz", "side_vote", "side_pointRequest", "side_add_permission", "side_add_teacher_assist", "side_add_student"];
    for (z = 0; z < Navbar_Side_highlight.length; z++) {
        var elementRemove = document.getElementById(Navbar_Side_highlight[z]);
        elementRemove.classList.remove("bg-primary-light");
    }

    var Navbar_highlight = ['Anc', 'score', 'uploads', "downloads", "media", "quiz", "vote", "pointRequest", "add_permission", "add_teacher_assist", "add_student"];
    for (y = 0; y < Navbar_highlight.length; y++) {
        var elementRemove = document.getElementById(Navbar_highlight[y]);
        elementRemove.classList.remove("bg-primary-light");
    }

    // $('#score').classList.add(".bg-primary");
    var element = document.getElementById("pointRequest");
    element.classList.add("bg-primary-light");
    var element = document.getElementById("side_pointRequest");
    element.classList.add("bg-primary-light");
    /******************************************************************** */

    function ShowMenu() {
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_point_request/Show_Data_ctl",
            data: '&semester=' + semester + '&subject=' + subject_id,
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    console.log(response);
                    dataStdPoint = response;
                    var btnConfirm = '';
                    for (i = 0; i < response.length; i++) {
                        if (response[i].ps_tea_confirm == 0) {
                            btnConfirm = '<button type="button" class="btn btn-primary btn-sm" id="btlConfirm' + i + '"  >รับทราบ</button>';
                        } else {
                            btnConfirm = '<button type="button" class="btn btn-primary btn-sm" disabled>รับทราบแล้ว</button>';
                        }
                        html += '<tr>' +
                            '<td scope="row">' + response[i].std_code_id + '</td>' +
                            '<td>' + response[i].std_Tname + '</td>' +
                            '<td>' + response[i].ps_tea_point + '</td>' +
                            '<td>' + btnConfirm + '</td>' +
                            '<td style="display:none;">' + response[i].ps_tea_subject + '</td>' +
                            '<td style="display:none;">' + response[i].ps_tea_menu + '</td>' +
                            '</tr>';
                    }
                }
                $('#TbodyPoint').html(html);
                $('#txtRead').hide();
                $('#txtReadSide').hide();

                $.each(dataStdPoint, function (a) {
                    $('#btlConfirm' + a).click(function () {
                        subMain = dataStdPoint[a].ps_tea_subject;
                        menuId = dataStdPoint[a].ps_tea_menu;
                        std = dataStdPoint[a].std_code_id;
                        $.ajax({
                            type: 'POST',
                            url: "/" + url[3] + "/Te_point_request/Confirm",
                            data: '&semester=' + semester + '&subject=' + subMain + '&subAdd=' + subject_id + '&menu=' + menuId + '&std=' + std,
                            success: function () {
                                Snackbar.show({
                                    actionText: 'close',
                                    pos: 'top-center',
                                    actionTextColor: '#37FF33',
                                    backgroundColor: '#323232',
                                    width: 'auto',
                                    text: 'บันทึกข้อมูลแล้ว'
                                });
                                ShowMenu();
                            }
                        });
                    });
                });
            }
        });
    }


    $('#confirmAll').click(function () {
        var subMain = [];
        var menu = [];
        var std_id = [];
        $('#TbodyPoint').find('tr').each(function (i, el) {
            var $tds = $(this).find('td'),
                std = $tds.eq(0).text(),
                std_name = $tds.eq(1).text(),
                point = $tds.eq(2).text(),
                subject = $tds.eq(4).text(),
                menuId = $tds.eq(5).text();
            // alert(menuId);
            // do something with productId, product, Quantity
            std_id.push(std);
            menu.push(menuId);
            subMain.push(subject);
        });
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_point_request/ConfirmAll",
            data: {semester, subMain, subject_id, menu, std_id},
            success: function () {
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#37FF33',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: 'บันทึกข้อมูลแล้ว'
                });
                ShowMenu();
            }
        });
    });


});