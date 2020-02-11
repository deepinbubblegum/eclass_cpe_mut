$(document).ready(function () {

    year = semester.substr(0, 4);
    part = semester.substr(4, 1);
    $('#header').text('แบบสำรวจ : ' + subject_id + ' - ' + year + '/' + part);

    var url = $(location).attr('href').split("/");
    var editMenuId = '';
    var fieldSaveUrl = '';
    var getField = [];
    var getPoint = [];
    var SHeadID = '';
    var studentCount = 0;
    var studentVoted = 0;
    var idMenu = 0;
    selectStudent();
    showMenuVote();
    var clearPoint = '0';
    $('#choiceVotePoint').val(clearPoint);

    $('#summernote').summernote({
        placeholder: 'รายละเอียดเนื้อหาประกาศ',
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

    function SnackCall(SnackText){
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
        $('#ModalLabel').text('เพิ่มเมนูแบบสำรวจ');
        //$("#PointView").prop("checked", true);
        //todayDate = new Date().toISOString();
        // $('#StartDatePicker').val(todayDate);
        $('#btnModalSave').text('บันทึกข้อมูล');
        $('#summernote').summernote('code', '');
        iurl = "/" + url[3] + "/Te_subject_vote/insertMenuVote";
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

        $.ajax({
            type: "POST",
            url: iurl,
            //data: '&semester=' + semester + '&subject=' + subject_id + '&header=' + header + '&description=' + description + '&status=' + menuStatus + '&editID=' + editMenuId,
            data:{
                semester:semester,
                subject:subject_id,
                header:header,
                description:description,
                status:menuStatus,
                editID:editMenuId
            },
            success: function () {
                $('#Headtext').val("");
                // $('#Textarea').val("");
                $('#summernote').summernote('code', '');
                $('#Modal').modal('hide');
                showMenuVote();
                SnackCall("บันทึกข้อมูลเมนูสำเร็จ");
            }
        });
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
                            '<a aria-controls="collapse' + i + '" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapse' + i + '" id="heading' + i + '">' +
                            response[i].menuVoteName +
                            '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                            '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                            '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                            '</div>' +
                            '</a>' +
                            '<div aria-labelledby="heading' + i + '" class="collapse" data-parent="#accordionOne" id="collapse' + i + '">' +
                            '<div class="expansion-panel-body">' +
                            /* --------BTN-------- */
                            '<span style="font-size: 1.7em;"><a title="สร้างตัวเลือกแบบสำรวจ" id="addInMenu-' + response[i].menuVoteId + '" href="#" class="f34r-txt-black"><i class="fas fa-plus-square"></a></i></span>&nbsp;' +
                            '<span style="font-size: 1.7em;"><a title="ลบเมนูแบบสำรวจ" id="delMenu-' + response[i].menuVoteId + '" href="#" class="f34r-txt-black"><i class="fas fa-trash-alt"></a></i></span>&nbsp;' +
                            '<span style="font-size: 1.7em;"><a title="แก้ไขเมนูแบบสำรวจ" id="editMenu-' + response[i].menuVoteId + '" href="#" class="f34r-txt-black"><i class="fas fa-edit"></a></i></span>&nbsp;' +
                            '<span style="font-size: 1.7em;"><a title="ดูคะแนนแบบสำรวจ" id="showScoreMenu-' + response[i].menuVoteId + '" href="#" class="f34r-txt-black"><i class="fas fa-chart-bar"></a></i></span>&nbsp;' +
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

                $('#collapse' + idMenu).collapse({
                    toggle: true
                });

                $.each(getMenu, function (i, p) {
                    showChoice(getMenu[i].menuVoteId);
                    $('#addInMenu-' + getMenu[i].menuVoteId).click(function (e) {
                        SMenuID = getMenu[i].menuVoteId;
                        fieldSaveUrl = '/' + url[3] + '/Te_subject_vote/insertFieldVote';
                        $('#addField').modal('show');
                        $('#addFieldLabel').text('Create in menu : ' + getMenu[i].menuVoteName);
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

                        $('#ModalLabel').text('แก้ไขเมนูแบบสำรวจ');
                        $('#save').text('ยืนยันการแก้ไข');

                        $('#Modal').modal('show');
                        iurl = "/" + url[3] + "/Te_subject_vote/editMenuVote";
                        editMenuId = getMenu[i].menuVoteId;
                    });
                });
            }
        });
    }
    ajaxCount=0;
    $(document).ajaxStop(function () {
        ajaxCount++;
        console.log(ajaxCount);
        //if(ajaxCount == 1){
            //console.log(getPoint[getMenu[i].menuVoteId]);
        $.each(getMenu, function (i, p) {
            chartCheck = 0;
            $('#showScoreMenu-' + getMenu[i].menuVoteId).click(function (e) {

                chartCheck++;
                        if(chartCheck > 1){
                            char.destroy();
                        }
                $("#showScoreModal").modal('show');
                $("#scoreModalLabel").text(getMenu[i].menuVoteName);
                
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
                            "data":  newAPoint,
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
                    studentVoted = studentVoted + (newAPoint[p]*1);
                }
                notVote = (studentCount*1) - (studentVoted*1);

                html2 = '<table class="table table-striped mt-2"><tbody>';
                html2 += '<tr><td>Student</td> <td>' + studentCount + '</td> <td>People</td> </tr>'; 
                html2 += '<tr><td>Voted</td> <td>' + studentVoted + '</td> <td>People</td> </tr>'; 
                html2 += '<tr><td>No Vote</td> <td>' + notVote + '</td> <td>People</td> </tr>'; 
                html2 += '</tbody></table>'
                $('#f34r-here').html(html2);
            });
        });
    //}
    });

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
                ['Student', studentCount, 'People'],
                ['Voted', studentVoted, 'People'],
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

                            //'<span style="font-size: 1.5em;"><a href="#" title="เพิ่มตัวเลือกแบบสำรวจ" id="addChoiceVote-' + mVoteId + '-' + response[i].choiceVoteId + '"class="f34r-txt-black"><i class="fas fa-plus-square"></i></a></span>&nbsp;' +
                            '<span style="font-size: 1.5em;"><a href="#" title="ลบตัวเลือกแบบสำรวจ" id="delChoiceVote-' + mVoteId + '-' + response[i].choiceVoteId + '"class="f34r-txt-black"><i class="fas fa-minus-square"></i></a></span>&nbsp;' +
                            '<span style="font-size: 1.5em;"><a href="#" title="แก้ไขตัวเลือกแบบสำรวจ" id="editChoiceVote-' + mVoteId + '-' + response[i].choiceVoteId + '"class="f34r-txt-black"><i class="fas fa-pen"></i></a></span>&nbsp;';

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
                        $("#txtDel").text('Field:' + getField[mVoteId][i].choiceVoteText);
                        $("#ModalDelete").modal('show');
                        takeThisDel = "delField";
                        delCid = getField[mVoteId][i].choiceVoteId;
                        delPid = mVoteId;
                        idMenu = mVoteId - 1;
                        //delField(response[i].setpoint_id, response[i].choiceVoteId);
                    });
                    $('#editChoiceVote-' + mVoteId + '-' + getField[mVoteId][i].choiceVoteId).click(function (e) {
                        $('#addFieldHQN').val(getField[mVoteId][i].choiceVoteText);
                        $('#addFieldLabel').text('Edit Header : ' + getField[mVoteId][i].choiceVoteText);
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
        $.ajax({
            type: "POST",
            url: fieldSaveUrl,
            //data: '&semester=' + semester + '&subject_id=' + subject_id + /*|*/ '&choiceTxt=' + choiceTxt + '&menuId=' + SMenuID + '&headId=' + SHeadID,
            data:{
                semester:semester,
                subject_id:subject_id,
                choiceTxt:choiceTxt,
                menuId:SMenuID,
                headId:SHeadID
            },
            success: function () {
                $('#addFieldHQN').val("");
                $('#addField').modal('hide');
                showMenuVote();
                SnackCall("บันทึกข้อมูลตัวเลือกแบบสำรวจสำเร็จ");
            }
        });
    });

    /////////////////////////////////////////////////////////

    function delField(pid, cid) {
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Te_subject_vote/delField',
            data: '&semester=' + semester + '&subject=' + subject_id + '&setIdParent=' + pid + '&setIdChild=' + cid,
            success: function () {
                // console.log('Deleted Successfully');
                showMenuVote();
                SnackCall("ลบข้อมูลตัวเลือกแบบสำรวจสำเร็จ");
            }
        });
    }

    function delMenu(pid) {
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Te_subject_vote/delMenu',
            data: '&semester=' + semester + '&subject=' + subject_id + '&setIdParent=' + pid,
            success: function () {
                // console.log('Deleted Successfully');
                showMenuVote();
                SnackCall("ลบเมนูสำเร็จ");
            }
        });
    }
});