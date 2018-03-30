$(document).ready(function() {
    
    $("#submit").click(function(event) {
        event.preventDefault();
        
        if ($("#contactForm")[0].checkValidity()) {
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
                alert('DONE!!!!!!!!!');
                $('#name').val('');
                $('#email').val('');
            });
        }
    });
});
