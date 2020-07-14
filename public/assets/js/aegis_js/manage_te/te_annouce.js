$(document).ready(function () {


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
    var element = document.getElementById("Anc");
    element.classList.add("bg-primary-light");
    var element = document.getElementById("side_Anc");
    element.classList.add("bg-primary-light");
    /******************************************************************** */


    year = semester.substr(0, 4);
    part = semester.substr(4, 1);
    $('#header').text('ประกาศถึงนักศึกษา : ' + subject_id + ' - ' + year + '/' + part);

    var url = $(location).attr('href').split("/");
    var data_annouce;
    var iurl;
    var idAnnouce;
    ShowDataAnnouce();
    // hideAllPop();

    var popData = ["#popupHead", "#popupDis"];

    var popValue = [
        //[POP_ID,POP_TEXT]
        ['popupHead', 'กรุณาระบุหัวข้อประกาศ'],
        ['popupDis', 'กรุณาระบุเนื้อหาประกาศ']
    ];

    var formData = ["#Headtext", "#summernote"];

    function popGen() {
        for (i = 0; i < popValue.length; i++) {
            $("<div id='" + popValue[i][0] + "' class=\"text-danger\">*" + popValue[i][1] + "</div>").insertAfter(formData[i]);
        }
    }

    function hideAllPop() {
        for (i = 0; i < popData.length; i++) {
            $(popData[i]).hide();
        }
    }

    popGen();
    hideAllPop();


    $('#summernote').summernote({
        dialogsInBody: true,
        codeviewFilter: false,
        codeviewIframeFilter: true,
        placeholder: 'เนื้อหาประกาศ',
        // tabsize: 1,
        height: 350,
        toolbar: [
            ['style', ['style']],
            // ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            // ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ]
    });

    $('#summernote').summernote('code', '');


    $("input[name^=EndDatePicker]").css('cursor', 'pointer');

    $('.datepicker').on(
        'dp.show',
        function (e) {
            $(".bootstrap-datetimepicker-widget").css(
                "background-color", "#3c3e43");
        });


    //$('label[for^=EndDatePicker]').css('cursor', 'pointer');
    $('#EndDatePicker').pickdate({
        cancel: 'Clear',
        closeOnCancel: false,
        closeOnSelect: true,
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

    function ShowDataAnnouce() {
        $.ajax({
            type: "POST",
            url: "/" + url[3] + "/Te_annouce/Show_Data_ctl",
            data: '&semester=' + semester + '&subject=' + subject_id,
            dataType: "json",
            // url: '/' + url[3] + '/Std_select/Show_Data_ctl/' + subject_id + '-' + semester,
            // dataType: "json",
            success: function (response) {
                console.log(response);
                var html = '';
                var i;
                var date_end;
                data_annouce = response;
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        if (response[i].annouce_time_end == "0000-00-00") {
                            date_end = "ประกาศตลอด";
                        } else {
                            date_end = response[i].annouce_time_end;
                        }

                        if (i == 0) {
                            html += '<div class="expansion-panel list-group-item ">' +
                                '<a aria-controls="collapse' + i + '" aria-expanded="true" class="expansion-panel-toggler collapsed text-left" data-toggle="collapse" href="#collapse' + i + '" id="' + response[i].annouce_id + '">' +
                                '<div class="d-flex justify-content-start">' +
                                '<span style="font-size: 17px; color: blue;"">' +
                                '<i class="fas fa-tools mr-2" id="iconEdit" value="' + i + '" title="แก้ไขประกาศ"> </i>' +
                                '</span>' +
                                '<span style="font-size: 17px; color: red;"">' +
                                '<i class="fas fa-trash-alt mr-2" id="iconDelete" value="' + i + '" title="ลบประกาศ"> </i>' +
                                '</span>' +
                                '<span class="text-left">' + response[i].annouce_name + '</span>' +
                                '</div>' +
                                '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                                '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                                '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                                '</div>' +
                                '</a>' +
                                '<div aria-labelledby="' + response[i].annouce_id + '" class="collapse " data-parent="#accordionOne" id="collapse' + i + '">' +
                                '<div class="expansion-panel-body text-left">' +
                                response[i].annouce_discription +
                                '</div>' +
                                '<div class="navdrawer-divider"></div>' +
                                '<div class="d-flex text-muted">' +
                                '<div class="p-2"> <small>ประกาศเมื่อ : ' + response[i].annouce_time_start + '</small> </div>' +
                                '<div class="ml-auto p-2"> <small> วันสิ้นสุดการประกาศ : ' + date_end + '</small> </div>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                        } else {
                            html += '<div class="expansion-panel list-group-item">' +
                                '<a aria-controls="collapse' + i + '" aria-expanded="true" class="expansion-panel-toggler collapsed text-left" data-toggle="collapse" href="#collapse' + i + '" id="' + response[i].annouce_id + '">' +
                                '<div class="d-flex justify-content-start">' +
                                '<span style="font-size: 17px; color: blue;"">' +
                                '<i class="fas fa-tools mr-2" id="iconEdit" value="' + i + '" title="แก้ไขประกาศ"> </i>' +
                                '</span>' +
                                '<span style="font-size: 17px; color: red;"">' +
                                '<i class="fas fa-trash-alt mr-2" id="iconDelete" value="' + i + '" title="ลบประกาศ"> </i>' +
                                '</span>' +
                                '<span class="text-left">' + response[i].annouce_name + '</span>' +
                                '</div>' +
                                '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                                '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                                '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                                '</div>' +
                                '</a>' +
                                '<div aria-labelledby="' + response[i].annouce_id + '" class="collapse" data-parent="#accordionOne" id="collapse' + i + '">' +
                                '<div class="expansion-panel-body text-left">' +
                                response[i].annouce_discription +
                                '</div>' +
                                '<div class="navdrawer-divider"></div>' +
                                '<div class="d-flex text-muted">' +
                                '<div class="p-2"> <small>ประกาศเมื่อ : ' + response[i].annouce_time_start + '</small> </div>' +
                                '<div class="ml-auto p-2"> <small> วันสิ้นสุดการประกาศ : ' + date_end + '</small> </div>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                        }
                    }
                }
                $('#accordionOne').html(html);
            }
        });
    }

    var todayDate;
    $('#Add_annouce').click(function (e) {
        e.preventDefault();
        $('#Modal').modal('show');
        $('#ModalLabel').text('เพิ่มข้อมูลข่าวสาร');
        todayDate = new Date().toISOString();
        // $('#StartDatePicker').val(todayDate);
        $('#save').text('บันทึกข้อมูล');
        $('#summernote').summernote('code', '');
        $('#Headtext').val('');
        iurl = "/" + url[3] + "/Te_annouce/Add_Data_ctl";
    });

    $('#accordionOne').on('click', '#iconEdit', function (e) {
        e.preventDefault();
        todayDate = new Date().toISOString();
        ivalue = $(this).attr('value');
        $('#Modal').modal('show');
        $('#ModalLabel').text('แก้ไขข้อมูลข่าวสาร');
        $('#save').text('แก้ไขข้อมูล');
        iurl = "/" + url[3] + "/Te_annouce/Edit_Data_ctl";
        $('#Headtext').val(data_annouce[ivalue].annouce_name);
        // $('#Textarea').val(data_annouce[ivalue].annouce_discription);
        $('#summernote').summernote('code', data_annouce[ivalue].annouce_discription);
        if (data_annouce[ivalue].annouce_time_end == '0000-00-00') {
            $('#EndDatePicker').val("");
        } else {
            $('#EndDatePicker').val(data_annouce[ivalue].annouce_time_end);
        }
        idAnnouce = data_annouce[ivalue].annouce_id;
    });

    $('#save').click(function (e) {

        var result = '';
        var check = '';
        var data = '';

        for (i = 0; i < $(formData).length; i++) {
            if (i == 0) {
                if ($(formData[0]).val() == '') {
                    $(popData[0]).show();
                } else {
                    $(popData[0]).hide();
                    result += 0;
                }
            }

            if (i == 1) {
                if ($('#summernote').summernote('isEmpty')) {
                    $(popData[1]).show();
                } else {
                    $(popData[1]).hide();
                    result += 1;
                }
            }

            check += i;
        }

        dataHead = $('#Headtext').val();
        // dataAnnouce = $('#Textarea').val();
        dataAnnouce = $('#summernote').summernote('code');
        dateEnd = $('#EndDatePicker').val();
        if (dateEnd == '') {
            dateEnd = 0;
        }
        //console.log(dateStart, "&", dateEnd);
        if (iurl == "/" + url[3] + "/Te_annouce/Add_Data_ctl") {
            txtsnack = 'เพิ่มข้อมูล ( Success: เพิ่มข้อมูลเรียบร้อย )';
            txtsnackerr = 'ไม่สามารถเพิ่มข้อมูลได้ ( Error: ';
        } else {
            txtsnack = 'แก้ไขข้อมูล ( Success: แก้ไขข้อมูลเรียบร้อย )';
            txtsnackerr = 'ไม่สามารถแก้ไขข้อมูลได้ ( Error: ';
        }

        if (check == result) {
            var form_data = new FormData();
            form_data.append('semester', semester);
            form_data.append('subject', subject_id);
            form_data.append('Headtext', dataHead);
            form_data.append('dataAnnouce', dataAnnouce);
            form_data.append('dataStart', todayDate);
            form_data.append('dateEnd', dateEnd);
            form_data.append('AnnouceId', idAnnouce);

            $.ajax({
                type: "POST",
                url: iurl,
                // data: '&semester=' + semester + '&subject=' + subject_id + '&Headtext=' + dataHead + '&dataAnnouce=' + dataAnnouce + '&dataStart=' + todayDate + '&dateEnd=' + dateEnd + '&AnnouceId=' + idAnnouce,
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                success: function () {
                    $('#Headtext').val("");
                    // $('#Textarea').val("");
                    $('#EndDatePicker').val("");
                    $('#summernote').summernote('code', '');
                    ShowDataAnnouce();
                    // if (iurl != "/" + url[3] + "/Te_annouce/Add_Data_ctl") {
                    //     $('#Modal').modal('hide');
                    // };
                    $('#Modal').modal('hide');
                    for (i = 0; i < $(formData).length; i++) {
                        $(popData[i]).hide();
                    }
                    Snackbar.show({
                        actionText: 'close',
                        pos: 'top-center',
                        actionTextColor: '#4CAF50',
                        backgroundColor: '#323232',
                        width: 'auto',
                        text: txtsnack
                    });
                }
            });
        }
    });

    $('#Delete').click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/" + url[3] + "/Te_annouce/Del_Data_ctl",
            data: '&semester=' + semester + '&subject=' + subject_id + '&AnnouceId=' + idAnnouce,
            success: function () {
                $('#ModalDelete').modal('hide');
                ShowDataAnnouce();
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: 'ลบข้อมูล ( Success: ลบข้อมูลเรียบร้อย )'
                });
            },
            error: function () {
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: 'ไม่สามารถลบข้อมูลได้'
                });
            }
        });
    });



    $('#accordionOne').on('click', '#iconDelete', function (e) {
        e.preventDefault();
        ivalue = $(this).attr('value');
        idAnnouce = data_annouce[ivalue].annouce_id;
        $('#ModalDelete').modal('show');
        $('#txtDel').text(data_annouce[ivalue].annouce_name)
    });

    $('#iconClose').click(function (e) {
        e.preventDefault();
        $('#Headtext').val("");
        $('#EndDatePicker').val("");
        $('#summernote').summernote('code', '');
        for (i = 0; i < $(formData).length; i++) {
            $(popData[i]).hide();
        }
    });

    $('#CloseModal').click(function (e) {
        e.preventDefault();
        $('#Headtext').val("");
        $('#EndDatePicker').val("");
        $('#summernote').summernote('code', '');
        for (i = 0; i < $(formData).length; i++) {
            $(popData[i]).hide();
        }
    });


});