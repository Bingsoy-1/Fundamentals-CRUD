document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const pendingTasks = document.getElementById("pendingTasks");
    const completedTasks = document.getElementById("completedTasks");
    
    function createTaskRow(taskText) {
        let row = document.createElement("tr");
        row.innerHTML = `<td>${taskText}</td>
                         <td>
                            <button class="doneBtn">Done</button>
                            <button class="pendingBtn" style="display:none;">Pending</button>
                            <button class="removeBtn">Remove</button>
                         </td>`;

        const doneBtn = row.querySelector(".doneBtn");
        const pendingBtn = row.querySelector(".pendingBtn");
        
        doneBtn.addEventListener("click", () => moveToCompleted(row, doneBtn, pendingBtn));
        pendingBtn.addEventListener("click", () => moveToPending(row, doneBtn, pendingBtn));
        row.querySelector(".removeBtn").addEventListener("click", () => row.remove());
        
        return row;A
    }

    function moveToCompleted(row, doneBtn, pendingBtn) {
        completedTasks.appendChild(row);
        doneBtn.style.display = "none";
        pendingBtn.style.display = "inline-block";
    }

    function moveToPending(row, doneBtn, pendingBtn) {
        pendingTasks.appendChild(row);
        doneBtn.style.display = "inline-block";
        pendingBtn.style.display = "none";
    }

    addTaskBtn.addEventListener("click", () => {
        let taskText = taskInput.value.trim();
        if (!taskText) return;
        
        pendingTasks.appendChild(createTaskRow(taskText));
        taskInput.value = "";
    });
});
