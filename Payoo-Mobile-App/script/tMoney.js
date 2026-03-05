document.getElementById("t-money-btn")
    .addEventListener("click", function () {
        const userAccNumber = getValueFromInput("t-money-number");
        if (userAccNumber.length !== 11) {
            alert("Please enter a valid number");
            return;
        }

        const amountNumber = getValueFromInput("t-money-amount");
        const curBalance = getBalance();
        const newBalance = curBalance - Number(amountNumber);
        if (newBalance < 0) {
            alert("Invalid amount");
            return;
        }

        const pin = getValueFromInput("t-money-pin");
        if (pin === "1234") {
            alert(`Transfer money ${amountNumber} taka successfully transfer to ${userAccNumber}`);
            setBalance(newBalance);

            const history = document.getElementById("history-container");
            const newHistory = document.createElement("div");
            newHistory.innerHTML = `
            <div class = "transaction-card p-5 bg-white mb-2 rounded-lg">
            <h6 class = "text-base font-bold mb-1">Transper Money</h6>
                <p class = "text-[#080808] opacity-50">Transfer money ${amountNumber} taka successfully transfer to ${userAccNumber}</p>
            </div>
            `;
            history.append(newHistory);
        }
        else {
            alert("Invalid Pin");
            return;
        }
    });