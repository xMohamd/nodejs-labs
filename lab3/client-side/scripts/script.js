const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const mobileInput = document.getElementById("mobile");
const addressInput = document.getElementById("address");
const emailInput = document.getElementById("email");
const nameError = document.getElementById("nameError");
const mobileError = document.getElementById("mobileError");
const addressError = document.getElementById("addressError");
const emailError = document.getElementById("emailError");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  hideErrors();

  if (nameInput.value.length < 4) {
    nameError.style.display = "block";
  }

  if (mobileInput.value.length !== 11) {
    mobileError.style.display = "block";
  }

  if (addressInput.value === "") {
    addressError.style.display = "block";
  }

  if (!isValidEmail(emailInput.value)) {
    emailError.style.display = "block";
  }

  if (
    nameInput.value.length >= 4 &&
    mobileInput.value.length === 11 &&
    addressInput.value !== "" &&
    isValidEmail(emailInput.value)
  ) {
    form.submit();
  }
});

function hideErrors() {
  nameError.style.display = "none";
  mobileError.style.display = "none";
  addressError.style.display = "none";
  emailError.style.display = "none";
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
