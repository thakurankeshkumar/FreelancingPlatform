const currentUserForNav = getCurrentUser();
const authOnlyItems = document.querySelectorAll("[data-auth-only='true']");
const guestOnlyItems = document.querySelectorAll("[data-guest-only='true']");
const navLogoutBtn = document.getElementById("logout-btn");

if (currentUserForNav) {
  authOnlyItems.forEach((item) => {
    item.style.display = "inline-flex";
  });

  guestOnlyItems.forEach((item) => {
    item.style.display = "none";
  });
} else {
  authOnlyItems.forEach((item) => {
    item.style.display = "none";
  });

  guestOnlyItems.forEach((item) => {
    item.style.display = "inline-flex";
  });
}

if (navLogoutBtn) {
  navLogoutBtn.addEventListener("click", () => {
    clearCurrentUser();
    window.location.href = "/login";
  });
}
