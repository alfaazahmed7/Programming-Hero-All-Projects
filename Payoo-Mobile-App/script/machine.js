// machine id - input value
function getValueFromInput(id) {
    const input = document.getElementById(id);
    const value = input.value;
    return value;
}

// machine - balance
function getBalance() {
    const balanceElement = document.getElementById("balance");
    const balance = balanceElement.innerText;
    return Number(balance);
}

// machine value - set balance
function setBalance(value) {
    const balanceElement = document.getElementById("balance");
    balanceElement.innerText = value;
    // 45000 = 50000
}

// machine id - hide add > show id
function showOnly(id) {
    const addMoney = document.getElementById("add-money");
    const cashout = document.getElementById("cashout");
    const history = document.getElementById("history");
    const tMoney = document.getElementById("transfer-money");
    const getBonus = document.getElementById("get-bonus");
    const payBill = document.getElementById("pay-bill");

    // hide everyone
    addMoney.classList.add("hidden");
    cashout.classList.add("hidden");
    history.classList.add("hidden");
    tMoney.classList.add("hidden");
    getBonus.classList.add("hidden");
    payBill.classList.add("hidden");

    // show the id elelment
    const selected = document.getElementById(id);
    selected.classList.remove("hidden");
};