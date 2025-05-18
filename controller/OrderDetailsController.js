import {Customer_db, Item_db, Order_details_db} from "../db/db.js";
import OrderDetailsModel from "../model/OrderDetailsModel.js";
import ItemModel from "../model/ItemModel.js";
import CustomerModel from "../model/CustomerModel.js";


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



