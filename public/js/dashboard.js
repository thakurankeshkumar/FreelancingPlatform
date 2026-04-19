const portfolioForm = document.getElementById("portfolio-form");
const welcomeText = document.getElementById("welcome-text");
const logoutBtn = document.getElementById("logout-btn");

const currentUser = getCurrentUser();
if (!currentUser) {
  window.location.href = "/login";
}

welcomeText.textContent = `Logged in as ${currentUser.username}`;

function loadPortfolio() {
  const existingPortfolio = getPortfolios().find(
    (item) => item.userId === currentUser.id
  );

  if (!existingPortfolio) return;

  document.getElementById("full-name").value = existingPortfolio.fullName;
  document.getElementById("headline").value = existingPortfolio.headline;
  document.getElementById("industry").value = existingPortfolio.industry;
  document.getElementById("service-type").value = existingPortfolio.serviceType;
  document.getElementById("skills").value = existingPortfolio.skills.join(", ");
  document.getElementById("sample-link").value = existingPortfolio.sampleLink;
  document.getElementById("testimonial").value = existingPortfolio.testimonial;
}

portfolioForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = document.getElementById("full-name").value.trim();
  const headline = document.getElementById("headline").value.trim();
  const industry = document.getElementById("industry").value.trim();
  const serviceType = document.getElementById("service-type").value.trim();
  const skillsInput = document.getElementById("skills").value.trim();
  const sampleLink = document.getElementById("sample-link").value.trim();
  const testimonial = document.getElementById("testimonial").value.trim();

  const skills = skillsInput
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const portfolios = getPortfolios();
  const existingIndex = portfolios.findIndex(
    (item) => item.userId === currentUser.id
  );

  const portfolioData = {
    id: existingIndex >= 0 ? portfolios[existingIndex].id : generateId("pf"),
    userId: currentUser.id,
    username: currentUser.username,
    fullName,
    headline,
    industry,
    serviceType,
    skills,
    sampleLink,
    testimonial
  };

  if (existingIndex >= 0) {
    portfolios[existingIndex] = portfolioData;
  } else {
    portfolios.push(portfolioData);
  }

  writeStorage(STORAGE_KEYS.PORTFOLIOS, portfolios);
  alert("Portfolio saved successfully.");
});

logoutBtn.addEventListener("click", () => {
  clearCurrentUser();
  window.location.href = "/login";
});

loadPortfolio();
