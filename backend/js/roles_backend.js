//---------- Add Member
add_member = () => {
    var name = $("#name_input").val();
    var email = $("#email_input").val();
    var data_dict = {};

    // input validation
    if (name == "" || email == "") {
        alert("Please Enter all fields!");
        return;
    }

    if ($("#Courses").is(":checked")) { Courses_value = 1 } else { Courses_value = 0 }
    if ($("#Roles").is(":checked")) { Roles_value = 1 } else { Roles_value = 0 }
    if ($("#Blogs").is(":checked")) { Blogs_value = 1 } else { Blogs_value = 0 }

    data_dict = {
        courses: Courses_value,
        roles: Roles_value,
        blogs: Blogs_value
    };

    data = JSON.stringify(data_dict);

    $.post(
        root + main_route + "/add_member",
        { name: name, email: email, roles: data },
        function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
            if (data == "success") {
                alert("Member added Successfully!");
                Fetch_All_Members();
                $(":input").val("");
                $("#Courses").prop("checked", false)
                $("#Roles").prop("checked", false)
                $("#Blogs").prop("checked", false)
                $("#update").hide();
                $("#submit").show();
            } else {
                alert("Unable to add member");
            }
        }
    ).fail(function (response) {
        console.log("Error: " + response);
    });
};



//---------- Update Member
update_member = (ts) => {
    var name = $("#name_input").val();
    var email = $("#email_input").val();
    var data_dict = {};

    // input validation
    if (name == "" || email == "") {
        alert("Please Enter all fields!");
        return;
    }

    if ($("#Courses").is(":checked")) { Courses_value = 1 } else { Courses_value = 0 }
    if ($("#Roles").is(":checked")) { Roles_value = 1 } else { Roles_value = 0 }
    if ($("#Blogs").is(":checked")) { Blogs_value = 1 } else { Blogs_value = 0 }

    data_dict = {
        courses: Courses_value,
        roles: Roles_value,
        blogs: Blogs_value
    };

    data = JSON.stringify(data_dict);


    if (confirm("Are you Sure you want to update?")) {
        $.post(
            root + main_route + "/update_member",
            { email: email, roles: data },
            function (data, status) {
                console.log("Data: " + data + "\nStatus: " + status);
                if (data == "success") {
                    alert("Member updated Successfully!");
                    Fetch_All_Members();
                    $(":input").val("");
                    $("#Courses").prop("checked", false)
                    $("#Roles").prop("checked", false)
                    $("#Blogs").prop("checked", false)
                    $("#update").hide();
                    $("#submit").show();
                } else {
                    alert("Unable to update member");
                }
            }
        ).fail(function (response) {
            console.log("Error: " + response);
        });
    } else {
        return;
    }
};



//---------- Edit member
edit_member = (ts) => {
    console.log(ts);
    $("#update").show();
    $("#submit").hide();
    for (var i = 0; i < All_Member_1.length; i++) {
        if (ts == parseFloat(All_Member_1[i][0])) {
            Edit_Member = All_Member_1[i];
            break;
        }
    }
    $("#name_input").val(Edit_Member[1]);
    $('#email_input').val(Edit_Member[2]);
    checked_checkbox = JSON.parse(Edit_Member[3])
    if (checked_checkbox['courses'] == 1) {
        $("#Courses").prop("checked", true)
    }
    else if (checked_checkbox['courses'] == 0) {
        $("#Courses").prop("checked", false)
    }

    if (checked_checkbox['roles'] == 1) {
        $("#Roles").prop("checked", true)
    }
    else if (checked_checkbox['courses'] == 0) {
        $("#Roles").prop("checked", false)
    }

    if (checked_checkbox['blogs'] == 1) {
        $("#Blogs").prop("checked", true)
    }
    else if (checked_checkbox['courses'] == 0) {
        $("#Blogs").prop("checked", false)
    }
};



//---------- Delete Member
del_member = (email) => {
    if (confirm("Are you Sure?")) {
        console.log('email')
    } else {
        return;
    }
    $.post(
        root + main_route + "/delete_member",
        { email: email },
        function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
            Fetch_All_Members();
            $(":input").val("");

            $("#update").hide();
            $("#submit").show();
        }
    ).fail(function (response) {
        console.log("Error: " + response);
    });
};



//---------- Fetch All Member
Fetch_All_Members = () => {
    $.post(root + main_route + "/fetch_members", function (data, status) {
        All_Member_1 = JSON.parse(JSON.stringify(data));
        All_Member = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < All_Member.length; i++) {
            // data pre preprocessing
            let ts = All_Member[i][0];
            let name = All_Member[i][1];
            let email = All_Member[i][2];
            let roles = All_Member[i][3];
            All_Member[i][0] = moment.unix(All_Member[i][0]).format("DD-MMM HH:mm A");
            All_Member[i][1] = ts,
                All_Member[i][2] = name;
            All_Member[i][3] = email;
            All_Member[i][4] = shorten(roles);
            var str =
                `<button class="m-2" onclick="del_member('${email}')">&nbsp;Delete&nbsp;</button><button class="m-2" onclick="edit_member(${ts})">&nbsp;Edit&nbsp;</button>`;
            All_Member[i][5] = str;
        }
        if (All_Member) {
            if (counter_for_datatable == 0) {
                counter_for_datatable += 1;
                datatable = $("#memberDatatable").DataTable({
                    paging: true,
                    pageLength: 50,
                    info: false,
                    scrollX: true,
                    scrollY: 250,
                });
            }
            datatable.clear();
            datatable.rows.add(All_Member);
            datatable.draw();
        }
    }).fail(function (response) {
        console.log("Error: " + response);
    });
};



//---------- Blog Submit
document.querySelector("#submit").addEventListener("click", () => {
    add_member();
});



//---------- Blog Update
document.querySelector("#update").addEventListener("click", () => {
    update_member(parseFloat(Edit_Member[0]));
});



//---------- Shorten Function
shorten = (text, length = 75) => {
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    temp.push(text);
    text = text.substring(0, length);
    return text + "...";
};



//---------- Sign Out 
function signOut() {
    google.accounts.id.disableAutoSelect()
}



//---------- Log Out
td_logout = () => {
    signOut()
    localStorage.clear();
    var pastDate = new Date(0);
    document.cookie = "td_token=; expires=" + pastDate.toUTCString() + "; path=/";

    window.location.href = "/admin"
}



//---------- Show_Hide Table
show_hide = () => {
    counter_for_show_hide += 1;
    if (counter_for_show_hide % 2 == 0) {
        $('.wrapper_1_button').text('Hide')
        $('#table_datatable').show()
    }
    else {
        $('.wrapper_1_button').text('Show')
        $('#table_datatable').hide()
    }
}


//---------- On Ready - Refresh
$(document).ready(function () {
    $.ajaxSetup({ async: false }); // to stop async

    root = "https://tradingduniya.com";
    main_route = "/backend";

    $("#update").hide();
    $("#submit").show();

    counter_for_datatable = 0;
    counter_for_show_hide = 0;
    temp = [];


    Fetch_All_Members();

    $("#memberDatatable tbody").on("click", "td", function () {
        var cell = $(this);
        var text = cell.text();

        if (
            cell.children().length === 0 &&
            cell.contents().length === 1 &&
            cell.contents()[0].nodeType === Node.TEXT_NODE
        ) {
            navigator.clipboard
                .writeText(text)
                .then(() => {
                    console.log("Text copied to clipboard: " + text);
                })
                .catch((err) => {
                    console.error("Failed to copy text: " + err);
                });
        }
    });

    $('.wrapper_2 h5').click(() => {
        td_logout()
    })

});