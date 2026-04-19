const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const user = getUsers().find(
    (item) =>
      item.username.toLowerCase() === username.toLowerCase() &&
      item.password === password
  );

  if (!user) {
    alert("Invalid username or password.");
    return;
  }

  setCurrentUser(user.id);
  alert("Login successful.");
  window.location.href = "/dashboard";
});
