import {Customer_db, Item_db, Order_details_db} from "../db/db.js";
import OrderDetailsModel from "../model/OrderDetailsModel.js";
import ItemModel from "../model/ItemModel.js";
import CustomerModel from "../model/CustomerModel.js";

let i=0;
function nextId() {
    i+=1
    let nextId = "O00"+i;
    $('#order-id-label').text(nextId);

}
window.addEventListener("load", function (){
    $('#cart-update-btn').prop('disabled',true);
    $('#place-order-btn').prop('disabled',true);
    nextId();
});

function done_alert() {
    Swal.fire({
        title: "Placed Order!",
        icon: "success",
        draggable: true
    });
}

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
    addToCart();
});
    function addToCart() {
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
                    <td class="qty">${qty}</td>
                    <td class="total">${total}</td>
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

            $('#QTY').val('');
        }
    }

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
        $('#balance').text('');
        $('.invoice-from :input').prop('disabled', false);
        $('#addToCart-btn').prop('disabled',false );
        $('#place-order-btn').prop('disabled',false );
        $('#cart-update-btn').prop('disabled',true);
        $('#place-order-btn').prop('disabled',true);

    }

    let select_row;
    let unit_price;
    let old_total;
    let table_click = false;
    $('#cart-table-tbody').on('click','tr', function () {
        $('.invoice-from :input').prop('disabled', true);
        $('#addToCart-btn').prop('disabled',true );
        $('#place-order-btn').prop('disabled',true );
        $('#cart-update-btn').prop('disabled',false);
        table_click =true;
        $('#cash').val('');


        let qty = $(this).closest('tr').find('td:eq(3)').text();
        unit_price = $(this).closest('tr').find('td:eq(2)').text();
        old_total = $(this).closest('tr').find('td:eq(4)').text();
        $('#QTY').val(qty);
        select_row = $(this);
    });

    $('#cart-update-btn').on('click' , function () {
        $('.invoice-from :input').prop('disabled', false);
        $('#addToCart-btn').prop('disabled',false );
        $('#place-order-btn').prop('disabled',false );
        let  new_qty = $('#QTY').val();
        let new_total = new_qty*unit_price;
        select_row.find('.qty').text(new_qty);
        select_row.find('.total').text(new_total);

        let cart_total = parseFloat($('#total-price-label').text());
        $('#total-price-label').text((cart_total-old_total)+new_total);
        $('#QTY').val('');
        $('#cart-update-btn').prop('disabled',true);


    });
    

    // $('#cash').on('input', function () {
    //     let  sub_total = $('#total-price-label').text();
    //     let cash = $('#cash').val();
    //
    //
    //     let balance = parseFloat($('#balance').text());
    //     if (balance => 0){
    //         $('#place-order-btn').prop('disabled',false);
    //         $('#balance').text(cash-sub_total);
    //     }else {
    //         $('#balance').text("Insufficient Credit... Check cash..!").addClass("text-danger").css('font-size', '0.8rem');
    //     }
    //
    // });

    $('#QTY').on('input', function () {
        let total = parseFloat($('#itemQTY').val()) || 0;
        let qty = parseFloat($(this).val()) || 0;

        let label = $('#qty-info-label');

        if (qty >= total+1) {
            label.removeClass('visually-hidden');
            label.css('font-size', '0.8rem');
            label.text("Please enter an amount lower than: " + total);
            $('#cart-update-btn').prop('disabled',true);
            $('#addToCart-btn').prop('disabled',true);
        } else {
            label.addClass('visually-hidden');
            label.text('.');
            $('#addToCart-btn').prop('disabled',false);
            if (table_click) {
                $('#cart-update-btn').prop('disabled',false);
            }
        }
    });


$('#cash').on('input', function () {
    let sub_total = parseFloat($('#total-price-label').text());
    let cash = parseFloat($('#cash').val());

    if (!isNaN(sub_total) && !isNaN(cash)) {
        let balance = cash - sub_total;

        if (balance >= 0) {
            $('#balance')
                .removeClass("text-danger")
                .css('font-size', '')
                .text(balance.toFixed(2)); // Format to 2 decimal places
            $('#place-order-btn').prop('disabled', false);
        } else {
            $('#balance')
                .addClass("text-danger")
                .css('font-size', '0.7rem')
                .text("Insufficient Credit... Check cash..!");
            $('#place-order-btn').prop('disabled', true);
        }
    } else {
        $('#balance').text('');
        $('#place-order-btn').prop('disabled', true);
    }
});

    $('#place-order-btn').on('click', function () {

        $('#cart-table tr').each(function () {
            let firstCell = $(this).find('td').eq(0).text().trim();
            let qty = parseFloat( $(this).find('td').eq(3).text().trim());
            Item_db.forEach(function (item) {
                if (item.id === firstCell){
                    item.QTY -=qty;

                    if (item.QTY === 0){
                        console.log(item.QTY);


                    }

                }
            });
            clear();
            $('#cart-table-tbody').empty();
            getAllItemId();
            loadItemData($('#itemIds').val());
            done_alert();
            infor();

        });
    });

    function infor() {
        Swal.fire({
            title: "This Product Is Out Of Stock Just Now",
            showClass: {
                popup: `
                                  animate__animated
                                  animate__fadeInUp
                                  animate__faster
                                `
            },
            hideClass: {
                popup: `
                                  animate__animated
                                  animate__fadeOutDown
                                  animate__faster
                                `
            }
        });

    }










