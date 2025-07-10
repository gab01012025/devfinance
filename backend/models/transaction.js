// 🧾 Adiciona nova transação
document.getElementById("transactionForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const token = localStorage.getItem("token");

  await fetch("http://localhost:5000/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ description, amount, type, category }),
  });

  document.getElementById("transactionForm").reset();
  loadTransactions(); // Recarrega as transações
});


// 📥 Carrega transações e atualiza valores
async function loadTransactions() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/transactions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  let income = 0, expense = 0;

  const ul = document.getElementById("transactions");
  ul.innerHTML = "";

  data.forEach((t) => {
    const li = document.createElement("li");
    li.classList = "bg-white p-3 rounded shadow flex justify-between items-center";

    li.innerHTML = `
      <div>
        <p class="font-medium">${t.description}</p>
        <p class="text-sm text-gray-500">${t.category}</p>
      </div>
      <span class="${t.type === 'Income' ? 'text-green-600' : 'text-red-600'} font-semibold">€ ${parseFloat(t.amount).toFixed(2)}</span>
    `;

    ul.appendChild(li);

    if (t.type === "Income") income += parseFloat(t.amount);
    else expense += parseFloat(t.amount);
  });

  document.getElementById("income").textContent = `€ ${income.toFixed(2)}`;
  document.getElementById("expense").textContent = `€ ${expense.toFixed(2)}`;
  document.getElementById("balance").textContent = `€ ${(income - expense).toFixed(2)}`;
}

loadTransactions();

