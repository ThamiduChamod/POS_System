import {Customer_db, Item_db, Order_details_db} from "../db/db.js";
import OrderDetailsModel from "../model/OrderDetailsModel.js";
import ItemModel from "../model/ItemModel.js";
import CustomerModel from "../model/CustomerModel.js";


$('#order-btn').on('click', function (){
    getAllCustomer();
    getAllItem()
    console.log("vvv")
});

function getAllCustomer() {
    let select = $("#customerIds"); // jQuery object
    Customer_db.forEach(function (customer) {
       let option = `
            <option>${customer.id}</option>
       `
        console.log(customer.id);
        select.append(option);
    });
}

function getAllItem() {
    let select = $("#itemIds"); // jQuery object
    Item_db.forEach(function (item) {
        let option = `
            <option>${item.id}</option>
       `
        console.log(item.id);
        select.append(option);
    });
}



