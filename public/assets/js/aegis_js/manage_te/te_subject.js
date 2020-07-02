$(document).ready(function () {


    var a;
    var datatable_semester;
    var datasubject;
    var SpecialSubject;
    var subjectAlert;
    var Sel_Sub;
    var SubCoop;
    var SubAssCoop;
    var semester_data;
    showSemester();
    hideSubJoin();

    var setflag = false;
    var subjectEdit = '';
    var semesterEdit = '';


    function hideSubJoin() {
        $('#Class_Copy').hide();
        $('#Class_Join').hide();
        $('#add_Subjoin').hide();
        $("#SubjectJoin").empty();
    }


    function showSemester() {
        $.ajax({
            url: "../Teacher_add_subject/getSemester",
            dataType: "json",
            success: function (response) {
                var html = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].semester_id + '" id="' + response[i].semester_id + '">' + response[i].semester_name + '</option>';
                    }
                }
                $('#yearterm').html(html);
                CheckAlert();
                // SubjectCoop();
            }
        });
    }

    function CheckAlert() {
        var url = $(location).attr('href').split("/");
        semester_data = $("#yearterm :selected").val();
        $.ajax({
            type: "POST",
            url: "../" + url[3] + "/Teacher_subject/getSubject_Alert",
            data: "&data=" + semester_data,
            dataType: "json",
            success: function (response) {
                console.log(response);
                subjectAlert = response;
                SubjectCoop();
            }
        });
    }

    function SubjectCoop() {
        var url = $(location).attr('href').split("/");
        semesterSelected = $("#yearterm :selected").val();
        $.ajax({
            type: "POST",
            url: "../" + url[3] + "/Teacher_subject/getSubject_Coop",
            data: "&data=" + semesterSelected,
            dataType: "json",
            success: function (response) {
                SubCoop = response;
                console.log(response);
                showSubject();
            }
        });
    }

    function showSubject() {
        var url = $(location).attr('href').split("/");
        semesterSelected = $("#yearterm :selected").val();
        console.log('\'' + semesterSelected + '\'');
        $.ajax({
            type: "POST",
            url: "../" + url[3] + "/Teacher_subject/getSubject",
            data: "data=" + semesterSelected,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                datasubject = response;
                var txtSub = '';
                var html = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        var chkalert = 0;
                        var htmlAlert = '';
                        txtSub = response[i].subsem_subject;
                        for (a = 0; a < SubCoop.length; a++) {
                            if (SubCoop[a].subcoop_mainsub == response[i].subsem_subject) {
                                txtSub += " / " + SubCoop[a].subcoop_supsub;
                            }
                        }
                        for (z = 0; z < subjectAlert.length; z++) {
                            if (subjectAlert[z].ps_tea_subAdd == response[i].subsem_subject) {
                                chkalert += 1;
                                htmlAlert = '<span style="font-size: 1.7em; color:#FF00FF;">' +
                                    '<i class="far fa-bell faa-ring animated float-sm-left ml-1 mr-1" title="แจ้งเตือน"></i>' +
                                    '</span>';
                            }
                        }
                        html += //'<a class="card" style="min-width: 300px; max-width : 310px;" id="' + response[i].subsem_subject + '" href="../select/subject/' + response[i].subsem_subject + '-' + response[i].subsem_semester + '" >' +
                            '<a class="card" style="min-width: 310px; max-width : 310px;" id="' + response[i].subsem_subject + '" href="../' + url[3] + '/te_select/annouce/' + response[i].subsem_subject + '-' + response[i].subsem_semester + '" >' +
                            '<img class="card-img-top" style="min-width: 310px; max-width : 310px; height: 180px;" src="../Img_sem/' + response[i].subsem_semester + response[i].subsem_subject + '.png?t=' + new Date().getTime() + '"onerror="this.src=\'/Img_sem/img_not_found.png\'" alt="Card image cap">' +
                            '<div class="card-body">' +
                            '<h5 class="card-title" value="' + response[i].subsem_subject + '" >' + txtSub + '</h5>' +
                            '<p class="card-text">' + response[i].subject_name + '</p>' +
                            '</div>' +
                            '<div class="card-footer text-muted">' +
                            htmlAlert +
                            '<span style="font-size: 1.7em;" id="EditSubJoin' + i + '" value="' + response[i].subsem_subject + '" data-1="' + response[i].subsem_semester + '">' +
                            '<i class="fas fa-edit float-sm-right ml-1 mr-1" title="แก้ไขวิชาร่วม"></i>' +
                            '</span>' +
                            '<span style="font-size: 1.7em;" id="EditImage' + i + '" value="' + response[i].subsem_subject + '" data-1="' + response[i].subsem_semester + '">' +
                            '<i class="far fa-images float-sm-right ml-1 mr-1" title="แก้ไขรูปภาพ"></i>' +
                            '</span>' +
                            '</div>' +
                            '</a>';
                    }
                }
                $('#showSubject').html(html);
                $.each(datasubject, function (x) {
                    $('#EditSubJoin' + x).click(function () {
                        // alert(datasubject[x].subsem_subject);
                        $("#SubjectJoin_Edit").empty();
                        subjectEdit = $(this).attr('value');
                        semesterEdit = $(this).attr('data-1');
                        $('#ShowSemester_Edit').text(semesterEdit);
                        $('#ShowSubject_Edit').text(subjectEdit);
                        $.ajax({
                            url: "/" + url[3] + "/Teacher_add_subject/Subject_Add_data_ctl",
                            dataType: "json",
                            success: function (response) {
                                var html = '';
                                var y;
                                if (response != null) {
                                    for (y = 0; y < response.length; y++) {
                                        if (response[y].subject_id != subjectEdit) {
                                            html += '<option value="' + response[y].subject_id + '" data-2="' + response[y].subject_teacher + '">' + response[y].subject_name + ' (' + response[y].subject_id + ') </option>';
                                        }
                                    }
                                }
                                $('#SubjectJoin_Edit_option').html(html);
                            }
                        });
                        for (a = 0; a < SubCoop.length; a++) {
                            if (SubCoop[a].subcoop_mainsub == subjectEdit) {
                                $('#SubjectJoin_Edit').append('<option value="' + SubCoop[a].subcoop_supsub + '"> ' + SubCoop[a].subject_name + ' (' + SubCoop[a].subcoop_supsub + ') </option>');
                            }
                        }
                        $('#Modal_Edit_subject_join').modal('show');
                        return false;
                    });

                    $('#EditImage' + x).click(function () {
                        subjectEdit = $(this).attr('value');
                        semesterEdit = $(this).attr('data-1');
                        // alert(semesterEdit+subjectEdit);
                        setflag = true;
                        console.log(setflag);
                        $('#cropper_img').modal('show');
                        return false;
                    });

                });
            }
        });

        $.ajax({
            type: "POST",
            url: "../" + url[3] + "/Teacher_subject/getSubject_Assist",
            data: "data=" + semesterSelected,
            dataType: "json",
            success: function (response) {
                console.log(response);
                var html = '';
                var txtSubAssist = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        var htmlAlert = '';
                        txtSubAssist = response[i].subject_id;
                        for (a = 0; a < SubCoop.length; a++) {
                            if (SubCoop[a].subcoop_mainsub == response[i].subject_id) {
                                txtSubAssist += " / " + SubCoop[a].subcoop_supsub;
                            }
                        }
                        for (z = 0; z < subjectAlert.length; z++) {
                            if (subjectAlert[z].ps_tea_subAdd == response[i].subject_id) {
                                htmlAlert = '<span style="font-size: 1.7em; color:#FF00FF;">' +
                                    '<i class="far fa-bell faa-ring animated float-sm-left ml-1 mr-1" title="แจ้งเตือน"></i>' +
                                    '</span>';
                            }
                        }
                        html +=
                            '<a class="card" style="min-width: 310px; max-width : 310px;" id="' + response[i].subject_id + '" href="../' + url[3] + '/te_select/annouce/' + response[i].subject_id + '-' + response[i].teaassist_semester + '" >' +
                            '<img class="card-img-top" style="min-width: 310px; max-width : 310px; height: 180px;" src="../Img_sem/' + response[i].teaassist_semester + response[i].subject_id + '.png" onerror="this.src=\'/Img_sem/img_not_found.png\'" alt="Card image cap">' +
                            '<div class="card-body">' +
                            '<h5 class="card-title" value="' + response[i].subject_id + '">' + txtSubAssist + '</h5>' +
                            '<p class="card-text">' + response[i].subject_name + '</p>' +
                            htmlAlert +
                            '</div>' +
                            // '<div class="card-footer text-muted">' +

                            // '</div>' +
                            '</a>';
                    }
                }
                $('#showSubject_assist').html(html);
                // sortui();
            }
        });

        $.ajax({
            type: "POST",
            url: "../" + url[3] + "/Teacher_subject/getSubject_Special",
            data: "data=" + semesterSelected,
            dataType: "json",
            success: function (response) {
                console.log(response);
                SpecialSubject = response;
                var txtSub = '';
                var html = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        txtSub = response[i].subsem_subject;
                        for (a = 0; a < SubCoop.length; a++) {
                            if (SubCoop[a].subcoop_mainsub == response[i].subsem_subject) {
                                txtSub += " / " + SubCoop[a].subcoop_supsub;
                            }
                        }
                        html += //'<a class="card" style="min-width: 300px; max-width : 310px;" id="' + response[i].subsem_subject + '" href="../select/subject/' + response[i].subsem_subject + '-' + response[i].subsem_semester + '" >' +
                            '<a class="card" style="min-width: 310px; max-width : 310px;" id="' + response[i].subsem_subject + '" href="../' + url[3] + '/te_select_special/annouce/' + response[i].subsem_subject + '-' + response[i].subsem_semester + '" >' +
                            '<img class="card-img-top" style="min-width: 310px; max-width : 310px; height: 180px;" src="../Img_sem/' + response[i].subsem_semester + response[i].subsem_subject + '.png?t=' + new Date().getTime() + '"onerror="this.src=\'/Img_sem/img_not_found.png\'" alt="Card image cap">' +
                            '<div class="card-body">' +
                            '<h5 class="card-title" value="' + response[i].subsem_subject + '" >' + txtSub + '</h5>' +
                            '<p class="card-text">' + response[i].subject_name + '</p>' +
                            '</div>' +
                            '<div class="card-footer text-muted">' +
                            '<span style="font-size: 1.7em;" id="EditSubJoinSpecail' + i + '" value="' + response[i].subsem_subject + '" data-1="' + response[i].subsem_semester + '">' +
                            '<i class="fas fa-edit float-sm-right ml-1 mr-1" title="แก้ไขวิชาร่วม"></i>' +
                            '</span>' +
                            '<span style="font-size: 1.7em;" id="EditImageSpecail' + i + '" value="' + response[i].subsem_subject + '" data-1="' + response[i].subsem_semester + '">' +
                            '<i class="far fa-images float-sm-right ml-1 mr-1" title="แก้ไขรูปภาพ"></i>' +
                            '</span>' +
                            '</div>' +
                            '</a>';
                    }
                }
                $('#showSubject_Special').html(html);
                sortui();
                $.each(SpecialSubject, function (x) {
                    $('#EditSubJoinSpecail' + x).click(function () {
                        // alert(datasubject[x].subsem_subject);
                        $("#SubjectJoin_Edit").empty();
                        subjectEdit = $(this).attr('value');
                        semesterEdit = $(this).attr('data-1');
                        $('#ShowSemester_Edit').text(semesterEdit);
                        $('#ShowSubject_Edit').text(subjectEdit);
                        $.ajax({
                            url: "/" + url[3] + "/Teacher_add_subject/Subject_Add_data_ctl",
                            dataType: "json",
                            success: function (response) {
                                var html = '';
                                var y;
                                if (response != null) {
                                    for (y = 0; y < response.length; y++) {
                                        if (response[y].subject_id != subjectEdit) {
                                            html += '<option value="' + response[y].subject_id + '" data-2="' + response[y].subject_teacher + '">' + response[y].subject_name + ' (' + response[y].subject_id + ') </option>';
                                        }
                                    }
                                }
                                $('#SubjectJoin_Edit_option').html(html);
                            }
                        });
                        for (a = 0; a < SubCoop.length; a++) {
                            if (SubCoop[a].subcoop_mainsub == subjectEdit) {
                                $('#SubjectJoin_Edit').append('<option value="' + SubCoop[a].subcoop_supsub + '"> ' + SubCoop[a].subject_name + ' (' + SubCoop[a].subcoop_supsub + ') </option>');
                            }
                        }
                        $('#Modal_Edit_subject_join').modal('show');
                        return false;
                    });

                    $('#EditImageSpecail' + x).click(function () {
                        subjectEdit = $(this).attr('value');
                        semesterEdit = $(this).attr('data-1');
                        // alert(semesterEdit+subjectEdit);
                        setflag = true;
                        console.log(setflag);
                        $('#cropper_img').modal('show');
                        return false;
                    });

                });
            }
        });
    }

    $('#Edit_Subjoin').click(function (e) {
        e.preventDefault();
        idSub = $('#SubjectJoin_Edit_option').val();
        nameSub = $("#SubjectJoin_Edit_option :selected").text();
        Editchk = 0;
        if (nameSub !== '') {
            if ($('#SubjectJoin_Edit').has('option').length > 0) {
                $("#SubjectJoin_Edit > option").each(function () {
                    if (this.value == idSub) {
                        Snackbar.show({
                            actionText: 'close',
                            pos: 'top-center',
                            actionTextColor: '#FF0000',
                            backgroundColor: '#323232',
                            width: 'auto',
                            text: 'วิชานี้ถูกเพิ่มแล้ว'
                        });
                        Editchk = 1;
                    }
                });
                if (Editchk != 1) {
                    $('#SubjectJoin_Edit').append('<option value="' + idSub + '"> ' + nameSub + '</option>');
                }
            } else {
                $('#SubjectJoin_Edit').append('<option value="' + idSub + '"> ' + nameSub + '</option>');
            }
        }
    });

    $('#Edit_DelSubjoin').click(function (e) {
        e.preventDefault();
        if (typeof $('#SubjectJoin_Edit :selected').val() != "undefined") {
            // alert($('#SubjectJoin_Edit :selected').val());
            subid = $('#SubjectJoin_Edit :selected').val();
            // $('#SubjectJoin_Edit option[value="' + subid + '"]').remove();
            $('#SubjectJoin_Edit').find('option[value=' + subid + ']').remove();
        } else {
            Snackbar.show({
                actionText: 'close',
                pos: 'top-center',
                actionTextColor: '#FF0000',
                backgroundColor: '#323232',
                width: 'auto',
                text: 'กรุณาเลือกวิชาที่ต้องการลบ'
            });
        }
    });

    $('#btnSave_EditSubJoin').click(function (e) {
        arr_subsjoin_edit = [];
        semester_edit = $('#ShowSemester_Edit').text();
        subject_edit = $('#ShowSubject_Edit').text();
        // alert(subject_edit);
        arr_subsjoin_edit = [];
        $("#SubjectJoin_Edit option").each(function () {
            arr_subsjoin_edit.push(this.value);
        });

        if (arr_subsjoin_edit != '') {
            // console.log(arr_subsjoin_edit);
            $.ajax({
                type: "POST",
                url: "/" + url[3] + '/Teacher_add_subject/Edit_SubJoin_Data_ctl_te',
                data: {
                    semester_edit: semester_edit,
                    subject_edit: subject_edit,
                    subjoin: arr_subsjoin_edit
                },
                success: function () {
                    Snackbar.show({
                        actionText: 'close',
                        pos: 'top-center',
                        actionTextColor: '#4CAF50',
                        backgroundColor: '#323232',
                        width: 'auto',
                        text: 'แก้ไขข้อมูลสำเร็จ'
                    });
                    showSemester();
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: "/" + url[3] + '/Teacher_add_subject/Edit_NoSubJoin_Data_ctl_te',
                data: {
                    semester_edit: semester_edit,
                    subject_edit: subject_edit,
                },
                success: function () {
                    Snackbar.show({
                        actionText: 'close',
                        pos: 'top-center',
                        actionTextColor: '#4CAF50',
                        backgroundColor: '#323232',
                        width: 'auto',
                        text: 'แก้ไขข้อมูลสำเร็จ'
                    });
                    showSemester();
                }
            });
        }
        $('#Modal_Edit_subject_join').modal('hide');
    });

    function sortui() {
        $("#showSubject").sortable({
            tolerance: 'pointer',
            revert: 'invalid',
            placeholder: 'placeholder',
            forceHelperSize: true,
            connectWith: ".card-deck",
            stop: function (event, div) {
                $('.card-deck').each(function () {
                    result = "";
                    $(this).find("h5").each(function () {
                        result += $(this).attr('value') + ",";
                    });
                    // console.log(result);
                });
            }
        });
        $("#showSubject_assist").sortable({
            tolerance: 'pointer',
            revert: 'invalid',
            placeholder: 'placeholder',
            forceHelperSize: true,
            connectWith: ".card-deck",
            stop: function (event, div) {
                $('.card-deck').each(function () {
                    resultass = "";
                    $(this).find("h5").each(function () {
                        resultass += $(this).attr('value') + ",";
                    });
                    console.log(resultass);
                });
            }
        });
    }

    $('#yearterm').change(function (e) {
        e.preventDefault();
        CheckAlert();
        // showSubject();
    });


    var iurl;
    var url = $(location).attr('href').split("/");

    add_modal_data();

    function add_modal_data() {
        iurl = "/" + url[3] + "/Teacher_add_subject/Add_Data_ctl_te";
        $('#Modal').find('.modal-title').text('เพิ่มข้อมูลวิชาประจำปีการศึกษา');
        $('#Modal').modal('show');
        $.ajax({
            url: "../Teacher_add_subject/getSemester",
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].semester_id + '">' + response[i].semester_name + '</option>';
                    }
                }
                $('#Semester_Form_add_option').html(html);
            }
        });
        $.ajax({
            url: "/" + url[3] + "/Teacher_add_subject/Subject_Add_data_ctl",
            dataType: "json",
            success: function (response) {
                console.log(response);
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].subject_id + '" data-2="' + response[i].subject_teacher + '">' + response[i].subject_name + '  (' + response[i].subject_id + ') </option>';
                    }
                }
                $('#Subject_Form_add_option').html(html);
                Sel_Sub = $('#Subject_Form_add_option').val();
            }
        });
    }

    $('#Subject_Form_add_option').change(function (e) {
        e.preventDefault();
        Sel_Sub = $('#Subject_Form_add_option').val();
        Select_SubChange();
    });

    $('#customSwitch').change(function (e) {
        e.preventDefault();
        var Swck;
        if ($(this).prop("checked") == true) {
            Swck = 1;
            $('#Class_Join').show();
            $('#add_Subjoin').show();
            $.ajax({
                url: "/" + url[3] + "/Teacher_add_subject/Subject_Add_data_ctl",
                dataType: "json",
                success: function (response) {
                    var html = '';
                    var i;
                    if (response != null) {
                        for (i = 0; i < response.length; i++) {
                            if (response[i].subject_id != Sel_Sub) {
                                html += '<option value="' + response[i].subject_id + '" data-2="' + response[i].subject_teacher + '">' + response[i].subject_name + '  (' + response[i].subject_id + ') </option>';
                            }
                        }
                    }
                    $('#SubjectJoin_add_option').html(html);
                }
            });
        } else {
            Swck = 0;
            $("#SubjectJoin").empty();
            $('#Class_Join').hide();
            $('#add_Subjoin').hide();
        }
    });


    var semesterCopy;
    var owner;

    $('#customSwitchCopy').change(function (e) {
        e.preventDefault();
        var Swck;
        if ($(this).prop("checked") == true) {
            Swck = 1;
            $('#Class_Copy').show();
            $.ajax({
                url: "/" + url[3] + "/Teacher_add_subject/getSemester",
                dataType: "json",
                success: function (response) {
                    var html = '';
                    var i;
                    if (response != null) {
                        for (i = 0; i < response.length; i++) {
                            if (response[i].subject_id != Sel_Sub) {
                                html += '<option value="' + response[i].semester_id + '" >' + response[i].semester_name + ' </option>';
                            }
                        }
                    }
                    $('#SemesterCopy_add_option').html(html);
                    semesterCopy = $("#SemesterCopy_add_option :selected").val();
                    // Subject_Copy();
                    Owner_teacher();
                }
            });
        } else {
            Swck = 0;
            $('#Class_Copy').hide();
        }
    });

    $('#SemesterCopy_add_option').change(function (e) {
        e.preventDefault();
        semesterCopy = $("#SemesterCopy_add_option :selected").val();
        // Subject_Copy();
        Owner_teacher();
    });

    function Owner_teacher() {
        $.ajax({
            type: "POST",
            url: "/" + url[3] + "/Teacher_add_subject/getOnwer_teacher",
            dataType: "json",
            success: function (response) {
                owner = response;
                Subject_Copy();
            }
        });
    }

    function Subject_Copy() {
        $.ajax({
            type: "POST",
            url: "/" + url[3] + "/Teacher_add_subject/getSubjectCopy",
            data: '&semester=' + semesterCopy,
            dataType: "json",
            success: function (response) {
                var html = '';
                var i;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        for (j = 0; j < owner.length; j++) {
                            if (response[i].subject_id == owner[j].teasub_subjectid) {
                                html += '<option value="' + response[i].subject_id + '" >' + response[i].subject_name + '  (' + response[i].subject_id + ') </option>';
                            }
                        }

                    }
                }
                $('#SubjectCopy_add_option').html(html);
            }
        });
    }


    $('#btnCloseAdd').click(function (e) {
        e.preventDefault();
        $("#SubjectJoin").empty();
        $('#customSwitchCopy').prop('checked', false);;
        $('#customSwitch').prop('checked', false);;
        $('#Class_Copy').hide();
        $('#Class_Join').hide();
    });

    $('#IconClose').click(function (e) {
        e.preventDefault();
        $("#SubjectJoin").empty();
        $('#customSwitchCopy').prop('checked', false);;
        $('#customSwitch').prop('checked', false);;
        $('#Class_Copy').hide();
        $('#Class_Join').hide();
    });

    function Select_SubChange() {
        $("#SubjectJoin").empty();
        if ($('#customSwitch').prop("checked") == true) {
            Swck = 1;
            $('#Class_Join').show();
            $('#add_Subjoin').show();
            $.ajax({
                url: "/" + url[3] + "/Teacher_add_subject/Subject_Add_data_ctl",
                dataType: "json",
                success: function (response) {
                    var html = '';
                    var i;
                    if (response != null) {
                        for (i = 0; i < response.length; i++) {
                            if (response[i].subject_id != Sel_Sub) {
                                html += '<option value="' + response[i].subject_id + '" data-2="' + response[i].subject_teacher + '">' + response[i].subject_name + ' </option>';
                            }
                        }
                    }
                    $('#SubjectJoin_add_option').html(html);
                }
            });
        }
    }

    $('#add_Subjoin').click(function (e) {
        e.preventDefault();
        idSub = $('#SubjectJoin_add_option').val();
        nameSub = $("#SubjectJoin_add_option :selected").text();
        chk = 0;
        if (nameSub !== '') {
            if ($('#SubjectJoin').has('option').length > 0) {
                $("#SubjectJoin > option").each(function () {
                    if (this.value == idSub) {
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
                    $('#SubjectJoin').append('<option value="' + idSub + '"> ' + nameSub + ' </option>');
                }
            } else {
                $('#SubjectJoin').append('<option value="' + idSub + '"> ' + nameSub + ' </option>');
            }
        }
    });

    $('#add_DelSubjoin').click(function (e) {
        e.preventDefault();
        if (typeof $('#SubjectJoin :selected').val() != "undefined") {
            // alert($('#SubjectJoin_Edit :selected').val());
            subid = $('#SubjectJoin :selected').val();
            // $('#SubjectJoin_Edit option[value="' + subid + '"]').remove();
            $('#SubjectJoin').find('option[value=' + subid + ']').remove();
        } else {
            Snackbar.show({
                actionText: 'close',
                pos: 'top-center',
                actionTextColor: '#FF0000',
                backgroundColor: '#323232',
                width: 'auto',
                text: 'กรุณาเลือกวิชาที่ต้องการลบ'
            });
        }
    });


    $('#btnSave').click(function (e) {
        e.preventDefault();
        ChkCopy();
    });


    function ChkCopy() {
        SubCopy = $("#SubjectCopy_add_option :selected").val();
        if ($('#customSwitchCopy').is(':checked')) {
            // alert(data);
            // alert(data2);
            if (typeof SubCopy == "undefined") {
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: 'กรุณาเลือกวิชาที่ต้องการคัดลอก'
                });
            } else {
                ChkSubJoin();
            }
        } else {
            ChkSubJoin();
        }
    }

    function ChkSubJoin() {
        if ($('#customSwitch').is(':checked')) {
            if ($('#SubjectJoin > option').length > 0) {
                AddSubject();
            } else {
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: 'กรุณาเลือกวิชาที่ต้องการเปิดร่วม'
                });
            }
        } else {
            AddSubject();
        }
    }

    function AddSubject() {
        data = $("#Semester_Form_add_option :selected").val();
        data2 = $("#Subject_Form_add_option :selected").val();
        $('#Modal_Add_subject').modal('hide');
        $('#progress_wait_img').modal('show');
        if (iurl == "/" + url[3] + '/Teacher_add_subject/Add_Data_ctl_te') {
            txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
            txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
        } else {
            txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
            txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
        }
        // data = $("#Semester_Form_add_option :selected").val();
        // data2 = $("#Subject_Form_add_option :selected").val();
        //update_teasub = $("#Subject_Form_add_option").find(':selected').data('2');
        $.ajax({
            type: "POST",
            url: iurl,
            data: {
                "semester_id": data,
                "subject_id": data2,
                "img_data": img_data
            },
            success: function () {
                $('#progress_wait_img').modal('hide');
                //$('#Modal_add').modal('hide');
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: txtsnack
                });
                add_subjoin();
                Copy_Subject();
                location.reload(true);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                setTimeout(function () {
                    $('#progress_wait_img').modal('hide');
                    // $('#progress_wait_img').modal('hide');
                    Snackbar.show({
                        actionText: 'close',
                        pos: 'top-center',
                        actionTextColor: '#4CAF50',
                        backgroundColor: '#323232',
                        width: 'auto',
                        text: txtsnackerr + errorThrown + ' )'
                    });
                }, 1000);
            }
        });
        showSemester();
    }


    function add_subjoin() {
        arr_subsjoin = [];
        arr_semes = [];
        arr_sub = [];
        $("#SubjectJoin option").each(function () {
            arr_subsjoin.push(this.value);
            arr_semes.push(data);
            arr_sub.push(data2);
        });

        $.ajax({
            type: "POST",
            url: "/" + url[3] + '/Teacher_add_subject/Add_SubJoin_Data_ctl_te',
            data: {
                $semes: arr_semes,
                $sub: arr_sub,
                $subjoin: arr_subsjoin
            },
            success: function () {
                $("#SubjectJoin").empty();
                // $('#Modal_Add_subject').modal('hide');
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: txtsnack
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#progress_wait_img').modal('hide');
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: txtsnackerr + errorThrown + ' )'
                });
            }
        });
    }

    function Copy_Subject() {
        if ($('#customSwitchCopy').is(':checked')) {
            SemCopy = $("#SemesterCopy_add_option :selected").val();
            SubCopy = $("#SubjectCopy_add_option :selected").val();

            $.ajax({
                type: "POST",
                url: "/" + url[3] + '/Teacher_add_subject/Add_SubCopy',
                data: '&semester=' + data + '&subject_id=' + data2 + '&SemCopy=' + SemCopy + '&SubCopy=' + SubCopy,
                success: function () {
                    $('#Modal_Add_subject').modal('hide');
                }
            });
            $('#Modal_Add_subject').modal('hide');
        }
    }

    function change_image() {
        if (setflag) {
            $('#progress_wait_img').modal('show');
            $.ajax({
                type: "POST",
                url: "/" + url[3] + "/Teacher_add_subject/Change_image_ctl_te",
                data: {
                    "semester_id": semesterEdit,
                    "subject_id": subjectEdit,
                    "img_data": img_data
                },
                success: function (response) {
                    console.log(response);
                    showSubject();
                    // showSubject();
                    $('#progress_wait_img').modal('hide');
                    location.reload(true);
                }
            });
        }
    }

    var HeadScore;
    var HeadDow;
    var HeadQuiz;

    $('#btnPreview').click(function (e) {
        e.preventDefault();
        SemCopy = $("#SemesterCopy_add_option :selected").val();
        SemCopyText = $("#SemesterCopy_add_option :selected").text();
        SubCopy = $("#SubjectCopy_add_option :selected").val();
        SubCopyText = $("#SubjectCopy_add_option :selected").text();
        if (SemCopyText != '' && SubCopyText != '') {
            /*Annouce*/
            $.ajax({
                type: "POST",
                url: "/" + url[3] + '/Teacher_add_subject/Preview_Anc',
                data: '&SemCopy=' + SemCopy + '&SubCopy=' + SubCopy,
                dataType: "json",
                success: function (responseAnc) {
                    var html = '';
                    if (responseAnc != null) {
                        for (i = 0; i < responseAnc.length; i++) {
                            html += 'หัวข้อประกาศ : ' + responseAnc[i].annouce_name + '<br>';
                        }
                    }
                    $('#Preview_Anc').html(html);
                }
            });

            HeadScore = '';
            $.ajax({
                type: "POST",
                url: "/" + url[3] + '/Teacher_add_subject/Preview_HeadScore',
                data: '&SemCopy=' + SemCopy + '&SubCopy=' + SubCopy,
                dataType: "json",
                success: function (responseHeadScore) {
                    var html = '';
                    if (responseHeadScore != null) {
                        HeadScore = responseHeadScore;
                        for (i = 0; i < responseHeadScore.length; i++) {
                            html += 'หัวข้อเมนูคะแนน : ' + responseHeadScore[i].point_name + '<div id="PV_HeadScore' + responseHeadScore[i].point_id + '"> </div> <br>';
                        }
                    }
                    $('#Preview_score').html(html);
                    $.each(HeadScore, function (x) {
                        score_id = HeadScore[x].point_id;
                        $.ajax({
                            type: "POST",
                            url: "/" + url[3] + '/Teacher_add_subject/Preview_Score',
                            data: '&SemCopy=' + SemCopy + '&SubCopy=' + SubCopy + '&score_id=' + HeadScore[x].point_id ,
                            dataType: "json",
                            success: function (responsesubScore) {
                                var html = '';
                                if (responsesubScore != null) {
                                    for (i = 0; i < responsesubScore.length; i++) {
                                        html += responsesubScore[i].setpoint_mininame + ' : ';
                                    }
                                }
                                $('#PV_HeadScore'+HeadScore[x].point_id).html(html);
                            }
                        });
                    });
                }
            });

            HeadDow = '';
            $.ajax({
                type: "POST",
                url: "/" + url[3] + '/Teacher_add_subject/Preview_HeadDownload',
                data: '&SemCopy=' + SemCopy + '&SubCopy=' + SubCopy,
                dataType: "json",
                success: function (responseHeadDow) {
                    var html = '';
                    if (responseHeadDow != null) {
                        HeadDow = responseHeadDow;
                        for (i = 0; i < responseHeadDow.length; i++) {
                            html += 'หัวข้อเมนูจัดการไฟล์ : ' + responseHeadDow[i].menuDowName + '<div id="PV_HeadDownload' + responseHeadDow[i].menuDowId + '"> </div> <br>';
                        }
                    }
                    $('#Preview_download').html(html);
                    $.each(HeadDow, function (x) {
                        $.ajax({
                            type: "POST",
                            url: "/" + url[3] + '/Teacher_add_subject/Preview_Dow',
                            data: '&SemCopy=' + SemCopy + '&SubCopy=' + SubCopy + '&dow_id=' + HeadDow[x].menuDowId ,
                            dataType: "json",
                            success: function (responseDow) {
                                var html = '';
                                if (responseDow != null) {
                                    for (i = 0; i < responseDow.length; i++) {
                                        html += '- ' + responseDow[i].fileName + ' <br> ';
                                    }
                                }
                                $('#PV_HeadDownload'+HeadDow[x].menuDowId).html(html);
                            }
                        });
                    });
                }
            });

            $.ajax({
                type: "POST",
                url: "/" + url[3] + '/Teacher_add_subject/Preview_upload',
                data: '&SemCopy=' + SemCopy + '&SubCopy=' + SubCopy,
                dataType: "json",
                success: function (responseUp) {
                    var html = '';
                    if (responseUp != null) {
                        for (i = 0; i < responseUp.length; i++) {
                            html += 'หัวข้อเมนูงานที่มอบหมาย : ' + responseUp[i].menuUpName + '<br>';
                        }
                    }
                    $('#Preview_upload').html(html);
                }
            });

            $.ajax({
                type: "POST",
                url: "/" + url[3] + '/Teacher_add_subject/Preview_media',
                data: '&SemCopy=' + SemCopy + '&SubCopy=' + SubCopy,
                dataType: "json",
                success: function (responseMedia) {
                    var html = '';
                    if (responseMedia != null) {
                        for (i = 0; i < responseMedia.length; i++) {
                            html += 'ไฟล์ : ' + responseMedia[i].media_show_name + '<br>';
                        }
                    }
                    $('#Preview_media').html(html);
                }
            });

            HeadQuiz = '';
            $.ajax({
                type: "POST",
                url: "/" + url[3] + '/Teacher_add_subject/Preview_HeadQuiz',
                data: '&SemCopy=' + SemCopy + '&SubCopy=' + SubCopy,
                dataType: "json",
                success: function (responseHeadQuiz) {
                    var html = '';
                    if (responseHeadQuiz != null) {
                        HeadQuiz = responseHeadQuiz;
                        for (i = 0; i < responseHeadQuiz.length; i++) {
                            html += 'หัวข้อเมนูแบบทดสอบ : ' + responseHeadQuiz[i].menuQuizName + '<div id="PV_HeadQuiz' + responseHeadQuiz[i].menuQuizId + '"> </div> <br>';
                        }
                    }
                    $('#Preview_quiz').html(html);
                    $.each(HeadQuiz, function (x) {
                        $.ajax({
                            type: "POST",
                            url: "/" + url[3] + '/Teacher_add_subject/Preview_Quiz',
                            data: '&SemCopy=' + SemCopy + '&SubCopy=' + SubCopy + '&Quiz_id=' + HeadQuiz[x].menuQuizId ,
                            dataType: "json",
                            success: function (responseQuiz) {
                                var html = '';
                                if (responseQuiz != null) {
                                    for (i = 0; i < responseQuiz.length; i++) {
                                        html += '- ' + responseQuiz[i].headerQuizName + ' <br> ';
                                    }
                                }
                                $('#PV_HeadQuiz'+HeadQuiz[x].menuQuizId).html(html);
                            }
                        });
                    });
                }
            });

            $.ajax({
                type: "POST",
                url: "/" + url[3] + '/Teacher_add_subject/Preview_vote',
                data: '&SemCopy=' + SemCopy + '&SubCopy=' + SubCopy,
                dataType: "json",
                success: function (responseVote) {
                    var html = '';
                    if (responseVote != null) {
                        for (i = 0; i < responseVote.length; i++) {
                            html += 'หัวข้อโหวต : ' + responseVote[i].menuVoteName + '<br>';
                        }
                    }
                    $('#Preview_vote').html(html);
                }
            });
           

            $("#ModalPreviewTitle").text('รายละเอียดวิชาที่คัดลอก | ' + SemCopyText + " : " + SubCopy);
            $('#ModalPreview').modal('show');
        } else {
            Snackbar.show({
                actionText: 'close',
                pos: 'top-center',
                actionTextColor: '#4CAF50',
                backgroundColor: '#323232',
                width: 'auto',
                text: 'กรุณาเลือกวิชาที่ต้องการคัดลอก'
            });
        }

    });

    // =========================== ADD IMG ========================
    $('#start_crop').click(function (e) {
        e.preventDefault();
        setflag = false;
        $('#cropper_img').modal('show');
        console.log(setflag);
    });

    var result = document.querySelector('.result');
    var img_result = document.querySelector('.img-result');
    var img_w = document.querySelector('.img-w');
    var img_h = document.querySelector('.img-h');
    var save = document.querySelector('.save');
    var cropped = document.querySelector('.cropped');
    var upload = document.querySelector('#file-input');
    var label_view = document.querySelector('.text_lable');
    var cropper = '';
    var img_data = null;
    // on change show image with crop options
    upload.addEventListener('change', (e) => {
        if (e.target.files.length) {
            // start file reader
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target.result) {
                    // create new image
                    let img = document.createElement('img');
                    img.id = 'image';
                    img.src = e.target.result
                    // clean result before
                    result.innerHTML = '';
                    // append new image
                    result.appendChild(img);
                    // show save btn and options
                    save.classList.remove('hide');
                    label_view.remove('hide');
                    // init cropper
                    cropper = new Cropper(img);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
            $('#file-input_label').text(e.target.files[0]['name']);
        }
    });

    // save on click
    save.addEventListener('click', (e) => {
        e.preventDefault();
        // get result to data uri
        let imgSrc = cropper.getCroppedCanvas({
            width: img_w.value // input value
        }).toDataURL();
        // remove hide class of img
        cropped.classList.remove('hide');
        img_result.classList.remove('hide');
        // show image cropped
        img_data = imgSrc;
        $('#cropper_img').modal('hide');
        change_image();
    });

    $('#display_crop').on('mousemove', function () {
        let imgSrc = cropper.getCroppedCanvas({
            width: img_w.value // input value
        }).toDataURL();
        // remove hide class of img
        cropped.classList.remove('hide');
        img_result.classList.remove('hide');
        // show image cropped
        cropped.src = imgSrc;
    });


});