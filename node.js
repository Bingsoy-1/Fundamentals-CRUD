document.addEventListener('DOMContentLoaded', () => {
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const employeeTableBody = document.getElementById('employeeTableBody');
    const employeeForm = document.getElementById('employeeForm');
    let employees = [];
    let editingIndex = null;

    // Function to render employees on the table
    function renderEmployees() {
        employeeTableBody.innerHTML = '';
        employees.forEach((employee, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.department}</td>
                <td>${employee.employeeId}</td>
                <td>${employee.gender}</td>
                <td>${employee.employmentType}</td>
                <td>${employee.position}</td> <!-- Displaying the new Position -->
                <td>
                    <button class="editBtn" data-index="${index}">Edit</button>
                    <button class="deleteBtn" data-index="${index}">Delete</button>
                </td>
            `;
            employeeTableBody.appendChild(row);
        });

        // Attach event listeners for editing and deleting dynamically added buttons
        document.querySelectorAll('.editBtn').forEach(button => {
            button.addEventListener('click', (event) => editEmployee(event));
        });

        document.querySelectorAll('.deleteBtn').forEach(button => {
            button.addEventListener('click', (event) => deleteEmployee(event));
        });
    }

    // Function to add or update an employee
    function addEmployee() {
        const employee = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            department: document.getElementById('department').value.trim(),
            employeeId: document.getElementById('employeeId').value.trim(),
            gender: document.getElementById('gender').value,
            employmentType: document.getElementById('employmentType').value,
            position: document.getElementById('position').value.trim()  // New Position field
        };

        if (employee.firstName && employee.lastName && employee.department && employee.employeeId && employee.gender && employee.employmentType && employee.position) {
            if (editingIndex === null) {
                employees.push(employee);
            } else {
                employees[editingIndex] = employee;
                editingIndex = null;
            }
            renderEmployees();
            clearForm();
            addEmployeeBtn.textContent = 'Add Employee';  // Reset the button text
        } else {
            alert('Please fill in all fields.');
        }
    }

    // Function to clear the form inputs
    function clearForm() {
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('department').value = '';
        document.getElementById('employeeId').value = '';
        document.getElementById('gender').value = '';
        document.getElementById('employmentType').value = '';
        document.getElementById('position').value = '';  // Clear Position input
    }

    // Function to delete an employee
    function deleteEmployee(event) {
        const index = event.target.dataset.index;
        employees.splice(index, 1);
        renderEmployees();
    }

    // Function to edit an employee
    function editEmployee(event) {
        const index = event.target.dataset.index;
        const employee = employees[index];
        document.getElementById('firstName').value = employee.firstName;
        document.getElementById('lastName').value = employee.lastName;
        document.getElementById('department').value = employee.department;
        document.getElementById('employeeId').value = employee.employeeId;
        document.getElementById('gender').value = employee.gender;
        document.getElementById('employmentType').value = employee.employmentType;
        document.getElementById('position').value = employee.position; // Set Position input value

        editingIndex = index;
        addEmployeeBtn.textContent = 'Update Employee';  // Change the button text to "Update Employee"
    }

    // Add event listener for adding or updating employee
    addEmployeeBtn.addEventListener('click', addEmployee);

    // Initial render
    renderEmployees();
});
