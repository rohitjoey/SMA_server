module.exports.validateRegisterInput = (
  username,
  password,
  confirmPassword,
  email
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username cannot be empty";
  }

  if (password === "") {
    errors.password = "Password cannot be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (email.trim() === "") {
    errors.email = "Email cannot be empty";
  } else {
    const regEx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!email.match(regEx)) {
      errors.email = "Email address is not valid";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username cannot be empty";
  }

  if (password === "") {
    errors.password = "Password cannot be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
