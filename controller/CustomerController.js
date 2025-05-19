import {Customer_db} from "../db/db.js";
import CustomerModel from "../model/CustomerModel.js";

let i=0;
function nextId() {
    i+=1
    let nextId = "C00"+i;
    $('#customer-id-text').val(nextId);
}
window.addEventListener("load", function (){nextId();});

    $('#customer-btn').on('click' , function () {
       $('#customer-update-btn').prop('disabled',true);
       $('#customer-delete-btn').prop('disabled' , true);
       $('#customer-save-btn').prop("disabled", false);

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

        $('#customer-save-btn').prop("disabled", false);
        $('#customer-update-btn').prop('disabled',true);
        $('#customer-delete-btn').prop('disabled' , true);

    }

    $('#customer-save-btn').on('click' , function () {
        var id = $('#customer-id-text').val();
        var name = $('#customer-name-text').val();
        var address = $('#customer-address-text').val();
        var phone = $('#customer-phone-text').val();

        if (id === ''|| name === ''|| address === ''|| phone === ''){
            error_alert();
            // console.log("empty");
        }else {
            let customer_data = new CustomerModel(id,name,address,phone);
            Customer_db.push(customer_data);
            done_alert();
            clear();
            loadCustomer();
            nextId();
            console.log(Customer_db);
        }
       // console.log(id)
    });

    function loadCustomer() {
        $('#customer-table-tbody').empty();
        Customer_db.map((item, index) =>{
           let id = item.id;
           let name = item.name;
           let address = item.address;
           let phone = item.phone;

           let  data =
               `<tr>
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${address}</td>
                    <td>${phone}</td>
                </tr>`
            $('#customer-table-tbody').append(data);
        });
    }

    $('#customer-clear-btn').on('click',function () {
        clear();

    });

    let select_customer;
    let select_customer_index;
    $('#customer-table-tbody').on('click','tr', function () {
        console.log($(this).index());
        select_customer_index = $(this).index();
        select_customer = Customer_db[$(this).index()];

        $('#customer-id-text').val(select_customer.id);
        $('#customer-name-text').val(select_customer.name);
        $('#customer-address-text').val(select_customer.address);
        $('#customer-phone-text').val(select_customer.phone);

        $('#customer-save-btn').prop("disabled", true);
        $('#customer-update-btn').prop('disabled',false);
        $('#customer-delete-btn').prop('disabled' , false);
    });

    $('#customer-update-btn').on('click' , function () {
        // let customer = Customer_db[select_customer];

        select_customer.id = $('#customer-id-text').val();
        select_customer.name = $('#customer-name-text').val();
        select_customer.address = $('#customer-address-text').val();
        select_customer.phone = $('#customer-phone-text').val();


        loadCustomer();
        clear();
    });

    $('#customer-delete-btn').on('click', function () {
        Customer_db.splice(select_customer_index, 1);

       loadCustomer();
       clear();
    });