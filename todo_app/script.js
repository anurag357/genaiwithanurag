document.getElementById("add-btn").addEventListener("click", function() {
  const input = document.getElementById("todo-input");
  const task = input.value.trim();
  if (task) {
    const li = document.createElement("li");
    li.textContent = task;
    // Toggle completed state on click
    li.addEventListener("click", function() {
      li.classList.toggle("completed");
    });
    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function(e) {
      e.stopPropagation(); // Prevent triggering li click
      li.remove();
    });
    li.appendChild(deleteBtn);
    document.getElementById("todo-list").appendChild(li);
    input.value = "";
  } else {
    alert("Please enter a task.");
  }
});
