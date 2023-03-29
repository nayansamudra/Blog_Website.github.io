fetch_course_list = () => {
    for (var i = 0; i < All_Course.length; i++) {
        $('#card_slider').append(`<div class="card swiper-slide" id="${All_Course[i][0]}" style="cursor:pointer">
        <div class="image-content">
            <span class="overlay"></span>
            <div class="card-image">
                <img src="${All_Course[i][2]}" alt="course_images" class="card-img">
            </div>
        </div>
        <div class="card-content">
            <h2 class="name">${All_Course[i][1]}</h2>
            <p class="description">${All_Course[i][3]}</p>
        </div>
        <div class="d-flex justify-content-center mb-2">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
        </div>
        <span class="average_rating_color" style="text-align: center; padding-bottom:4px">4.1 average based
            on 254 reviews.</span>
    </div>`)

        $('#course_1').append(`<option class="${All_Course[i][0]}" value="Course1_option${i}">${All_Course[i][1]}</option>`)
        $('#course_2').append(`<option class="${All_Course[i][0]}" value="Course2_option${i}">${All_Course[i][1]}</option>`)
    }
}


fetch_blog_list = () => {
    // Latest Blog Section 
    if (All_Blog.length == 1) {
        $('#Second_Blog_Image').attr('src', All_Blog[All_Blog.length - 1][3])
        $('#Second_Blog_Category').text(All_Blog[All_Blog.length - 1][2])
        $('#Second_Blog_Title').text(All_Blog[All_Blog.length - 1][1])
        $('#Second_Blog_Date').text(moment.unix(All_Blog[All_Blog.length - 1][0]).format("MMMM DD, YYYY"))
        $('.Second_Blog').attr('id',All_Blog[All_Blog.length - 1][0])
    }
    else if (All_Blog.length == 2) {
        $('#Second_Blog_Image').attr('src', All_Blog[All_Blog.length - 1][3])
        $('#Second_Blog_Category').text(All_Blog[All_Blog.length - 1][2])
        $('#Second_Blog_Title').text(All_Blog[All_Blog.length - 1][1])
        $('#Second_Blog_Date').text(moment.unix(All_Blog[All_Blog.length - 1][0]).format("MMMM DD, YYYY"))
        $('.Second_Blog').attr('id',All_Blog[All_Blog.length - 1][0])

        $('#Third_Blog_Image').attr('src', All_Blog[All_Blog.length - 2][3])
        $('#Third_Blog_Category').text(All_Blog[All_Blog.length - 2][2])
        $('#Third_Blog_Title').text(All_Blog[All_Blog.length - 2][1])
        $('#Third_Blog_Date').text(moment.unix(All_Blog[All_Blog.length - 2][0]).format("MMMM DD, YYYY"))
        $('.Third_Blog').attr('id',All_Blog[All_Blog.length - 2][0])
    }
    else if (All_Blog.length == 3) {
        $('#Second_Blog_Image').attr('src', All_Blog[All_Blog.length - 3][3])
        $('#Second_Blog_Category').text(All_Blog[All_Blog.length - 3][2])
        $('#Second_Blog_Title').text(All_Blog[All_Blog.length - 3][1])
        $('#Second_Blog_Date').text(moment.unix(All_Blog[All_Blog.length - 3][0]).format("MMMM DD, YYYY"))
        $('.Second_Blog').attr('id',All_Blog[All_Blog.length - 3][0])

        $('#Third_Blog_Image').attr('src', All_Blog[All_Blog.length - 2][3])
        $('#Third_Blog_Category').text(All_Blog[All_Blog.length - 2][2])
        $('#Third_Blog_Title').text(All_Blog[All_Blog.length - 2][1])
        $('#Third_Blog_Date').text(moment.unix(All_Blog[All_Blog.length - 2][0]).format("MMMM DD, YYYY"))
        $('.Third_Blog').attr('id',All_Blog[All_Blog.length - 2][0])
    }
    else if (All_Blog.length >= 4) {
        $('#Second_Blog_Image').attr('src', All_Blog[All_Blog.length - 4][3])
        $('#Second_Blog_Category').text(All_Blog[All_Blog.length - 4][2])
        $('#Second_Blog_Title').text(All_Blog[All_Blog.length - 4][1])
        $('#Second_Blog_Date').text(moment.unix(All_Blog[All_Blog.length - 4][0]).format("MMMM DD, YYYY"))
        $('.Second_Blog').attr('id',All_Blog[All_Blog.length - 4][0])

        $('#Third_Blog_Image').attr('src', All_Blog[All_Blog.length - 3][3])
        $('#Third_Blog_Category').text(All_Blog[All_Blog.length - 3][2])
        $('#Third_Blog_Title').text(All_Blog[All_Blog.length - 3][1])
        $('#Third_Blog_Date').text(moment.unix(All_Blog[All_Blog.length - 3][0]).format("MMMM DD, YYYY"))
        $('.Third_Blog').attr('id',All_Blog[All_Blog.length - 3][0])
    }
}



fetch_course = (ts) => {
    $.post(root + main_route + '/fetch_course', { course_id: ts }, function (data, status) {
        console.log("Status: " + status);
        Course_Data = data
    }).done(function () {
        console.log("Done")
    })
}



add_missing_courses = () => {
    var Course_name = $('#Course_name').val()
    Dict = {
        desc: Course_name
    }
    courses_data = JSON.stringify(Dict)
    $.post(root + main_route + '/submit_missing_couses', { desc: courses_data }, function (data, status) {
        console.log("Status: " + status);
    }).done(function () {
        alert("Missing Courses Submitted")
    })
}



//---------- Add Courses
document.querySelector("#Add_Course").addEventListener("click", () => {
    add_missing_courses()
});



$(document).ready(function () {

    $.ajaxSetup({ async: false }); // to stop async

    counter_for_click = 0
    counter_for_theme = 0

    if (sessionStorage.getItem("data-theme") == null) {
        $('html').attr('data-theme', 'light')
        sessionStorage.setItem("data-theme", 'light')
    }
    else {
        $('html').attr('data-theme', sessionStorage.getItem("data-theme"))
        if (sessionStorage.getItem("data-theme") == 'dark') {
            $('#themeSwitchCheckbox').click()
            counter_for_theme = 1
        }
    }

    root = "https://tradingduniya.com";
    main_route = "/courses";
    
    main_route_1 = "/blogs";
    

    $('.sidebarBtn').click(function () {
        $('.rt-slide-nav').toggle()
    })

    $(".menu-item-parent").click(function () {
        counter_for_click += 1
        var myclass = $(this).children().first().attr("class");
        if (counter_for_click % 2 == 0) {
            $(this).children().first().removeClass('opened')
        } else {
            $(this).children().first().addClass('opened')
        }
        $(this).children().last().toggle();
    });

    $("#themeSwitchCheckbox").on('click', function () {
        counter_for_theme += 1
        if (counter_for_theme % 2 == 0) {
            $('html').attr('data-theme', 'light')
            sessionStorage.setItem("data-theme", 'light')
        } else {
            $('html').attr('data-theme', 'dark')
            sessionStorage.setItem("data-theme", 'dark')
        }
    });

    $(document).scroll(function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 0) {
            $('header').addClass('sticky');
            $('#sticky-placeholder').height(100)
            $('#back-to-top').attr('style', 'display:block')
        } else {
            $('header').removeClass('sticky');
            $('#sticky-placeholder').height(0)
            $('#back-to-top').attr('style', 'display:none')
        }
    });

    $.post(root + main_route + '/fetch_course_list', function (data, status) {
        console.log("Status: " + status);
        All_Course = data
        console.log(All_Course)
        Latest_Course_Image = All_Course[All_Course.length - 1][3]
    }).done(function () {
        if (All_Course.length != 0) {
            fetch_course_list()
        }
    })

    $.post(root + main_route_1 + '/fetch_blog_list', { catg: 'all' }, function (data, status) {
        console.log("Status: " + status);
        All_Blog = data
        console.log(All_Blog)
    }).done(function () {
        if(All_Blog.length != 0){
            fetch_blog_list()
        }
    })

    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const searchText = document.querySelector('input').value;
        const searchResult = window.find(searchText);

        if (!searchResult) {
            alert('No matches found');
        }
    });

    const form_1 = document.querySelector('.mobile_form');
    form_1.addEventListener('submit', function (event) {
        event.preventDefault();

        const searchText_1 = document.querySelector('#search_box').value;
        const searchResult_1 = window.find(searchText_1);

        if (!searchResult_1) {
            alert('No matches found');
        }
    });

    $('.card').click(function () {
        Course_ID = $(this).attr('id')
        sessionStorage.setItem('Course_ID', Course_ID)
        window.location.href = "main_course_page.html"
    })

    $('.category').on('click', function () {
        clicked_category = $(this).text()
        sessionStorage.setItem("clicked_category", clicked_category);
    });

    $('.Second_Blog').on('click', function () {
        Blog_ID = $('.Second_Blog').attr('id')
        sessionStorage.setItem("Blog_ID", Blog_ID);
    });
    
    $('.Third_Blog').on('click', function () {
        Blog_ID = $('.Third_Blog').attr('id')
        sessionStorage.setItem("Blog_ID", Blog_ID);
    });

    $('#button_id').click(() => {
        Course_1_val = $('#course_1').val()
        Course_2_val = $('#course_2').val()
        if (Course_1_val == null) { alert('Please choose course 1.'); return; }

        if (Course_2_val == null) { alert('Please choose course 2.'); return; }

        if ($("#course_1 option:selected").text() == $("#course_2 option:selected").text()) { alert('Both courses are same.'); return; }

        Course_1_ID = parseFloat($("#course_1 option:selected").attr('class'))
        fetch_course(Course_1_ID)
        Course_1_Data = Course_Data

        Course_2_ID = parseFloat($("#course_2 option:selected").attr('class'))
        fetch_course(Course_2_ID)
        Course_2_Data = Course_Data


        $('#Table_Name_1').text(Course_1_Data[0][1])
        $('#Table_Website_1').text(JSON.parse(Course_1_Data[0][4])['Website'])
        $('#Table_Audience_1').text(JSON.parse(Course_1_Data[0][4])['Audience'])
        $('#Table_Mentor_1').text(JSON.parse(Course_1_Data[0][4])['Mentor'])
        $('#Table_Course_Name_1').text(JSON.parse(Course_1_Data[0][4])['Course_Name'])
        $('#Table_Course_Price_1').text(JSON.parse(Course_1_Data[0][4])['Course_Price'])
        $('#Table_Support_System_1').text(JSON.parse(Course_1_Data[0][4])['Support_System'])
        $('#Table_Community_for_students_1').text(JSON.parse(Course_1_Data[0][4])['Community_for_students'])
        $('#Table_Tools_for_students_1').text(JSON.parse(Course_1_Data[0][4])['Tools_for_students'])
        $('#Table_Revision_Session_1').text(JSON.parse(Course_1_Data[0][4])['Revision_Session'])
        $('#Table_Live_Market_Session_1').text(JSON.parse(Course_1_Data[0][4])['Live_Market_Session'])
        $('#Table_Students_Review_1').text(JSON.parse(Course_1_Data[0][4])['Rating'] + '🌟')

        $('#Table_Name_2').text(Course_2_Data[0][1])
        $('#Table_Website_2').text(JSON.parse(Course_2_Data[0][4])['Website'])
        $('#Table_Audience_2').text(JSON.parse(Course_2_Data[0][4])['Audience'])
        $('#Table_Mentor_2').text(JSON.parse(Course_2_Data[0][4])['Mentor'])
        $('#Table_Course_Name_2').text(JSON.parse(Course_2_Data[0][4])['Course_Name'])
        $('#Table_Course_Price_2').text(JSON.parse(Course_2_Data[0][4])['Course_Price'])
        $('#Table_Support_System_2').text(JSON.parse(Course_2_Data[0][4])['Support_System'])
        $('#Table_Community_for_students_2').text(JSON.parse(Course_2_Data[0][4])['Community_for_students'])
        $('#Table_Tools_for_students_2').text(JSON.parse(Course_2_Data[0][4])['Tools_for_students'])
        $('#Table_Revision_Session_2').text(JSON.parse(Course_2_Data[0][4])['Revision_Session'])
        $('#Table_Live_Market_Session_2').text(JSON.parse(Course_2_Data[0][4])['Live_Market_Session'])
        $('#Table_Students_Review_2').text(JSON.parse(Course_2_Data[0][4])['Rating'] + '🌟')

        $('#Course_Comparision').show();
    })
})