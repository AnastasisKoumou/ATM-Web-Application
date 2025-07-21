const withdrawBtn = document.getElementById("withdraw-btn");
const depositBtn = document.getElementById("deposit-btn");
const paymentsBtn = document.getElementById("payments-btn");
const historyBtn = document.getElementById("history-btn");
const settingsBtn = document.getElementById("settings-btn");
const quickCashBtn = document.getElementById("quickBtn");

// Get user's name from index.html
const get_username = localStorage.getItem("enteredUsername");
document.getElementById("name").textContent = get_username;

// Formatter for currency display
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};

// Random user balance between 0 and 10,000
function randomUserAmount() {
    return Math.floor(Math.random() * 10001); // 0 to 10000
}

// Random savings between 0 and 2,500
function randomUserSavings() {
    return Math.floor(Math.random() * 2501); // 0 to 2500
}

// --- Account Balance Setup ---
let storedAmount = localStorage.getItem(`${get_username}_balance`);

if (!storedAmount) {
    const generatedAmount = randomUserAmount();
    localStorage.setItem(`${get_username}_balance`, generatedAmount);
    storedAmount = generatedAmount;
}

const numericBalance = Number(storedAmount);
document.getElementById("account-1").textContent = formatCurrency(numericBalance);

// --- Savings Setup ---
let storedSavings = localStorage.getItem(`${get_username}_savings`);

if (!storedSavings) {
    const generatedSavings = randomUserSavings();
    localStorage.setItem(`${get_username}_savings`, generatedSavings);
    storedSavings = generatedSavings;
}

const numericSavings = Number(storedSavings);
document.getElementById("savings").textContent = formatCurrency(numericSavings);

//button pages
withdrawBtn.addEventListener('click', () => {
    window.location.href = "withdraw_page.html";
})

depositBtn.addEventListener('click', () => {
    window.location.href = "deposit_page.html";
})

paymentsBtn.addEventListener('click', () => {
    window.location.href = "payments.html";
})

historyBtn.addEventListener('click', () => {
    window.location.href = "pay_history.html";
})

settingsBtn.addEventListener('click', () => {
    window.location.href = "#";
})

document.querySelector("#logout-btn").addEventListener('click', () => {
    window.location.href = "index.html";
})

quickCashBtn.addEventListener('click', () => {
    const maxQuickCash = 500;
    const quickAmount = 70;

    let current_balance = Number(localStorage.getItem(`${get_username}_balance`));

    if(current_balance >= quickAmount && current_balance - quickAmount >= maxQuickCash * -1) {
        const newBalance = current_balance - quickAmount;
        localStorage.setItem(`${get_username}_balance`, newBalance);
        document.getElementById("account-1").textContent = formatCurrency(newBalance);

        //pay history withdraw
        const existingHistory = JSON.parse(localStorage.getItem(`${get_username}_history`)) || [];

        const newRecord = {
            type: "QuickCash",
            amount: quickAmount,
            date: new Date().toLocaleDateString()
        };
        existingHistory.push(newRecord);

        localStorage.setItem(`${get_username}_history`, JSON.stringify(existingHistory));
    } else {
        alert("Insufficient balance for quick cash.");
    }
});