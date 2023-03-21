
fetch_course = () => {
    $('#Blog_title').text(Course_data[0][1])
    $('#Blog_Date').text(moment.unix(Course_data[0][0]).format("MMMM DD, YYYY"))
    $('#Blog_img').attr('src', Course_data[0][2])
    $('#visit_site').attr('href', JSON.parse(Course_data[0][4])['Website'])
    $('#Table_Name').text(Course_data[0][1])
    $('#Table_Audience').text(JSON.parse(Course_data[0][4])['Audience'])
    $('#Table_Mentor').text(JSON.parse(Course_data[0][4])['Mentor'])
    $('#Table_Course_Name').text(JSON.parse(Course_data[0][4])['Course_Name'])
    $('#Table_Course_Price').text(JSON.parse(Course_data[0][4])['Course_Price'])
    $('#Table_Support_System').text(JSON.parse(Course_data[0][4])['Support_System'])
    $('#Table_Community_for_students').text(JSON.parse(Course_data[0][4])['Community_for_students'])
    $('#Table_Tools_for_students').text(JSON.parse(Course_data[0][4])['Tools_for_students'])
    $('#Table_Revision_Session').text(JSON.parse(Course_data[0][4])['Revision_Session'])
    $('#Table_Live_Market_Session').text(JSON.parse(Course_data[0][4])['Live_Market_Session'])
    $('#user_rating').text(JSON.parse(Course_data[0][4])['Rating'])
    var numToActivate = parseFloat(JSON.parse(Course_data[0][4])['Rating']);
    var spans = $('.fa-star');
    for (var i = 0; i < numToActivate; i++) {
        $(spans[i]).addClass('checked');
    }

    for (var i = 0; i < All_Course.length; i++) {
        $('.top-categories-grid-style-1').append(`<div class="cat-item All_courses" id="${All_Course[i][0]}">
        <div class="rt-cart-item">
            <div class="item-img">
                <img src="${All_Course[i][2]}" alt="cat-slider" width="696" height="491">
                <div class="item-content">
                    <h4 class="title mb-4">
                        <a href="Main_Course_Page.html" class="category">${All_Course[i][1]}</a>
                    </h4>
                </div>
            </div>
        </div>
    </div>`)
    }

    if (JSON.parse(Course_data[0][4])['Meta_description'] != "") {
        $('meta[name="description"]').attr('content', JSON.parse(Course_data[0][5])['Meta_description']);
    }

    if (JSON.parse(Course_data[0][4])['Meta_keywords'] != "") {
        $('meta[name="keywords"]').attr('content', JSON.parse(Course_data[0][5])['Meta_keywords']);
    }

    if (JSON.parse(Course_data[0][4])['Meta_title'] != "") {
        $('title').text(JSON.parse(Course_data[0][5])['Meta_title']);
    }

    if (JSON.parse(Course_data[0][4])['Meta_robots'] != "") {
        $('meta[name="robots"]').attr('content', JSON.parse(Course_data[0][5])['Meta_robots']);
    }
}

main_course_function = () => {
    $.post(root + main_route + '/fetch_course', { course_id: course_id }, function (data, status) {
        console.log("Status: " + status);
        Course_data = data
        console.log(Course_data)
    }).done(function () {
        sessionStorage.removeItem("Course_ID")
        fetch_course()
    })
}

$(document).ready(function () {

    $.ajaxSetup({ async: false }); // to stop async

    counter_for_click = 0
    counter_for_theme = 0

    if (sessionStorage.getItem("data-theme") == null) {
        $('html').attr('data-theme', 'light')
        sessionStorage.setItem("data-theme",'light')
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
    }).done(function () {
        console.log('DONE')
    })

    if (sessionStorage.getItem("Course_ID") != null) {
        course_id = sessionStorage.getItem("Course_ID")
    }
    else {
        course_id = All_Course[All_Course.length - 1][0]
    }

    main_course_function()

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


    $('.All_courses').click(function() {
        course_id = parseFloat($(this).attr('id'));
        sessionStorage.setItem("Course_ID", course_id)
    })


    $('.form_hover').hover(()=>{
        $(this).attr('class','fa fa-star form_hover checked')
    })

    $('.star').hover(function() {
        $(this).addClass('active');
        $(this).prevAll('.star').addClass('active');
      }, function() {
        $(this).removeClass('active');
        $(this).prevAll('.star').removeClass('active');
      });
      
      $('.star').click(function() {
        $('.star').removeClass('selected');
        $(this).addClass('selected');
        $(this).prevAll('.star').addClass('selected');
        var rating = $(this).data('value');
        console.log('Rating is ' + rating);
      });
})