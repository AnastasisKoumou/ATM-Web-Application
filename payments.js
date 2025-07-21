const get_username = localStorage.getItem("enteredUsername");

const modal = document.getElementById("confirm-modal");
const modalText = document.getElementById("modal-text");
const yesBtn = document.getElementById("confirm-yes");
const noBtn = document.getElementById("confirm-no");

const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);

const billBtn = document.getElementById("pay-btn");

billBtn.addEventListener("click", () => {
    const userBillSelect = document.getElementById("bills").value;
    const storedAmount = Number(localStorage.getItem(`${get_username}_balance`)) || 0;

    let bill_number = 0;
    switch(userBillSelect) {
        case "electricity":
            bill_number = 70;
            break;
        case "internet":
            bill_number = 50;
            break;
        case "water":
            bill_number = 25;
            break;
        case "phone":
            bill_number = 20;
            break;
        default:
            alert("No payment selected.");
            return;
    }

    if (storedAmount >= bill_number) {
        // Show modal
        modalText.textContent = `Pay $${bill_number} for ${userBillSelect}?`;
        modal.classList.remove("hidden");

        // Handle confirmation
        yesBtn.onclick = () => {
            const newAmount = storedAmount - bill_number;
            localStorage.setItem(`${get_username}_balance`, newAmount);
            alert("Payment Successful. Receipt sent through email!");
            modal.classList.add("hidden");

            //pay history payments
            const existingHistory = JSON.parse(localStorage.getItem(`${get_username}_history`)) || [];

            const newRecord = {
                type: "Payment: " + userBillSelect,
                amount: bill_number,
                date: new Date().toLocaleDateString()
            };
            existingHistory.push(newRecord);

            localStorage.setItem(`${get_username}_history`, JSON.stringify(existingHistory));
        };

        noBtn.onclick = () => {
            alert("Payment cancelled.");
            modal.classList.add("hidden");
        };
    } else {
        alert("Insufficient balance.");
    }
});

document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "main.html";
});