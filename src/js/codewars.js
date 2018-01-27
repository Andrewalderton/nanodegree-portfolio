// Codewars user API request
(function($) {
    var ajaxError;
    $.apiTimeout = setTimeout(function() {
        this.ajaxError = true;
    }, 5000);

    // Reset error status
    this.ajaxError = false;

    var CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    var accessToken = 'hrSTg8_yD6ssxuB36sG3';

    var codewarsAPI = CORS_PROXY + 'https://www.codewars.com/api/v1/users/andy6';

    $.ajax(codewarsAPI, {
        type: "GET",
        crossDomain: true,
        Authorization: accessToken,
        async: true
    }).done(function(data) {
        if (data != '0') {
            clearTimeout($.apiTimeout);
            var challengesCompleted = data.codeChallenges.totalCompleted;
            var rank = data.ranks.overall.name;
            // Set html content
            $('.codewars').html('<a href="https://www.codewars.com/users/andy6"><img src="img/codewars-logo.png" class="cw-logo certificate" alt="codewars logo"></a><h2>So far, I have completed <b>' + challengesCompleted + '</b> challenges on Codewars!</h2><p class="featured-text">My current rank is: ' + rank + '!</p><img src="https://www.codewars.com/users/andy6/badges/micro" class="cw-badge certificate" alt="badge">');
        } else {
            $('.codewars').html('<p>Codewars data not currently available</p>');
            clearTimeout($.apiTimeout);
            this.ajaxError = true;
        }
    }).fail(function() {
        this.ajaxError = true;
        $('.codewars').html('<p class="info-error">Codewars data not currently available</p>');
    });
})(jQuery);