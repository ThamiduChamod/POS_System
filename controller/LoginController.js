import {Customer_db, Log_in_db} from "../db/db.js";
import LogInModel from "../model/LogInModel.js";





    $('#register-btn').on('click', function (){
        $('#account-page').css("display","block");
        $('#login-page').css("display","none");
        $('#header').css("display","none");
        $('#customer-page').css("display","none");
        $('#item-page').css("display","none");
        $('#order-page').css("display","none");
    });

    function error_alert() {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            // footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
    function done_alert() {
        Swal.fire({
            title: "Create new account!",
            icon: "success",
            draggable: true
        });
    }

    $('#create-account-btn').on('click' , function () {
        let name = $('#account-name-text').val();
        let email = $('#account-email-text').val();
        let phone = $('#account-phone-text').val();
        let password = $('#account-password-text').val();
        let confirm = $('#account-confirm-password-text').val();

        if (name === ''|| email === ''|| phone === ''|| password === '' || confirm === ''){
            error_alert()

             // console.log("empty");
        }else {
            if (password === confirm){
                let login_data = new LogInModel (name, email, phone, password);
                Log_in_db.push(login_data);
                done_alert();
                clear();
                login();
            }else {

            }
        }
    });

    $('#account-confirm-password-text').on('input' , function () {
        console.log("dddddd")
        let password = $('#account-password-text').val();
        let confirm = $('#account-confirm-password-text').val();
        if (password === confirm){
            $('#account-confirm-password-text').css({
                "border-bottom": "none"
            }).css({
                "border-bottom": "2px solid green"
            });
        }else {
            $('#account-confirm-password-text').css({
                "border-bottom": "none"
            }).css({
                "border-bottom": "2px solid red"
            });

        }
    });

    $('#login-page-btn').on('click' , function () {
        login_page();
    });


    function clear() {
        $('#account-name-text').val('');
        $('#account-email-text').val('');
        $('#account-phone-text').val('');
        $('#account-password-text').val('');
        $('#account-confirm-password-text').val('');

    }

    function login() {
        $('#login-page').css("display","none");
        $('#account-page').css("display","none");
        $('#header').css("display","block");
        $('#customer-page').css("display","block");
        $('#item-page').css("display","none");
        $('#order-page').css("display","none");
    }

    function login_page() {
        $('#login-page').css("display","block");
        $('#account-page').css("display","none");
        $('#header').css("display","none");
        $('#customer-page').css("display","none");
        $('#item-page').css("display","none");
        $('#order-page').css("display","none");
    }

    $('#login-btn').on('click', function () {
        let email = $('#login-email-text').val();
        let password = $('#login-password-text').val();
        console.log("11111")


        Log_in_db.forEach( function (account){
           if (account.email === email){
               if (account.password === password){
                    login();
               }
           }
        });
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Incorrect email or password!",
            // footer: '<button class="register-btn">Create Account?</button>'
        });
    });

$('#login-email-text').on('input', function () {
    let email = $('#login-email-text').val();
    let found = false;

    Log_in_db.forEach(function(account) {
        if (account.email === email) {
            found = true;
        }
    });

    if (found) {
        $('#login-email-text').attr('style', 'color: green !important');
    } else {
        $('#login-email-text').attr('style', 'color: red !important');
    }
});






