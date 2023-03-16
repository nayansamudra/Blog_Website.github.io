fetch_blog_list = () => {
    // Latest Blog Section 
    $('#Latest_Blog_Image').attr('src', Latest_Blog_Image)
    $('#Latest_Blog_category').text(All_Blog[All_Blog.length - 1][2])
    $('#Latest_Blog_Title').text(All_Blog[All_Blog.length - 1][1])
    $('#Latest_Blog_Date').text(moment.unix(All_Blog[All_Blog.length - 1][0]).format("MMMM DD, YYYY"))
    comapre_category = All_Blog[All_Blog.length - 1][2]
    list_of_next_three_catgory_blog = []
    for (var i = (All_Blog.length - 2); i > 0; i--) {
        if (All_Blog[i][2] != comapre_category && list_of_next_three_catgory_blog.length < 3) {
            list_of_next_three_catgory_blog.push(All_Blog[i])
            comapre_category = All_Blog[i][2]
        }
    }

    $('#Second_Blog_Image').attr('src', list_of_next_three_catgory_blog[0][3])
    $('#Second_Blog_Category').text(list_of_next_three_catgory_blog[0][2])
    $('#Second_Blog_Title').text(list_of_next_three_catgory_blog[0][1])
    $('#Second_Blog_Date').text(moment.unix(list_of_next_three_catgory_blog[0][0]).format("MMMM DD, YYYY"))

    $('#Third_Blog_Image').attr('src', list_of_next_three_catgory_blog[1][3])
    $('#Third_Blog_Category').text(list_of_next_three_catgory_blog[1][2])
    $('#Third_Blog_Title').text(list_of_next_three_catgory_blog[1][1])
    $('#Third_Blog_Date').text(moment.unix(list_of_next_three_catgory_blog[1][0]).format("MMMM DD, YYYY"))

    $('#Fourth_Blog_Image').attr('src', list_of_next_three_catgory_blog[2][3])
    $('#Fourth_Blog_Category').text(list_of_next_three_catgory_blog[2][2])
    $('#Fourth_Blog_Title').text(list_of_next_three_catgory_blog[2][1])
    $('#Fourth_Blog_Date').text(moment.unix(list_of_next_three_catgory_blog[2][0]).format("MMMM DD, YYYY"))
}

$(document).ready(function () {

    $.ajaxSetup({ async: false }); // to stop async

    counter_for_click = 0
    counter_for_theme = 0

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
        Latest_Blog_Image = All_Blog[All_Blog.length - 1][3]
    }).done(function () {
        fetch_blog_list()
    })

    // $.post(root + main_route + '/fetch_blog', { blog_id: All_Blog[All_Blog.length - 1][0] }, function (data, status) {
    //     console.log("Status: " + status);
    //     Latest_Blog = data
    //     console.log(Latest_Blog)
    // }).done(function () {
    //     $('#Latest_Blog_Author').text(JSON.parse(Latest_Blog[0][5])['Author_Name'])
    // })
    
    $('.category').on('click', function () {
        clicked_category = $(this).text()
        sessionStorage.setItem("clicked_category", clicked_category);
    });
})