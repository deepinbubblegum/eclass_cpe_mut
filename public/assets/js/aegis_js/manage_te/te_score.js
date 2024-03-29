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
    var element = document.getElementById("score");
    element.classList.add("bg-primary-light");
    var element = document.getElementById("side_score");
    element.classList.add("bg-primary-light");
    /******************************************************************** */


    year = semester.substr(0, 4);
    part = semester.substr(4, 1);
    $('#header').text('คะแนน : ' + subject_id + ' - ' + year + '/' + part);

    var url = $(location).attr('href').split("/");
    var iurl = '';
    var getMenu;
    var editMenuId = '';
    var accordionI = '';
    showMenuPoint();

    /************************************************* Pop Alert **********************************************************/

    var formData = ["#Headtext"];

    var popData = ["#popupHead"];

    var popValue = [
        //[POP_ID,POP_TEXT]
        ['popupHead', 'กรุณาระบุหัวข้อเมนูคะแนน']
    ];

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

    var formDataField = ["#addFieldFN", "#addFieldMN", "#addFieldMP"];

    var popDataField = ["#popupFN", "#popupMN", "#popupMP"];

    var popValueField = [
        //[POP_ID,POP_TEXT]
        ['popupFN', 'กรุณาระบุชื่อเต็มช่องคะแนน'],
        ['popupMN', 'กรุณาระบุชื่อย่อช่องคะแนน'],
        ['popupMP', 'กรุณาระบุรายละเอียดช่องคะแนน']
    ];

    function popGenField() {
        for (i = 0; i < popValueField.length; i++) {
            $("<div id='" + popValueField[i][0] + "' class=\"text-danger\">*" + popValueField[i][1] + "</div>").insertAfter(formDataField[i]);
        }
    }

    function hideAllPopField() {
        for (i = 0; i < popDataField.length; i++) {
            $(popDataField[i]).hide();
        }
    }

    popGenField();
    hideAllPopField();

    var formDataInsertScore = ["#addTicketP", "#addTicketUID"];

    var popDataInsertScore = ["#popupP", "#popupUID"];

    var popValueInsertScore = [
        //[POP_ID,POP_TEXT]
        ['popupP', 'กรุณาระบุคะแนนที่ได้'],
        ['popupUID', 'กรุณาระบุรหัสนักศึกษา']
    ];

    function popGenInsertScore() {
        for (i = 0; i < popValueInsertScore.length; i++) {
            $("<div id='" + popValueInsertScore[i][0] + "' class=\"text-danger\">*" + popValueInsertScore[i][1] + "</div>").insertAfter(formDataInsertScore[i]);
        }
    }

    function hideAllPopInsertScore() {
        for (i = 0; i < popDataInsertScore.length; i++) {
            $(popDataInsertScore[i]).hide();
        }
    }

    popGenInsertScore();
    hideAllPopInsertScore();

    var formDataTicket = ["#ticket_discrip", "#ticket_point", "#ticketNumber"];

    var popDataTicket = ["#popup_discrip", "#popup_point", "#popup_Number"];

    var popValueTicket = [
        //[POP_ID,POP_TEXT]
        ['popup_discrip', 'กรุณาระบุรายละเอียดใบคะแนน'],
        ['popup_point', 'กรุณาระบุคะแนนของใบคะแนน'],
        ['popup_Number', 'กรุณาระบุจำนวนใบคะแนน']
    ];

    function popGenTicket() {
        for (i = 0; i < popValueTicket.length; i++) {
            $("<div id='" + popValueTicket[i][0] + "' class=\"text-danger\">*" + popValueTicket[i][1] + "</div>").insertAfter(formDataTicket[i]);
        }
    }

    function hideAllPopTicket() {
        for (i = 0; i < popDataTicket.length; i++) {
            $(popDataTicket[i]).hide();
        }
    }

    popGenTicket();
    hideAllPopTicket();

    /***********************************************************************************************************/

    $('#summernote').summernote({
        dialogsInBody: true,
        codeviewFilter: false,
        codeviewIframeFilter: true,
        placeholder: 'รายละเอียดช่องคะแนน',
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

    $("#addFieldMN").keypress(function (event) {
        var ew = event.which;
        if (ew == 32)
            return true;
        if (48 <= ew && ew <= 57)
            return true;
        if (65 <= ew && ew <= 90)
            return true;
        if (97 <= ew && ew <= 122)
            return true;
        return false;
    });

    $("#addFieldMP").keypress(function (event) {
        // var re = new RegExp("[ๆๅภถุึคตจขชๆไำพะัีรนยบลฃฟหกดเ้่าสวงผปแอิืทมใฝ๑๒๓๔ู฿๕๖๗๘๙๐ฎฑธํ๊ณฯญฐฅฤฆฏโฌ็๋ษศซฉฮฺ์ฒฬฦห]", );
        // const chars = event.target.value.split('');
        // const char = chars.pop();
        // if (re.test(char)) {
        //     event.target.value = chars.join('');
        // }
        // alert($('#optionSet').val())
        var ew = event.which;
        if ($('#optionSet').val() == 1) {
            if (ew == 43)
                return false;
            if (ew == 45)
                return false;
            if (ew == 101)
                return false;
        } else {
            if (ew == 32)
                return true;
            if (48 <= ew && ew <= 57)
                return true;
            if (65 <= ew && ew <= 90)
                return true;
            if (97 <= ew && ew <= 122)
                return true;
            if (40 <= ew && ew <= 47)
                return true;
            if (ew == 35)
                return true;
            if (ew == 37)
                return true;
            if (ew == 61)
                return true;
            if (ew == 58)
                return true;
            return false;
        }
    });


    $('#btnAddScore').click(function (e) {
        e.preventDefault();
        $('#Modal').modal('show');
        $('#ModalLabel').text('เพิ่มเมนูคะแนน');
        $("#PointView").prop("checked", true);
        //todayDate = new Date().toISOString();
        // $('#StartDatePicker').val(todayDate);
        $('#save').text('บันทึกข้อมูล');
        iurl = "/" + url[3] + "/Te_subject_point/insertMenuScore";
        $('#summernote').summernote('code', '');

        // $('#accordionOne').activate('option', 'active', '#accM-1');
    });


    $('#save').click(function (e) {
        header = $('#Headtext').val();
        // description = $('#Textarea').val();
        description = $('#summernote').summernote('code');
        PointMulti = $("input[name='PointView']:checked").val();

        // if (header == '') {
        //     Snackbar.show({
        //         actionText: 'close',
        //         pos: 'top-center',
        //         actionTextColor: '#FF0000',
        //         backgroundColor: '#323232',
        //         width: 'auto',
        //         text: 'กรุณากรอกหัวข้อเมนูคะแนน'
        //     });
        //     return false;
        // }
        var result = '';
        var check = '';

        for (i = 0; i < $(formData).length; i++) {
            if ($(formData[i]).val() == '') {
                $(popData[i]).show();

            } else {
                $(popData[i]).hide();
                result += i;
            }
            check += i;
        }

        if (check == result) {
            var form_data = new FormData();
            form_data.append('semester', semester);
            form_data.append('subject', subject_id);
            form_data.append('header', header);
            form_data.append('description', description);
            form_data.append('StdView', PointMulti);
            form_data.append('editID', editMenuId);

            $.ajax({
                type: "POST",
                url: iurl,
                // data: '&semester=' + semester + '&subject=' + subject_id + '&header=' + header + '&description=' + description + '&StdView=' + PointMulti + '&editID=' + editMenuId,
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                success: function () {
                    $('#Headtext').val("");
                    $('#Textarea').val("");
                    $('#Modal').modal('hide');
                    $('#summernote').summernote('code', '');
                    for (i = 0; i < $(formData).length; i++) {
                        $(popData[i]).hide();
                    }
                    showMenuPoint();
                }
            });
        }
    });

    $('#btnModalClose').click(function (e) {
        $('#Headtext').val('');
        $('#Textarea').val('');
        $('#summernote').summernote('code', '');
        for (i = 0; i < $(formData).length; i++) {
            $(popData[i]).hide();
        }
    });

    function showMenuPoint() {
        $.ajax({
            url: '/' + url[3] + '/Te_subject_point/showMenuPoint/' + subject_id + '-' + semester,
            dataType: "json",
            success: function (response) {
                getMenu = response;
                console.log(response);
                var html = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        // collap = i + 1;
                        html +=
                            '<div id="accM-' + i + '" class="sortMenu expansion-panel list-group-item success-color" data1="' + response[i].point_id + '" >' +
                            '<a aria-controls="collapse' + i + '" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapse' + response[i].point_id + '" id="acc' + i + '">' +
                            response[i].point_name +
                            '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                            '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                            '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                            '</div>' +
                            '</a>' +
                            '<div aria-labelledby="heading' + i + '" class="collapse" data-parent="#accordionOne" id="collapse' + response[i].point_id + '">' +
                            '<div class="expansion-panel-body" id="TEST' + i + '" >' +
                            /* --------BTN-------- */
                            '<span style="font-size: 1.7em;"><a href="/Te_select/scoreTable/' + subject_id + '-' + semester + '-' + response[i].point_id + '" target="_blank" title="ดูคะแนนนักศึกษา" id="showInMenu-' + response[i].point_id + '" href="#" class="f34r-txt-black"><i class="fas fa-star"></a></i></span>&nbsp;' +
                            '<span style="font-size: 1.7em;"><a title="สร้างช่องคะแนน" id="addInMenu-' + response[i].point_id + '" href="#" class="f34r-txt-black"><i class="fas fa-plus-square"></a></i></span>&nbsp;' +
                            //'<span style="font-size: 1.7em;"><a id="impInMenu-' + response[i].point_id + '" href="#" class="f34r-txt-black"><i class="fas fa-file-import"></a></i></span>&nbsp;' +
                            //'<span style="font-size: 1.7em;"><a id="expInMenu-' + response[i].point_id + '" href="#" class="f34r-txt-black"><i class="fas fa-file-export"></a></i></span>&nbsp;' +
                            '<span style="font-size: 1.7em;"><a title="ลบเมนูคะแนน" id="delMenu-' + response[i].point_id + '" href="#" class="f34r-txt-black"><i class="fas fa-trash-alt"></a></i></span>&nbsp;' +
                            '<span style="font-size: 1.7em;"><a title="แก้ไขเมนูคะแนน" id="editMenu-' + response[i].point_id + '" href="#" class="f34r-txt-black"><i class="fas fa-edit"></a></i></span>&nbsp;' +
                            /* --------BTN-------- */
                            '<br>' +
                            response[i].point_discription +
                            '<div id="menuScoreId-' + response[i].point_id + '">' +
                            // '<li href="#" class="list-group-item d-flex justify-content-between align-items-center list-group-item-action mb-2 mt-2">' +
                            // '<span class="mr-2 mb-0" style="font-size: 28px;">' +
                            // '<i class="fas fa-file-download"></i>' +
                            // '<span class="mr-2 text-black" style="font-size: 18px;">ทดสอบ</span>' +
                            // '<div class="mt-0">' +
                            // '<small class="mr-2 text-black-50" style="font-size: 12px;">size : 20GB</small>' +
                            // '<small class="mr-2 text-black-50" style="font-size: 12px;">type : pdf</small>' +
                            // '</div>' +
                            // '</span>' +
                            // '<span>' +
                            // '<button class="btn btn-float btn-info my-1"><i class="fas fa-download"></i></button>' +
                            // '</span>' +
                            // '</li>' +
                            /*--------------------------------------------------*/
                            // '<div class="d-inline-block bg-primary text-white">' +
                            // '<h3>inline-block</h3>' +
                            // 'Boot that strap!' +
                            // '</div>' +
                            // '<div class="d-inline-block bg-primary text-white">' +
                            // '<h3>inline-block</h3>' +
                            // 'Strap that boot!' +
                            // '</div>' + 
                            /*--------------------------------------------------*/
                            '<br>' +
                            '<div class="table-responsive">' +
                            '<table class="table">' +

                            '<div id="sortable">' +
                            '<span class="drag d-flex flex-wrap" id="genIn-' + response[i].point_id + '">' +

                            '</span>' +
                            '</div>' +
                            '</table>' +
                            '</div>' +
                            '<br>' +
                            /*--------------------------------------------------*/
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }
                }
                $('.showMenuScore').html(html);
                sortMenu();
                $.each(getMenu, function (i, p) {
                    showUnit(getMenu[i].point_id);
                    $('#addInMenu-' + getMenu[i].point_id).click(function (e) {
                        pointId = getMenu[i].point_id;
                        fieldSaveUrl = '/' + url[3] + '/Te_subject_point/insertFieldScore';
                        $('#addField').modal('show');
                        $("#PointMulti").prop("checked", true);
                        $('#addFieldLabel').text('Create in menu : ' + getMenu[i].point_name);
                        $('#optionSet').val('1');
                        $('#addFieldMP').prop('type', 'number');
                        $('#FieldMaxtxt').text('คะแนนเต็ม');
                        // $("input[name=PointMulti]").attr('disabled', false);
                        accordionI = getMenu[i].point_id;
                    });
                    //$('#showInMenu-' + getMenu[i].point_id).click(function(e) {}); use da href
                    // $('#impInMenu-' + getMenu[i].point_id).click(function(e) {});
                    // $('#expInMenu-' + getMenu[i].point_id).click(function(e) {});
                    $('#delMenu-' + getMenu[i].point_id).click(function (e) {
                        takeThisDel = 'delMenu';
                        delPid = getMenu[i].point_id;
                        $("#txtDel").text('Menu:' + getMenu[i].point_name);
                        $("#ModalDelete").modal('show');
                        // pointId = getMenu[i].point_id;
                        // $('#addField').modal('show');
                        // $('#addFieldLabel').text('Create in menu : ' + getMenu[i].point_name);
                    });
                    $('#editMenu-' + getMenu[i].point_id).click(function (e) {
                        console.log('editMenu');
                        e.preventDefault();
                        $('#Headtext').val(getMenu[i].point_name);
                        // $('#Textarea').val(getMenu[i].point_discription);
                        $('#summernote').summernote('code', getMenu[i].point_discription);
                        $("input[name='PointView'][value='" + response[i].point_StdView + "']").prop('checked', true);

                        $('#ModalLabel').text('แก้ไขเมนูคะแนน');
                        $('#save').text('ยืนยันการแก้ไข');

                        $('#Modal').modal('show');
                        iurl = "/" + url[3] + "/Te_subject_point/editMenuScore";
                        editMenuId = getMenu[i].point_id;
                        // alert(getMenu[i].point_id);
                        accordionI = getMenu[i].point_id;
                    });
                });
            }
        });
        if (accordionI != '') {
            $('#collapse' + accordionI).collapse({
                toggle: true
            });
        }
    }


    // $('#sortable').sortable();

    // function sort() {
    //     $("#sortable").sortable({
    //         connectWith: ".connectedSortable",
    //         stop: function(event, div) {
    //             $('.connectedSortable').each(function() {
    //                 result = "";
    //                 alert($(this).sortable("toArray"));
    //                 $(this).find("center").each(function() {
    //                     result += $(this).text() + ",";
    //                 });
    //                 $("." + $(this).attr("id") + ".list").html(result);
    //             });
    //         }
    //     });
    // }

    function sort() {
        var sortArray = [];
        var sortIDArray = [];
        var ArraySemester = [];
        var ArraySubject = [];
        $(".drag").sortable({
            tolerance: 'pointer',
            revert: 'invalid',
            placeholder: 'p-2 f34r-bg-n-txt sortableItem placeholder',
            forceHelperSize: true,

            stop: function () {
                $.map($(this).find('div.sortableItem'), function (el) {
                    var Setid = $(el).attr('id');
                    var id = $(el).attr('id2');
                    // console.log('ID+' + id);
                    sortArray.push(Setid);
                    sortIDArray.push(id);
                    ArraySubject.push(subject_id);
                    ArraySemester.push(semester);
                });
                // console.log(sortIDArray);
                $.ajax({
                    type: "POST",
                    url: '/' + url[3] + '/Te_subject_point/SortIndex',
                    data: {
                        sortArray,
                        sortIDArray,
                        ArraySubject,
                        ArraySemester
                    },
                    success: function () {
                        sortArray = [];
                        sortIDArray = [];
                        ArraySemester = [];
                        ArraySubject = [];
                    }
                });
            }
        });
    }

    function sortMenu() {
        var sortIDArray = [];
        var ArraySemester = [];
        var ArraySubject = [];
        $(".DragMenu").sortable({
            tolerance: 'pointer',
            revert: 'invalid',
            placeholder: 'p-2 f34r-bg-n-txt sortableItem placeholder',
            forceHelperSize: true,

            stop: function () {
                $.map($(this).find('div.sortMenu'), function (el) {
                    var Menuid = $(el).attr('data1');
                    // console.log('ID+' + id);
                    sortIDArray.push(Menuid);
                    ArraySubject.push(subject_id);
                    ArraySemester.push(semester);
                });
                // console.log(sortIDArray);
                $.ajax({
                    type: "POST",
                    url: '/' + url[3] + '/Te_subject_point/SortMenu',
                    data: {
                        sortIDArray,
                        ArraySubject,
                        ArraySemester
                    },
                    success: function () {
                        sortIDArray = [];
                        ArraySemester = [];
                        ArraySubject = [];
                    }
                });
            }
        });
    }

    var pointId;
    var pointIdChild;
    var fieldSaveUrl = '';
    var pointMulti;

    //------------------------------------------------------------------------------------------------------------------------
    //<option value="1" id="opt1">Ticket</option>
    var optionValuesEN = [
        ['1', 'Ticket'],
        ['2', 'Formula'],
        ['3', 'Import CSV'],
    ];

    var optionValuesTH = [
        ['1', 'แสดงรหัสใบงาน'],
        ['2', 'แสดงผลการคำนวณตามสูตร'],
        //['3', 'แสดงคะแนนจากไฟล์รายชื่อนักศึกษา'],
    ];

    genOptionValues(optionValuesTH);

    function genOptionValues(optionValues) {
        var html = '';
        for (i = 0; i < optionValues.length; i++) {
            html += '<option value="' + optionValues[i][0] + '">' + optionValues[i][1] + '</option>';
        }
        $('#optionSet').html(html);
    }

    $('#optionSet').change(function () {
        if ($('#optionSet').val() == 1) {
            $('#FieldMaxtxt').text('คะแนนเต็ม');
            $('#addFieldMP').prop('type', 'number');
            // $('#addFieldMP').val('1');
        } else {
            $('#FieldMaxtxt').text('สูตรในการคำนวน');
            $('#addFieldMP').prop('type', 'text');
            // $('#addFieldMP').val('');
        }
    });

    //------------------------------------------------------------------------------------------------------------------------
    function htmlEncodeF34R(textInPut) {
        textInPut = textInPut.replace(/\(/gi, "%28");
        textInPut = textInPut.replace(/\)/gi, "%29");
        textInPut = textInPut.replace(/\*/gi, "%2A");
        textInPut = textInPut.replace(/\+/gi, "%2B");
        textInPut = textInPut.replace(/\-/gi, "%2D");
        textInPut = textInPut.replace(/\//gi, "%2F");
        textInPut = textInPut.replace(/\:/gi, "%3A");
        return textInPut;
    }

    $('#fieldSave').click(function (e) {
        fieldCheck = '';
        fullName = $('#addFieldFN').val();
        miniName = $('#addFieldMN').val();
        maxPoint = $('#addFieldMP').val();
        check = $('#addFieldTK')[0].checked;
        optionSet = $("#optionSet :selected").val();
        PointMulti = $("input[name='PointMulti']:checked").val();
        //ticket = $('#addFieldTK').val();

        // matchup = fullName.match(/\#/g);
        // console.log(matchup);

        // if (fullName == '' || miniName == '' || maxPoint == '') {
        //     Snackbar.show({
        //         actionText: 'close',
        //         pos: 'top-center',
        //         actionTextColor: '#FF0000',
        //         backgroundColor: '#323232',
        //         width: 'auto',
        //         text: 'กรุณากรอกรายละเอียดให้ครบ'
        //     });
        //     return false;
        // }

        var resultField = '';
        var checkField = '';

        for (i = 0; i < $(formDataField).length; i++) {
            if ($(formDataField[i]).val() == '') {
                $(popDataField[i]).show();

            } else {
                $(popDataField[i]).hide();
                resultField += i;
            }
            checkField += i;
        }

        maxPoint = htmlEncodeF34R(maxPoint);
        fullName = htmlEncodeF34R(fullName);
        miniName = htmlEncodeF34R(miniName);


        if (check) {
            ticket = '1';
        } else {
            ticket = '0';
        }


        if (maxPoint * 1.00 > 0) {
            fieldCheck += '1';
        } else {
            //alert('The max point must be larger than zero!');
        }
        console.log(ticket, optionSet);
        if (checkField == resultField) {
            // takeField(fullName, miniName, ticket, maxPoint, optionSet, PointMulti);
            if (fieldSaveUrl == '/' + url[3] + '/Te_subject_point/updateFieldScore') {
                $.ajax({
                    type: "POST",
                    url: '/' + url[3] + '/Te_subject_point/CheckMaxEditField',
                    data: '&semester=' + semester + '&subject_id=' + subject_id + '&pointId=' + pointId + '&pointIdChild=' + pointIdChild,
                    dataType: "json",
                    success: function (response) {
                        var stateCK = 0;
                        if (response != null) {
                            for (i = 0; i < All_std.length; i++) {
                                sumpoint = 0;
                                for (j = 0; j < response.length; j++) {
                                    if (All_std[i].substd_stdid == response[j].point_std_user_id) {
                                        sumpoint = parseFloat(sumpoint) + parseFloat(response[j].point_std_point);
                                    }
                                }
                                // alert(All_std[i].substd_stdid)
                                if (sumpoint > maxPoint) {
                                    stateCK = 1
                                }
                            }
                        }
                        if (stateCK == 1) {
                            $('#CheckEditFieldModal').modal('show');
                        } else {
                            takeField(fullName, miniName, ticket, maxPoint, optionSet, PointMulti);
                        }
                    }
                });
            } else {
                takeField(fullName, miniName, ticket, maxPoint, optionSet, PointMulti);
            }
        }
    });

    $('#btnConEditField').click(function (e) {
        fullName = $('#addFieldFN').val();
        miniName = $('#addFieldMN').val();
        maxPoint = $('#addFieldMP').val();
        check = $('#addFieldTK')[0].checked;
        optionSet = $("#optionSet :selected").val();
        PointMulti = $("input[name='PointMulti']:checked").val();
        maxPoint = htmlEncodeF34R(maxPoint);
        fullName = htmlEncodeF34R(fullName);
        miniName = htmlEncodeF34R(miniName);

        if (check) {
            ticket = '1';
        } else {
            ticket = '0';
        }

        takeField(fullName, miniName, ticket, maxPoint, optionSet, PointMulti);
    });

    $('#fieldClose').click(function (e) {
        $('#addFieldFN').val('');
        $('#addFieldMN').val('');
        $('#addFieldTK')[0].checked = false;
        $('#addFieldMP').val('1');
        $('#addFieldMP').prop('type', 'number');
        for (i = 0; i < $(formDataField).length; i++) {
            $(popDataField[i]).hide();
        }
    });

    $('#IconCloseFIELD').click(function (e) {
        $('#addFieldFN').val('');
        $('#addFieldMN').val('');
        $('#addFieldTK')[0].checked = false;
        $('#addFieldMP').val('1');
        $('#addFieldMP').prop('type', 'number');
        for (i = 0; i < $(formDataField).length; i++) {
            $(popDataField[i]).hide();
        }
    });

    function takeField(fullName, miniName, ticket, maxPoint, optionSet, PointMulti) {
        $.ajax({
            type: "POST",
            url: fieldSaveUrl,
            data: '&semester=' + semester + '&subject_id=' + subject_id + /*|*/ '&setpoint_option=' + optionSet + '&pointId=' + pointId + '&pointIdChild=' + pointIdChild + /*|*/ '&ticket=' + ticket + '&fullName=' + fullName + '&miniName=' + miniName + '&maxPoint=' + maxPoint + '&pointMulti=' + PointMulti,
            success: function () {
                $('#CheckEditFieldModal').modal('hide');
                $('#addFieldFN').val("");
                $('#addFieldMN').val("");
                $('#addFieldTK')[0].checked = false;
                $('#addFieldMP').val("");
                $('#addField').modal('hide');
                for (i = 0; i < $(formDataField).length; i++) {
                    $(popDataField[i]).hide();
                }
                showMenuPoint();
            }
        });
        // $('#collapse' + accordionI).collapse({
        //     toggle: true
        // });
    }

    var setIdChild;
    var setIdParent;
    var getField = [];
    var setMaxPoint;

    var All_std = '';
    //insert into subject_setpoint values('25611','CPEN1010','1','1','1','0','Lecture 1','Lec 1','10');
    //insert into subject_setpoint values('25611','CPEN1010','2','1','1','0','Lecture 2','Lec 2','10');
    function showUnit(popUp) {
        $.ajax({
            url: '/' + url[3] + '/Te_subject_point/showPointField/' + subject_id + '-' + semester + '-' + popUp,
            dataType: "json",
            success: function (response) {
                console.log(response);
                var html = "";
                if (!getField[popUp]) getField[popUp] = []
                getField[popUp] = response;
                if (response.length != undefined) {
                    for (i = 0; i < response.length; i++) {
                        //html += '<div class ="flex-shrink-1">';
                        if (response[i].setpoint_option == '1') {
                            html +=
                                '<center class="ml-1 mr-1">' +
                                '<div id="' + response[i].setpoint_setpoint_id + '" id2="' + response[i].setpoint_id + '" class="sortableItem score-box p-2 mb-2 f34r-bg-n-txt" >' + response[i].setpoint_mininame + '<br>' +
                                '<span style="font-size: 1.5em;"><a href="#" title="ดูคะแนน" id="viewPoint-' + popUp + '-' + response[i].setpoint_setpoint_id + '"class="f34r-txt-black"><i class="fas fa-clipboard-list"></i></a></span>&nbsp;' +
                                '<span style="font-size: 1.5em;"><a href="#" title="เพิ่มคะแนน" id="addTicket-' + popUp + '-' + response[i].setpoint_setpoint_id + '" class="f34r-txt-black"><i class="fas fa-star-half-alt"></i></a></span>&nbsp;' +
                                '<span style="font-size: 1.5em;"><a href="#" title="สร้างใบคะแนน" id="genTicket-' + popUp + '-' + response[i].setpoint_setpoint_id + '"  class="f34r-txt-black"><i class="fas fa-ticket-alt"></i></a></span>' +
                                '<br>' +
                                '<span style="font-size: 1em;"><a href="#" title="แก้ไขช่องคะแนน" id="editField-' + popUp + '-' + response[i].setpoint_setpoint_id + '"class="f34r-txt-black"><i class="fas fa-file-signature"></i></a></span>' +
                                '&nbsp;&nbsp;<span style="font-size: 1em;"><a title="ลบช่องคะแนน" id="delField-' + popUp + '-' + response[i].setpoint_setpoint_id + '" href="#" class="f34r-txt-black"><i class="fas fa-times-circle"></i></a></span>' +
                                '</div>' +
                                '</center>';
                        } else if (response[i].setpoint_option == '2') {
                            html +=
                                '<center class="ml-1 mr-1">' +
                                '<div id="' + response[i].setpoint_setpoint_id + '" id2="' + response[i].setpoint_id + '" class="sortableItem score-box p-2 mb-2 f34r-bg-p-txt" >' + response[i].setpoint_mininame + '<br>' +
                                //'<span style="font-size: 1.5em;"><a href="#" id="viewPoint-' + popUp + '-' + response[i].setpoint_setpoint_id + '"class="f34r-txt-black"><i class="fas fa-clipboard-list"></i></a></span>&nbsp;' +
                                // '<span style="font-size: 1.5em;"><a href="#" id="addTicket-' + popUp + '-' + response[i].setpoint_setpoint_id + '" class="f34r-txt-black"><i class="fas fa-star-half-alt"></i></a></span>&nbsp;' +
                                //'<span style="font-size: 1.5em;"><a href="#" id="genTicket-' + popUp + '-' + response[i].setpoint_setpoint_id + '"  class="f34r-txt-black"><i class="fas fa-ticket-alt"></i></a></span>' +
                                '<br>' +
                                '<span style="font-size: 1em;"><a href="#" title="แก้ไขช่องคะแนน" id="editField-' + popUp + '-' + response[i].setpoint_setpoint_id + '"class="f34r-txt-black"><i class="fas fa-file-signature"></i></a></span>' +
                                '&nbsp;&nbsp;<span style="font-size: 1em;"><a title="ลบช่องคะแนน" id="delField-' + popUp + '-' + response[i].setpoint_setpoint_id + '" href="#" class="f34r-txt-black"><i class="fas fa-times-circle"></i></a></span>' +
                                '</div>' +
                                '</center>';
                        } else if (response[i].setpoint_option == '3') {
                            html +=
                                '<center class="ml-1 mr-1">' +
                                '<div id="' + response[i].setpoint_setpoint_id + '" id2="' + response[i].setpoint_id + '" class="sortableItem score-box p-2 mb-2 f34r-bg-o-txt" >' + response[i].setpoint_mininame + '<br>' +
                                '<span style="font-size: 1.5em;"><a href="#" id="viewPoint-' + popUp + '-' + response[i].setpoint_setpoint_id + '"class="f34r-txt-black"><i class="fas fa-clipboard-list"></i></a></span>&nbsp;' +
                                '<span style="font-size: 1.3em;"><a href="#" id="delField-' + popUp + '-' + response[i].setpoint_setpoint_id + '" class="f34r-txt-black"><i class="fas fa-times-circle""></i></a></span>&nbsp;' +
                                //'<span style="font-size: 1.5em;"><a href="#" id="genTicket-' + popUp + '-' + response[i].setpoint_setpoint_id + '"  class="f34r-txt-black"><i class="fas fa-ticket-alt"></i></a></span>' +
                                '<br>' +
                                // '<span style="font-size: 1em;"><a href="#" id="editField-' + popUp + '-' + response[i].setpoint_setpoint_id + '"class="f34r-txt-black"><i class="fas fa-file-signature"></i></a></span>' +
                                //'<span style="font-size: 1.5em;"><a id="delField-' + popUp + '-' + response[i].setpoint_setpoint_id + '" href="#" class="f34r-txt-black"><i class="fas fa-times-circle"></i></a></span>' +
                                '</div>' +
                                '</center>';
                        }
                        //html += '</div>';

                    }
                } else {
                    html += '<h1>NO DATA</h1>'
                }
                $('#genIn-' + popUp).html(html);
                // console.log(getField[popUp])
                $.each(getField[popUp], function (i, p) {
                    $('#viewPoint-' + popUp + '-' + getField[popUp][i].setpoint_setpoint_id).click(function (e) {
                        console.log('#viewPoint-' + popUp + '-' + getField[popUp][i].setpoint_setpoint_id);
                        showPoint(getField[popUp][i].setpoint_setpoint_id, popUp);
                        $('#model_score_tittle').text(getField[popUp][i].setpoint_mininame + ' (คะแนนเต็ม' + getField[popUp][i].setpoint_maxpoint + ')');
                        $('#showPoint').modal('show');
                    });
                    $('#addTicket-' + popUp + '-' + getField[popUp][i].setpoint_setpoint_id).click(function (e) {
                        console.log('#addTicket-' + popUp + '-' + getField[popUp][i].setpoint_setpoint_id);
                        $('#addTicket').modal('show');
                        $('#addTicketLabel').text('เพิ่มคะแนน ' + getField[popUp][i].setpoint_mininame + ' (คะแนนเต็ม ' + getField[popUp][i].setpoint_maxpoint + ')');
                        setIdChild = popUp;
                        setIdParent = getField[popUp][i].setpoint_setpoint_id;
                        setMaxPoint = getField[popUp][i].setpoint_maxpoint;
                    });
                    $('#editField-' + popUp + '-' + getField[popUp][i].setpoint_setpoint_id).click(function (e) {
                        $('#addFieldFN').val(response[i].setpoint_fullname);
                        $('#addFieldMN').val(response[i].setpoint_mininame);

                        if (response[i].setpoint_option == 1) {
                            $('#FieldMaxtxt').text('คะแนนเต็ม');
                            $('#addFieldMP').prop('type', 'number');
                        } else {
                            $('#FieldMaxtxt').text('สูตรในการคำนวน');
                            $('#addFieldMP').prop('type', 'text');
                        }

                        $('#addFieldLabel').text('Edit Field : ' + response[i].setpoint_fullname);
                        //$('#addFieldTK').val(response[i].setpoint_ticket);
                        if (response[i].setpoint_ticket == '1') {
                            $('#addFieldTK')[0].checked = true;
                        } else {
                            $('#addFieldTK')[0].checked = false;
                        }
                        $("#optionSet").val(response[i].setpoint_option);

                        $('#addFieldMP').val(response[i].setpoint_maxpoint);

                        // $("input[name=PointMulti][value=" + response[i].setpoint_multi + "]").attr('checked', 'checked');
                        $("input[name='PointMulti'][value='" + response[i].setpoint_multi + "']").prop('checked', true);
                        // $("input[name=PointMulti]").attr('disabled', true);
                        $('#addField').modal('show');

                        All_std = '';

                        $.ajax({
                            type: "POST",
                            url: '/' + url[3] + '/Te_subject_point/GetAll_std',
                            data: '&semester=' + semester + '&subject_id=' + subject_id,
                            dataType: "json",
                            success: function (response) {
                                All_std = response;
                            }
                        });
                        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                        fieldSaveUrl = '/' + url[3] + '/Te_subject_point/updateFieldScore';
                        pointIdChild = response[i].setpoint_setpoint_id;
                        pointId = response[i].setpoint_id;
                        accordionI = popUp;
                        $('#collapse' + accordionI).collapse({
                            toggle: true
                        });
                    });
                    $('#genTicket-' + popUp + '-' + getField[popUp][i].setpoint_setpoint_id).click(function (e) {
                        console.log('#genTicket-' + popUp + '-' + getField[popUp][i].setpoint_setpoint_id);
                        var typeMulti = '';
                        parentTK = response[i].setpoint_setpoint_id;
                        childTK = response[i].setpoint_id;
                        $('#mininame').text(getField[popUp][i].setpoint_mininame + ' (คะแนนเต็ม ' + getField[popUp][i].setpoint_maxpoint + ':');
                        if (getField[popUp][i].setpoint_multi == 0) {
                            typeMulti = 'กรอกคะแนนได้ครังเดียว)';
                            $('#ticket_point').val(getField[popUp][i].setpoint_maxpoint);
                            $('#ticket_point').prop("disabled", true);
                        } else {
                            typeMulti = 'กรอกคะแนนได้หลายครั้ง)';
                            $('#ticket_point').val('');
                            $('#ticket_point').prop("disabled", false);
                        }
                        $('#typeMulti').text(typeMulti);
                        $('#genTicket').modal('show');
                    });
                    $('#delField-' + popUp + '-' + getField[popUp][i].setpoint_setpoint_id).click(function (e) {
                        //console.log('#delField-' + popUp + '-' + getField[popUp][i].setpoint_setpoint_id);

                        delCid = response[i].setpoint_id;
                        delPid = response[i].setpoint_setpoint_id;

                        $("#txtDel").text('Field:' + getField[popUp][i].setpoint_mininame);

                        takeThisDel = "delField";
                        accordionI = popUp;

                        $('#collapse' + accordionI).collapse({
                            toggle: true
                        });

                        showDelPointF(delPid, delCid);

                        //delField(response[i].setpoint_id, response[i].setpoint_setpoint_id);
                    });
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
        // $('#collapse0').collapse({
        //     toggle: true
        // })

        sort();
        if (accordionI != '') {
            $('#collapse' + accordionI).collapse({
                toggle: true
            });
        }
    }
    var parentTK = 0;
    var childTK = 0;

    $('#genTicketClose').click(function (e) {
        $('#ticket_discrip').val('');
        $('#ticketNumber').val('');
        $('#ticket_point').val('');
        for (i = 0; i < $(formDataTicket).length; i++) {
            $(popDataTicket[i]).hide();
        }
    });

    $('#genTicketSave').click(function (e) {
        discript = $('#ticket_discrip').val();
        tknb = $('#ticketNumber').val();
        ticket_point = $('#ticket_point').val();

        // if (discript == '' || tknb == '' || ticket_point == '') {
        //     Snackbar.show({
        //         actionText: 'close',
        //         pos: 'top-center',
        //         actionTextColor: '#FF0000',
        //         backgroundColor: '#323232',
        //         width: 'auto',
        //         text: 'กรุณากรอกรายละเอียดให้ครบถ้วน'
        //     });
        //     return false
        // }

        var resultTicket = '';
        var checkTicket = '';

        for (i = 0; i < $(formDataTicket).length; i++) {
            if ($(formDataTicket[i]).val() == '') {
                $(popDataTicket[i]).show();

            } else {
                $(popDataTicket[i]).hide();
                resultTicket += i;
            }
            checkTicket += i;
        }

        if (checkTicket == resultTicket) {
            $.ajax({
                type: "POST",
                url: '/' + url[3] + '/Gen_ticket/gen_key',
                data: '&ticket_discrip=' + discript + '&ticketNumber=' + tknb + '&parentTK=' + parentTK + '&childTK=' + childTK + '&semester=' + semester + '&subject=' + subject_id + '&ticket_point=' + ticket_point,
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    for (i = 0; i < $(formDataTicket).length; i++) {
                        $(popDataTicket[i]).hide();
                    }
                    $('#genTicket').modal('hide');
                    if (response) {
                        gurl = '/Gen_ticket/ticket_and_qrCode/' + response;
                        window.open(gurl, '_blank');
                    }
                },
            });
        }
    });

    var takeThisDel = '';
    var delCid = '';
    var delPid = '';
    $('#Delete').click(function (e) {
        if (takeThisDel == "delField") {
            delField(delCid, delPid);
            //alert('Deleted!');
        } else if (takeThisDel == "delMenu") {
            delMenu(delPid);
            console.log('delMenu');
        }
        console.log('DELETED!');

        takeThisDel = '';
        delCid = '';
        delPid = '';

        $("#ModalDelete").modal('hide');

    });

    function delMenu(pid) {
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Te_subject_point/delMenu',
            data: '&semester=' + semester + '&subject=' + subject_id + '&setIdParent=' + pid,
            success: function () {
                // console.log('Deleted Successfully');
                showMenuPoint();
            }
        });
    }

    function delField(cid, pid) {
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Te_subject_point/delField',
            data: '&semester=' + semester + '&subject=' + subject_id + '&setIdChild=' + cid + '&setIdParent=' + pid,
            success: function () {
                // console.log('Deleted Successfully');
                showMenuPoint();
            }
        });

        $('#collapse' + accordionI).collapse({
            toggle: true
        });
    }

    var stdId;
    var pointIndex;
    var childField;
    var parentField;
    var index;
    var showDelPoint = 0;

    function showDelPointF(childId, parentId) {
        console.log('showPoint(' + childId + ',' + parentId + ')');
        takeThisUrl = '/' + url[3] + '/Te_subject_point/showPoint';
        $.ajax({
            type: "POST",
            url: takeThisUrl,
            data: '&semester=' + semester + '&subject_id=' + subject_id + '&setIdChild=' + childId + '&setIdParent=' + parentId,
            dataType: "json",
            success: function (response) {
                if (response.length != undefined) {
                    showDelPoint = response.length
                } else {
                    showDelPoint = 0;
                }
                console.log(showDelPoint);
                console.log(response);
                if (showDelPoint > 0) {
                    if (confirm("มีข้อมูลคะแนนอยู่ภายใน : " + showDelPoint + " ข้อมูล")) {
                        $("#ModalDelete").modal('show');
                    }
                } else {
                    $("#ModalDelete").modal('show');
                }

            },
        });
    }

    function showPoint(childId, parentId) {
        console.log('showPoint(' + childId + ',' + parentId + ')');
        takeThisUrl = '/' + url[3] + '/Te_subject_point/showPoint';
        $.ajax({
            type: "POST",
            url: takeThisUrl,
            data: '&semester=' + semester + '&subject_id=' + subject_id + '&setIdChild=' + childId + '&setIdParent=' + parentId,
            dataType: "json",
            success: function (response) {
                //console.log(response + '<- This is showPoint response');
                html = '';
                if (response.length != undefined) {
                    html += '<table class="table">' +
                        '<thead>' +
                        '<tr>' +
                        '<th scope="col">Student Id</th>' +
                        '<th scope="col">Point</th>' +
                        '<th scope="col">Option</th>' +
                        '</tr>' +
                        '</thead>';

                    html += '<tbody>';
                    for (i = 0; i < response.length; i++) {
                        html += '<tr id="tr-' + response[i].point_std_setpoint_id + '-' + response[i].point_std_id + '-' + i + '">' +
                            '<td>' + response[i].point_std_user_id + '</td>' +
                            '<td>' + response[i].point_std_point + '</td>' +
                            '<td><button type="button" id="btnDelPoint-' + response[i].point_std_setpoint_id + '-' + response[i].point_std_id + '-' + i + '" class="btn btn-danger px-3"><i class="fas fa-eraser" aria-hidden="true"></i></button></td>' +
                            '</tr>';
                    }
                    html += '</tbody>';
                } else {
                    html = '<label>NO DATA</label>';
                }
                $('#showPointZone').html(html);
                $.each(response, function (i, p) {
                    $('#btnDelPoint-' + response[i].point_std_setpoint_id + '-' + response[i].point_std_id + '-' + i).click(function (e) {
                        stdId = response[i].point_std_user_id;
                        pointIndex = response[i].point_std_index;
                        childField = response[i].point_std_id;
                        parentField = response[i].point_std_setpoint_id;
                        index = i;
                        $('#DelIDSTD').text(response[i].point_std_user_id);
                        $('#ModalConDel').modal('show');
                        //console.log('btnDelPoint-' + response[i].point_std_setpoint_id + '-' + response[i].point_std_id + '-' + i);
                        //console.log(response[i].point_std_user_id, response[i].point_std_index) 
                        //alert('Deleted!'); 
                        // delPoint(response[i].point_std_user_id, response[i].point_std_index, response[i].point_std_id, response[i].point_std_setpoint_id);
                        // $('#tr-' + response[i].point_std_setpoint_id + '-' + response[i].point_std_id + '-' + i).addClass('text-danger');
                    });
                });
            },
        });
    }

    $('#btnConfrimDelPointSTD').click(function (e) {
        delPoint();
        $('#ModalConDel').modal('hide');
        // $('#tr-' + parentField + '-' + childField + '-' + index).addClass('text-danger');
        $('#tr-' + parentField + '-' + childField + '-' + index).remove();
    });

    function delPoint() {
        console.log(stdId, pointIndex, childField, parentField, semester, subject_id);
        pUrl = '/' + url[3] + '/Te_subject_point/delPoint';
        $.ajax({
            type: "POST",
            url: pUrl,
            data: '&semester=' + semester + '&subject_id=' + subject_id + '&setIdChild=' + childField + '&setIdParent=' + parentField + '&pointIndex=' + pointIndex + '&stdId=' + stdId,
            success: function () {
                console.log('Deleted Successfully');
                // Snackbar.show({
                //     actionText: 'close',
                //     pos: 'top-center',
                //     actionTextColor: '#4CAF50',
                //     backgroundColor: '#323232',
                //     width: 'auto',
                //     text: 'ลบข้อมูลแล้ว'
                // });
            }
        });
    }

    $('#ticketClose').click(function (e) {
        $('#addTicketUID').val("");
        $('#addTicketP').val("");
        for (i = 0; i < $(formDataInsertScore).length; i++) {
            $(popDataInsertScore[i]).hide();
        }
    });

    $(document).on('keypress', function (e) {
        if (e.which == 13) {

            uID = $('#addTicketUID').val();
            tPoint = $('#addTicketP').val();

            // if (tPoint == '') {
            //     Snackbar.show({
            //         actionText: 'close',
            //         pos: 'top-center',
            //         actionTextColor: '#FF0000',
            //         backgroundColor: '#323232',
            //         width: 'auto',
            //         text: 'กรุณากรอกคะแนนที่ได้'
            //     });
            //     return false
            // }

            var resultInsertScore = '';
            var checkInsertScore = '';

            for (i = 0; i < $(formDataInsertScore).length; i++) {
                if ($(formDataInsertScore[i]).val() == '') {
                    $(popDataInsertScore[i]).show();

                } else {
                    $(popDataInsertScore[i]).hide();
                    resultInsertScore += i;
                }
                checkInsertScore += i;
            }

            maxstd = 0;
            maxstd = parseFloat(maxstd) + parseFloat(tPoint);

            if (checkInsertScore == resultInsertScore) {
                $.ajax({
                    type: "POST",
                    url: '/' + url[3] + '/Te_subject_point/checkMaxpointSTD',
                    data: '&semester=' + semester + '&subject_id=' + subject_id + '&setIdChild=' + setIdChild + '&setIdParent=' + setIdParent + '&std=' + uID,
                    dataType: "json",
                    success: function (response) {
                        // console.log(response);
                        if (response != null) {
                            for (i = 0; i < response.length; i++) {
                                // tPoint = tPoint + (response[i].point_std_point*1);
                                maxstd = parseFloat(maxstd) + parseFloat(response[i].point_std_point);
                            }
                        }

                        if (maxstd > setMaxPoint) {
                            Snackbar.show({
                                actionText: 'close',
                                pos: 'top-center',
                                actionTextColor: '#FF0000',
                                backgroundColor: '#323232',
                                width: 'auto',
                                text: 'คะแนนเกินคะแนนสูงสุด'
                            });
                            return false
                        } else {
                            AddPoint_std(uID, tPoint);
                        }
                    }
                });
            }

            //if (tPoint > setMaxPoint) tPoint = setMaxPoint;
            //console.log(uID, tPoint, setMaxPoint, subject_id + '-' + semester, setIdParent, setIdChild);

            //pUrl = '/' + url[3] + '/Te_subject_point/insertFieldScore/' + semester + '-' + subject_id + '-' + pointId + '-' + ticket + '-' + fullName + '-' + miniName + '-' + maxPoint;
            pUrl = '/' + url[3] + '/Te_subject_point/insertInFieldPoint';

            // $.ajax({
            //     type: "POST",
            //     url: pUrl,
            //     data: '&semester=' + semester + '&subject_id=' + subject_id + '&setIdChild=' + setIdChild + '&setIdParent=' + setIdParent + '&tPoint=' + tPoint + '&uID=' + uID,
            //     dataType: "json",
            //     success: function (response) {
            //         $('#addTicketUID').val("");
            //         $("#addTicketUID").focus();
            //         console.log(response);
            //         Snackbar.show({
            //             actionText: 'close',
            //             pos: 'top-center',
            //             actionTextColor: '#4CAF50',
            //             backgroundColor: '#323232',
            //             width: 'auto',
            //             text: response
            //         });
            //         // $('#addTicketP').val("");
            //     },
            //     error: function () {
            //         $('#addTicketUID').val("");
            //         $("#addTicketUID").focus();
            //         Snackbar.show({
            //             actionText: 'close',
            //             pos: 'top-center',
            //             actionTextColor: '#FF0000',
            //             backgroundColor: '#323232',
            //             width: 'auto',
            //             text: 'ไม่มีข้อมูลในระบบ'
            //         });
            //     }
            // });
        }
    });

    $('#ticketSave').click(function (e) {
        ticketSaveID();
    });


    $('#barcode_canvas').hide();
    $('#video').hide();

    var video = document.createElement("video");
    var canvasElement = document.getElementById("barcode_canvas");
    var canvas = canvasElement.getContext("2d", {
        desynchronized: true,
        preserveDrawingBuffer: false
    });
    var flag = 0;
    var use_camera = false;
    var video;
    // var switchCameraButton;
    var amountOfCameras = 0;
    var currentFacingMode = 'environment';

    function deviceCount() {
        return new Promise(function (resolve) {
            var videoInCount = 0;

            navigator.mediaDevices
                .enumerateDevices()
                .then(function (devices) {
                    devices.forEach(function (device) {
                        if (device.kind === 'video') {
                            device.kind = 'videoinput';
                        }

                        if (device.kind === 'videoinput') {
                            videoInCount++;
                            console.log('videocam: ' + device.label);
                        }
                    });
                    resolve(videoInCount);
                })
                .catch(function (err) {
                    console.log(err.name + ': ' + err.message);
                    resolve(0);
                });
        });
    }

    $('#barcodeticketSave').click(function (e) {
        e.preventDefault();
        flag++;
        if (flag == 1) {
            $('#Ticket').val('');
            camera_start();
            console.log('ON');
            use_camera = true;
        } else {
            barcode_reader_stop();
            // flag = 0;
            console.log('OFF');
            use_camera = false;
        }
    });

    $('#stopcamera').click(function (e) {
        e.preventDefault();
        if (flag == 1) {
            barcode_reader_stop();
        }
    });

    function barcode_reader_stop() {
        video.pause();
        stream.getTracks().forEach(function (track) {
            track.stop();
        });
        flag = 0;
        Quagga.stop();
        $('#barcode_canvas').hide();
        $('#video').hide();
    }

    function initCameraStream() {
        video = document.getElementById('video');
        if (window.stream) {
            window.stream.getTracks().forEach(function (track) {
                console.log(track);
                track.stop();
            });
        }

        var size = 1280;

        var constraints = {
            audio: false,
            video: {
                width: {
                    ideal: size
                },
                height: {
                    ideal: size
                },
                //width: { min: 1024, ideal: window.innerWidth, max: 1920 },
                //height: { min: 776, ideal: window.innerHeight, max: 1080 },
                facingMode: currentFacingMode,
            },
        };

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(handleSuccess)
            .catch(handleError);

        function handleSuccess(stream) {
            window.stream = stream;
            video.srcObject = stream;
            // if (amountOfCameras > 1) {
            //     // $('#switchCameraButton').show(500);
            // }
            // if (constraints.video.facingMode) {
            //     if (constraints.video.facingMode === 'environment') {
            //         switchCameraButton.setAttribute('aria-pressed', true);
            //     } else {
            //         switchCameraButton.setAttribute('aria-pressed', false);
            //     }
            // }

            const track = window.stream.getVideoTracks()[0];
            const settings = track.getSettings();
            str = JSON.stringify(settings, null, 4);
            console.log('settings ' + str);
        }

        function handleError(error) {
            console.error('getUserMedia() error: ', error);
        }
    }

    function camera_start() {
        $('#video').show(500);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && navigator.mediaDevices.enumerateDevices) {
            navigator.mediaDevices
                .getUserMedia({
                    audio: false,
                    video: true,
                })
                .then(function (stream) {
                    // stream.getTracks().forEach(function (track) {
                    //     track.stop();
                    // });

                    Quagga.init({
                        inputStream: {
                            name: "Live",
                            type: "LiveStream",
                            target: document.querySelector('#video'), // Or '#yourElement' (optional)
                            constraints: {
                                facingMode: "environment",
                            }
                        },
                        decoder: {
                            readers: ["code_128_reader", 'code_39_reader']
                        },
                        singleChannel: true, // true: only the red color-channel is read
                    }, function (err) {
                        if (err) {
                            console.log(err);
                            return
                        }
                        console.log("Initialization finished. Ready to start");
                        Quagga.start();
                    });

                    deviceCount().then(function (deviceCount) {
                        amountOfCameras = deviceCount;
                        initCameraStream();
                    });
                })
                .catch(function (error) {
                    if (error === 'PermissionDeniedError') {
                        alert('Permission denied. Please refresh and give permission.');
                    }
                    console.error('getUserMedia() error: ', error);
                });
        } else {
            alert('Mobile camera is not supported by browser, or there is no camera detected/connected');
        }
    }

    Quagga.onProcessed(function (result) {
        // console.log(result);
    });

    function isNumeric(s) {
        return !isNaN(s - parseFloat(s));
    }

    var lastResult = '';
    Quagga.onDetected(function (result) {
        var code = result.codeResult.code;
        if (lastResult != code && code.length === 10 && isNumeric(code)) {
            lastResult = code;
            // console.log(code);
            // console.log();
            // console.log(result);
            setTimeout(function () {
                lastResult = '';
                console.log('clear lastResult');
            }, 2000);
            $('#addTicketUID').val(code);
            setTimeout(function () {
                ticketSaveID();
            }, 500);
        }
    });


    function ticketSaveID() {
        uID = $('#addTicketUID').val();
        tPoint = $('#addTicketP').val();

        // if (tPoint == '') {
        //     Snackbar.show({
        //         actionText: 'close',
        //         pos: 'top-center',
        //         actionTextColor: '#FF0000',
        //         backgroundColor: '#323232',
        //         width: 'auto',
        //         text: 'กรุณากรอกคะแนนที่ได้'
        //     });
        //     return false
        // }

        var resultInsertScore = '';
        var checkInsertScore = '';

        for (i = 0; i < $(formDataInsertScore).length; i++) {
            if ($(formDataInsertScore[i]).val() == '') {
                $(popDataInsertScore[i]).show();

            } else {
                $(popDataInsertScore[i]).hide();
                resultInsertScore += i;
            }
            checkInsertScore += i;
        }

        maxstd = 0;
        maxstd = parseFloat(maxstd) + parseFloat(tPoint);

        // console.log(setIdChild);
        if (checkInsertScore == resultInsertScore) {
            $.ajax({
                type: "POST",
                url: '/' + url[3] + '/Te_subject_point/checkMaxpointSTD',
                data: '&semester=' + semester + '&subject_id=' + subject_id + '&setIdChild=' + setIdChild + '&setIdParent=' + setIdParent + '&std=' + uID,
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    if (response != null) {
                        for (i = 0; i < response.length; i++) {
                            // tPoint = tPoint + (response[i].point_std_point*1);
                            maxstd = parseFloat(maxstd) + parseFloat(response[i].point_std_point);
                        }
                    }

                    if (maxstd > setMaxPoint) {
                        Snackbar.show({
                            actionText: 'close',
                            pos: 'top-center',
                            actionTextColor: '#FF0000',
                            backgroundColor: '#323232',
                            width: 'auto',
                            text: 'คะแนนเกินคะแนนสูงสุด'
                        });
                        $('#addTicketUID').val('');
                        return false
                    } else {
                        AddPoint_std(uID, tPoint);
                    }
                }
            });
        }

        //if (tPoint > setMaxPoint) tPoint = setMaxPoint;
        // console.log(uID, tPoint, setMaxPoint, subject_id + '-' + semester, setIdParent, setIdChild);

        //pUrl = '/' + url[3] + '/Te_subject_point/insertFieldScore/' + semester + '-' + subject_id + '-' + pointId + '-' + ticket + '-' + fullName + '-' + miniName + '-' + maxPoint;

    }




    function AddPoint_std(uID, tPoint) {
        pUrl = '/' + url[3] + '/Te_subject_point/insertInFieldPoint';

        $.ajax({
            type: "POST",
            url: pUrl,
            data: '&semester=' + semester + '&subject_id=' + subject_id + '&setIdChild=' + setIdChild + '&setIdParent=' + setIdParent + '&tPoint=' + tPoint + '&uID=' + uID,
            dataType: "json",
            success: function (response) {
                for (i = 0; i < $(formDataInsertScore).length; i++) {
                    $(popDataInsertScore[i]).hide();
                }
                $('#addTicketUID').val("");
                $("#addTicketUID").focus();
                console.log(response);
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#4CAF50',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: response
                });
                // $('#addTicketP').val("");
            },
            error: function () {
                for (i = 0; i < $(formDataInsertScore).length; i++) {
                    $(popDataInsertScore[i]).hide();
                }
                $('#addTicketUID').val("");
                $("#addTicketUID").focus();
                Snackbar.show({
                    actionText: 'close',
                    pos: 'top-center',
                    actionTextColor: '#FF0000',
                    backgroundColor: '#323232',
                    width: 'auto',
                    text: 'ไม่มีข้อมูลในระบบ'
                });
            }
        });
    }

});