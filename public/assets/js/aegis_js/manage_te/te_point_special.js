$(document).ready(function () {

    var url = $(location).attr('href').split("/");
    var iurl = '';
    // alert('semester5555');
    year = semester.substr(0, 4);
    part = semester.substr(4, 1);
    semesterDoc = part + "/" + year;
    var teacher = '';

    $("input[name^=EndDatePicker]").css('cursor', 'pointer');

    $('.datepicker').on(
        'dp.show',
        function (e) {
            $(".bootstrap-datetimepicker-widget").css(
                "background-color", "#3c3e43");
        });

    $('#EndDatePicker').pickdate({
        cancel: 'Clear',
        closeOnCancel: false,
        // closeOnSelect: true,
        //container: 'body',
        containerHidden: 'body',
        firstDay: 0,
        format: 'yyyy-mm-dd',
        formatSubmit: 'yyyy/mm/dd',
        hiddenPrefix: 'prefix_',
        hiddenSuffix: '_suffix',
        labelMonthNext: 'Go to the next month',
        labelMonthPrev: 'Go to the previous month',
        labelMonthSelect: 'Choose a month from the dropdown menu',
        labelYearSelect: 'Choose a year from the dropdown menu',
        ok: 'Ok',
        onClose: function () {
            console.log('Datepicker closes')
        },
        onOpen: function () {
            console.log('Datepicker opens')
        },
        selectMonths: true,
        selectYears: 10,
        today: 'Today'
    });


    ShowMenu();

    SubjectSemester();
    ShowSetpoint();
    Teacher_Owner_Subject();
    getTeacherSP();

    /*--------------------------------------------------------------------------------------------------------------------------*/

    $('#SelectFacultyAdd').select2({
        theme: 'bootstrap4',
    });

    $('#SelectMajorAdd').select2({
        theme: 'bootstrap4',
    });

    $('#SelectSubjectAdd').select2({
        theme: 'bootstrap4',
    });


    var dataMenu;
    var dataTeacherOwner = '';

    function getTeacherSP() {
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_special_point/getTeacherSP",
            data: '&semester=' + semester + '&subject=' + subject_id,
            dataType: "json",
            success: function (response) {
                for (i = 0; i < response.length; i++) {
                    teacher = response[i].de_Tname + "" + response[i].teacher_Tname
                }
            }
        });
    }

    function ShowMenu() {
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_special_point/ShowMenu",
            data: '&semester=' + semester + '&subject=' + subject_id,
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    // console.log(response);
                    dataMenu = response;
                    for (i = 0; i < response.length; i++) {
                        html += '<div class="expansion-panel list-group-item">' +
                            '<a aria-controls="collapse' + i + '" aria-expanded="true" class="expansion-panel-toggler collapsed text-left" data-toggle="collapse" href="#collapse' + i + '" id="' + response[i].menuPS_id + '">' +
                            '<div class="d-flex justify-content-start">' +
                            '<span style="font-size: 17px; color: blue;">' +
                            '<i class="fas fa-tools mr-2" id="iconEdit" value="' + i + '" data1="' + response[i].menuPS_id + '" title="แก้ไขเมนู"> </i>' +
                            '</span>' +
                            '<span style="font-size: 17px; color: red;">' +
                            '<i class="fas fa-trash-alt mr-2" id="iconDelete" value="' + i + '" data1="' + response[i].menuPS_id + '" title="ลบเมนู"> </i>' +
                            '</span>' +
                            '<span class="text-left"> ' + response[i].menuPS_header + ' </span>' +
                            '</div>' +
                            '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                            '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                            '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                            '</div>' +
                            '</a>' +
                            '<div aria-labelledby="' + response[i].menuPS_id + '" class="collapse" data-parent="#accordionMenu" id="collapse' + i + '">' +
                            '<div class="expansion-panel-body text-left">' +
                            'จำนวนวิชาที่แลกได้ : ' + response[i].menuPS_num_subject +
                            '<br>' +
                            'แลกคะแนนได้ถึงวันที่ : ' + response[i].menuPS_date +
                            '<br>' +
                            'ช่องคะแนน : ' + response[i].setpoint_fullname +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }
                }
                $('#accordionMenu').html(html);
            }
        });
    }

    var menuID;
    var DelPSid;

    $('#accordionMenu').on('click', '#iconEdit', function (e) {
        e.preventDefault();
        todayDate = new Date().toISOString();
        ival = $(this).attr('value');
        $('#Headtext').val(dataMenu[ival].menuPS_header);
        $('#NumSubject').val(dataMenu[ival].menuPS_num_subject);
        $('#EndDatePicker').val(dataMenu[ival].menuPS_date);
        menuID = $(this).attr('data1');

        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_special_point/ShowSetpoint",
            data: '&semester=' + semester + '&subject=' + subject_id,
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].setpoint_setpoint_id + '"  data-1="' + response[i].setpoint_id + '" >' + response[i].setpoint_fullname + '</option>';
                    }
                }
                $('#SelectSetpoint').html(html);
                $('#SelectSetpoint').val(dataMenu[ival].menuPS_setpointID);
            }
        });

        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_special_point/ShowSubjectAdd",
            data: '&semester=' + semester + '&subject_id=' + subject_id + '&menuId=' + menuID,
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].subject_id + '"> (' + response[i].subject_id + ') ' + response[i].subject_name + '</option>';
                    }
                }
                $('#SubjectAdd').html(html);
            }
        });

        $('#ModaladdMenuSPoint').modal('show');
        $('#addMenuSPointModal').text('แก้ไขข้อมูลเมนูแลกคะแนน');
        $('#btnsave').text('แก้ไขข้อมูล');
        iurl = "/" + url[3] + "/Te_special_point/EditMenuPointSpecial";
    });


    $('#accordionMenu').on('click', '#iconDelete', function (e) {
        e.preventDefault();
        ival = $(this).attr('value');
        DelPSid = $(this).attr('data1');
        $('#txtDel').text(dataMenu[ival].menuPS_header);

        $('#ModalDelete').modal('show');
    });


    $('#Modaladd').click(function () {
        $('#ModaladdMenuSPoint').modal('show');
        $('#addMenuSPointModal').text('เพิ่มข้อมูลเมนูแลกคะแนน');
        $('#btnsave').text('บันทึกข้อมูล');
        iurl = "/" + url[3] + "/Te_special_point/AddMenuPointSpecial";
        SubjectSemester();
        ShowSetpoint();
    });


    $('#btnclose').click(function () {
        $('#Headtext').val('');
        $('#NumSubject').val('');
        $('#EndDatePicker').val('');
        $('#SelectSetpoint :selected').val(dataMenu[0].menuPS_setpointID);
        $('#SubjectAdd').empty();
    });




    var DataSubSem = [];
    var SubSem;


    function ShowSetpoint() {
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_special_point/ShowSetpoint",
            data: '&semester=' + semester + '&subject=' + subject_id,
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].setpoint_setpoint_id + '"  data-1="' + response[i].setpoint_id + '" >' + response[i].setpoint_fullname + '</option>';
                    }
                }
                $('#SelectSetpoint').html(html);
            }
        });
    }


    function SubjectSemester() {
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_special_point/ShowSubjectSemester",
            data: '&semester=' + semester,
            dataType: "json",
            success: function (response) {
                SubSem = response;
                for (i = 0; i < response.length; i++) {
                    DataSubSem.push(response[i].subsem_subject);
                }
            }
        });
        select_Faculty_add();
    }


    function select_Faculty_add() {
        // console.log(DataSubSem);
        $.ajax({
            url: "/" + url[3] + "/Te_special_point/ShowFaculty",
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].faculty_id + '">' + response[i].faculty_name + '</option>';
                    }
                }
                $('#SelectFacultyAdd').html(html);
                select_major_add();
            }
        });
    }

    $('#SelectFacultyAdd').change(function () {
        subjectoption = [];
        subjectoptiontxt = [];
        select_major_add();
    });

    $('#SelectMajorAdd').change(function () {
        subjectoption = [];
        subjectoptiontxt = [];
        select_subject_add();
    });

    function select_major_add() {
        $data = $('#SelectFacultyAdd :selected').val();
        // alert($data);
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_special_point/ShowMajor",
            data: '&faculty=' + $data,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].major_id + '">('+ response[i].major_id + ') ' + response[i].major_name + '</option>';
                    }
                }
                $('#SelectMajorAdd').html(html);
                select_subject_add();
            }
        });
    }

    var subjectoption = [];
    var subjectoptiontxt = [];
    var subjectAdd = [];

    function select_subject_add() {
        $data = $('#SelectMajorAdd :selected').val();
        data2 = encodeURIComponent($data);
        
        subjectoption = [];
        subjectoptiontxt = [];
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_special_point/ShowSubject",
            data: '&major=' + data2,
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        if (DataSubSem.includes(response[i].subject_id) == false) {
                            subjectoption.push(response[i].subject_id);
                            subjectoptiontxt.push('(' + response[i].subject_id + ') ' + response[i].subject_name);
                            html += '<option value="' + response[i].subject_id + '"> (' + response[i].subject_id + ') ' + response[i].subject_name + '</option>';
                        }
                    }
                }
                $('#SelectSubjectAdd').html(html);
            }
        });
    }

    $('#AddSub').click(function () {
        $data = $('#SelectSubjectAdd :selected').val();
        $data2 = $('#SelectSubjectAdd :selected').text();
        chk = 0;
        if ($data2 != '') {
            if ($('#SubjectAdd').has('option').length > 0) {
                $("#SubjectAdd > option").each(function () {
                    if (this.value == $data) {
                        Snackbar.show({
                            actionText: 'close',
                            pos: 'top-center',
                            actionTextColor: '#FF0000',
                            backgroundColor: '#323232',
                            width: 'auto',
                            text: 'วิชานี้ถูกเพิ่มแล้ว'
                        });
                        chk = 1;
                    }
                });
                if (chk != 1) {
                    $('#SubjectAdd').append('<option value="' + $data + '"> ' + $data2 + ' </option>');
                }
            } else {
                $('#SubjectAdd').append('<option value="' + $data + '"> ' + $data2 + ' </option>');
            }
        } else {
            Snackbar.show({
                actionText: 'close',
                pos: 'top-center',
                actionTextColor: '#FF0000',
                backgroundColor: '#323232',
                width: 'auto',
                text: 'กรุณาเลือกวิชา'
            });
        }
    });

    $('#AddsubAll').click(function () {
        $data2 = $('#SelectSubjectAdd :selected').text();
        var chksub = 0;
        // alert(subjectoption);
        if ($data2 != '') {
            for (i = 0; i < subjectoption.length; i++) {
                $("#SubjectAdd > option").each(function () {
                    if (this.value == subjectoption[i]) {
                        chksub = 1;
                    }
                });
                if (chksub != 1) {
                    $('#SubjectAdd').append('<option value="' + subjectoption[i] + '"> ' + subjectoptiontxt[i] + ' </option>');
                }
                chksub = 0;
            }
        } else {
            Snackbar.show({
                actionText: 'close',
                pos: 'top-center',
                actionTextColor: '#FF0000',
                backgroundColor: '#323232',
                width: 'auto',
                text: 'กรุณาเลือกวิชา'
            });
        }
    });

    $('#DelSub').click(function () {
        $data = $('#SubjectAdd :selected').val();
        $("#SubjectAdd option[value='" + $data + "']").remove();
    });

    $('#DelsubAll').click(function () {
        $('#SubjectAdd').empty();
    });

    $('#btnsave').click(function () {

        pointID = $('#SelectSetpoint :selected').attr('data-1');
        SetpointID = $('#SelectSetpoint :selected').val();
        header = $('#Headtext').val();
        num = $('#NumSubject').val();
        dateEnd = $('#EndDatePicker').val();

        if (dateEnd != '' && header != '' && num != '' && $.isNumeric(num)) {
            $.ajax({
                type: 'POST',
                url: iurl,
                data: '&semester=' + semester + '&subject=' + subject_id + '&pointID=' + pointID + '&SetpointID=' + SetpointID + '&header=' + header + '&num=' + num + '&date=' + dateEnd + '&menuID=' + menuID,
                dataType: "json",
                success: function (response) {
                    // console.log(response);
                    // if (iurl != "/" + url[3] + "/Te_special_point/AddMenuPointSpecial") {
                    //     $('#Headtext').val('');
                    //     $('#NumSubject').val('');
                    //     $('#EndDatePicker').val('');
                    //     $('#ModaladdMenuSPoint').modal('hide');
                    //     ShowMenu();
                    // }
                    if (iurl == "/" + url[3] + "/Te_special_point/AddMenuPointSpecial") {
                        menuID = response;
                    }
                    ShowMenu();
                    AddSub(menuID);
                }
            });
        } else {
            Snackbar.show({
                actionText: 'close',
                pos: 'top-center',
                actionTextColor: '#FF0000',
                backgroundColor: '#323232',
                width: 'auto',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วน'
            });
        }
    });


    function AddSub(PSid) {
        if ($('#SubjectAdd').has('option').length > 0) {
            $("#SubjectAdd > option").each(function () {
                subjectAdd.push(this.value);
            });
        }

        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_special_point/AddSub",
            data: {
                subjectAdd,
                subject_id,
                semester,
                PSid
            },
            dataType: "json",
            success: function () {

            }
        });

        // console.log(response);
        if (iurl != "/" + url[3] + "/Te_special_point/AddMenuPointSpecial") {
            Snackbar.show({
                actionText: 'close',
                pos: 'top-center',
                actionTextColor: '#37FF33',
                backgroundColor: '#323232',
                width: 'auto',
                text: 'แก้ไขข้อมูลแล้ว'
            });

            subjectAdd = [];
            $('#Headtext').val('');
            $('#NumSubject').val('');
            $('#EndDatePicker').val('');
            $('#SubjectAdd').empty();
            $('#ModaladdMenuSPoint').modal('hide');
        } else {
            Snackbar.show({
                actionText: 'close',
                pos: 'top-center',
                actionTextColor: '#37FF33',
                backgroundColor: '#323232',
                width: 'auto',
                text: 'เพิ่มข้อมูลแล้ว'
            });
        }

        subjectAdd = [];
        $('#Headtext').val('');
        $('#NumSubject').val('');
        $('#EndDatePicker').val('');
        $('#SelectSetpoint :selected').val(dataMenu[0].menuPS_setpointID);
        $('#SubjectAdd').empty();
        ShowMenu();
    }

    $('#DeleteMenu').click(function () {
        // alert(DelPSid);
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_special_point/DeleteMenu",
            data: '&semester=' + semester + '&subject=' + subject_id + '&memuId=' + DelPSid,
            success: function () {
                $('#ModalDelete').modal('hide');
                ShowMenu();
            }
        });
    });

    function Teacher_Owner_Subject() {
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_special_point/Teacher_Owner",
            data: '&semester=' + semester,
            dataType: "json",
            success: function (response) {
                dataTeacherOwner = response;
            }
        });
    }


    /*------------------------------------------------------------------------------------------------ Show Student Request ------------------------------------------------------------------------------------------ */

    var dataStdRequest;
    var dataStdPoint = '';
    var dataselect = '';
    var idMenu = '';
    var selecter = '';

    var subAddAll = [];
    var StdAll = [];
    var PointAll = [];

    var selectOption = '';

    ShowStdRequest();

    function ShowStdRequest() {
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_special_point/ShowMenuStdRequest",
            data: '&semester=' + semester + '&subject=' + subject_id,
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    // console.log(response);
                    dataStdRequest = response;
                    for (i = 0; i < response.length; i++) {
                        html += '<div class="expansion-panel list-group-item">' +
                            '<a aria-controls="collapse' + i + '" aria-expanded="true" class="expansion-panel-toggler collapsed text-left" data-toggle="collapse" href="#collapseSub' + response[i].menuPS_id + '" id="' + response[i].menuPS_id + '">' +
                            '<div class="d-flex justify-content-start">' +
                            '<span class="text-left"> ' + response[i].menuPS_header + ' </span>' +
                            '</div>' +
                            '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                            '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                            '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                            '</div>' +
                            '</a>' +
                            '<div aria-labelledby="' + response[i].menuPS_id + '" class="collapse" data-parent="#accordionStdRequest" id="collapseSub' + response[i].menuPS_id + '">' +
                            '<div class="card-body text-left">' +

                            '<div class="row">' +
                            '<div class="col-md-4">' +
                            '<label for="inputState">ค้นหาข้อมูลจากวิชา</label>' +
                            '<select class="form-control" id="SelectSubjectRequest' + i + '">' +

                            '</select>' +
                            '</div>' +
                            '<div class="col-md-4">' +
                            '<label for="inputState">ยืนยันการแลกคะแนนนักศึกษาทั้งหมด</label>' +
                            '<button type="button" id="confirmAll' + i + '" data1="' + response[i].menuPS_id + '" class="btn btn-primary">ยืนยันทั้งหมด</button>' +
                            '</div>' +
                            '<div class="col-md-4">' +
                            '<label for="inputState">ออกเอกสารขอแลกคะแนน</label>' +
                            '<button type="button" id="PrintPDF' + i + '" data1="' + response[i].menuPS_id + '" class="btn btn-success">ออกเอกสาร</button>' +
                            '</div>' +
                            '</div>' +

                            '</div>' +
                            '<div class="table-responsive">' +
                            '<table class="table text-left">' +
                            '<thead id="Thead' + i + '">' +
                            '</thead>' +
                            '<tbody id="Tbody' + i + '" value="' + response[i].menuPS_id + '" >' +
                            '</tbody>' +
                            '</table>' +
                            '</div>' +

                            '</div>' +
                            '</div>' +
                            '</div>';
                    }
                }
                $('#accordionStdRequest').html(html);
                GetSelectSearch();
                genThead();

                $.each(dataStdRequest, function (i) {
                    $('#confirmAll' + i).click(function () {
                        idMenu = $(this).attr('data1');
                        subAddAll = [];
                        StdAll = [];
                        PointAll = [];
                        $('#Tbody' + i).find('tr').each(function (i, el) {
                            var $tds = $(this).find('td'),
                                std_id = $tds.eq(0).text(),
                                subjectRequest = $tds.eq(1).text(),
                                point = $tds.eq(2).text(),
                                chk_submit = $tds.eq(3).text();
                            // alert(std_id + '||' + subject);
                            var subject_all = subjectRequest.split(')')[0];
                            var sub_id = subject_all.split('(')[1];
                            // alert(std_id);
                            // do something with productId, product, Quantity
                            subAddAll.push(sub_id);
                            StdAll.push(std_id);
                            PointAll.push(point);
                        });
                        // alert(idMenu);
                        if (PointAll != '') {
                            $.ajax({
                                type: 'POST',
                                url: "/" + url[3] + "/Te_special_point/ConfirmStdAll",
                                data: {
                                    semester,
                                    subject_id,
                                    idMenu,
                                    StdAll,
                                    subAddAll,
                                    PointAll,
                                    idMenu
                                },
                                success: function () {
                                    Snackbar.show({
                                        actionText: 'close',
                                        pos: 'top-center',
                                        actionTextColor: '#37FF33',
                                        backgroundColor: '#323232',
                                        width: 'auto',
                                        text: 'ยืนยันข้อมูลแล้ว'
                                    });
                                    ShowStdRequest();
                                }
                            });
                        } else {
                            Snackbar.show({
                                actionText: 'close',
                                pos: 'top-center',
                                actionTextColor: '#37FF33',
                                backgroundColor: '#323232',
                                width: 'auto',
                                text: 'ไม่มีข้อมูลที่จะยืนยัน'
                            });
                        }

                    });

                    $('#PrintPDF' + i).click(function () {
                        // alert(dataTeacherOwner);
                        var teacher_TH = '';
                        var subject_ID = '';
                        var subject_Name = '';
                        // var NoDoc = 0;
                        idMenu = $(this).attr('data1');
                        var selectSubjectPDF = $('#SelectSubjectRequest' + i).val();

                        if (selectSubjectPDF == 'all') {
                            Snackbar.show({
                                actionText: 'close',
                                pos: 'top-center',
                                actionTextColor: '#f44336',
                                backgroundColor: '#323232',
                                width: 'auto',
                                text: 'กรุณาเลือกวิชาที่ต้องการออกเอกสาร'
                            });
                            return false;
                        } else {
                            var SubTextPDF = $('#SelectSubjectRequest' + i + ' :selected').text();
                            var subject_all = SubTextPDF.split(')')[0];
                            var sub_id = subject_all.split('(')[1];
                            var sub_name = SubTextPDF.split(')')[1];
                            for (t = 0; t < dataTeacherOwner.length; t++) {
                                if (selectSubjectPDF == dataTeacherOwner[t].subsem_subject) {
                                    teacher_TH = dataTeacherOwner[t].de_Tname + ' ' + dataTeacherOwner[t].teacher_Tname;
                                    subject_ID = dataTeacherOwner[t].subject_id;
                                    subject_Name = dataTeacherOwner[t].subject_name;
                                }
                            }
                        }

                        var StdID = [];
                        var StdName = [];
                        var Stdpoint = [];
                        $('#Tbody' + i).find('tr').each(function (i, el) {
                            var $tds = $(this).find('td'),
                                std_id = $tds.eq(0).text(),
                                point = $tds.eq(2).text(),
                                teaConfirm = $tds.eq(6).text();
                            if (teaConfirm != 'ยังไม่รับทราบ') {
                                var name = '';
                                for (s = 0; s < dataStdPoint.length; s++) {
                                    if (dataStdPoint[s].ps_std_stdID == std_id) {
                                        name = dataStdPoint[s].std_Tname;
                                    }
                                }
                                StdID.push(std_id);
                                StdName.push(name);
                                Stdpoint.push(point);
                            }
                        });

                        if (StdID.length > 0) {
                            $.ajax({
                                type: 'POST',
                                url: "/" + url[3] + "/Te_document/index",
                                data: {
                                    StdID,
                                    StdName,
                                    Stdpoint,
                                    teacher_TH,
                                    subject_ID,
                                    subject_Name,
                                    semesterDoc,
                                    teacher,
                                    semester
                                },
                                dataType: "json",
                                success: function (response) {
                                    // alert(response);
                                    window.open(response);
                                }
                            });
                        } else {
                            Snackbar.show({
                                actionText: 'close',
                                pos: 'top-center',
                                actionTextColor: '#f44336',
                                backgroundColor: '#323232',
                                width: 'auto',
                                text: 'ไม่มีนักศึกษาแลกคะแนนได้'
                            });
                            return false;
                        }

                    });

                });
                if (idMenu != '') {
                    $('#collapseSub' + idMenu).collapse({
                        toggle: true
                    });
                }
            }
        });
    }

    function GetSelectSearch() {
        for (z = 0; z < dataStdRequest.length; z++) {
            menuID = dataStdRequest[z].menuPS_id;
            genSelectSearch(menuID, z);
        }
        GetTbody();
    }

    function genSelectSearch(menuID, z) {
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_special_point/ShowSubjectOption",
            data: '&semester=' + semester + '&subject=' + subject_id + '&menuID=' + menuID,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                dataselect = response;
                var html = '';
                var a;
                html += '<option value="all">ทั้งหมด</option>';
                if (response != null) {
                    console.log(response);
                    for (a = 0; a < response.length; a++) {
                        html += '<option value="' + response[a].subject_id + '">(' + response[a].subject_id + ') ' + response[a].subject_name + '</option>';
                    }
                }
                $('#SelectSubjectRequest' + z).html(html);
                // $('#SelectSubjectRequest' + z).val('all');
                // $('#SelectSubjectRequest' + z + ' option[value="all"]').attr('selected', 'selected');
                $.each(dataselect, function (z) {
                    $('#SelectSubjectRequest' + z).change(function () {
                        selectOption = $('#SelectSubjectRequest' + z).val();
                        selecter = selectOption;
                        // alert(selectOption);
                        menuID = dataStdRequest[z].menuPS_id;
                        ChangeSelect(selectOption, menuID, z)
                    });
                });

            }
        });
    }

    function genThead() {
        var html = '';
        html += '<tr>' +
            '<th scope="col">รหัสนักศึกษา</th>' +
            '<th scope="col">วิชาที่ขอแลกคะแนน</th>' +
            '<th scope="col">คะแนนที่ได้</th>' +
            '<th scope="col">สถานะ</th>' +
            '<th scope="col">ยืนยันข้อมูล</th>' +
            '<th scope="col">ลบข้อมูล</th>' +
            '<th scope="col">อาจารย์รับทราบ</th>' +
            '</tr>';
        for (i = 0; i < dataStdRequest.length; i++) {
            $('#Thead' + i).html(html);
        }
    }

    function GetTbody() {
        for (i = 0; i < dataStdRequest.length; i++) {
            val = $('#Tbody' + i).attr('value');
            genTbody(val, i);
        }
    }

    function genTbody(val, i) {
        // select = $('#SelectSubjectRequest' + i).val();
        // alert(selectOption);
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_special_point/ShowStdRequest",
            data: '&semester=' + semester + '&subject=' + subject_id + '&menuID=' + val,
            dataType: "json",
            success: function (response) {
                var html = '';
                var a;
                if (response != null) {
                    console.log(response);
                    dataStdPoint = response;
                    for (a = 0; a < response.length; a++) {
                        var stateConfirm = '';
                        var btndel = '';
                        var btnConfirm = '';
                        var tea_confirm = '';
                        if (response[a].ps_tea_confirm == 1) {
                            tea_confirm = '<span style="color:#2196f3;" class="chip"><i class="far fa-check-circle mr-2"></i>รับทราบแล้ว</span>';
                        } else {
                            tea_confirm = '<span style="color:#f44336;" class="chip"><i class="far fa-times-circle mr-2"></i>ยังไม่รับทราบ</span>';
                        }
                        if (response[a].ps_std_status == 0) {
                            stateConfirm = 'ยังไม่ยืนยัน';
                            btndel = '<button type="button" class="btn btn-danger btn-sm" id="btlDel' + val + a + '" data="' + response[a].ps_std_stdID + '" data2="' + response[a].ps_std_subAdd + '" data3="' + response[a].ps_std_psID + '"  >ลบ</button>';
                            btnConfirm = '<button type="button" class="btn btn-primary btn-sm" id="btlConfirm' + val + a + '" data="' + response[a].ps_std_stdID + '" data2="' + response[a].ps_std_subAdd + '" data3="' + response[a].ps_std_psID + '" data4="' + response[a].ps_std_point + '"  >ยืนยัน</button>';
                        } else {
                            stateConfirm = 'ยืนยันแล้ว';
                            btndel = '<button type="button" class="btn btn-danger btn-sm" disabled>ลบ</button>';
                            btnConfirm = '<button type="button" class="btn btn-danger btn-sm" disabled>ยืนยัน</button>';
                        }
                        html += '<tr>' +
                            '<td scope="row">' + response[a].ps_std_stdID + '</td>' +
                            '<td> (' + response[a].ps_std_subAdd + ') ' + response[a].subject_name + '</td>' +
                            // '<td id="456">' + response[a].subject_name + '</td>' +
                            '<td>' + response[a].ps_std_point + '</td>' +
                            '<td>' + stateConfirm + '</td>' +
                            '<td>' + btnConfirm + '</td>' +
                            '<td>' + btndel + '</td>' +
                            '<td>' + tea_confirm + '</td>' +
                            '</tr>';
                    }
                }
                $('#Tbody' + i).html(html);

                $.each(dataStdPoint, function (a) {
                    $('#btlDel' + val + a).click(function () {
                        std = $(this).attr('data');
                        sub = $(this).attr('data2');
                        idMenu = $(this).attr('data3');
                        $('#txtDelPS').text('นักศึกษา:' + std + ' | วิชา:' + sub);
                        $('#ModalDeletePS').modal('show');
                    });

                    $('#btlConfirm' + val + a).click(function () {
                        stdCon = $(this).attr('data');
                        subCon = $(this).attr('data2');
                        idMenuCon = $(this).attr('data3');
                        point_std = $(this).attr('data4');
                        $.ajax({
                            type: 'POST',
                            url: "/" + url[3] + "/Te_special_point/ConfirmStd",
                            data: '&semester=' + semester + '&subject=' + subject_id + '&memuId=' + idMenuCon + '&std=' + stdCon + '&subAdd=' + subCon + '&point_std=' + point_std,
                            success: function () {
                                Snackbar.show({
                                    actionText: 'close',
                                    pos: 'top-center',
                                    actionTextColor: '#37FF33',
                                    backgroundColor: '#323232',
                                    width: 'auto',
                                    text: 'ยืนยันข้อมูลแล้ว'
                                });
                                idMenu = idMenuCon;
                                ShowStdRequest();
                            }
                        });
                    });
                });
            }
        });
    }



    function ChangeSelect(selectOption, menuID, z) {
        // alert(selectOption + ' || ' + menuID);
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_special_point/ShowStdRequestSelect",
            data: '&semester=' + semester + '&subject=' + subject_id + '&menuID=' + menuID + '&option=' + selectOption,
            dataType: "json",
            success: function (response) {
                var html = '';
                var a;
                if (response != null) {
                    console.log(response);
                    dataStdPoint = response;
                    for (a = 0; a < response.length; a++) {
                        var stateConfirm = '';
                        var btndel = '';
                        var btnConfirm = '';
                        var tea_confirm = '';
                        if (response[a].ps_tea_confirm == 1) {
                            tea_confirm = '<span style="color:#2196f3;" class="chip"><i class="far fa-check-circle mr-2"></i>รับทราบแล้ว</span>';
                        } else {
                            tea_confirm = '<span style="color:#f44336;" class="chip"><i class="far fa-times-circle mr-2"></i>ยังไม่รับทราบ</span>';
                        }

                        if (response[a].ps_std_status == 0) {
                            stateConfirm = 'ยังไม่ยืนยัน';
                            btndel = '<button type="button" class="btn btn-danger btn-sm" id="btlDel' + menuID + a + '" data="' + response[a].ps_std_stdID + '" data2="' + response[a].ps_std_subAdd + '" data3="' + response[a].ps_std_psID + '"  >ลบ</button>';
                            btnConfirm = '<button type="button" class="btn btn-primary btn-sm" id="btlConfirm' + menuID + a + '" data="' + response[a].ps_std_stdID + '" data2="' + response[a].ps_std_subAdd + '" data3="' + response[a].ps_std_psID + '" data4="' + response[a].ps_std_point + '"  >ยืนยัน</button>';
                        } else {
                            stateConfirm = 'ยืนยันแล้ว';
                            btndel = '<button type="button" class="btn btn-danger btn-sm" disabled>ลบ</button>';
                            btnConfirm = '<button type="button" class="btn btn-danger btn-sm" disabled>ยืนยัน</button>';
                        }
                        html += '<tr>' +
                            '<td scope="row">' + response[a].ps_std_stdID + '</td>' +
                            '<td> (' + response[a].ps_std_subAdd + ') ' + response[a].subject_name + '</td>' +
                            // '<td id="456">' + response[a].subject_name + '</td>' +
                            '<td>' + response[a].ps_std_point + '</td>' +
                            '<td>' + stateConfirm + '</td>' +
                            '<td>' + btnConfirm + '</td>' +
                            '<td>' + btndel + '</td>' +
                            '<td>' + tea_confirm + '</td>' +
                            '</tr>';
                    }
                }
                $('#Tbody' + z).html(html);

                $.each(dataStdPoint, function (a) {
                    $('#btlDel' + menuID + a).click(function () {
                        std = $(this).attr('data');
                        sub = $(this).attr('data2');
                        idMenu = $(this).attr('data3');
                        $('#txtDelPS').text('นักศึกษา:' + std + ' | วิชา:' + sub);
                        $('#ModalDeletePS').modal('show');
                    });

                    $('#btlConfirm' + menuID + a).click(function () {
                        stdCon = $(this).attr('data');
                        subCon = $(this).attr('data2');
                        idMenuCon = $(this).attr('data3');
                        point_std = $(this).attr('data4');
                        $.ajax({
                            type: 'POST',
                            url: "/" + url[3] + "/Te_special_point/ConfirmStd",
                            data: '&semester=' + semester + '&subject=' + subject_id + '&memuId=' + idMenuCon + '&std=' + stdCon + '&subAdd=' + subCon + '&point_std=' + point_std,
                            success: function () {
                                Snackbar.show({
                                    actionText: 'close',
                                    pos: 'top-center',
                                    actionTextColor: '#37FF33',
                                    backgroundColor: '#323232',
                                    width: 'auto',
                                    text: 'ยืนยันข้อมูลแล้ว'
                                });
                                idMenu = idMenuCon;
                                ShowStdRequest();
                            }
                        });
                    });
                });
            }
        });
    }


    $('#DeletePS').click(function () {
        // alert(std + sub + '|' + idMenu);
        $.ajax({
            type: 'POST',
            url: "/" + url[3] + "/Te_special_point/DeletePointStd",
            data: '&semester=' + semester + '&subject=' + subject_id + '&memuId=' + idMenu + '&std=' + std + '&subAdd=' + sub,
            success: function () {
                $('#ModalDeletePS').modal('hide');
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#37FF33',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: 'ลบข้อมูลแล้ว'
                });
                ShowStdRequest();
            }
        });
        $('#collapseSub' + idMenu).collapse({
            toggle: true
        });
    });


});