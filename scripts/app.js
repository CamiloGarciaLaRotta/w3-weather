function watchForSubmit() {
    $('.js-city-form').on('click', '.js-city-submit', function(event) {
        event.preventDefault()
        transitionHelp()
    })
}

function watchForHelp() {
    $('.js-help-btn').click(function(e) {
        transitionHelp()
    })
}

function transitionHelp() {
    if($('.js-help-text').css('display') == 'none'){
            $('header').fadeOut('slow')
            $('.js-help-text').fadeIn('slow')
            $('.js-help-btn').attr('src', 'images/close.png')
        } else {
            $('.js-help-text').fadeOut("slow")
            $('header').fadeIn("slow")
            $('.js-help-btn').attr('src', 'images/help.png')
    }
}

$(function(){
    $('.js-help-text').hide();
    watchForSubmit()
    watchForHelp()
})
