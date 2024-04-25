


function home(){
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('mainContent').style.display = 'block';
  document.getElementById('aboutpage').style.display = 'none'
  document.getElementById('contactcontent').style.display = 'none'
}
function showContact(){
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('mainContent').style.display = 'none';
  document.getElementById('aboutpage').style.display = 'none'
  document.getElementById('contactcontent').style.display = 'block'
}
function about(){
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('mainContent').style.display = 'none';
          document.getElementById('contactcontent').style.display = 'none'
          document.getElementById('aboutpage').style.display = 'block'
}

document.getElementById('togglePassword').addEventListener('click', function () {
// Find the password input
const passwordInput = document.getElementById('password');
// Check the current type and toggle
const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
passwordInput.setAttribute('type', type);
// Toggle the button text/icon
this.textContent = type === 'password' ? 'Show' : 'Hide';
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
          document.getElementById('loadingSpinner').style.display = 'none'; // Hide loading spinner in case of an error
      })
      .finally(() => {
          document.getElementById('loadingSpinner').style.display = 'none'; // Hide loading spinner
      });
}

// Event listener for the "Load Data" button click
document.getElementById('loadData').addEventListener('click', loadData);

// Event listener for the Enter key on the nameInput field
document.getElementById('nameInput').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
      loadData();
  }
});

document.getElementById('viewFullTable').addEventListener('click', function () {
// Show the full table
fetch(url)
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n').slice(1); // Skip header row
    displayData(rows);
  })
  .catch(error => {
    console.error('Error:', error);
  });
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