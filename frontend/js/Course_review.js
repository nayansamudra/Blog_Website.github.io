fetch_course_list = () => {
    for (var i = 0; i < All_Course.length; i++) {
        $('#card_slider').append(`<div class="card swiper-slide" id="${All_Course[i][0]}">
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

        $('#course_1').append(`<option value="Course1_option${i}">${All_Course[i][1]}</option>`)
        $('#course_2').append(`<option value="Course2_option${i}">${All_Course[i][1]}</option>`)
    }
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
        Latest_Course_Image = All_Course[All_Course.length - 1][3]
    }).done(function () {
        fetch_course_list()
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
        window.location.href = "Main_Course_Page.html"
    })
})