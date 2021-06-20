

const getOrders = document.querySelector(".getOrders");

        // load date from database
        fetch("http://localhost:3001/showallorders")
        .then(res => res.json())
        .then(data => showInfo(data));

    getOrders.addEventListener("click" , function () {

       location.reload();
    });

    function showInfo(data) {

        let data1="";
        const name = document.querySelector(".demoName");
        
        data.forEach(item => {
            let oneRow = `
            <tr>
                <td class="orderNumber">${item.idDraw}</td>
                <td>${item.itemName}</td>
                    <td class="demoName">${item.purcheser}</td>
                    <td>
                        <span class="status "></span>
                        ${item.material}
                    </td>
            </tr>
            `;
            data1 += oneRow;
        })

        name.innerHTML = data1;
        modifyRow();
    }
    

    //checkbox - show column
    const inputs = document.querySelectorAll(".checkBoxOptions input");

    inputs.forEach(input => {
            input.addEventListener("change", () => {
                if(input.checked) {
                    const ordernumber = document.querySelectorAll(".orderNumber");
                    ordernumber.forEach(order => {
                        order.classList.add("hiden");
                    });
                }
                if(!input.checked) {
                    const ordernumber = document.querySelectorAll(".orderNumber");
                    ordernumber.forEach(order => {
                        order.classList.remove("hiden");
                    });
                }
            })        
    })



    // START ADD NEW ORDER TO DATABASE

    //show Add Order Form
    const orderForm = document.querySelector(".addOrderForm");
    const plusIcon = document.querySelector(".la-plus-circle")
    const closeForm = document.querySelector(".close");
    let couterOrders ="";

    plusIcon.addEventListener("click", () => {
        orderForm.classList.add("orderFormShow");
        couterOrders = document.querySelectorAll(".demoName tr").length+1;
        if(couterOrders < 10) {
           couterOrders = "00"+couterOrders;
        } else if(couterOrders <100) {
            couterOrders = "0"+couterOrders;
        }
        orderIDForm.value = "Z"+ couterOrders;
    })
    
    closeForm.addEventListener("click", () => {
        orderForm.classList.remove("orderFormShow");
    })

    //save New Order in database
    const formInputs = document.querySelectorAll(".formSave input");
    const form = document.querySelector("form");
    const purcheser = document.querySelector(".purcheser");
    const detailName = document.querySelector(".detailName");
    const orderIDForm = document.querySelector(".orderIDForm");
    
    const formMaterial = document.querySelector(".formMaterial");

    form.addEventListener("submit", (e) => {
        // e.preventDefault();
        const purcheserValue = purcheser.value; 
        const detailNameValue = detailName.value;
        const orderIDFormValue = "Z"+ couterOrders;
        const formMaterialValue = formMaterial.value;

        //the first way protect data
        // const url = `//localhost:3001/newOrder/?purcheser=${encodeURIComponent(purcheserValue)}&detailName=${encodeURIComponent(detailNameValue)}&orderID=${encodeURIComponent(orderIDFormValue)}&Material=${encodeURIComponent(formMaterialValue)}`;

        //second way protect data + automaticlly create url params
        const params = new URLSearchParams( {
            purcheser: purcheserValue,
            detailName:  detailNameValue,
            orderID: orderIDFormValue,
            Material: formMaterialValue
        }) 
        const url = "//localhost:3001/newOrder/?"+params;

        //set action on form
        form.setAttribute("action", url);
        form.setAttribute("method", "POST");
    })
    // END ADD NEW ORDER TO DATABASE
    



    // modifying and updating the order
    const edit_orderForm = document.querySelector(".edit_OrderForm");
    const edit_closeForm = document.querySelector(".edit_close");
    const edit_idOrder = document.querySelector(".edit_idOrder");
    const sendEditOrder = document.querySelector(".sendEdit_Order");
    let getOrderID = "";

    edit_closeForm.addEventListener("click", () => {
        edit_orderForm.classList.remove("edit_orderFormShow");
    })

    function modifyRow () {
        const allRows = [...document.querySelectorAll(".demoName tr")];
        
        allRows.forEach(row => {
            row.addEventListener("dblclick", () => {

                edit_idOrder.textContent = "Edytujesz zlecenie numer: ";
                edit_orderForm.classList.add("edit_orderFormShow");
                getOrderID = row.textContent.split("\n")[1].replace(/ +/g, "");
                edit_idOrder.textContent += getOrderID;
                const textPurcheserInput = document.querySelector(".edit_formUpdate .purcheser");
                const textdetailNameInput = document.querySelector(".edit_formUpdate .detailName");
                const textMaterialInput = document.querySelector(".edit_formUpdate .formMaterial");
               

                //get data one order
                fetch("http://localhost:3001/oneOrder/"+getOrderID)
                .then(res => res.json())
                .then(data => {
                    //insert text into input fields
                    textPurcheserInput.value = data.purcheser;
                    textdetailNameInput.value = data.itemName;
                    textMaterialInput.value = data.material;
                })

                sendEditOrder.addEventListener("click", (e) => {
                    // e.preventDefault();
                    //tekst from updating form
                    const textPurcheser = document.querySelector(".edit_formUpdate .purcheser").value;
                    const textdetailName = document.querySelector(".edit_formUpdate .detailName").value;
                    const textMaterial = document.querySelector(".edit_formUpdate .formMaterial").value;

                    const dataOneRow = {
                        purcheser: textPurcheser,
                        detailName:  textdetailName,
                        orderID: getOrderID,
                        Material: textMaterial
                    };

                    let urlUpdate = "http://localhost:3001/updateOrder/" + getOrderID;

                    fetch(urlUpdate, {method: "PUT", body: JSON.stringify(dataOneRow) , headers: {
                        "Content-Type": "application/json"
                      }})
                    .then(res => res.json())
                    .then(data => {console.log(data)})

                })                   
            })
        })
    }
    // END MODYFING AND UPDATING THE ORDER



    // START DELET ORDER

function removeOrder() {
    const scope = document.querySelectorAll(".demoName tr");
const contextMenu = document.querySelector(".context-menu");
const chooseDeleteFromContextMenu = document.querySelector(".context-menu .delete_Order");
const correctOrderID = [];
console.log(scope)

scope.forEach( row=> {
    //get ID order to delete
    let getOrderID = "";
    getOrderID = row.textContent.split("\n")[1].replace(/ +/g, "");
    console.log(getOrderID)

    row.addEventListener("contextmenu", contextMenuFunction = (e) => {
        e.preventDefault();
        console.log(getOrderID)

        const {clientX: mouseX, clientY: mouseY} = e;
        contextMenu.style.top = (mouseY - 10)+"px";
        contextMenu.style.left = (mouseX - 20)+"px";
        contextMenu.classList.add("visible-context-menu");

        //click contextMenu 
        chooseDeleteFromContextMenu.addEventListener("click", () => {
            const confirmRemoveOrder = document.querySelector(".confirm-remove-order");

            const removeYes = document.querySelector(".remove_yes");
            const removeNo = document.querySelector(".remove_no");

            confirmRemoveOrder.classList.add("show_remove");
            contextMenu.classList.remove("visible-context-menu");

            const addTextIdOrder = document.querySelector(".confirm-remove-order h3 span");
            addTextIdOrder.innerHTML =  getOrderID;

            //get correct ID if i was click more then one "Right-click mouse"
            correctOrderID.push(getOrderID);
            console.log(correctOrderID)

            //CLICK REMOVE ORDER YES
            removeYes.addEventListener("click", () => {
                //delete one order
                if(correctOrderID[correctOrderID.length-1] === getOrderID){
                    fetch("http://localhost:3001/delete/"+getOrderID, {
                    method: "DELETE",
                    });
                    location.reload();
                } else {
                    console.log("order not removed")
                }
                
            })
            // END CLICK REMOVE ORDER YES
            removeNo.addEventListener("click", (e) => {
                e.preventDefault();
                confirmRemoveOrder.classList.remove("show_remove");
            })
        })
    })
})

window.addEventListener("click", (e) => {
    // console.log(e.target.offsetParent) - offsetParent zwraca pierwszego przodka klikniętego elementu
    if(e.target.offsetParent != contextMenu){
        contextMenu.classList.remove("visible-context-menu");
    }
})
    }


    //show contextmenu after right-click
    window.addEventListener("load",  ()=> {
        removeOrder()
    })
    
    // END DELETE ORDER
    
        