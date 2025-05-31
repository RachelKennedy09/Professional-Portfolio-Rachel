// step 1. grab your html

//step 1.5: create any global variables that you need

//step 2. write your functions (aka interactivity)

//step 3: setup your event listener (hamburger menu, )

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close the menu when any nav link is clicked
const navLinkItems = document.querySelectorAll("#navLinks a");

navLinkItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show"); // hide menu
  });
});


// Dog "Objects" - Meet our furry clients
// Dog Object Array (uses variables, strings, booleans, JSON like structure)

const dogs = [
  {
    name: "Rammi",
    age: "two months",
    breed: "Rottweiler Shepherd",
    lovesWater: true,
    activity: "Playing in the river",
    image: "images/Rami.jpeg",
  },
  {
    name: "Luna",
    age: 4,
    breed: "Husky",
    lovesWater: false,
    activity: "Zooming through snow",
    image: "images/LunaHusky.jpeg",
  },
  {
    name: "Maple",
    age: 1,
    breed: "Golden Retriever",
    lovesWater: true,
    activity: "Chasing sticks",
    image: "images/MapleShephard.jpeg",
  },
];

// Function to render dog cards on the page
function renderDogs(dogArray) {
  const container = document.getElementById("dogCards");
  container.innerHTML = ""; //clearing content inside if re-rendering

  dogArray.forEach(function (dog) {
    let waterText = dog.lovesWater ? "loves water!" : "avoids water";

    const card = document.createElement("div");
    card.classList.add("dog-card");
    card.innerHTML = `
    <img src="${dog.image}" alt=${dog.name}" class="dog-img">
      <h3>${dog.name}</h3>
      <p>Age: ${dog.age}</p>
      <p>Breed: ${dog.breed}</p>
      <p>Activity: ${dog.activity}</p>
      <p><strong>${dog.name}</strong> ${waterText}</p>
    `;
    container.appendChild(card);
  });
}

// Call function to render dog cards
renderDogs(dogs);

// Dog-Besties java script

//array of team members, JSON structure

const teamMembers = [
  {
    name: "Rachel",
    image: "images/RachandRami.jpeg",
    bio: "Mountain mama, trail guide, and Rami's best friend. Loves walking along the river with a fur bestie!",
    rating: 5,
    review: "Rachel is amazing! My dog never wants to come home. ",
  },
  {
    name: "Jake",
    image: "images/JakeandLuna.jpeg",
    bio: "Big heart, big passion. Specializes in high-energy pups and snow walks.",
    rating: 5,
    review: "Jake took my husky on a trail run and she came back blissed out!",
  },
];

//function to display the team members profiles

function renderTeam(teamArray) {
  const teamContainer = document.getElementById("teamCards");
  teamContainer.innerHTML = ""; //clearing content inside if re-rendering

  teamArray.forEach(function (member) {
    const card = document.createElement("div");
    card.classList.add("team-card");

    const stars = "⭐".repeat(member.rating); //practicing repeat

    card.innerHTML = `
  <img src="${member.image}" alt="${member.name}" class="team-img" />
  <h3>${member.name}</h3>
  <p>${member.bio}</p>
  <p><strong>Client Review:</strong><br>"${member.review}"</p>
  <p class="stars">${stars}</p>
`;

    teamContainer.appendChild(card); //adding card to the HTML container
  });
}

renderTeam(teamMembers); //calling it

//BOOKING INTERACTIVITY

const bookingForm = document.getElementById("booking-form"); // grabbing html step 1, and creating
// global variables  (global scope)

//writing functions(interactivity) and defines the behavior when the form is submitted
//collects values, checks if fields are filled, and shows a message
function handleBookingSubmit(event) {
  event.preventDefault(); // Stop page from refreshing

  const ownerName = document.getElementById("owner-name").value;
  const dogName = document.getElementById("dog-name").value;
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const notes = document.getElementById("notes").value;

  if (ownerName && dogName && service && date) {
    alert(
      `Thank you, ${ownerName}! Your ${service} booking for ${dogName} on ${date} is confirmed! 🐾`
    );
    bookingForm.reset(); // Clear the form after submission
  } else {
    alert("Please fill out all required fields.");
  }
}
//adding event listener clear and readable with handleBookingSubmit
bookingForm.addEventListener("submit", handleBookingSubmit);

//APPLY INTERACTIVITY

// STEP 1: Grab your HTML
const applyForm = document.getElementById("apply-form");

// STEP 2: Write your function
function handleApplySubmit(event) {
  event.preventDefault();

  const applicantName = document.getElementById("applicant-name").value;
  const email = document.getElementById("email").value;
  const about = document.getElementById("about").value;
  const photo = document.getElementById("photo").files[0];

  if (applicantName && email && about) {
    alert(`Thanks ${applicantName}! Your application has been received. 🐾`);
    applyForm.reset();
  } else {
    alert("Please fill out all required fields.");
  }
}

// STEP 3: Event listener
applyForm.addEventListener("submit", handleApplySubmit);
