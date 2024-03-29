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
    var element = document.getElementById("vote");
    element.classList.add("bg-primary-light");
    var element = document.getElementById("side_vote");
    element.classList.add("bg-primary-light");
    /******************************************************************** */


    year = semester.substr(0, 4);
    part = semester.substr(4, 1);
    $('#header').text('โหวต : ' + subject_id + ' - ' + year + '/' + part);

    var url = $(location).attr('href').split("/");
    var editMenuId = '';
    var fieldSaveUrl = '';
    var getField = [];
    var getPoint = [];
    var SHeadID = '';
    var studentCount = 0;
    var studentVoted = 0;
    var idMenu = 0;
    var getMenu = [];
    rfhStudentMax = rfhSum = notVote = ''; 

    selectStudent();
    showMenuVote();
    var clearPoint = '0';
    $('#choiceVotePoint').val(clearPoint);

    $('#summernote').summernote({
        placeholder: 'รายละเอียดเมนูโหวต',
        // tabsize: 1,
        height: 250,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            // ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ]
    });

    $('#summernote').summernote('code', '');

    /************************************************* Pop Alert **********************************************************/

    var formMenu = ["#Headtext"];

    var popMenu = ["#popupMenu"];

    var popValueMenu = [
        //[POP_ID,POP_TEXT]
        ['popupMenu', 'กรุณาระบุชื่อเมนู']
    ];

    function popGenMenu() {
        for (i = 0; i < popValueMenu.length; i++) {
            $("<div id='" + popValueMenu[i][0] + "' class=\"text-danger\">*" + popValueMenu[i][1] + "</div>").insertAfter(formMenu[i]);
        }
    }

    function hideAllPopMenu() {
        for (i = 0; i < popMenu.length; i++) {
            $(popMenu[i]).hide();
        }
    }

    popGenMenu();
    hideAllPopMenu();


    var formChoice = ["#addFieldHQN"];

    var popChoice = ["#popupChoice"];

    var popValueChoice = [
        //[POP_ID,POP_TEXT]
        ['popupChoice', 'กรุณาระบุชื่อตัวเลือก']
    ];

    function popGenChoice() {
        for (i = 0; i < popValueChoice.length; i++) {
            $("<div id='" + popValueChoice[i][0] + "' class=\"text-danger\">*" + popValueChoice[i][1] + "</div>").insertAfter(formChoice[i]);
        }
    }

    function hideAllPopChoice() {
        for (i = 0; i < popChoice.length; i++) {
            $(popChoice[i]).hide();
        }
    }

    popGenChoice();
    hideAllPopChoice();

    /************************************************* Pop Alert **********************************************************/


    function SnackCall(SnackText) {
        Snackbar.show({
            actionText: 'close',
            pos: 'top-center',
            actionTextColor: '#4CAF50',
            backgroundColor: '#323232',
            width: 'auto',
            text: SnackText
        });
    }

    $('#btnAddVote').click(function (e) {
        e.preventDefault();
        $('#Modal').modal('show');
        $('#ModalLabel').text('เพิ่มเมนูโหวต');
        //$("#PointView").prop("checked", true);
        //todayDate = new Date().toISOString();
        // $('#StartDatePicker').val(todayDate);
        $('#btnModalSave').text('บันทึกข้อมูล');
        $('#summernote').summernote('code', '');
        iurl = "/" + url[3] + "/Te_subject_vote/insertMenuVote";
    });

    $('#btnModalClose').click(function (e) {
        e.preventDefault();
        $('#Headtext').val("");
        $('#summernote').summernote('code', '');
        hideAllPopMenu();
    });

    $('#IconModalClose').click(function (e) {
        e.preventDefault();
        $('#Headtext').val("");
        $('#summernote').summernote('code', '');
        hideAllPopMenu();
    });

    $('#btnModalSave').click(function (e) {
        header = $('#Headtext').val();
        // description = $('#Textarea').val();
        description = $('#summernote').summernote('code');
        menuStatus = '';
        if ($('#checkBox01').prop("checked")) {
            menuStatus += 1
        } else {
            menuStatus += 0
        }

        // if(header*1 != 0){
        var result = '';
        var check = '';

        for (i = 0; i < $(formMenu).length; i++) {
            if ($(formMenu[i]).val() == '') {
                $(popMenu[i]).show();

            } else {
                $(popMenu[i]).hide();
                result += i;
            }
            check += i;
        }

        if (check == result) {
            $.ajax({
                type: "POST",
                url: iurl,
                //data: '&semester=' + semester + '&subject_id=' + subject_id + '&header=' + header + '&description=' + description + '&status=' + menuStatus + '&editID=' + editMenuId,
                data: {
                    semester: semester,
                    subject_id: subject_id,
                    header: header,
                    description: description,
                    status: menuStatus,
                    editID: editMenuId
                },
                success: function () {
                    $('#Headtext').val("");
                    // $('#Textarea').val("");
                    $('#summernote').summernote('code', '');
                    $('#Modal').modal('hide');
                    hideAllPopMenu();
                    showMenuVote();
                    SnackCall("บันทึกข้อมูลเมนูสำเร็จ");
                }
            });
        }
        // }else{
        //     SnackCall('โปรดกรอกชื่อเมนู');
        // }
    });

    function selectStudent() {
        $.ajax({
            url: '/' + url[3] + '/Te_subject_vote/getStudent/' + subject_id + '-' + semester,
            dataType: "json",
            success: function (response) {
                studentCount = response[0].studentCount;
            }
        });
    }

    function showMenuVote() {
        $.ajax({
            url: '/' + url[3] + '/Te_subject_vote/showMenuVote/' + subject_id + '-' + semester,
            dataType: "json",
            success: function (response) {
                getMenu = response;
                var html = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html +=
                            '<div class="expansion-panel list-group-item success-color">' +
                            '<a aria-controls="collapse' + i + '" aria-expanded="true" class="sortableMenu expansion-panel-toggler collapsed" data-toggle="collapse" data1="' + response[i].menuVoteId + '" href="#collapse' + i + '" id="heading' + i + '">' +
                            response[i].menuVoteName +
                            '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                            '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                            '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                            '</div>' +
                            '</a>' +
                            '<div aria-labelledby="heading' + i + '" class="collapse" data-parent="#accordionOne" id="collapse' + i + '">' +
                            '<div class="expansion-panel-body">' +
                            /* --------BTN-------- */
                            '<span style="font-size: 1.7em;"><a title="สร้างตัวเลือกโหวต" id="addInMenu-' + response[i].menuVoteId + '" href="#" class="f34r-txt-black"><i class="fas fa-plus-square"></a></i></span>&nbsp;' +
                            '<span style="font-size: 1.7em;"><a title="ลบเมนูโหวต" id="delMenu-' + response[i].menuVoteId + '" href="#" class="f34r-txt-black"><i class="fas fa-trash-alt"></a></i></span>&nbsp;' +
                            '<span style="font-size: 1.7em;"><a title="แก้ไขเมนูโหวต" id="editMenu-' + response[i].menuVoteId + '" href="#" class="f34r-txt-black"><i class="fas fa-edit"></a></i></span>&nbsp;' +
                            '<span style="font-size: 1.7em;"><a title="ดูผลสำรวจ" id="showScoreMenu-' + response[i].menuVoteId + '" href="#" class="f34r-txt-black"><i class="fas fa-chart-bar"></a></i></span>&nbsp;' +
                            /* --------BTN-------- */
                            '<br>' +
                            response[i].menuVoteDescription +
                            '<hr>' +
                            '<table class="table table-bordered">' +
                            '<ol id="fieldOlTag-' + response[i].menuVoteId + '">' +

                            '</ol>' +
                            '</table>' +

                            '</div>' +
                            '</div>' +
                            '</div>';
                    }
                }
                $('.showMenuVote').html(html);
                sortMenu();

                $('#collapse' + idMenu).collapse({
                    toggle: true
                });

                $.each(getMenu, function (i, p) {
                    showChoice(getMenu[i].menuVoteId);
                    $('#addInMenu-' + getMenu[i].menuVoteId).click(function (e) {
                        SMenuID = getMenu[i].menuVoteId;
                        fieldSaveUrl = '/' + url[3] + '/Te_subject_vote/insertFieldVote';
                        $('#addFieldHQN').val("");
                        $('#addField').modal('show');
                        $('#addFieldLabel').text('เพิ่มตัวเลือก : ' + getMenu[i].menuVoteName);
                        idMenu = i;
                        // $("input[name=PointMulti]").attr('disabled', false);
                    });
                    // $('#showInMenu-' + getMenu[i].menuVoteId).click(function(e) {}); use da href
                    // $('#impInMenu-' + getMenu[i].menuVoteId).click(function(e) {});
                    // $('#expInMenu-' + getMenu[i].menuVoteId).click(function(e) {});
                    $('#delMenu-' + getMenu[i].menuVoteId).click(function (e) {
                        takeThisDel = 'delMenu';
                        delPid = getMenu[i].menuVoteId;
                        $("#txtDel").text('Menu:' + getMenu[i].menuVoteName);
                        $("#ModalDelete").modal('show');
                        // pointId = getMenu[i].menuVoteId;
                        // $('#addField').modal('show');
                        // $('#addFieldLabel').text('Create in menu : ' + getMenu[i].menuVoteName);
                    });
                    $('#editMenu-' + getMenu[i].menuVoteId).click(function (e) {
                        e.preventDefault();
                        $('#Headtext').val(getMenu[i].menuVoteName);
                        // $('#Textarea').val(getMenu[i].menuVoteDescription);
                        $('#summernote').summernote('code', getMenu[i].menuVoteDescription);
                        idMenu = i;
                        //$("input[name='PointView'][value='" + response[i].point_StdView + "']").prop('checked', true);
                        // if ($('#checkBox01').prop("checked")) { menuStatus += 1 } else { menuStatus += 0 }
                        // if ($('#checkBox02').prop("checked")) { menuStatus += 1 } else { menuStatus += 0 }
                        // if ($('#checkBox03').prop("checked")) { menuStatus += 1 } else { menuStatus += 0 }
                        if (getMenu[i].menuVoteStatus.substring(0, 1) == '1') {
                            $('#checkBox01').prop("checked", true);
                        } else {
                            $('#checkBox01').prop("checked", false);
                        }
                        // if (getMenu[i].menuVoteStatus.substring(1, 2) == '1') { $('#checkBox01').prop("checked", true); } else { $('#checkBox02').prop("checked", false); }
                        // if (getMenu[i].menuVoteStatus.substring(2, 3) == '1') { $('#checkBox02').prop("checked", true); } else { $('#checkBox03').prop("checked", false); }
                        // if (getMenu[i].menuVoteStatus.substring(3, 4) == '1') { $('#checkBox03').prop("checked", true); } else { $('#checkBox03').prop("checked", false); }

                        $('#ModalLabel').text('แก้ไขเมนูโหวต');
                        $('#save').text('ยืนยันการแก้ไข');

                        $('#Modal').modal('show');
                        iurl = "/" + url[3] + "/Te_subject_vote/editMenuVote";
                        editMenuId = getMenu[i].menuVoteId;
                    });
                });
            }
        });
    }
    ajaxCount = 0;
    $(document).ajaxStop(function () {
        ajaxCount++;
        console.log(ajaxCount);
        if(ajaxCount == 1){
        //console.log(getPoint[getMenu[i].menuVoteId]);
        $.each(getMenu, function (i, p) {
            chartCheck = 0;
            $('#showScoreMenu-' + getMenu[i].menuVoteId).click(function (e) {
                chartCheck++;
                if (chartCheck > 1) {
                    char.destroy();
                    clearInterval(interRefresh);
                    console.log('doThing');
                }
                $("#showScoreModal").modal('show');
                $("#scoreModalLabel").text('ผลสำรวจ : ' + getMenu[i].menuVoteName);

                //---------------------------------------------------------------
                //console.log(getField[getMenu[i].menuVoteId]);
                //console.log(getField[getMenu[i].menuVoteId].choiceVoteText);
                if (getField[getMenu[i].menuVoteId] != null) {
                    getName = [];
                    for (j = 0; j < getField[getMenu[i].menuVoteId].length; j++) {
                        getName[getField[getMenu[i].menuVoteId][j].choiceVoteId] = getField[getMenu[i].menuVoteId][j].choiceVoteText;
                    }
                }

                var newAName = getName.filter(function (el) {
                    return el != null;
                });

                var newAPoint = getPoint[getMenu[i].menuVoteId].filter(function (el) {
                    return el != null;
                });

                console.log(getPoint[getMenu[i].menuVoteId]);

                char = new Chart(document.getElementById("score_show"), {
                    "type": "horizontalBar",
                    "data": {
                        //"labels": ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Grey"],
                        "labels": newAName,
                        "datasets": [{
                            "label": "People",
                            "data": newAPoint,
                            "fill": false,
                            "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)",
                                "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)",
                                "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"
                            ],
                            "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)",
                                "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"
                            ],
                            "borderWidth": 1
                        }]
                    },
                    "options": {
                        "scales": {
                            "xAxes": [{
                                "ticks": {
                                    "beginAtZero": true
                                }
                            }]
                        }
                    }
                });
                studentVoted = 0;
                for (p = 0; p < newAPoint.length; p++) {
                    studentVoted = studentVoted + (newAPoint[p] * 1);
                }
                notVote = (studentCount * 1) - (studentVoted * 1);

                html2 = '<table class="table table-striped mt-2"><tbody>';
                    html2 += '<tr><td>Student</td><td><span id="studentCount">' + studentCount + '</span></td><td>People</td> </tr>'; 
                    html2 += '<tr><td>Voted</td><td><span id="studentVoted">' + studentVoted + '</span></td><td>People</td> </tr>'; 
                    html2 += '<tr><td>No Vote</td><td><span id="notVote">' + notVote + '</span></td><td>People</td> </tr>'; 
                    html2 += '</tbody></table>'
                $('#f34r-here').html(html2);

                interRefresh = setInterval(function(){
                    refresher(subject_id,semester,getMenu[i].menuVoteId);
                },2000);
            });
        });
        }
    });

    function refresher(subject_id,semester,menuId){ 
        /////////////////////////////
        // interRefresh = setInterval(function(){
        //////////////////////////////
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Std_subject_vote/refresherOrb/',
            dataType: "json",
            data: {
                semester: semester,
                subject: subject_id,
                menuId: menuId
            },
            success: function (response) { 
                console.log('REFRESH')
                console.log(response);
                console.log('REFRESH')
                if (response.length != undefined) { 
                    rfhStudentMax = response[1][0].studentCount;
                    rfhChoiceText = [];
                    rfhStdVote = [];
                    rfhSum = 0

                    for (i = 0; i < response[0].length; i++) {  
                        rfhChoiceText[i] = response[0][i].choiceVoteText;
                        rfhStdVote[i] = response[0][i].countStd;
                        rfhSum += response[0][i].countStd*1;
                    } 

                    console.log(rfhStdVote);

                        notVote = (rfhStudentMax*1) - (rfhSum*1);

                        char.data.labels = rfhChoiceText;
                        char.data.datasets[0].data = rfhStdVote;
                        // char.addData(rfhStdVote);
                        char.update();
                        $("#studentCount").text(rfhStudentMax);
                        $("#studentVoted").text(rfhSum);
                        $("#notVote").text(notVote);

                    // for (j = 0; j < rfhStdVote.length; j++) {  
                            
                    // }
                    console.log(rfhChoiceText);
                    console.log(rfhStdVote);
                } 
            }
        });
        /////////////////////////////
        // }
        // ,2000);  
        /////////////////////////////
    }

    $('#download_PDF').click(function (e) {
        e.preventDefault();
        // var reportPageHeight = $('#reportPage').innerHeight();
        // var reportPageWidth = $('#reportPage').innerWidth();
        var canvas = document.getElementById('score_show');
        var imgData = canvas.toDataURL("image/png", 1.0);
        var pdf = new jsPDF("p", "cm", "a4");
        pdf.setFont('THSarabunNew');
        var margins = {
            top: 2.54,
            bottom: 2.54,
            left: 2.54
        };
        pdf.addImage(imgData, 'PNG', margins.left, margins.top, 16, 8);
        pdf.autoTable({
            // head: [['Name', 'Email', 'Country']],
            body: [
                ['Student', rfhStudentMax, 'People'],
                ['Voted', rfhSum, 'People'],
                ['No Vote', notVote, 'People'],
            ],
            startY: 11,
            margin: margins.left,
            tableWidth: number = 16
        });
        pdf.save("download.pdf");

        // var pdf = new jsPDF('l', 'pt', [reportPageWidth, reportPageHeight]);
        // pdf.addImage($(pdfCanvas)[0], 'PNG', 0, 0);

        // console.log(pdfCanvas);

        // filename = $('.modal-title').val();
        // pdf.save(filename + '.pdf');
    });

    function showChoice(mVoteId) {
        $.ajax({
            url: '/' + url[3] + '/Te_subject_vote/showVoteField/' + subject_id + '-' + semester + '-' + mVoteId,
            dataType: "json",
            success: function (response) {
                var html = "";
                if (!getField[mVoteId]) getField[mVoteId] = []
                getField[mVoteId] = response;
                if (response.length != undefined) {
                    for (i = 0; i < response.length; i++) {
                        html += '<li class=""><h4>' + response[i].choiceVoteText +
                            '<span id="fieldOlTagChild-' + mVoteId + '-' + response[i].choiceVoteId + '">' +
                            '</span>' +
                            '</h4>' +
                            '</li>' +

                            //'<span style="font-size: 1.5em;"><a href="#" title="เพิ่มตัวเลือกโหวต" id="addChoiceVote-' + mVoteId + '-' + response[i].choiceVoteId + '"class="f34r-txt-black"><i class="fas fa-plus-square"></i></a></span>&nbsp;' +
                            '<span style="font-size: 1.5em;"><a href="#" title="ลบตัวเลือกโหวต" id="delChoiceVote-' + mVoteId + '-' + response[i].choiceVoteId + '"class="f34r-txt-black"><i class="fas fa-minus-square"></i></a></span>&nbsp;' +
                            '<span style="font-size: 1.5em;"><a href="#" title="แก้ไขตัวเลือกโหวต" id="editChoiceVote-' + mVoteId + '-' + response[i].choiceVoteId + '"class="f34r-txt-black"><i class="fas fa-pen"></i></a></span>&nbsp;';

                    }
                } else {
                    html += '<h1>NO DATA</h1>'
                }
                $('#fieldOlTag-' + mVoteId).html(html);
                $.each(getField[mVoteId], function (i, p) {
                    //console.log(mVoteId, getField[mVoteId][i].choiceVoteId);
                    showPoint(mVoteId, getField[mVoteId][i].choiceVoteId);
                    $('#delChoiceVote-' + mVoteId + '-' + getField[mVoteId][i].choiceVoteId).click(function (e) {
                        //console.log('#delField-' + mVoteId + '-' + getField[mVoteId][i].choiceVoteId);
                        $("#txtDel").text('Choice:' + getField[mVoteId][i].choiceVoteText);
                        $("#ModalDelete").modal('show');
                        takeThisDel = "delField";
                        delCid = getField[mVoteId][i].choiceVoteId;
                        delPid = mVoteId;
                        idMenu = mVoteId - 1;
                        //delField(response[i].setpoint_id, response[i].choiceVoteId);
                    });
                    $('#editChoiceVote-' + mVoteId + '-' + getField[mVoteId][i].choiceVoteId).click(function (e) {
                        $('#addFieldHQN').val(getField[mVoteId][i].choiceVoteText);
                        $('#addFieldLabel').text('แก้ไขตัวเลือก : ' + getField[mVoteId][i].choiceVoteText);
                        $('#addField').modal('show');
                        fieldSaveUrl = '/' + url[3] + '/Te_subject_vote/updateFieldVote';
                        SHeadID = getField[mVoteId][i].choiceVoteId;
                        SMenuID = mVoteId;
                        idMenu = mVoteId - 1;
                    });
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
    }

    function showPoint(menuId, fieldId) {
        $.ajax({
            url: '/' + url[3] + '/Te_subject_vote/showPoint/' + subject_id + '-' + semester + '-' + menuId + '-' + fieldId,
            dataType: "json",
            success: function (response) {
                if (!getPoint[menuId])
                    getPoint[menuId] = []
                var html = "";
                if (response.length != undefined) {
                    //html += '[' + response[0].stdCount + '/' + studentCount + ']';
                    getPoint[menuId][fieldId] = response[0].stdCount;
                } else {
                    html += '<h1>NO DATA</h1>'
                }
                $('#fieldOlTagChild-' + menuId + '-' + fieldId).html(html);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
    }

    $('#Delete').click(function (e) {
        if (takeThisDel == "delChoice") {
            delChoice(delPid, delCid, delKid);
        } else if (takeThisDel == "delField") {
            delField(delPid, delCid);
        } else if (takeThisDel == "delMenu") {
            delMenu(delPid);
        }
        //console.log('DELETED!');

        takeThisDel = '';
        delPid = '';
        delCid = '';
        delKid = '';

        $("#ModalDelete").modal('hide');
    });

    $('#fieldSave').click(function (e) {
        choiceTxt = $('#addFieldHQN').val();
        // if (choiceTxt * 1 != 0) {
        var result = '';
        var check = '';

        for (i = 0; i < $(formChoice).length; i++) {
            if ($(formChoice[i]).val() == '') {
                $(popChoice[i]).show();

            } else {
                $(popChoice[i]).hide();
                result += i;
            }
            check += i;
        }

        if (check == result) {
            $.ajax({
                type: "POST",
                url: fieldSaveUrl,
                //data: '&semester=' + semester + '&subject_id=' + subject_id + /*|*/ '&choiceTxt=' + choiceTxt + '&menuId=' + SMenuID + '&headId=' + SHeadID,
                data: {
                    semester: semester,
                    subject_id: subject_id,
                    choiceTxt: choiceTxt,
                    menuId: SMenuID,
                    headId: SHeadID
                },
                success: function () {
                    $('#addFieldHQN').val("");
                    $('#addField').modal('hide');
                    hideAllPopChoice();
                    showMenuVote();
                    SnackCall("บันทึกข้อมูลตัวเลือกโหวตสำเร็จ");
                }
            });
        }
        // } else {
        //     SnackCall("โปรดกรอกชื่อตัวเลือก");
        // }
    });

    $('#fieldClose').click(function (e) {
        e.preventDefault();
        $('#addFieldHQN').val("");
        $('#addField').modal('hide');
        hideAllPopChoice();
    });

    $('#IconfieldClose').click(function (e) {
        e.preventDefault();
        $('#addFieldHQN').val("");
        $('#addField').modal('hide');
        hideAllPopChoice();
    });

    /////////////////////////////////////////////////////////

    function delField(pid, cid) {
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Te_subject_vote/delField',
            data: '&semester=' + semester + '&subject_id=' + subject_id + '&setIdParent=' + pid + '&setIdChild=' + cid,
            success: function () {
                // console.log('Deleted Successfully');
                showMenuVote();
                SnackCall("ลบข้อมูลตัวเลือกโหวตสำเร็จ");
            }
        });
    }

    function delMenu(pid) {
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Te_subject_vote/delMenu',
            data: '&semester=' + semester + '&subject_id=' + subject_id + '&setIdParent=' + pid,
            success: function () {
                // console.log('Deleted Successfully');
                showMenuVote();
                SnackCall("ลบเมนูสำเร็จ");
            }
        });
    }

    function sortMenu() {
        var sortMenuIDArray = [];
        var ArraySemester = [];
        var ArraySubject = [];
        $(".DragMenu").sortable({
            tolerance: 'pointer',
            revert: 'invalid',
            placeholder: 'p-2 f34r-bg-n-txt sortableMenu placeholder',
            forceHelperSize: true,
            stop: function () {
                $.map($(this).find('a.sortableMenu'), function (el) {
                    var MenuDowid = $(el).attr('data1');
                    sortMenuIDArray.push(MenuDowid);
                    ArraySubject.push(subject_id);
                    ArraySemester.push(semester);
                });
                console.log(sortMenuIDArray);
                $.ajax({
                    type: "POST",
                    url: '/' + url[3] + '/Te_subject_vote/SortMenu',
                    data: {
                        sortMenuIDArray,
                        ArraySemester,
                        ArraySubject
                    },
                    success: function () {
                        sortMenuIDArray = [];
                        ArraySemester = [];
                        ArraySubject = [];
                        showMenuVote();
                    }
                });
            }
        });
    }

});