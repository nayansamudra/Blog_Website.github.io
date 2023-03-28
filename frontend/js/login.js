
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


//---------- Login_Function 
login_function = () => {
    if (getCookie("td_token") != '') {
        Login_Dict = jwt_decode(getCookie("td_token"))
        if (Login_Dict['email'] == null) {
            console.log('please Login')
            $('.sign-in-button').show();
            $('.google-image').hide();
        }
        else {
            console.log('user is already logged in')

            if (localStorage.getItem('Profile_Img') == null) {

            }
            else {
                console.log('u r on else part')
                cred_1 = localStorage.getItem('Profile_Img')
                $('.google-image img').attr('src', cred_1)
            }

            $('.sign-in-button').hide();
            $('.google-image').show();
        }
    }
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
    $('.sign-in-button').show();
    $('.google-image').hide();
    $('.google-image img').attr('src', '');
    $('.dropdown-navigation').css('opacity','0')
}


//---------- Sign In
function onSignIn(response) {

    const responsePayload = jwt_decode(response.credential);

    var email = responsePayload.email
    // console.log(email)
    // console.log(response.credential)
    // console.log(response)
    cred = response.credential
    JWT_cred = jwt_decode(cred)
    Profile_Img = JWT_cred['picture']
    localStorage.setItem('Profile_Img', Profile_Img)

    $.post("https://tradingduniya.com/auth", { g_token: cred }, function (data, status) {
        console.log("Data: " + data + "\nStatus: " + status);
        if (data == "success") {
            console.log("Auth Success")
            login_function()
        }
        else {
            td_logout()
        }
    });
}


// ---------- On Refresh
$(document).ready(function () {

    $.ajaxSetup({ async: false }); // to stop async

    login_function()

    counter_for_opacity = 0

    $('.google-image').click(() => {
        counter_for_opacity += 1
        if(counter_for_opacity%2 == 0){
            $('.dropdown-navigation').css('opacity','0')
            $('.dropdown-navigation').css('visibility','hidden')
            $('.dropdown-navigation').css('transform','translate(0px, -40px)')
        }
        else{
            $('.dropdown-navigation').css('opacity','1')
            $('.dropdown-navigation').css('visibility','visible')
            $('.dropdown-navigation').css('transform','translate(0px, 0px)')
        }
    })

    if ($(window).width() > 1250) {
        $('.google-image img').attr('width', '60px');
    } 
    else if ($(window).width() < 1250) {
        $('.google-image img').attr('width', '40px');
    } 

    if ($(window).width() < 1375) {
        $('.dropdown-navigation').css('right','15px')
    }
    else if ($(window).width() > 1375 && $(window).width() < 1410) {
        $('.dropdown-navigation').css('right','30px')
    }
    else if ($(window).width() > 1410 && $(window).width() < 1450) {
        $('.dropdown-navigation').css('right','50px')
    } 
    else if ($(window).width() > 1450 && $(window).width() < 1500) {
        $('.dropdown-navigation').css('right','75px')
    } 
    else if ($(window).width() > 1500 && $(window).width() < 1550) {
        $('.dropdown-navigation').css('right','100px')
    } 
    else if ($(window).width() > 1550 && $(window).width() < 1600) {
        $('.dropdown-navigation').css('right','125px')
    } 
    else if ($(window).width() > 1600 && $(window).width() < 1650) {
        $('.dropdown-navigation').css('right','150px')
    } 
    else if ($(window).width() > 1650 && $(window).width() < 1700) {
        $('.dropdown-navigation').css('right','175px')
    } 
    else if ($(window).width() > 1700 && $(window).width() < 1750) {
        $('.dropdown-navigation').css('right','200px')
    } 
    else if ($(window).width() > 1750) {
        $('.dropdown-navigation').css('right','300px')
    } 
     
    if ($(window).width() < 570) {
        $('.dropdown-navigation').css('top','120px')
    } 


    $(window).resize(function() {
        if ($(window).width() > 1250) {
            $('.google-image img').attr('width', '60px');
        }
        else if ($(window).width() < 1250) {
            $('.google-image img').attr('width', '40px');
        } 

        if ($(window).width() < 1375) {
            $('.dropdown-navigation').css('right','15px')
        }
        else if ($(window).width() > 1375 && $(window).width() < 1410) {
            $('.dropdown-navigation').css('right','30px')
        }
        else if ($(window).width() > 1410 && $(window).width() < 1450) {
            $('.dropdown-navigation').css('right','50px')
        } 
        else if ($(window).width() > 1450 && $(window).width() < 1500) {
            $('.dropdown-navigation').css('right','75px')
        } 
        else if ($(window).width() > 1500 && $(window).width() < 1550) {
            $('.dropdown-navigation').css('right','100px')
        } 
        else if ($(window).width() > 1550 && $(window).width() < 1600) {
            $('.dropdown-navigation').css('right','125px')
        } 
        else if ($(window).width() > 1600 && $(window).width() < 1650) {
            $('.dropdown-navigation').css('right','150px')
        } 
        else if ($(window).width() > 1650 && $(window).width() < 1700) {
            $('.dropdown-navigation').css('right','175px')
        } 
        else if ($(window).width() > 1700 && $(window).width() < 1750) {
            $('.dropdown-navigation').css('right','200px')
        } 
        else if ($(window).width() > 1750) {
            $('.dropdown-navigation').css('right','300px')
        } 
        
        if ($(window).width() < 570) {
            $('.dropdown-navigation').css('top','120px')
        } 
    })
})