$(document).ready(function() {
    showSemester();

    function showSemester() {
        $.ajax({
            url: "../Std_subject/getSemester",
            dataType: "json",
            success: function(response) {
                var html = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += '<option value="' + response[i].semester_id + '" id="' + response[i].semester_id + '">' + response[i].semester_name + '</option>';
                    }
                }
                $('#yearterm').html(html);
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
            url: "../" + url[3] + "/Std_subject/getSubject",
            data: "data=" + semesterSelected,
            dataType: "json",
            success: function(response) {
                var html = '';
                if (response != null) {
                    for (i = 0; i < response.length; i++) {
                        html += //'<a class="card" style="min-width: 300px; max-width : 310px;" id="' + response[i].subsem_subject + '" href="../select/subject/' + response[i].subsem_subject + '-' + response[i].subsem_semester + '" >' +
                            '<a class="card" style="min-width: 300px; max-width : 310px;" id="' + response[i].subsem_subject + '" href="../select/annouce/' + response[i].subsem_subject + '-' + response[i].subsem_semester + '" >' +
                            '<img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYZXAH2gX3tc7LJpgr0GaPOYnys6MkCpPi6VRmN6We88Uaq8wi" alt="Card image cap">' +
                            '<div class="card-body">' +
                            '<h5 class="card-title">' + response[i].subsem_subject + '</h5>' +
                            '<p class="card-text">' + response[i].subject_name + '</p>' +
                            '</div>' +
                            '</a>';
                    }
                }
                $('#showSubject').html(html);
                $.each(response, function(i, v) {
                    $('#' + response[i].subsem_subject + ' a').click(function() {
                        alert(response[i].subsem_subject);
                        //window.location.href = '../Std_download/download/' + response[i].fileName;

                        // console.log(response[i].filePath, response[i].fileName);
                        // $.ajax({
                        //     type: "POST",
                        //     url: "../Std_download/download",
                        //     data: "&data1=" + response[i].fileName + "&data2=" + response[i].filePath,
                        //     //data: "&data1=" + getFile,
                        //     dataType: "json",
                        //     success: function(response) {
                        //         alert("Success!");
                        //     }
                        // });
                    });
                });
            }
        });
    }

    $('#yearterm').change(function(e) {
        e.preventDefault();
        showSubject();
    });
});