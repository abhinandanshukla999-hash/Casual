

const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const studentCount = document.getElementById("studentCount");

const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");



let students = JSON.parse(localStorage.getItem("students")) || [];

 
displayStudents();


 
studentForm.addEventListener("submit", function (event) {
 
    event.preventDefault();//prevent the browser to submit the form automatically


    
    const selectedGender = document.querySelector(
        'input[name="gender"]:checked'
    );


     //creating an object with the help of values entered by the user
    const student = {

        id: document.getElementById("studentId").value.trim(),

        firstName: document.getElementById("firstName").value.trim(),

        lastName: document.getElementById("lastName").value.trim(),

        dob: document.getElementById("dob").value,

        gender: selectedGender ? selectedGender.value : "",

        email: document.getElementById("email").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        course: document.getElementById("course").value,

        department: document.getElementById("department").value,

        year: document.getElementById("year").value,

        address: document.getElementById("address").value.trim(),

        city: document.getElementById("city").value.trim(),

        state: document.getElementById("state").value,

        pincode: document.getElementById("pincode").value.trim()

    };


     

    if (student.phone.length !== 10) {

        alert("Phone number must contain exactly 10 digits.");

        return;
    }


    if (student.pincode.length !== 6) {

        alert("PIN code must contain exactly 6 digits.");

        return;
    }


    // Check duplicate student ID
    const duplicate = students.some(
        existingStudent => existingStudent.id === student.id
     );   
    //  some() is used for checking that the array containing the provided id entered by the user or not where as the arrow function is checking in the existing arrays student id one by one



    if (duplicate) {

        alert("A student with this Student ID already exists.");

        return;
    }


     
    students.push(student);


    // Save to browser storage
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    // Update table
    displayStudents();


    // Reset form
    studentForm.reset();


    // Reset photo preview
    photoPreview.innerHTML = "👤";


    alert("Student registered successfully!");

});

 
function displayStudents() {

    studentTableBody.innerHTML = "";


    // If no students exist
    if (students.length === 0) {

        studentTableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    No students registered yet.
                </td>
            </tr>
        `;

        studentCount.textContent = "0 Students";

        return;
    }


    // Create row for every student
    students.forEach(function (student, index) {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>${student.id}</strong>
            </td>

            <td>
                ${student.firstName} ${student.lastName}
            </td>

            <td>
                ${student.email}
            </td>

            <td>
                ${student.course}
            </td>

            <td>
                ${student.year}
            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${index})"
                >
                    Delete
                </button>

            </td>

        `;


        studentTableBody.appendChild(row);

    });


    // Update count to the number of students

    studentCount.textContent =
        `${students.length} Student${students.length !== 1 ? "s" : ""}`;
}


// from here delete operation is having
function deleteStudent(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );


    if (!confirmDelete) {
        return;
    }


    // Remove student
    students.splice(index, 1);


    // Update localStorage
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    // Refresh table
    displayStudents();

}


// ============================================
// PHOTO PREVIEW
// ============================================

photoInput.addEventListener("change", function () {

    const file = photoInput.files[0];


    if (!file) {
        return;
    }


    const reader = new FileReader();


    reader.onload = function (event) {

        photoPreview.innerHTML = `
            <img src="${event.target.result}" alt="Student Photo">
        `;

    };


    reader.readAsDataURL(file);

});




document
    .getElementById("phone")
    .addEventListener("input", function () {

        // Allow only numbers
        this.value = this.value.replace(/\D/g, "");

    });




document
    .getElementById("pincode")
    .addEventListener("input", function () {

        // Allow only numbers
        this.value = this.value.replace(/\D/g, "");

    });

