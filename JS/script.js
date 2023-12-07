// Function to validate Firstname and Lastname
function validateName() {
  const fullnameInput = document.getElementById("fullname");
  const names = fullnameInput.value.trim().split(" ");
  const errorElement = document.getElementById("fullnameError");

  if (names.length !== 2) {
    errorElement.textContent = "Please enter both your Firstname and Lastname.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate Student ID
function validateStudentID() {
  const studentIDInput = document.getElementById("studentID");
  const studentIDPattern = /^\d{10}$/;
  const errorElement = document.getElementById("studentIDError");

  if (!studentIDPattern.test(studentIDInput.value)) {
    errorElement.textContent = "Please enter a 10-digit Student ID.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate University Email
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailPattern = /^.+@dome\.tu\.ac\.th$/;
  const errorElement = document.getElementById("emailError");

  if (!emailPattern.test(emailInput.value)) {
    errorElement.textContent =
      "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate form inputs on user input
function validateFormOnInput() {
  validateName();
  validateStudentID();
  validateEmail();
}


// Function to submit the form
// Function to submit the form
async function submitForm(event) {
  event.preventDefault();

  // Validate form inputs before submission


  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);
  if (!validateName() || !validateStudentID() || !validateEmail()) {
    return;
  }
  if (endDate <= startDate) {
    alert("End datetime should be after the start datetime.");
    return;
  }
  else{
    var submit = document.getElementById("submit");

    submit.onclick = function(){
    var fullname = document.getElementById("fullname").value;
    var studentID = document.getElementById("studentID").value;
    var email = document.getElementById("email").value;
    var workTitle = document.getElementById("workTitle").value;
    var activityType = document.getElementById("activityType").value;
    var academicYear = document.getElementById("academicYear").value;
    var semester = document.getElementById("semester").value;
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    var location = document.getElementById("location").value;
    var description = document.getElementById("description").value;

    document.getElementById("outputName").innerText = fullname;
    document.getElementById("outputStudentID").innerText = studentID;
    document.getElementById("outputEmail").innerText = email;
    document.getElementById("outputWorkTitle").innerText = workTitle;
    document.getElementById("outputActivityType").innerText = activityType;
    document.getElementById("outputAcademicYear").innerText = academicYear;
    document.getElementById("outputSemester").innerText = semester;
    document.getElementById("outputStartDate").innerText = startDate;
    document.getElementById("outputEndDate").innerText = endDate;
    document.getElementById("outputLocation").innerText = location;
    document.getElementById("outputDescription").innerText = description;

    alert("Submit Success!!");
    document.getElementById("myForm").reset();
    }
  }
} 

// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", submitForm);

// Event listeners for input validation on user input
document.getElementById("fullname").addEventListener("input", validateName);
document.getElementById("studentID").addEventListener("input", validateStudentID);
document.getElementById("email").addEventListener("input", validateEmail);