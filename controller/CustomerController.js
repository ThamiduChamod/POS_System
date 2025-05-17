import {Customer_db} from "../db/db.js";
import CustomerModel from "../model/CustomerModel.js";


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
            title: "Customer save!",
            icon: "success",
            draggable: true
        });
    }

    function clear() {
        $('#customer-id-text').val('');
        $('#customer-name-text').val('');
        $('#customer-address-text').val('');
        $('#customer-phone-text').val('');
    }

    $('#customer-save-btn').on('click' , function () {
        var id = $('#customer-id-text').val();
        var name = $('#customer-name-text').val();
        var address = $('#customer-address-text').val();
        var phone = $('#customer-phone-text').val();

        if (id === ''|| name === ''|| address === ''|| phone === ''){
            error_alert();
            console.log("empty");
        }else {
            let customer_data = new CustomerModel(id,name,address,phone);
            Customer_db.push(customer_data);
            done_alert();
            clear();
            console.log(Customer_db);
        }
       console.log(id)
    });