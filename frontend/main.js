
const getOrders = document.querySelector(".getOrders");

    getOrders.addEventListener("click" , function () {
        fetch("http://127.0.0.1:3001/test")
        .then(res => res.json())
        .then(data => showInfo(data));
    });

    function showInfo(data) {

        const data1 = data;
        const name = document.querySelector(".demoName");
        name.innerHTML = data1.imie;
    }
        