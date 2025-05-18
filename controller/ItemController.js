import ItemModel from "../model/ItemModel.js";
import {Item_db} from "../db/db.js";



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
        title: "Item save!",
        icon: "success",
        draggable: true
    });
}

function clear() {
    $('#item-code-text').val('');
    $('#item-name-text').val('');
    $('#item-qty-text').val('');
    $('#item-price-text').val('');
}

    $('#item-save-btn').on('click' ,  function () {
        console.log("iii");
        const id = $('#item-code-text').val();
        const name = $('#item-name-text').val();
        const QTY = $('#item-qty-text').val();
        const unit_price = $('#item-price-text').val();

        if (id === '' || name === '' || QTY === '' || unit_price === '' ){
            error_alert();
        }else {
            let data = new ItemModel(id, name, QTY, unit_price);
            Item_db.push(data);
            done_alert();
            clear();
            loadItem();

        }

    });

    function loadItem() {
        $('#item-table-tbody').empty();
        Item_db.map((item,index) =>{
           let data = `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.QTY}</td>
                    <td>${item.unit_price}</td>
                </tr>`
            $('#item-table-tbody').append(data);
        });
    }