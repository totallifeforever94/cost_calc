let screenSize;
let hourlyRate = 0;
let currentAplicationType;
let hoursQuantity;
let totalSum = 0;

let pricesData;

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
    $.getJSON('js/prices.json', function(data) {
        pricesData = data;
    });

    $('.hourly-price-button').click(function() {

        $('.hourly-price-button:focus').each(function() {
            $(this).addClass('selected').siblings().removeClass('selected');
            currentAplicationType = $(this).val();
            hourlyRate = pricesData[currentAplicationType].hourlyPrice;
            countTotalPrice();
            scrollToNextSection($(this));
        });
    });

    $('.screen-size-button').click(function() {
        $('.screen-size-button:focus').each(function() {
            $(this).addClass('selected').siblings().removeClass('selected');
            
            let btnValue = $(this).val();
            
            screenSize = btnValue;
            
            countTotalPrice();
            scrollToNextSection($(this));
        });
    });

    $('.hours-quantity-button').click(function() {
        $('.hours-quantity-button:focus').each(function() {
            $(this).addClass('selected').siblings().removeClass('selected');
            
            let btnValue = $(this).val();
            let parentId = $(this).parent().attr('id');
            
            hoursQuantity = pricesData[currentAplicationType][screenSize][parentId][btnValue];
            totalObject[parentId] = hoursQuantity;
            
            countTotalPrice();
            scrollToNextSection($(this));
        });
    });

    function countTotalPrice() {
        totalSum = 0;
        
        for (let key in totalObject) {
            totalSum += totalObject[key] * hourlyRate;
        }
        
        if (totalSum === 0) {
            return $('.total').html('$' + hourlyRate);
        } else {
            $('.total').html('$' + totalSum);
        }
    };

    function scrollToNextSection(btn) {
        $('html, body').animate({
            scrollTop: btn.parents('section').next().offset().top
        }, 1000);
    };
});
