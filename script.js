document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("inventory-form");
  const tableBody = document.querySelector("#inventory-table tbody");

  let inventory = [];
  let editIndex = -1; // Tracks the index of the item being edited

  // Function to generate a unique ID
  const generateID = () => {
    return `${inventory.length + 1}`;
  };

  // Function to render the inventory table
  const renderTable = () => {
    tableBody.innerHTML = "";

    inventory.forEach((item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.category}</td>
        <td>
          <span class="action-btn" data-index="${index}" data-action="edit">Edit</span> |
          <span class="action-btn" data-index="${index}" data-action="delete">Delete</span>
        </td>
      `;

      tableBody.appendChild(row);
    });
  };

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("item-name").value.trim();
    const quantity = parseInt(document.getElementById("item-quantity").value);
    const category = document.getElementById("item-category").value.trim();

    if (editIndex === -1) {
      // Add a new item
      const id = generateID(); // Generate a unique ID
      inventory.push({ id, name, quantity, category });
    } else {
      // Update the existing item
      inventory[editIndex].name = name;
      inventory[editIndex].quantity = quantity;
      inventory[editIndex].category = category;
      editIndex = -1; // Reset edit index
    }

    form.reset();
    renderTable();
  });

  // Handle edit and delete actions
  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("action-btn")) {
      const index = e.target.dataset.index;
      const action = e.target.dataset.action;

      if (action === "edit") {
        const item = inventory[index];
        document.getElementById("item-name").value = item.name;
        document.getElementById("item-quantity").value = item.quantity;
        document.getElementById("item-category").value = item.category;
        editIndex = index; // Track the index of the item being edited
      } else if (action === "delete") {
        inventory.splice(index, 1);
      }

      renderTable();
    }
  });

  renderTable();
});
