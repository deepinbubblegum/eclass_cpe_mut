$(document).ready(function () {

    year = semester.substr(0, 4);
    part = semester.substr(4, 1);
    $('#header').text('แบบสอบถาม : ' + subject_id + ' - ' + year + '/' + part);

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

    var url = $(location).attr('href').split("/");
    var editMenuId = '';
    var fieldSaveUrl = '';
    var getField = [];
    var getUnit = [];
    var SHeadID = '';
    showMenuVote();

    function showMenuVote() {
        $.ajax({
            url: '/' + url[3] + '/Te_subject_vote/showMenuVote/' + subject_id + '-' + semester,
            dataType: "json",
            success: function (response) {
                getMenu = response;
                var html = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) { 
                            if (response[i].menuVoteStatus == '1') {
                                console.log('somthing blocked');
                            } else if (response[i].menuVoteStatus == '0'){
                                html +=
                                    '<div class="expansion-panel list-group-item success-color" >' +
                                    '<a aria-controls="collapse' + i + '" aria-expanded="true" class="expansion-panel-toggler collapsed" data-toggle="collapse" href="#collapse' + i + '" id="heading' + i + '">' +
                                    response[i].menuVoteName +
                                    '<div class="expansion-panel-icon ml-3 text-black-secondary">' +
                                    '<span style="color: Dodgerblue;" id="success-icon-' + response[i].menuVoteId + '">' +

                                    '</span>' +
                                    '<i class="collapsed-show material-icons">keyboard_arrow_down</i>' +
                                    '<i class="collapsed-hide material-icons">keyboard_arrow_up</i>' +
                                    '</div>' +
                                    '</a>' +
                                    '<div aria-labelledby="heading' + i + '" class="collapse" data-parent="#accordionOne" id="collapse' + i + '">' +
                                    '<div class="expansion-panel-body">' +
                                    '<br>' +
                                    response[i].menuVoteDescription +
                                    '<hr>' +
                                    '<table class="table table-bordered">' +
                                    '<ol id="fieldOlTag-' + response[i].menuVoteId + '">' +

                                    '</ol>' +
                                    '</table>' +
                                    '<button type="button" class="btn btn-info mt-3" id="btnSend-' + response[i].menuVoteId + '"' + '>บันทึกข้อมูล</button>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>';
                            } 
                    }
                }
                $('.showMenuVote').html(html);
                $.each(getMenu, function (i, p) {
                    if (response[i].menuVoteStatus == '0'){
                        showChoice(getMenu[i].menuVoteId);
                        $('#btnSend-' + getMenu[i].menuVoteId).click(function (e) {
                            console.log('RINKAFU - ' + getMenu[i].menuVoteId);
                            radioElement = document.querySelector('input[name="test-' + getMenu[i].menuVoteId + '"]:checked');
                            choiceId = radioElement.value;
                            console.log(choiceId);

                            $.ajax({
                                type: "POST",
                                url: '/' + url[3] + '/Std_subject_vote/insertPoint',
                                data: '&semester=' + semester + '&subject=' + subject_id + '&menuId=' + getMenu[i].menuVoteId + '&choiceId=' + choiceId,
                                success: function () {
                                    SnackCall('บันทึกสำเร็จ');
                                    selectPoint(getMenu[i].menuVoteId);
                                },
                                error: function () {
                                    SnackCall('บันทึกไม่สำเร็จ');
                                }
                            });
                        });
                    }
                });

            }
        });
    }

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
                        // html += '<h4><li class="">' + response[i].choiceVoteText + '</li></h4>' +
                        //     //'<span style="font-size: 1.5em;"><a href="#" title="เพิ่มตัวเลือกแบบสอบถาม" id="addChoiceVote-' + mVoteId + '-' + response[i].choiceVoteId + '"class="f34r-txt-black"><i class="fas fa-plus-square"></i></a></span>&nbsp;' +
                        //     '<ol id="fieldOlTagChild-' + mVoteId + '-' + response[i].choiceVoteId + '">' +
                        //     '</ol>';
                        html += '<label class="mt-2">' +
                            '<input type="radio" name="test-' + mVoteId + '" class="card-input-element d-none" value="' + response[i].choiceVoteId + '"' + '>' +
                            '<div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center">' +
                            '<h5>' + response[i].choiceVoteText + '</h5>' +
                            '</div>' +
                            '</label>';
                    }
                } else {
                    html += '<h1>NO DATA</h1>'
                }
                $('#fieldOlTag-' + mVoteId).html(html);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus + "Error: " + errorThrown);
            }
        });
    }
    ajaxCount = 0;
    $(document).ajaxStop(function () {
        if (ajaxCount == 0) {
            console.log('ajax0');
            $.each(getMenu, function (i, p) {
                selectPoint(getMenu[i].menuVoteId);
            });

        }
        console.log('ajaxStop' + ajaxCount);
        ajaxCount++;
    });

    function selectPoint(thisMenuId) {
        //console.log('selectPoint(thisMenuId)', thisMenuId);
        $.ajax({
            type: "POST",
            url: '/' + url[3] + '/Std_subject_vote/selectPoint',
            data: '&semester=' + semester + '&subject=' + subject_id + '&menuId=' + thisMenuId,
            dataType: "json",
            success: function (response) {
                html = '';
                if (response.length != undefined) {
                    html += '<i title="โหวดเรียบร้อยแล้ว" class="fas fa-check-circle success-color">โหวดเรียบร้อยแล้ว</i>';
                    $('#btnSend-' + thisMenuId).attr("disabled", true);
                    console.log(response[0].pointVoteChoiceVoteId);
                    $('input[name="test-' + thisMenuId + '"][value="' + response[0].pointVoteChoiceVoteId + '"]').attr('checked', true);
                    $('input[name="test-' + thisMenuId + '"]').attr('disabled', true);
                }
                $('#success-icon-' + thisMenuId).html(html);
            }
        });
    }
    /*
html += '<label class="mt-2">' +
                            '<input type="radio" name="test-' + mVoteId + '" class="card-input-element d-none" value="' + i + '"' + disabler + '>' +
                            '<div class="card card-body bg-light d-flex flex-row justify-content-between align-items-center">' +
                            '<h5>' + response[i].choiceQuizText + '</h5>' +
                            '</div>' +
                            '</label>';
    */
});