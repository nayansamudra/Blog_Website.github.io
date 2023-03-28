
//---------- Delete Review
del_review = (ts) => {
    if (confirm("Are you Sure?")) { }
    else { return }
    $.post(root + main_route + '/delete_review', { review_id: ts }, function (data, status) {
        // console.log("Data: " + data + "\nStatus: " + status);
        fetch_to_be_reviewe()
        fetch_reviewed_review()
    }).fail(function (response) {
        console.log("Error: " + response);
    })
}



//---------- Approve Review
approve_review = (ts) => {
    if (confirm("Are you Sure?")) { }
    else { return }
    $.post(root + main_route + '/approve_review', { review_id: ts, action: "approved" }, function (data, status) {
        // console.log("Data: " + data + "\nStatus: " + status);
        fetch_to_be_reviewe()
        fetch_reviewed_review()
    }).fail(function (response) {
        console.log("Error: " + response);
    })
}


//---------- Reject Review
reject_review = (ts) => {
    if (confirm("Are you Sure?")) { }
    else { return }
    $.post(root + main_route + '/approve_review', { review_id: ts, action: "rejected" }, function (data, status) {
        // console.log("Data: " + data + "\nStatus: " + status);
        fetch_to_be_reviewe()
        fetch_reviewed_review()
    }).fail(function (response) {
        console.log("Error: " + response);
    })
}



//---------- Fetch All Course
fetch_to_be_reviewe = () => {
    $.post(root + main_route + '/fetch_to_be_reviewed', function (data, status) {
        fetch_to_be_reviewed = JSON.parse(JSON.stringify(data));
        fetch_to_be_reviewed_1 = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < data.length; i++) {
            // data pre preprocessing
            let ts = fetch_to_be_reviewed[i][0]
            let course_ts = fetch_to_be_reviewed[i][1]
            let email = fetch_to_be_reviewed[i][2]
            let desc = fetch_to_be_reviewed[i][3]
            let app_status = fetch_to_be_reviewed[i][4]
            fetch_to_be_reviewed[i][0] = moment.unix(fetch_to_be_reviewed[i][0]).format("DD-MMM HH:mm A")
            fetch_to_be_reviewed[i][1] = ts
            fetch_to_be_reviewed[i][2] = course_ts
            fetch_to_be_reviewed[i][3] = email
            fetch_to_be_reviewed[i][4] = shorten(desc)
            fetch_to_be_reviewed[i][5] = app_status
            var str = '<button class="m-2" onclick="del_review(' + ts + ')">&nbsp;Delete&nbsp;</button><button class="m-2" onclick="approve_review(' + ts + ')">&nbsp;Approve&nbsp;</button><button class="m-2" onclick="reject_review(' + ts + ')">&nbsp;Reject&nbsp;</button>'
            fetch_to_be_reviewed[i][6] = str
        }
        if (fetch_to_be_reviewed) {
            if (counter_for_datatable == 0) {
                counter_for_datatable += 1
                datatable = $("#ReviewDatatable").DataTable({
                    "paging": true,
                    "ordering": false,
                    "pageLength": 50,
                    "info": false,
                    "scrollX": true,
                    "scrollY": 250,
                });
            }
            datatable.clear();
            datatable.rows.add(fetch_to_be_reviewed);
            datatable.draw();
        }
    }).fail(function (response) {
        console.log("Error: " + response);
    });
}

fetch_reviewed_review = () => {
    $.post(root + main_route + '/fetch_reviewed_review', function (data, status) {
        fetch_reviewed_reviewed = JSON.parse(JSON.stringify(data));
        fetch_reviewed_reviewed_1 = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < data.length; i++) {
            // data pre preprocessing
            let ts = fetch_reviewed_reviewed[i][0]
            let course_ts = fetch_reviewed_reviewed[i][1]
            let email = fetch_reviewed_reviewed[i][2]
            let desc = fetch_reviewed_reviewed[i][3]
            let app_status = fetch_reviewed_reviewed[i][4]
            fetch_reviewed_reviewed[i][0] = moment.unix(fetch_reviewed_reviewed[i][0]).format("DD-MMM HH:mm A")
            fetch_reviewed_reviewed[i][1] = ts
            fetch_reviewed_reviewed[i][2] = course_ts
            fetch_reviewed_reviewed[i][3] = email
            fetch_reviewed_reviewed[i][4] = shorten(desc)
            fetch_reviewed_reviewed[i][5] = app_status
            var str = '<button class="m-2" onclick="del_review(' + ts + ')">&nbsp;Delete&nbsp;</button><button class="m-2" onclick="approve_review(' + ts + ')">&nbsp;Approve&nbsp;</button><button class="m-2" onclick="reject_review(' + ts + ')">&nbsp;Reject&nbsp;</button>'
            fetch_reviewed_reviewed[i][6] = str
        }
        if (fetch_reviewed_reviewed) {
            if (counter_for_datatable_1 == 0) {
                counter_for_datatable_1 += 1
                datatable_1 = $("#ReviewDatatable_1").DataTable({
                    "paging": true,
                    "ordering": false,
                    "pageLength": 50,
                    "info": false,
                    "scrollX": true,
                    "scrollY": 250,
                });
            }
            datatable_1.clear();
            datatable_1.rows.add(fetch_reviewed_reviewed);
            datatable_1.draw();
        }
    }).fail(function (response) {
        console.log("Error: " + response);
    });
}



//---------- Shorten Function
shorten = (text, length = 75) => {
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    text = text.substring(0, length);
    return text + "...";
}


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


//---------- Show_Hide Table 1
show_hide = () => {
    counter_for_show_hide += 1;
    if(counter_for_show_hide %2 == 0){
        $('.wrapper_1_button').text('Hide')
        $('#table_datatable').show()
    }
    else{
        $('.wrapper_1_button').text('Show')
        $('#table_datatable').hide()
    }
}

//---------- Show_Hide Table 2
show_hide_2 = () => {
    counter_for_show_hide_2 += 1;
    if(counter_for_show_hide_2 %2 == 0){
        $('.wrapper_1_button_2').text('Hide')
        $('#table_datatable_2').show()
    }
    else{
        $('.wrapper_1_button_2').text('Show')
        $('#table_datatable_2').hide()
    }
}



//---------- On Ready - Refresh
$(document).ready(function () {

    $.ajaxSetup({ async: false }); // to stop async

    root = "https://tradingduniya.com";
    main_route = "/courses";

    counter_for_datatable = 0
    counter_for_datatable_1 = 0
    counter_for_show_hide = 0
    counter_for_show_hide_2 = 0


    fetch_to_be_reviewe()
    fetch_reviewed_review()

    $('#ReviewDatatable tbody').on('click', 'td', function () {

        var cell = $(this);
        var text = cell.text();

        if (cell.children().length === 0 && cell.contents().length === 1 && cell.contents()[0].nodeType === Node.TEXT_NODE) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    console.log('Text copied to clipboard: ' + text);
                })
                .catch(err => {
                    console.error('Failed to copy text: ' + err);
                });
        }
    });

    $('#ReviewDatatable_1 tbody').on('click', 'td', function () {

        var cell = $(this);
        var text = cell.text();

        if (cell.children().length === 0 && cell.contents().length === 1 && cell.contents()[0].nodeType === Node.TEXT_NODE) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    console.log('Text copied to clipboard: ' + text);
                })
                .catch(err => {
                    console.error('Failed to copy text: ' + err);
                });
        }
    });

    $('.wrapper_2 h5').click(() => {
        td_logout()
    })
});
