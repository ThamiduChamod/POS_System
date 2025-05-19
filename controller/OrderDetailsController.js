import {Customer_db, Item_db, Order_details_db} from "../db/db.js";
import OrderDetailsModel from "../model/OrderDetailsModel.js";
import ItemModel from "../model/ItemModel.js";
import CustomerModel from "../model/CustomerModel.js";

function error_alert() {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Add QTY!",
        // footer: '<a href="#">Why do I have this issue?</a>'
    });
}


$('#order-btn').on('click', function (){
    getAllCustomerId();
    getAllItemId();
    loadCustomerData($('#customerIds').val());
    loadItemData($('#itemIds').val());
});

function getAllCustomerId() {
    let select = $("#customerIds").empty(); // jQuery object
    Customer_db.forEach(function (customer) {
       let option = `
            <option value="${customer.id}">${customer.id}</option>
       `
        console.log(customer.id);
        select.append(option);
    });
}

function getAllItemId() {
    let select = $("#itemIds").empty(); // jQuery object
    Item_db.forEach(function (item) {
        let option = `
            <option value="${item.id}">${item.id}</option>
       `
        console.log(item.id);
        select.append(option);
    });
}

$('#customerIds').on('change', function () {
    const val = $('#customerIds').val();
    loadCustomerData(val);
});

function loadCustomerData(id) {

    Customer_db.forEach(function (customer) {
       if (customer.id === id){
           $('#customerName').val(customer.name);
           $('#customerAddress').val(customer.address);
           $('#customerPhone').val(customer.phone);

       }
    });
}

$('#itemIds').on('change', function () {
    const val = $('#itemIds').val();
    loadItemData(val);
});

function loadItemData(id) {

    Item_db.forEach(function (item) {
        if (item.id === id){
            $('#itemName').val(item.name);
            $('#itemQTY').val(item.QTY);
            $('#itemUnitPrice').val(item.unit_price);

        }
    });
}

$('#addToCart-btn').on('click' , function () {
    let qty = $('#QTY').val();

    if (qty === ''){
        error_alert();
    }else {
        let price = $('#itemUnitPrice').val();
        let total = qty*price;


        let cart_data =
            `<tr>
                <td>${$('#itemIds').val()}</td>
                <td>${$('#itemName').val()}</td>
                <td>${price}</td>
                <td>${qty}</td>
                <td>${total}</td>
                <td>
                    <button type="button" class="btn btn-danger cart-remove-btn">Remove</button>
                </td>
            </tr>`
        $('#cart-table-tbody').append(cart_data);

        let total_label = parseFloat($('#total-price-label').text());

        if (isNaN(total_label)) {
            $('#total-price-label').text(total); // First value
        } else {
            let update = total_label +total;
            $('#total-price-label').text(update);
        }



    }
});

    $(document).on('click', '.cart-remove-btn', function () {
        let total = $(this).closest('tr').find('td:eq(4)').text();
        let label_value =parseFloat($('#total-price-label').text());
        let update =  label_value - total ;
        $('#total-price-label').text(update);
        console.log(total);
        $(this).closest('tr').remove();


    });

    $('#cart-clear-btn').on('click', function () {
        console.log("aaa")
        clear();
    });

    function clear() {
        $('#QTY').val('');
        $('#cash').val('');
        $('#balance').text(0.00);
    }








