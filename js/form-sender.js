$(document).ready(function() {
    $('#errorNameMessage').hide();
    $('#errorEmailMessage').hide();
    
    let nameError = false;
    let emailError = false;
    
    $('#name').focusout(function() {
        checkName();
    });
    
    $('#email').focusout(function() {
        checkEmail();  
    });
    
    function checkName() {
        let pattern = /[A-Za-zА-Яа-яЁё\s]+$/;
        let name = $('#name').val();
        if (pattern.test(name) && name !== '') {
            $('#errorNameMessage').hide();
            $('#name').css({'border': '1px solid #fff'});
        } else {
            $('#errorNameMessage').html('Invalid name');
            $('#errorNameMessage').show();
            $('#name').css({'border': '1px solid #f72c2c'});
            nameError = true;
        }
    }
    
    function checkEmail() {
        let pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        let email = $('#email').val();
        if (pattern.test(email) && email !== '') {
            $('#errorEmailMessage').hide();
            $('#email').css({'border': '1px solid #fff'})
        } else {
            $('#errorEmailMessage').html('Invalid email');
            $('#errorEmailMessage').show();
            $('#email').css({'border': '1px solid #f72c2c'})
            emailError = true;
        }
    }
    
    $("#submit").click(function(event) {
        nameError = false;
        emailError = false;
        
        checkName();
        checkEmail();
        
        if (!nameError && !emailError) {
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
                alert('DONE!!!!');
                $('#name').val('');
                $('#email').val('');
            });
        } else {
            event.preventDefault();
        }
    });
}); 