function hideAllSections() {
  var sections = ['loginPage', 'mainContent', 'aboutpage', 'contactcontent','dataenter'];

  sections.forEach(function(id) {
    var section = document.getElementById(id);
    if (section) {
      section.style.display = 'none';
    }
  });
}
function trial(){
  document.getElementById('loginPage').style.display = 'none';
          document.getElementById('mainContent').style.display = 'block';
          
          document.getElementById('navigation').style.display = 'block';
}

function showdata(){
  hideAllSections();
  document.getElementById('dataenter').style.display = 'block';
}

function showhome(){
  hideAllSections();
  document.getElementById('mainContent').style.display = 'block';
  
}
function showContact(){
  hideAllSections();
  document.getElementById('contactcontent').style.display = 'block'
}
function showabout(){
  hideAllSections();
          document.getElementById('aboutpage').style.display = 'block'
}

document.getElementById('togglePassword').addEventListener('click', function () {
// Find the password input
var passwordInput = document.getElementById('password');
var toggle=document.getElementById('togglePassword');
if(passwordInput.type === 'password'){
  passwordInput.type = 'text';
  toggle.textContent = 'hide';
}
else if(passwordInput.type === 'text'){
  passwordInput.type = 'password';
  toggle.textContent = 'show';
}
});

//enter the data
var form = document.getElementById('sheetdb-form');
form.addEventListener("submit", e => {
  e.preventDefault();
  fetch(form.action, {
      method : "POST",
      body: new FormData(document.getElementById("sheetdb-form")),
  }).then(
      response => response.json()
  ).then((html) => {
   
    alert('success')
  });
});

// Function to handle login
document.getElementById('loginForm').addEventListener('submit', function(event) {
event.preventDefault(); // Prevent the default form submission

// Get the entered username and password
var enteredUsername = document.getElementById('username').value.trim().toLowerCase();
var enteredPassword = document.getElementById('password').value;

// URL to your CSV file containing usernames and passwords
const credentialsUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRznvbcX5u438VEHag85Q6DlJW4LbrIsvx2Qv8zQCcuPDLT2q4DmluS7ymTeoMeHSab1jkEUBmi_cT1/pub?output=csv";

fetch(credentialsUrl)
  .then(response => response.text())
  .then(data => {
      const rows = data.split('\n').slice(1); // Skip header row
      let validCredentials = false;
      rows.forEach(row => {
          const [username, password] = row.split(',').map(cell => cell.trim());
          if (username.toLowerCase() === enteredUsername && password === enteredPassword) {
              validCredentials = true;
          }
      });

      if (validCredentials) {
          // Hide the login page and show the main content
          document.getElementById('loginPage').style.display = 'none';
          document.getElementById('mainContent').style.display = 'block';
          
          document.getElementById('navigation').style.display = 'block';


      } else {
          alert('Invalid username or password. Please try again.');
      }
  })
  .catch(error => {
      console.error('Error fetching or parsing credentials:', error);
  });
});


// Function to load data
function loadData() {
  const nameInput = document.getElementById('nameInput').value.trim().toLowerCase();
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRr9KFdCWZkAT5KQq3DkQYZYQdTsjtQ7YI_U1-vasToAgPmrDCmOIRLxIQEMTllH2a9KTI5b0SWXZmG/pub?output=csv';

  if (nameInput === "") {
      document.getElementById('invalidInputMsg').style.display = 'block';
      document.getElementById('dataTable').innerHTML = ''; // Clear table on invalid input
      
      return;
  } 
  else {
      document.getElementById('invalidInputMsg').style.display = 'none';
  }

 

  fetch(url)
      .then(response => response.text())
      .then(data => {
          const rows = data.split('\n').slice(1); // Skip header row
          const filteredRows = rows.filter(row => {
              const cells = row.split(',');
              // Assuming the 'Name' is in the first column
              return cells[0].trim().toLowerCase() === nameInput;
          });
          if (filteredRows.length === 0) {
            document.getElementById('invalidInputMsg').style.display = 'block';
        }
             else {

               displayData(filteredRows);
              }
      })
      .catch(error => {
          console.error('Error:', error);
         
      })
      
}



// Event listener for the Enter key on the nameInput field
document.getElementById('nameInput').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
      loadData();
  }
});


function displayData(rows) {
let html = '<table><tr><th>Name</th><th>Dept Name</th><th>Complaint</th><th>Treatment</th><th>prescribed by</th><th>Date</th><th>Time</th></tr>';
rows.forEach(row => {
  const cells = row.split(',');
  html += `<tr><td>${cells[0]}</td><td>${cells[1]}</td><td>${cells[2]}</td><td>${cells[3]}</td><td>${cells[4]}</td><td>${cells[5]}</td><td>${cells[6]}</td></tr>`;
});
html += '</table>';
document.getElementById('dataTable').innerHTML = html;
}