(function() {

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

        $('.hourly-price-button, .screen-size-button, .hours-quantity-button').click(function() {
            $(this).toggleClass('selected');
        });

        $.getJSON('js/prices.json', function(data) {
            pricesData = data;
        });

        $('.hourly-price-button').click(function() {
            if ($(this).hasClass('selected')) {
                $(this).siblings().removeClass('selected');
                currentAplicationType = $(this).val();
                hourlyRate = pricesData[currentAplicationType].hourlyPrice;
                recountHoursQuantity();
                scrollToSection($(this));
            }
            else {
                $(this).removeClass('selected');
                hourlyRate = 0;
            }
            countTotalPrice();
        });

        $('.screen-size-button').click(function() {

            if ($(this).hasClass('selected')) {
                $(this).siblings().removeClass('selected');

                let btnValue = $(this).val();

                screenSize = btnValue;
                scrollToSection($(this));
                recountHoursQuantity();
            }
            else {
                screenSize = undefined;
                $(this).removeClass('selected');
            }
            countTotalPrice()
        });

        $('.hours-quantity-button').click(function() {
            let btnValue = $(this).val();
            let parentId = $(this).parent().attr('id');



            if ($(this).hasClass('selected')) {
                $(this).siblings().removeClass('selected');

                scrollToSection($(this));
                hoursQuantity = pricesData[currentAplicationType][screenSize][parentId][btnValue];
            }
            else {
                hoursQuantity = 0;
            }
            totalObject[parentId] = hoursQuantity;
            countTotalPrice();
        });

        $('#startAgain').click(function() {
            $('button').removeClass('selected');
            for (let key in totalObject) {
                totalObject[key] = 0;
            }
            $('html, body').animate({
                scrollTop: $("#header").offset().top
            }, 2000);
            hourlyRate = 0;
            countTotalPrice();
        });

        function countTotalPrice() {
            totalSum = 0;

            for (let key in totalObject) {
                totalSum += totalObject[key] * hourlyRate;
            }

            if (totalSum === 0) {
                return $('.total').html('$' + hourlyRate);
            }
            else if (screenSize === undefined) {
                return $('.total').html('$' + hourlyRate);
            }
            else {
                $('.total').html('$' + totalSum);
            }
        }

        function recountHoursQuantity() {

            $('.hours-quantity-button.selected').each(function(item) {
                let btnValue = $('.hours-quantity-button.selected')[item].value;
                let parentId = $('.hours-quantity-button.selected')[item].parentNode.id;

                hoursQuantity = pricesData[currentAplicationType][screenSize][parentId][btnValue];
                totalObject[parentId] = hoursQuantity;
            });
        }


        function scrollToSection(btn) {
            let section;
            if (!$('.hourly-price-button').hasClass('selected')) {
                section = $('#mobileOs');
                $('.hours-quantity-button.selected, .screen-size-button.selected').removeClass('selected');
            }
            else if (!$('.screen-size-button').hasClass('selected')) {
                section = $('#screens');
                $('.hours-quantity-button.selected').removeClass('selected');
            }
            else {
                section = btn.parents('section').next();
            }
            $('html, body').animate({
                scrollTop: section.offset().top
            }, 1000);
        };

    });
})();