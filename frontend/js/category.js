fetch_blog_list = () => {
    distinctValues = {};
    for (var i = 0; i < All_Blog.length; i++) {
        if (All_Blog[i][2] in distinctValues) {
            distinctValues[All_Blog[i][2]]++;
        } else {
            distinctValues[All_Blog[i][2]] = 1;
        }
    }
    distinctValues_1 = {};
    for (var i = 0; i < All_Blog.length; i++) {
        if (All_Blog[i][2] in distinctValues_1) {
            continue;
        } else {
            distinctValues_1[All_Blog[i][2]] = All_Blog[i];
        }
    }

    for (var i = 0; i < Object.keys(distinctValues).length; i++) {
        $('.top-categories-grid-style-1').append(`<div class="cat-item">
        <div class="rt-cart-item">
            <div class="item-img">
                <img src="${Object.values(distinctValues_1)[i][3]}" alt="cat-slider" width="696" height="491">
                <div class="item-content">
                    <h4 class="title">
                        <a href="Category.html">${Object.keys(distinctValues_1)[i]}</a>
                    </h4>
                    <p class="count">
                        <span class="anim-overflow"> (${Object.values(distinctValues)[i]}) </span>
                    </p>
                </div>
            </div>
        </div>
    </div>`)
    }

    function getDistinctData(arr, distinctValue) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][2] === distinctValue) {
                result.push(arr[i]);
            }
        }
        return result;
    }
    if (sessionStorage.getItem("clicked_category") != null) {
        distinctValue = sessionStorage.getItem("clicked_category");
        distinctData = getDistinctData(All_Blog, distinctValue);
        console.log(distinctData);
        sessionStorage.removeItem("clicked_category");
    }
    else {
        distinctData = Object.values(distinctValues_1)
    }

    for (var i = 0; i < distinctData.length; i++) {
        $('#category_blog').append(`<div class="col-md-6 wow fadeInUp animated" data-wow-delay="100ms"
        data-wow-duration="800ms"
        style="visibility: visible; animation-duration: 800ms; animation-delay: 100ms; animation-name: fadeInUp;">
        <div class="rt-post-overlay rt-post-overlay-md layout-6">
            <div class="post-img">
                <a href="Main_Blog_Page.html" class="img-link">
                    <img src="${distinctData[i][3]}" alt="post-xl_37" width="900" height="600">
                </a>
            </div>
            <div class="post-content">
                <a href="Category.html" class="life-style">${distinctData[i][2]}</a>
                <h3 class="post-title">
                    <a href="Main_Blog_Page.html">${distinctData[i][1]}</a>
                </h3>
                <div class="post-meta">
                    <ul>
                        <li>
                            <span class="rt-meta">
                                by <a href="" class="name">TCI</a>
                            </span>
                        </li>
                        <li>
                            <span class="rt-meta">
                                <i class="far fa-calendar-alt icon"></i>
                                ${moment.unix(distinctData[i][0]).format("MMMM DD, YYYY")}
                            </span>
                        </li>
                        <li>
                            <span class="rt-meta">
                                <i class="far fa-comments icon"></i>
                                <a href="#"> 3,250</a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`)
    }

}

$(document).ready(function () {

    $.ajaxSetup({ async: false }); // to stop async

    counter_for_click = 0
    counter_for_theme = 0
    counter_for_each_category = 0
    Final_All_Category = []

    root = "https://tradingduniya.com";
    main_route = "/blogs";

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

    $("#themeSwitchCheckbox").click(function () {
        counter_for_theme += 1
        if (counter_for_theme % 2 == 0) {
            $('html').attr('data-theme', 'light')
        } else {
            $('html').attr('data-theme', 'dark')
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

    $.post(root + main_route + '/fetch_blog_list', { catg: 'all' }, function (data, status) {
        console.log("Status: " + status);
        All_Blog = data
        console.log(All_Blog)
    }).done(function () {
        fetch_blog_list()
    })



})