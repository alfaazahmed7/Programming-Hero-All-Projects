document.getElementById("cashout-btn")
    .addEventListener("click", function () {
        // get the agent number and validate
        const cashoutNumber = getValueFromInput("cashout-number");
        if (cashoutNumber.length != 11) {
            alert("Invalid Number");
            return;
        }

        // get the amount
        const cashoutAmount = getValueFromInput("cashout-amount");

        // get the current balance
        const currentBalance = getBalance();

        // calculate balance
        const newBalance = currentBalance - Number(cashoutAmount);
        if (newBalance < 0) {
            alert("Invalid Amount");
            return;
        }

        // get the pin and verify
        const pin = getValueFromInput("cashout-pin");
        if (pin === "1234") {
            alert(`${cashoutAmount} taka successful cahsout to ${cashoutNumber} at ${new Date}`);
            setBalance(newBalance);

            // get the history-container
            const history = document.getElementById("history-container");

            // create a new div
            const newHistory = document.createElement("div");

            // add innerHTML  to the new div
            newHistory.innerHTML = `
            <div class = "transaction-card p-5 bg-white mb-2 rounded-lg">
                <h6 class = "text-base font-bold mb-1">Cashout</h6>
                <p class = "text-[#080808] opacity-50">${cashoutAmount} taka successful cahsout to ${cashoutNumber} at ${new Date}</p>
            </div>
            `;

            // append newDiv to the histroy container
            history.append(newHistory);
        }
        else {
            alert("Invalid Pin");
            return;
        }
    });

// document.getElementById("cashout-btn")
//     .addEventListener("click", function () {

//         // get the agent number and validate
//         const cashoutNumberInput = document.getElementById("cashout-number");
//         const cashoutNumber = cashoutNumberInput.value;
//         if (cashoutNumber.length !== 11) {
//             alert("Invalid Agent Number");
//             return;
//         }

//         // get the amount
//         const cashoutAmountInput = document.getElementById("cashout-amount");
//         const cashoutAmount = cashoutAmountInput.value;

//         // get the current balance
//         const balanceElement = document.getElementById("balance");
//         const balance = balanceElement.innerText;

//         // calculate new balance
//         const newBalance = Number(balance) - Number(cashoutAmount);
//         if (newBalance < 0) {
//             alert("Invalid Amount");
//             return;
//         }

//         // get the pin and verify
//         const cashoutPinInput = document.getElementById("cashout-pin");
//         const pin = cashoutPinInput.value;
//         if (pin === "1234") {
//             alert("Cashout Successful");
//             balanceElement.innerText = newBalance;
//         }
//         else {
//             alert("Invalid Pin");
//             return;
//         }
//     });