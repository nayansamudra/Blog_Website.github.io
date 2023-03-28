fetch_course_list = () => {

    distinctData = All_Course

    displayBlogs = (pageNumber) => {
        const startIndex = (pageNumber - 1) * postsPerPage;
        const endIndex = startIndex + (postsPerPage - 1);

        const blogList = document.getElementById('category_blog');
        blogList.innerHTML = '';

        for (let i = startIndex; i <= endIndex; i++) {
            if (i < distinctData.length) {
                console.log(i)
                $('#category_blog').append(`<div class="col-md-6 wow fadeInUp animated" data-wow-delay="100ms" data-wow-duration="800ms"
                style="visibility: visible; animation-duration: 800ms; animation-delay: 100ms; animation-name: fadeInUp;">
                <div class="rt-post-overlay rt-post-overlay-md layout-6 Course_ID" id="${distinctData[i][0]}">
                    <div class="post-img">
                        <a href="main_course_page.html" class="img-link">
                            <img src="${distinctData[i][2]}" alt="post-xl_37" width="900" height="600">
                        </a>
                    </div>
                    <div class="post-content">
                        <h3 class="post-title">
                            <a href="main_course_page.html">${distinctData[i][1]}</a>
                        </h3>
                        <div class="post-meta">
                            <ul>
                                <li>
                                    <span class="rt-meta">
                                        by <a href="" class="name">Trading Duniya</a>
                                    </span>
                                </li>
                                <li>
                                    <span class="rt-meta">
                                        <i class="far fa-calendar-alt icon"></i>
                                        ${moment.unix(distinctData[i][0]).format("MMMM DD, YYYY")}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>`)
            }
        }
    }

    displayBlogs(1)

    total_number_of_pages = Math.ceil(distinctData.length / postsPerPage)
    if (total_number_of_pages > 1) {
        // $('.pagination').append(`<li class="page-item prev"><a class="page-link" href="javascript:void(0)"><i class="fas fa-angle-double-left"></i></a></li>`)
        for (var i = 0; i < total_number_of_pages; i++) {
            if (i == 0) {
                $('.pagination').append(`<li class="page-item active" aria-current="page"><span class="page-link">${i + 1}</span></li>`)
            }
            else {
                $('.pagination').append(`<li class="page-item"><a class="page-link" href="#">${i + 1}</a></li>`)
            }
        }
        // $('.pagination').append(`<li class="page-item next"><a class="page-link" href="#"><i class="fas fa-angle-double-right"></i></a></li>`)
    }
}

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

    postsPerPage = 10

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
        if(All_Course.length != 0) {
            fetch_course_list()
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

    $('.Course_ID').on('click', function () {
        Course_ID = parseFloat($(this).attr('id'))
        sessionStorage.setItem("Course_ID", Course_ID);
    });

    $('.page-item').on('click', function () {
        $('.page-item').removeClass('active')
        $(this).addClass('active')
        current_page = $(this).text()
        displayBlogs(current_page)
    });
})