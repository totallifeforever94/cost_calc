$(document).ready(function() {
    
    $("#submit").click(function(event) {
        
        if ($("#contactForm")[0].checkValidity()) {
            event.preventDefault();
            $.ajax({
                url: "https://tranquil-sierra-86540.herokuapp.com/sava.taras@gmail.com",
                method: "POST",
                data: {
                    "name": $("#name").val(),
                    "email": $("#email").val(),
                },
                dataType: "json",
            })

            .done(() => {
                $('#name').val('');
                $('#email').val('');
            });
        }
    });
});
