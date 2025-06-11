function addToBill() {
  const price = document.getElementById("price").value.trim();
  const dishDropdown = document.getElementById("dish");
  const dish = dishDropdown.value;
  const table = document.getElementById("table").value;

  if (!price || !dish) {
    alert("Please select both dish and price.");
    return;
  }

  const orderList = document.getElementById(`order-list-${table}`);

  const li = document.createElement("li");
  li.innerHTML = `${dish} - ₹${price} <button onclick="removeItem(this)">Delete</button>`;

  orderList.appendChild(li);

  document.getElementById("price").value = "";
  dishDropdown.selectedIndex = 0;
}

function removeItem(button) {
  const li = button.parentElement;
  li.remove();
}
