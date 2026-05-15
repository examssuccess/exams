var presentDate, presentHour, greeting;

presentDate = new Date();
presentDate.getDate();

presentHour = presentDate.getHours();

if (presentHour < 12) {
  greeting = "Good morning.";
} else if (presentHour >= 12 && presentHour < 16) {
  greeting = "Good afternoon.";
} else if (presentHour >= 16 && presentHour <= 24) {
  greeting = "Good evening.";
}

document.getElementById("greetings").innerHTML = greeting;

// Solutions to the Questions
function solutions(solution) {
  var e = document.getElementById(solution);
  if (e.style.display === "block" || e.style.display === "")
    e.style.display = "none";
  else e.style.display = "block";
}

// Answers to the Questions
function answers(answer) {
  var e = document.getElementById(answer);
  if (e.style.display === "block" || e.style.display === "")
    e.style.display = "none";
  else e.style.display = "block";
}

// Script to open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}

// Contact Form
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});
