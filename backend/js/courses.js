//---------- Add Course
add_course = () => {
    var title = $("#Name_input").val();
    var sh_desc = "";
    var data_dict = {}

    // input validation
    if (title == "") {
        alert("Please Enter all fields!");
        return;
    }

    var Image = $("#Image_input").val()
    console.log(Image)

    var Rating = $("#Rating_input").val();
    var Website = $("#Website_input").val();
    var Main_social_media = $("#Main_social_media_input").val();
    var Audience = $("#Audience_input").val();
    var Mentor = $("#Mentor_input").val();
    var Course_Name = $("#Course_Name_input").val();
    var Course_Price = $("#Course_Price_input").val();
    var Support_System = $("#Support_System_input").val();
    var Community_for_students = $("#Community_for_students_input").val();
    var Tools_for_students = $("#Tools_for_students_input").val();
    var Revision_Session = $("#Revision_Session_input").val();
    var Live_Market_Session = $("#Live_Market_Session_input").val();
    var Students_Review = $("#Students_Review_input").val();
    var Meta_title = $("#Meta_title_input").val();
    var Meta_keywords = $("#Meta_keywords_input").val();
    var Meta_description = $("#Meta_description_input").val();
    var Meta_robots = $("#Meta_robots_input").val();
    var Meta_viewport = $("#Meta_viewport_input").val();
    var Meta_charset = $("#Meta_charset_input").val();

    data_dict = {
        Rating: Rating,
        Website: Website,
        Main_social_media: Main_social_media,
        Audience: Audience,
        Mentor: Mentor,
        Course_Name: Course_Name,
        Course_Price: Course_Price,
        Support_System: Support_System,
        Community_for_students: Community_for_students,
        Tools_for_students: Tools_for_students,
        Revision_Session: Revision_Session,
        Live_Market_Session: Live_Market_Session,
        Students_Review: Students_Review,
        Meta_title: Meta_title,
        Meta_keywords: Meta_keywords,
        Meta_description: Meta_description,
        Meta_robots: Meta_robots,
        Meta_viewport: Meta_viewport,
        Meta_charset: Meta_charset,
    };

    data = JSON.stringify(data_dict)

    var formData = new FormData();
    formData.append('title', title);
    formData.append('file', $("#Image_input")[0].files[0]);
    formData.append('sh_desc', sh_desc);
    formData.append('data', data);

    $.ajax({
        type: "POST",
        url: root + main_route + '/add_course',
        data: formData,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (data) {
            if (data == "success") {
                alert("Post Uploaded Successfully!")
                Fetch_All_Course()
                $(':input').val('');
                $('#update').hide()
                $('#submit').show()
            }
            else {
                alert("Unable to upload Post")
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    })
};



//---------- Update Course
update_course = (ts) => {
    var title = $("#Name_input").val();
    var sh_desc = "";
    var data_dict = {}

    // input validation
    if (title == "") {
        alert("Please Enter all fields!");
        return;
    }

    var Image = $("#Image_input").val()
    console.log(Image)

    var Rating = $("#Rating_input").val();
    var Website = $("#Website_input").val();
    var Main_social_media = $("#Main_social_media_input").val();
    var Audience = $("#Audience_input").val();
    var Mentor = $("#Mentor_input").val();
    var Course_Name = $("#Course_Name_input").val();
    var Course_Price = $("#Course_Price_input").val();
    var Support_System = $("#Support_System_input").val();
    var Community_for_students = $("#Community_for_students_input").val();
    var Tools_for_students = $("#Tools_for_students_input").val();
    var Revision_Session = $("#Revision_Session_input").val();
    var Live_Market_Session = $("#Live_Market_Session_input").val();
    var Students_Review = $("#Students_Review_input").val();
    var Meta_title = $("#Meta_title_input").val();
    var Meta_keywords = $("#Meta_keywords_input").val();
    var Meta_description = $("#Meta_description_input").val();
    var Meta_robots = $("#Meta_robots_input").val();
    var Meta_viewport = $("#Meta_viewport_input").val();
    var Meta_charset = $("#Meta_charset_input").val();

    data_dict = {
        Rating: Rating,
        Website: Website,
        Main_social_media: Main_social_media,
        Audience: Audience,
        Mentor: Mentor,
        Course_Name: Course_Name,
        Course_Price: Course_Price,
        Support_System: Support_System,
        Community_for_students: Community_for_students,
        Tools_for_students: Tools_for_students,
        Revision_Session: Revision_Session,
        Live_Market_Session: Live_Market_Session,
        Students_Review: Students_Review,
        Meta_title: Meta_title,
        Meta_keywords: Meta_keywords,
        Meta_description: Meta_description,
        Meta_robots: Meta_robots,
        Meta_viewport: Meta_viewport,
        Meta_charset: Meta_charset,
    };

    data = JSON.stringify(data_dict)

    if ($("#Image_input").val() == '') {
        var formData = new FormData();
        formData.append('course_id', parseFloat(Edit_Course[1]))
        formData.append('title', title);
        formData.append('sh_desc', sh_desc);
        formData.append('data', data);
    }
    else {
        var formData = new FormData();
        formData.append('course_id', parseFloat(Edit_Course[1]))
        formData.append('title', title);
        formData.append('file', $("#Image_input")[0].files[0]);
        formData.append('sh_desc', sh_desc);
        formData.append('data', data);
    }

    $.ajax({
        type: "POST",
        url: root + main_route + '/update_course',
        data: formData,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (data) {
            if (data == "success") {
                alert("Post Updated Successfully!")
                Fetch_All_Course()
                $(':input').val('');
                $('#update').hide()
                $('#submit').show()
            }
            else {
                alert("Unable to update Post")
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    })
};



//---------- Edit Course
edit_course = (ts) => {
    console.log(ts)
    $('#update').show()
    $('#submit').hide()
    for (var i = 0; i < All_Course.length; i++) {
        if (ts == parseFloat(All_Course[i][1])) {
            Edit_Course = All_Course[i]
            break;
        }
    }
    $("#Name_input").val(Edit_Course[2]);

    $("#Rating_input").val(JSON.parse(Edit_Course[5])['Rating']);
    $("#Website_input").val(JSON.parse(Edit_Course[5])['Website']);
    $("#Main_social_media_input").val(JSON.parse(Edit_Course[5])['Main_social_media']);
    $("#Audience_input").val(JSON.parse(Edit_Course[5])['Audience']);
    $("#Mentor_input").val(JSON.parse(Edit_Course[5])['Mentor']);
    $("#Course_Name_input").val(JSON.parse(Edit_Course[5])['Course_Name']);
    $("#Course_Price_input").val(JSON.parse(Edit_Course[5])['Course_Price']);
    $("#Support_System_input").val(JSON.parse(Edit_Course[5])['Support_System']);
    $("#Community_for_students_input").val(JSON.parse(Edit_Course[5])['Community_for_students']);
    $("#Tools_for_students_input").val(JSON.parse(Edit_Course[5])['Tools_for_students']);
    $("#Revision_Session_input").val(JSON.parse(Edit_Course[5])['Revision_Session']);
    $("#Live_Market_Session_input").val(JSON.parse(Edit_Course[5])['Live_Market_Session']);
    $("#Students_Review_input").val(JSON.parse(Edit_Course[5])['Students_Review']);
    $("#Meta_title_input").val(JSON.parse(Edit_Course[5])['Meta_title']);
    $("#Meta_keywords_input").val(JSON.parse(Edit_Course[5])['Meta_keywords']);
    $("#Meta_description_input").val(JSON.parse(Edit_Course[5])['Meta_description']);
    $("#Meta_robots_input").val(JSON.parse(Edit_Course[5])['Meta_robots']);
    $("#Meta_viewport_input").val(JSON.parse(Edit_Course[5])['Meta_viewport']);
    $("#Meta_charset_input").val(JSON.parse(Edit_Course[5])['Meta_charset']);

};



//---------- Delete Course
del_course = (ts) => {
    $.post(root + main_route + '/delete_course', { blog_id: ts }, function (data, status) {
        console.log("Data: " + data + "\nStatus: " + status);
        Fetch_All_Course()
        $(':input').val('');
        $('#update').hide()
        $('#submit').show()
    }).fail(function (response) {
        console.log("Error: " + response);
    })
}



//---------- Fetch All Course
Fetch_All_Course = () => {
    $.post(root + main_route + '/fetch_course_all', function (data, status) {
        console.log("Data: " + data + "\nStatus: " + status);
        All_Course = data
        console.log(All_Course)
        for (var i = 0; i < data.length; i++) {
            // data pre preprocessing
            let ts = data[i][0]
            let title = data[i][1]
            let Image = data[i][2]
            let sh_desc = data[i][3]
            let full_data = data[i][4]
            data[i][0] = moment.unix(data[i][0]).format("DD-MMM HH:mm A")
            data[i][1] = ts
            data[i][2] = title
            data[i][3] = Image
            data[i][4] = sh_desc
            data[i][5] = full_data
            var str = '<button class="m-2" onclick="del_course(' + ts + ')">&nbsp;Delete&nbsp;</button><button class="m-2" onclick="edit_course(' + ts + ')">&nbsp;Edit&nbsp;</button>'
            data[i][6] = str
        }
        if (data) {
            if (counter_for_datatable == 0) {
                counter_for_datatable += 1
                datatable = $("#CourseDatatable").DataTable({
                    "paging": true,
                    "ordering": false,
                    "pageLength": 50,
                    "info": false,
                    "scrollX": true,
                    "scrollY": 250,
                });
            }
            datatable.clear();
            datatable.rows.add(data);
            datatable.draw();
        }
    }).fail(function (response) {
        console.log("Error: " + response);
    });
}



//---------- Course Submit
document.querySelector("#submit").addEventListener("click", () => {
    add_course()
});



//---------- Course Update
document.querySelector("#update").addEventListener("click", () => {
    update_course(parseFloat(Edit_Post[1]))
});



//---------- On Ready - Refresh
$(document).ready(function () {

    $.ajaxSetup({ async: false }); // to stop async

    $("#category_input").focus();
    root = "https://tradingduniya.com";
    main_route = "/courses";

    $('#update').hide()
    $('#submit').show()

    counter_for_datatable = 0

    $("input[type='file']").on("change", function () {
        try {
            if (this.files[0].size > 2000000) {
                alert("Please upload file less than 2MB. Thanks!!");
                $(this).val('');
            }
        }
        catch (e) { console.log("File Removed!"); return }

        var allowed_ext = ['jpg', 'png', 'jpeg', 'webp', 'svg', 'gif', 'bmp', 'tif']
        var curr_ext = $("#Image_input").val()
        curr_ext = curr_ext.split('.').pop();
        curr_ext = curr_ext.toLowerCase();
        // console.log("Extension:" + curr_ext)
        if (allowed_ext.includes(curr_ext)) {
            // console.log("Ext allowed")
        }
        else {
            alert("Please upload a image only!")
            $(this).val('');
        }
    });//evt finish

    Fetch_All_Course()
});
