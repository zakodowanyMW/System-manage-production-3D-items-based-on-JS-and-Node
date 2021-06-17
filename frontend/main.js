

const getOrders = document.querySelector(".getOrders");

    getOrders.addEventListener("click" , function () {
        fetch("http://localhost:3001/showallorders")
        .then(res => res.json())
        .then(data => showInfo(data));
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
        console.log(data1);
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

    //show Add Order Form
    const orderForm = document.querySelector(".addOrderForm");
    const plusIcon = document.querySelector(".la-plus-circle")
    const closeForm = document.querySelector(".close");

    plusIcon.addEventListener("click", () => {
        orderForm.classList.add("orderFormShow");
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
        const orderIDFormValue = orderIDForm.value;
        const formMaterialValue = formMaterial.value;
        const url = `//localhost:3001/newOrder/?purcheser=${purcheserValue}&detailName=${detailNameValue}&orderID=${orderIDFormValue}&Material=${formMaterialValue}`;
        console.log(url)
        form.setAttribute("action", url);
    })
    

        