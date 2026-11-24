

const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const studentCount = document.getElementById("studentCount");

const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");
const response = document.getElementById("response");


 


studentForm.addEventListener("submit", async function (event) {

    event.preventDefault();//prevent the browser to submit the form automatically and also resets back to the form



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

    try {
        const res = await fetch('http://localhost:8001/formData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
            ,
            body:
                JSON.stringify(student),

        });
        response.textContent = await res.text();

    }
    catch (error) {
        console.log(error, "Error occured");
    }

}
);

 