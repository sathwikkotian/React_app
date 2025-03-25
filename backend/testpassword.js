const bcrypt = require("bcryptjs");

const enteredPassword = "admin@1234"; // Password entered in login
const storedHashedPassword = "$2b$10$2d8taHV8S8kY1GRncvYfnueeR3Z6.yQ0LcEIT.y7XtpDlOUoHKYNK"
; // Hashed password from MongoDB

async function checkPassword() {
  const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
  console.log("Password Match:", isMatch);
}

checkPassword();
