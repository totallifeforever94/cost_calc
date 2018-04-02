$(document).ready(function() {
    
    $('#errorNameMessage').hide();
    $('#errorEmailMessage').hide();
    
    let nameError = false;
    let emailError = false;
    
    $('#name').keyup(function() {
        checkName();
    });
    
    $('#email').keyup(function() {
        checkEmail();  
    });
    
    function checkName() {
        let pattern = /^[a-zA-Z]+(\s[a-zA-Z]*){0,2}$/;
        let name = $('#name').val();
        if (pattern.test(name) && name !== '') {
            $('#errorNameMessage').hide();
            $('#name').css({'border': '1px solid #fff'});
        } else if (name === ''){
            $('#errorNameMessage').html('This field is required');
            $('#errorNameMessage').show();
            $('#name').css({'border': '1px solid #f72c2c'});
            nameError = true;
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
        } else if (email === '') {
            $('#errorEmailMessage').html('This field is required');
            $('#errorEmailMessage').show();
            $('#email').css({'border': '1px solid #f72c2c'})
            emailError = true;
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
            $('.modal').css({'display': 'block'});
            $('.thanks').css({'display': 'none'});
            
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
                $('.modal').css({'display': 'none'});
                $('.thanks').css({'display': 'block'});
                $('#name').val('');
                $('#email').val('');
                $('#startAgain').click(function() {
                    $('.thanks').css({'display': 'none'});
                });
            });
        } else {
            event.preventDefault();
        }
    });
}); 