let screenSize;
let hourlyRate = 0;
let currentAplicationType;
let hoursQuantity;
let totalSum = 0;

let totalObject = {
    userInterface: 0,
    apis: 0,
    authentification: 0,
    functionality: 0,
    datesAndLocation: 0,
    socialAndEngagements: 0,
    billing: 0,
    multimedia: 0,
    administrationAndAnalytics: 0,
    security: 0
};

$(document).ready(function() {

    let prices;

    $.getJSON('js/prices.json', function(data) {
        prices = data;
    });

    $('.hourly-price-button').click(function() {

        $('.hourly-price-button:focus').each(function() {
            $(this).addClass('selected').siblings().removeClass('selected');
            currentAplicationType = $(this).val();
            hourlyRate = prices[currentAplicationType].hourlyPrice;
        });
        $('.total').html('$' + hourlyRate);
        $('body, html').animate({ scrollTop: window.pageYOffset + $(window).height()}, 1000);
    });


    $('.screen-size-button').click(function() {

        $('.screen-size-button:focus').each(function() {
            $(this).addClass('selected').siblings().removeClass('selected');
            let btnValue = $(this).val();
            screenSize = btnValue;
        });
        
        $('body, html').animate({ scrollTop: window.pageYOffset + $(window).height()}, 1000);
        
    });

    $('.hours-quantity-button').click(function() {

        $('.hours-quantity-button:focus').each(function() {
            $(this).addClass('selected').siblings().removeClass('selected');
            let btnValue = $(this).val();
            let parentId = $(this).parent().attr('id');
            hoursQuantity = prices[currentAplicationType][screenSize][parentId][btnValue];
            totalObject[parentId] = hoursQuantity;
            countTotalPrice();
        });
        
        $('body, html').animate({ scrollTop: window.pageYOffset + $(window).height()}, 1000);
    });

    function countTotalPrice() {
        totalSum = 0;
        for (let key in totalObject) {
            totalSum += totalObject[key] * hourlyRate;
        }
        $('.total').html('$' + totalSum);
    };
});
