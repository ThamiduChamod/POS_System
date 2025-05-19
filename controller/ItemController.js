import ItemModel from "../model/ItemModel.js";
import {Customer_db, Item_db} from "../db/db.js";

let i=0;
function nextId() {
    i+=1
    let nextId = "I00"+i;
    $('#item-code-text').val(nextId);
}
window.addEventListener("load", function () {
    nextId();
    loadItem();
});



$('#item-btn').on('click', function (){
    $('#item-save-btn').prop('disabled',false);
    $('#item-update-btn').prop('disabled',true);
    $('#item-delete-btn').prop('disabled',true);
    loadItem();

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

    $('#item-save-btn').prop('disabled',false);
    $('#item-update-btn').prop('disabled',true);
    $('#item-delete-btn').prop('disabled',true);
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
            nextId();

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

    $('#item-clear-btn').on('click' , function () {
       clear();
    });


    let select_item;
    let select_item_index;
    $('#item-table-tbody').on('click','tr' , function () {
        select_item_index = $(this).index();
        select_item = Item_db[select_item_index];

        $('#item-code-text').val(select_item.id);
        $('#item-name-text').val(select_item.name);
        $('#item-qty-text').val(select_item.QTY);
        $('#item-price-text').val(select_item.unit_price);

        $('#item-save-btn').prop('disabled',true);
        $('#item-update-btn').prop('disabled',false);
        $('#item-delete-btn').prop('disabled',false);

    });

    $('#item-update-btn').on('click',function () {
       select_item.id = $('#item-code-text').val();
       select_item.name = $('#item-name-text').val();
       select_item.QTY = $('#item-qty-text').val();
       select_item.unit_price = $('#item-price-text').val();

       clear();
       loadItem();

    });

    $('#item-delete-btn').on('click', function () {
       // Item_db.splice(select_item_index , 1);
        delete_alert();
       // clear();
       // loadItem();
    });

    function delete_alert() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            Item_db.splice(select_item_index , 1);
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            clear();
            loadItem();
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
            clear();
            loadItem();
        }
    });

}

