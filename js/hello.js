
let amount = parseFloat(prompt("ENTER AN AMOUNT")) || 0;
document.getElementById("cash").innerHTML = "AMOUNT: " + amount;

const transactions = []; // to keep track of all transaction amounts

function updateBalance() {
    const totalSpent = transactions.reduce((acc, val) => acc + parseFloat(val), 0);
    const balance = amount - totalSpent;
    document.getElementById("bal").innerHTML = "BALANCE: " + balance;
}

document.getElementById("enter").onclick = function() {
    const product = document.getElementById('pro').value;
    const money = parseFloat(document.getElementById('amo').value) || 0;

    // Save transaction amount
    transactions.push(money);

    updateBalance();

    const table = document.getElementById('table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);

    cell1.textContent = product;
    cell2.textContent = money;

    const editImage = document.createElement('img');
    editImage.src = document.getElementById('edit').src;
    editImage.width = 20;
    editImage.height = 20;
    editImage.style.cursor = 'pointer';
    editImage.onclick = function () {
        const index = newRow.rowIndex - 1;
        const newProduct = prompt("Enter new product name:", cell1.textContent);
        const newAmount = parseFloat(prompt("Enter new amount:", cell2.textContent)) || 0;
        
        transactions[index] = newAmount;

        cell1.textContent = newProduct;
        cell2.textContent = newAmount;

        updateBalance();
    };
    cell3.appendChild(editImage);

    const deletImage = document.createElement('img');
    deletImage.src = document.getElementById('delet').src;
    deletImage.width = 20;
    deletImage.height = 20;
    deletImage.style.cursor = 'pointer';
    deletImage.onclick = function () {
        const index = newRow.rowIndex - 1;
        transactions.splice(index, 1); // remove from list
        table.deleteRow(index);
        updateBalance();
    };
    cell4.appendChild(deletImage);

    document.getElementById('pro').value = '';
    document.getElementById('amo').value = '';
};

document.getElementById("deleteAll").onclick = function () {
    const table = document.getElementById('table').getElementsByTagName('tbody')[0];
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
    transactions.length = 0; // clear all
    updateBalance();
};

