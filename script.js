// initialize the variable
const expenseForm = document.getElementById("input-form");
const expenseList = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");

// Create an Array expenses from local Storage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderExpense() {
  // Clean expense list
  expenseList.innerHTML = "";

  let totalAmount = 0;

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    const expenseRow = document.createElement("tr");

    expenseRow.innerHTML = `
        <td>${expense.name}</td>
        <td>${expense.amount}</td> <!-- Change here -->
        <td class="delete-btn" data-id="${i}">Delete</td>
        `;

    expenseList.appendChild(expenseRow);

    totalAmount += expense.amount; // Change here
  }

  totalAmountElement.textContent = totalAmount.toFixed(2);

  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense(event) {
  event.preventDefault();

  // Initial the input variable
  const expenseNameInput = document.getElementById("input-name");
  const amountexpenseInput = document.getElementById("input-number");
  const expenseName = expenseNameInput.value;
  const amountexpense = parseFloat(amountexpenseInput.value);

  // Clear value input
  expenseNameInput.value = "";
  amountexpenseInput.value = "";

  // Create Object
  if (expenseName === "" || isNaN(amountexpense) || amountexpense < 0) {
    alert("The input is invalid.");
    return;
  }

  const expense = {
    name: expenseName,
    amount: amountexpense,
  };

  expenses.push(expense);

  renderExpense();
}


function deleteExpense(event) {
  if (event.target.classList.contains("delete-btn")) {
    const expenseIndex = parseInt(event.target.getAttribute("data-id"));
    expenses.splice(expenseIndex, 1);
    renderExpense();
  }
}



expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", deleteExpense);
renderExpense();
