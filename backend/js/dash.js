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



//---------- On Ready - Refresh
$(document).ready(function () {
    $.ajaxSetup({ async: false }); // to stop async
 
    $('.wrapper_2 h5').click(() => {
        td_logout()
    })
});
