// Load orders for all tables 
window.onload = function () {
  loadOrders("1");
  loadOrders("2");
  loadOrders("3");
};

// Add order via REST API
async function addToBill() {
  const price = document.getElementById("price").value.trim();
  const dish = document.getElementById("dish").value;
  const table = document.getElementById("table").value;

  if (!price || !dish) {
    alert("Please select both dish and price.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ dish, price, table })
    });

    if (!response.ok) {
      throw new Error("Failed to add order");
    }

    await loadOrders(table);

    document.getElementById("price").value = "";
    document.getElementById("dish").selectedIndex = 0;
    document.getElementById("table").selectedIndex = 0;
  } catch (error) {
    console.error("Error adding order:", error);
  }
}

// Remove order via REST API
async function removeItem(orderId, table) {
  try {
    const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to delete order");
    }

    await loadOrders(table);
  } catch (error) {
    console.error("Error deleting order:", error);
  }
}

async function loadOrders(table) {
  try {
    const response = await fetch(`http://localhost:3000/orders/${table}`);
    const orders = await response.json();

    const orderList = document.getElementById(`order-list-${table}`);
    orderList.innerHTML = ""; 

    orders.forEach(order => {
      const li = document.createElement("li");
      li.innerHTML = `${order.dish} - ₹${order.price} 
        <button onclick="removeItem(${order.id}, '${table}')">Delete</button>`;
      orderList.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading orders:", error);
  }
}
