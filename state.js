$(document).ready( function () {
    var initBackButton, goBack;
    
    localStorage.setItem('snapshot', $('body').html());
    
    goBack = function () {
        $('body').html(localStorage.getItem('html'));
        history.replaceState({url:'main.html'}, "Main", "main.html");
        console.log(history.state);
    };
    
    $(window).on("popstate", function(e) {
        if(initBackButton === undefined){
            initBackButton = true;
            history.pushState({url:'main.html'}, "Main", "snapshot.html");
        } else {
            goBack();
        }
    });
    

    $('#return').click(function (e) {
        goBack();
        e.preventDefault();
    });
});