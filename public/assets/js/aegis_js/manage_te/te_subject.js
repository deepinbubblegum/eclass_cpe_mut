$(document).ready(function () {

    var a;
    var datatable_semester;
    var datatable_subject;
    var data_semester;
    var Sel_Sub;
    var SubCoop;
    var SubAssCoop;

    showSemester();
    hideSubJoin();


    function hideSubJoin() {
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
            data: "data=" + semesterSelected,
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
                console.log(response);
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
                            '<a class="card" style="min-width: 300px; max-width : 310px;" id="' + response[i].subsem_subject + '" href="../' + url[3] + '/te_select/annouce/' + response[i].subsem_subject + '-' + response[i].subsem_semester + '" >' +
                            '<img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYZXAH2gX3tc7LJpgr0GaPOYnys6MkCpPi6VRmN6We88Uaq8wi" alt="Card image cap">' +
                            '<div class="card-body">' +
                            '<h5 class="card-title" value="' + response[i].subsem_subject + '" >' + txtSub + '</h5>' +
                            '<p class="card-text">' + response[i].subject_name + '</p>' +
                            '</div>' +
                            '</a>';
                    }
                }
                $('#showSubject').html(html);
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
                        txtSubAssist = response[i].subject_id;
                        for (a = 0; a < SubCoop.length; a++) {
                            if (SubCoop[a].subcoop_mainsub == response[i].subject_id) {
                                txtSubAssist += " / " + SubCoop[a].subcoop_supsub;
                            }
                        }
                        html +=
                            '<a class="card" style="min-width: 300px; max-width : 310px;" id="' + response[i].subject_id + '" href="../' + url[3] + '/te_select/annouce/' + response[i].subject_id + '-' + response[i].teaassist_semester + '" >' +
                            '<img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYZXAH2gX3tc7LJpgr0GaPOYnys6MkCpPi6VRmN6We88Uaq8wi" alt="Card image cap">' +
                            '<div class="card-body">' +
                            '<h5 class="card-title" value="' + response[i].subject_id + '">' + txtSubAssist + '</h5>' +
                            '<p class="card-text">' + response[i].subject_name + '</p>' +
                            '</div>' +
                            '</a>';
                    }
                }
                $('#showSubject_assist').html(html);
                sortui();
            }
        });
    }

    function sortui(){
        $("#showSubject").sortable({
            tolerance: 'pointer',
            revert: 'invalid',
            placeholder: 'placeholder',
            forceHelperSize: true,
            connectWith: ".card-deck",
            stop: function(event, div) {
                $('.card-deck').each(function() {
                    result = "";
                    $(this).find("h5").each(function(){
                        result += $(this).attr('value') + ",";
                    });
                    console.log(result);
                });
            }
        });
        $("#showSubject_assist").sortable({
            tolerance: 'pointer',
            revert: 'invalid',
            placeholder: 'placeholder',
            forceHelperSize: true,
            connectWith: ".card-deck",
            stop: function(event, div) {
                $('.card-deck').each(function() {
                    resultass = "";
                    $(this).find("h5").each(function(){
                        resultass += $(this).attr('value') + ",";
                    });
                    console.log(resultass);
                });
            }
        });
    }

    $('#yearterm').change(function (e) {
        e.preventDefault();
        showSubject();
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
                        html += '<option value="' + response[i].subject_id + '" data-2="' + response[i].subject_teacher + '">' + response[i].subject_name + ' </option>';
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
                                html += '<option value="' + response[i].subject_id + '" data-2="' + response[i].subject_teacher + '">' + response[i].subject_name + ' </option>';
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

    $('#btnCloseAdd').click(function (e) {
        e.preventDefault();
        $("#SubjectJoin").empty();
    });

    function Select_SubChange() {
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
        if ($('#SubjectJoin').has('option').length > 0) {
            $("#SubjectJoin > option").each(function () {
                if (this.value == idSub) {
                    alert('ซ้ำ');
                    chk = 1;
                }
            });
            if (chk != 1) {
                $('#SubjectJoin').append('<option value="' + idSub + '"> ' + nameSub + ' </option>');
            }
        } else {
            $('#SubjectJoin').append('<option value="' + idSub + '"> ' + nameSub + ' </option>');
        }
    });

    $('#btnSave').click(function (e) {
        e.preventDefault();

        data = $("#Semester_Form_add_option :selected").val();
        data2 = $("#Subject_Form_add_option :selected").val();

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
            data: '&semester_id=' + data + '&subject_id=' + data2,
            success: function () {
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
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
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
        showSemester();
    });


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
                $('#Modal_Add_subject').modal('hide');
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


});