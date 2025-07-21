document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "main.html";
});

// Example username, replace with your real username logic
const get_username = localStorage.getItem("enteredUsername");

// Fetch the array (transaction history) from localStorage
const transactionHistory = JSON.parse(localStorage.getItem(`${get_username}_history`)) || [];

// Select the container where rows will be rendered
const container = document.querySelector('.transactions-details');

// Clear the container before rendering
container.innerHTML = '';

// Render each transaction as a row
transactionHistory.forEach(record => {
  // Create a div with class transaction-row
  const row = document.createElement('div');
  row.classList.add('transaction-row');

  // Create p elements for each property: type, date, amount
  const typeP = document.createElement('p');
  typeP.textContent = record.type;

  const dateP = document.createElement('p');
  dateP.textContent = record.date;

  const amountP = document.createElement('p');
  amountP.textContent = `$${parseFloat(record.amount).toFixed(2)}`;

  // Append p elements to the row
  row.appendChild(typeP);
  row.appendChild(dateP);
  row.appendChild(amountP);

  // Append the row to the container
  container.appendChild(row);
});
