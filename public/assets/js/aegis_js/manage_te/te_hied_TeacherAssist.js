document.addEventListener("DOMContentLoaded", function(event) {

    var url = $(location).attr('href').split("/");
    var hideMenu = ['videos', 'downloads', 'uploads', 'score', 'quiz_vote', '0'];
    Teacher_Assist();

    function Teacher_Assist() {
        $.ajax({
            type: "POST",
            url: "/" + url[3] + "/Teacher_subject/Hide_menu",
            data: '&semester=' + semester + '&subject=' + subject_id,
            dataType: "json",
            success: function(response) {
                console.log(response);
                if (response != 0) {
                    bit = response[0].per_bit;
                    for (var x = 0; x < bit.length; x++) {
                        var c = bit.charAt(x);
                        if (c == 0) {
                            //alert(hideMenu[x]);
                            $("#" + hideMenu[x]).hide();
                        }
                    }
                    $('#add_permission').hide();
                    $('#add_teacher_assist').hide();
                    $('#add_student').hide();
                    $('#line').hide();
                }
            }
        });
    }
});