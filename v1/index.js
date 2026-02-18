// Scroll animation configuration
let scaleFactor = 1;
let modalImage = document.getElementById("thanks-modal-content-img");
let intervalId;

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

let revealableContainers = document.querySelectorAll(".revealable");

// Function to reveal elements on scroll
const reveal = () => {
  const windowHeight = window.innerHeight;

  // Loop through the revealable containers
  for (let i = 0; i < revealableContainers.length; i++) {
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    // Check if the container is within the viewport
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add("active");
    } else {
      revealableContainers[i].classList.remove("active");
    }
  }
};

// Listen for scroll events to trigger the reveal function
window.addEventListener('scroll', reveal);

// Function to reduce motion animation effects
let reduceMotionButton = document.getElementById('reduce-motion-button');
const reduceMotion = () => {
  // Adjust animation parameters for reduced motion
  animation.revealDistance = 50;
  animation.transitionDuration = '0s';
  animation.transitionDelay = '0s';

  // Apply reduced motion to the revealable containers
  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transitionDelay = animation.transitionDelay;
    revealableContainers[i].style.transitionDuration = animation.transitionDuration;
  }
};

// Theme button for toggling dark mode
let themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};

// Event listener for toggling dark mode
themeButton.addEventListener("click", toggleDarkMode);

// Function to validate the petition form
const validateForm = () => {
  // Initialize error flag and form elements
  let containsErrors = false;
  let petitionInputs = document.getElementById("sign-petition").elements;

  // Create object for person's details
  let person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value,
  };

  // Loop through the form inputs for validation
  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add("error");
    } else {
      petitionInputs[i].classList.remove("error");
    }
  }

  // Validate the email format
  const email = document.getElementById("email");
  if (!email.value.includes(".com")) {
    containsErrors = true;
    email.classList.add("error");
  } else {
    email.classList.remove("error");
  }

  // If no errors, add signature, toggle modal, and reset form fields
  if (containsErrors === false) {
    addSignature(person);
    toggleModal(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
};

// Event listener for form submission
let signNowButton = document.getElementById("sign-now-button");
signNowButton.addEventListener("click", validateForm);

// Counter for petition signatures and display
let count = 3;
const addSignature = (person) => {
  // Create new signature paragraph
  const signature = document.createElement("p");
  signature.innerText = `🖊️ ${person.name} from ${person.hometown} supports this.`;
  const div = document.querySelector(".signatures");
  div.appendChild(signature);

  // Increment signature count
  const counter = document.getElementById("counter");
  counter.remove();
  count++;

  // Update signature count display
  const newCounter = document.createElement("p");
  newCounter.setAttribute("id", "counter");
  newCounter.innerText = `️ ${count} people have signed this petition and support this cause.`;
  div.appendChild(newCounter);
};

// Function to toggle the modal popup
const toggleModal = (person) => {
  const modal = document.getElementById("thanks-modal");
  const modalContent = document.getElementById("thanks-modal-content");
  modalContent.textContent = `️Thank you, ${person.name}, for joining the fight from ${person.hometown}!`;
  modal.style.display = "flex";
  // Calculate vertical and horizontal center positions
  const verticalCenter = (window.innerHeight - modal.offsetHeight) / 2;
  const horizontalCenter = (window.innerWidth - modal.offsetWidth) / 2;

  // Set modal position to the center of the screen
  modal.style.top = `${verticalCenter}px`;
  modal.style.left = `${horizontalCenter}px`;

  // Hide modal after a timeout and set interval for image animation
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000);

  intervalId = setInterval(() => {
    scaleImage();
  }, 500);
};

// Function to animate the modal image
const scaleImage = () => {
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }
  modalImage.style.transform = `scale(${scaleFactor})`;
};

// Function to close the modal
const closeModal = () => {
  const modal = document.getElementById("thanks-modal");
  modal.style.display = "close"; // Change the modal display style to 'none' to hide it
};

// Event listener for the close modal button
const modalButton = document.getElementById("thanks-modal-button");
modalButton.addEventListener("click", closeModal);
