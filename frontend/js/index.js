fetch_blog_list = () => {
    // Latest Blog Section 
    if (All_Blog.length != 0) {
        $('#Latest_Blog_Image').attr('src', Latest_Blog_Image)
        $('#Latest_Blog_category').text(All_Blog[All_Blog.length - 1][2])
        $('#Latest_Blog_Title').text(All_Blog[All_Blog.length - 1][1])
        $('#Latest_Blog_Date').text(moment.unix(All_Blog[All_Blog.length - 1][0]).format("MMMM DD, YYYY"))

        $('#Latest_Blog_Image_1').attr('src', Latest_Blog_Image)
        $('#Latest_Blog_category_1').text(All_Blog[All_Blog.length - 1][2])
        $('#Latest_Blog_Title_1').text(All_Blog[All_Blog.length - 1][1])
        $('#Latest_Blog_Date_1').text(moment.unix(All_Blog[All_Blog.length - 1][0]).format("MMMM DD, YYYY"))

        comapre_category = All_Blog[All_Blog.length - 1][2]
        list_of_next_three_catgory_blog = []
        for (var i = (All_Blog.length - 2); i >= 0; i--) {
            if (All_Blog[i][2] != comapre_category && list_of_next_three_catgory_blog.length < 3) {
                list_of_next_three_catgory_blog.push(All_Blog[i])
                comapre_category = All_Blog[i][2]
            }
        }
    }

    if (list_of_next_three_catgory_blog.length != 0 && list_of_next_three_catgory_blog.length < 2) {
        $('#Second_Blog_Image').attr('src', list_of_next_three_catgory_blog[0][3])
        $('#Second_Blog_Category').text(list_of_next_three_catgory_blog[0][2])
        $('#Second_Blog_Title').text(list_of_next_three_catgory_blog[0][1])
        $('#Second_Blog_Date').text(moment.unix(list_of_next_three_catgory_blog[0][0]).format("MMMM DD, YYYY"))

        $('#Second_Blog_Image_1').attr('src', list_of_next_three_catgory_blog[0][3])
        $('#Second_Blog_Category_1').text(list_of_next_three_catgory_blog[0][2])
        $('#Second_Blog_Title_1').text(list_of_next_three_catgory_blog[0][1])
        $('#Second_Blog_Date_1').text(moment.unix(list_of_next_three_catgory_blog[0][0]).format("MMMM DD, YYYY"))
    }
    else if (list_of_next_three_catgory_blog.length != 0 && list_of_next_three_catgory_blog.length < 3) {
        $('#Second_Blog_Image').attr('src', list_of_next_three_catgory_blog[0][3])
        $('#Second_Blog_Category').text(list_of_next_three_catgory_blog[0][2])
        $('#Second_Blog_Title').text(list_of_next_three_catgory_blog[0][1])
        $('#Second_Blog_Date').text(moment.unix(list_of_next_three_catgory_blog[0][0]).format("MMMM DD, YYYY"))

        $('#Second_Blog_Image_1').attr('src', list_of_next_three_catgory_blog[0][3])
        $('#Second_Blog_Category_1').text(list_of_next_three_catgory_blog[0][2])
        $('#Second_Blog_Title_1').text(list_of_next_three_catgory_blog[0][1])
        $('#Second_Blog_Date_1').text(moment.unix(list_of_next_three_catgory_blog[0][0]).format("MMMM DD, YYYY"))

        $('#Third_Blog_Image').attr('src', list_of_next_three_catgory_blog[1][3])
        $('#Third_Blog_Category').text(list_of_next_three_catgory_blog[1][2])
        $('#Third_Blog_Title').text(list_of_next_three_catgory_blog[1][1])
        $('#Third_Blog_Date').text(moment.unix(list_of_next_three_catgory_blog[1][0]).format("MMMM DD, YYYY"))

        $('#Third_Blog_Image_1').attr('src', list_of_next_three_catgory_blog[1][3])
        $('#Third_Blog_Category_1').text(list_of_next_three_catgory_blog[1][2])
        $('#Third_Blog_Title_1').text(list_of_next_three_catgory_blog[1][1])
        $('#Third_Blog_Date_1').text(moment.unix(list_of_next_three_catgory_blog[1][0]).format("MMMM DD, YYYY"))
    }
    else if (list_of_next_three_catgory_blog.length != 0 && list_of_next_three_catgory_blog.length < 4) {
        $('#Second_Blog_Image').attr('src', list_of_next_three_catgory_blog[0][3])
        $('#Second_Blog_Category').text(list_of_next_three_catgory_blog[0][2])
        $('#Second_Blog_Title').text(list_of_next_three_catgory_blog[0][1])
        $('#Second_Blog_Date').text(moment.unix(list_of_next_three_catgory_blog[0][0]).format("MMMM DD, YYYY"))

        $('#Second_Blog_Image_1').attr('src', list_of_next_three_catgory_blog[0][3])
        $('#Second_Blog_Category_1').text(list_of_next_three_catgory_blog[0][2])
        $('#Second_Blog_Title_1').text(list_of_next_three_catgory_blog[0][1])
        $('#Second_Blog_Date_1').text(moment.unix(list_of_next_three_catgory_blog[0][0]).format("MMMM DD, YYYY"))

        $('#Third_Blog_Image').attr('src', list_of_next_three_catgory_blog[1][3])
        $('#Third_Blog_Category').text(list_of_next_three_catgory_blog[1][2])
        $('#Third_Blog_Title').text(list_of_next_three_catgory_blog[1][1])
        $('#Third_Blog_Date').text(moment.unix(list_of_next_three_catgory_blog[1][0]).format("MMMM DD, YYYY"))

        $('#Third_Blog_Image_1').attr('src', list_of_next_three_catgory_blog[1][3])
        $('#Third_Blog_Category_1').text(list_of_next_three_catgory_blog[1][2])
        $('#Third_Blog_Title_1').text(list_of_next_three_catgory_blog[1][1])
        $('#Third_Blog_Date_1').text(moment.unix(list_of_next_three_catgory_blog[1][0]).format("MMMM DD, YYYY"))

        $('#Fourth_Blog_Image').attr('src', list_of_next_three_catgory_blog[2][3])
        $('#Fourth_Blog_Category').text(list_of_next_three_catgory_blog[2][2])
        $('#Fourth_Blog_Title').text(list_of_next_three_catgory_blog[2][1])
        $('#Fourth_Blog_Date').text(moment.unix(list_of_next_three_catgory_blog[2][0]).format("MMMM DD, YYYY"))

        $('#Fourth_Blog_Image_1').attr('src', list_of_next_three_catgory_blog[2][3])
        $('#Fourth_Blog_Category_1').text(list_of_next_three_catgory_blog[2][2])
        $('#Fourth_Blog_Title_1').text(list_of_next_three_catgory_blog[2][1])
        $('#Fourth_Blog_Date_1').text(moment.unix(list_of_next_three_catgory_blog[2][0]).format("MMMM DD, YYYY"))
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

    $.post(root + main_route + '/fetch_blog_list', { catg: 'all' }, function (data, status) {
        console.log("Status: " + status);
        All_Blog = data
        console.log(All_Blog)
        Latest_Blog_Image = All_Blog[All_Blog.length - 1][3]
    }).done(function () {
        fetch_blog_list()
    })
    

    $('.category').on('click', function () {
        clicked_category = $(this).text()
        sessionStorage.setItem("clicked_category", clicked_category);
    });

    if (All_Blog.length != 0) {
        $('.Latest_Blog').on('click', function () {
            Blog_ID = All_Blog[All_Blog.length - 1][0]
            sessionStorage.setItem("Blog_ID", Blog_ID);
        });
    }

    if(list_of_next_three_catgory_blog.length != 0 && list_of_next_three_catgory_blog.length < 2) {
        $('.Second_Blog').on('click', function () {
            Blog_ID = list_of_next_three_catgory_blog[0][0]
            sessionStorage.setItem("Blog_ID", Blog_ID);
        });
    }
    else if(list_of_next_three_catgory_blog.length != 0 && list_of_next_three_catgory_blog.length < 3) {
        $('.Second_Blog').on('click', function () {
            Blog_ID = list_of_next_three_catgory_blog[0][0]
            sessionStorage.setItem("Blog_ID", Blog_ID);
        });
        
        $('.Third_Blog').on('click', function () {
            Blog_ID = list_of_next_three_catgory_blog[1][0]
            sessionStorage.setItem("Blog_ID", Blog_ID);
        });
    }
    else if(list_of_next_three_catgory_blog.length != 0 && list_of_next_three_catgory_blog.length < 4) {
        $('.Second_Blog').on('click', function () {
            Blog_ID = list_of_next_three_catgory_blog[0][0]
            sessionStorage.setItem("Blog_ID", Blog_ID);
        });
        
        $('.Third_Blog').on('click', function () {
            Blog_ID = list_of_next_three_catgory_blog[1][0]
            sessionStorage.setItem("Blog_ID", Blog_ID);
        });
        
        $('.Fourth_Blog').on('click', function () {
            Blog_ID = list_of_next_three_catgory_blog[2][0]
            sessionStorage.setItem("Blog_ID", Blog_ID);
        });
    }

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
})