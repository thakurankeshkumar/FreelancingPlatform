const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value.trim();

  if (!username || !password) {
    alert("Please enter username and password.");
    return;
  }

  const users = getUsers();
  const alreadyExists = users.some(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );

  if (alreadyExists) {
    alert("Username already exists.");
    return;
  }

  users.push({
    id: generateId("user"),
    username,
    password
  });

  writeStorage(STORAGE_KEYS.USERS, users);
  registerForm.reset();
  alert("Registration successful. Redirecting to login.");
  window.location.href = "/login";
});
