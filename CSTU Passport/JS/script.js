const config = {
  backendUrl: "http://localhost:8000/", // Default backend URL
};
const port = 8000;

function clearField(){
  document.getElementById('fullname').value='';
  document.getElementById('studentID').value='';
  document.getElementById('email').value='';
  document.getElementById('workTitle').value='';
  document.getElementById('activityType').value='';
  document.getElementById('academicYear').value='';
  document.getElementById('semester').value='';
  document.getElementById('startDate').value='';
  document.getElementById('endDate').value='';
  document.getElementById('location').value='';
  document.getElementById('description').value='';
  }
  
  function validateName() {
    const fullnameInput = document.getElementById("fullname");
    const names = fullnameInput.value.trim().split(" ");
    const errorElement = document.getElementById("fullnameError");
  
    if (names.length !== 2) {
      errorElement.textContent = "Please enter both your Firstname and Lastname.";
      return false;
    } else {
      errorElement.textContent = ""; 
    }
    return true;
  }
  
  
  function validateStudentID() {
    const studentIDInput = document.getElementById("studentID");
    const studentIDPattern = /^\d{10}$/;
    const errorElement = document.getElementById("studentIDError");
  
    if (!studentIDPattern.test(studentIDInput.value)) {
      errorElement.textContent = "Please enter a 10-digit Student ID.";
      return false;
    } else {
      errorElement.textContent = "";
    }
    return true;
  }
  
  
  function validateEmail() {
    const emailInput = document.getElementById("email");
    const emailPattern = /^.+@dome\.tu\.ac\.th$/;
    const errorElement = document.getElementById("emailError");
  
    if (!emailPattern.test(emailInput.value)) {
      errorElement.textContent =
        "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
      return false;
    } else {
      errorElement.textContent = ""; 
    }
    return true;
  }
  
  function validateFormOnInput() {
    validateName();
    validateStudentID();
    validateEmail();
  }
  // Function to fetch activity types from the backend
async function fetchActivityTypes() {
  try {
    const response = await fetch(config.backendUrl + "getActivityType");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch activity types.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching activity types:", error);
    return [];
  }
}

// Function to populate activity types in the select element
function populateActivityTypes(activityTypes) {
  const activityTypeSelect = document.getElementById("activityType");

  for (const type of activityTypes) {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = type.value;
    activityTypeSelect.appendChild(option);
  }
}

// Event listener when the page content has finished loading
document.addEventListener("DOMContentLoaded", async () => {
  const activityTypes = await fetchActivityTypes();
  populateActivityTypes(activityTypes);
});
  
  
  async function submitForm(event) {
    event.preventDefault();
  
  
  
  
    const startDateInput = document.getElementById("startDate").value;
    const endDateInput = document.getElementById("endDate").value;
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);
    if (!validateName()) {
      alert("Please fill your firstname and Lastname.");
      return;
    }
    else if(!validateStudentID()){
      alert("Please fill your studentID.");
      return;
    }
    else if(!validateEmail()){
      alert("Please fill your Email.");
      return;
    }
    else if(endDate <= startDate){
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
    const formData = new FormData(event.target);
    const data = {
      first_name: formData.get("fullname").split(" ")[0],
      last_name: formData.get("fullname").split(" ")[1],
      student_id: parseInt(formData.get("studentID")),
      email: formData.get("email"),
      title: formData.get("workTitle"),
      type_of_work_id: parseInt(formData.get("activityType")),
      academic_year: parseInt(formData.get("academicYear")) - 543,
      semester: parseInt(formData.get("semester")),
      start_date: formData.get("startDate"),
      end_date: formData.get("endDate"),
      location: formData.get("location"),
      description: formData.get("description")
    };
  
    console.log(data);
  
    try {
      const response = await fetch(`http://${window.location.hostname}:${port}/record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
  
        const formattedData = Object.entries(responseData.data)
          .map(([key, value]) => `"${key}": "${value}"`)
          .join("\n");
  
        document.getElementById("myForm").reset();
      } else {
        console.error("Failed to submit form data.");
  

        alert("Failed to submit form data. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred while submitting form data:", error);
    }
    
  
  
  
    document.getElementById("fullname").value.reset();
    document.getElementById("studentID").value.reset();
    document.getElementById("email").value.reset();
    
  } 
  
  
  document.getElementById("myForm").addEventListener("submit", submitForm);
  
  document.getElementById("fullname").addEventListener("input", validateName);
  document.getElementById("studentID").addEventListener("input", validateStudentID);
  document.getElementById("email").addEventListener("input", validateEmail);