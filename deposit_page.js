const get_username = localStorage.getItem("enteredUsername");

const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);

// Display current balance
if (get_username) {
    const storedAmount = Number(localStorage.getItem(`${get_username}_balance`)) || 0;
    document.getElementById("current_amount").textContent = formatCurrency(storedAmount);
} else {
    console.warn("No username found — user not logged in?");
}

const depositBtn = document.getElementById("deposit-btn");

depositBtn.addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value;
    const inputAmount = Number(userInput);

    if (inputAmount <= 0 || isNaN(inputAmount)) {
        alert("No zero(0), negative or invalid values, try again!");
        return;
    }

    if (inputAmount > 500 || inputAmount < 20) {
        alert("Only deposit money in the range of $20–$500.");
        return;
    }

    const storedAmount = Number(localStorage.getItem(`${get_username}_balance`)) || 0;
    const newAmount = storedAmount + inputAmount;

    localStorage.setItem(`${get_username}_balance`, newAmount);
    document.getElementById("current_amount").textContent = formatCurrency(newAmount);

    //pay history for deposit
    const existingHistory = JSON.parse(localStorage.getItem(`${get_username}_history`)) || [];

    const newRecord = {
        type: "Deposit",
        amount: inputAmount,
        date: new Date().toLocaleDateString()
    };
    existingHistory.push(newRecord);

    localStorage.setItem(`${get_username}_history`, JSON.stringify(existingHistory));
});

document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "main.html";
});
