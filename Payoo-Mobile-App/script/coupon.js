document.getElementById("bonus-coupon-btn")
    .addEventListener("click", function () {
        const coupon = getValueFromInput("bonus-coupon");
        if (coupon === "1122" && coupon.length === 4) {
            alert("You will get 5% discount if you cashout over 1000$");
        }
        else {
            alert("Invalid Coupon");
            return;
        }
    });