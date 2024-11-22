const minLengthInput = document.getElementById("min-length");
const maxLengthInput = document.getElementById("max-length");
const uppercaseInput = document.getElementById("uppercase");
const specialCharsInput = document.getElementById("special-chars");

const form = document.querySelector("form");

const upperLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const lowerLetters = upperLetters.map((letter) => letter.toLowerCase());

const specialChars = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "[",
  "]",
  "{",
  "}",
  ";",
  ":",
  "'",
  '"',
  "\\",
  "|",
  ",",
  ".",
  "<",
  ">",
  "/",
  "?",
];

const generatePassword = (passwordBaseArray, length) => {
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * passwordBaseArray.length);
    password += passwordBaseArray[randomIndex];
  }
  return password;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const passwordBaseArray = [...lowerLetters];
  const minLength = parseInt(minLengthInput.value);
  const maxLength = parseInt(maxLengthInput.value);
  const includeUppercase = uppercaseInput.checked;
  const includeSpecialChars = specialCharsInput.checked;

  if (isNaN(minLength) || isNaN(maxLength)) {
    alert("Min length and max length must be numbers");
    return;
  }

  if (minLength > maxLength) {
    alert("Min length cannot be greater than max length");
    return;
  }

  if (includeUppercase) {
    passwordBaseArray.push(...upperLetters);
  }

  if (includeSpecialChars) {
    passwordBaseArray.push(...specialChars);
  }
  alert(
    generatePassword(
      passwordBaseArray,
      Math.floor(Math.random() * (maxLength - minLength + 1) + minLength),
    ),
  );
});
