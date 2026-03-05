document.getElementById("pay-bill-btn")
    .addEventListener("click", function () {
        const payBillBank = getValueFromInput("pay-bill-bank");
        if (payBillBank === "Select Pay Bill") {
            alert("Please select a bank");
            return;
        }

        const billAccNumber = getValueFromInput("pay-bill-number");
        if (billAccNumber.length !== 11) {
            alert("Invalid Number");
            return;
        }

        const payAmount = getValueFromInput("pay-bill-amount");
        const curBalance = getBalance();
        const newBalance = curBalance - Number(payAmount);
        setBalance(newBalance);

        const pin = getValueFromInput("pay-bill-pin");
        if (pin === "1234") {
            alert(`You have successfully paid ${payAmount}`);
        }
    });