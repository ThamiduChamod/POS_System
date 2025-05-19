
    $('#login-btn').on('click', function () {
        $('#login-page').css("display","none");
        $('#header').css("display","block");
        $('#customer-page').css("display","block");
        $('#item-page').css("display","none");
        $('#order-page').css("display","none");
    });

    $('#register-btn').on('click', function (){
        $('#account-page').css("display","block");
        $('#login-page').css("display","none");
        $('#header').css("display","none");
        $('#customer-page').css("display","none");
        $('#item-page').css("display","none");
        $('#order-page').css("display","none");
    })
