const STORAGE_KEYS = {
    USERS: "opb_users",
    CURRENT_USER: "opb_current_user_id",
    PORTFOLIOS: "opb_portfolios"
};

const authSection = document.getElementById("auth-section");
const dashboardSection = document.getElementById("dashboard-section");
const welcomeText = document.getElementById("welcome-text");

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");

const portfolioForm = document.getElementById("portfolio-form");
const portfolioList = document.getElementById("portfolio-list");

const filterIndustry = document.getElementById("filter-industry");
const filterService = document.getElementById("filter-service");
const filterSkill = document.getElementById("filter-skill");
const clearFiltersBtn = document.getElementById("clear-filters");

function readStorage(key, fallback) {
    const value = localStorage.getItem(key);
    if (!value) return fallback;

    try {
        return JSON.parse(value);
    } catch (error) {
        return fallback;
    }
}

function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getUsers() {
    return readStorage(STORAGE_KEYS.USERS, []);
}

function getPortfolios() {
    return readStorage(STORAGE_KEYS.PORTFOLIOS, []);
}

function getCurrentUserId() {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
}

function getCurrentUser() {
    const currentUserId = getCurrentUserId();
    if (!currentUserId) return null;

    return getUsers().find((user) => user.id === currentUserId) || null;
}

function setCurrentUser(id) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, id);
}

function clearCurrentUser() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

function showMessage(message) {
    window.alert(message);
}

function generateId(prefix) {
    return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (!username || !password) {
        showMessage("Please fill username and password.");
        return;
    }

    const users = getUsers();
    const alreadyExists = users.some(
        (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (alreadyExists) {
        showMessage("Username already exists. Please choose another username.");
        return;
    }

    const newUser = {
        id: generateId("user"),
        username,
        password
    };

    users.push(newUser);
    writeStorage(STORAGE_KEYS.USERS, users);

    registerForm.reset();
    showMessage("Account created successfully. Now login.");
}

function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    const user = getUsers().find(
        (item) =>
            item.username.toLowerCase() === username.toLowerCase() &&
            item.password === password
    );

    if (!user) {
        showMessage("Invalid username or password.");
        return;
    }

    setCurrentUser(user.id);
    loginForm.reset();
    updateAuthUI();
    prefillPortfolioForm();
    renderPortfolios();
}

function handleLogout() {
    clearCurrentUser();
    updateAuthUI();
}

function updateAuthUI() {
    const currentUser = getCurrentUser();

    if (currentUser) {
        authSection.classList.add("hidden");
        dashboardSection.classList.remove("hidden");
        welcomeText.textContent = `Logged in as ${currentUser.username}`;
    } else {
        authSection.classList.remove("hidden");
        dashboardSection.classList.add("hidden");
        welcomeText.textContent = "";
        portfolioForm.reset();
    }
}

function prefillPortfolioForm() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const existingPortfolio = getPortfolios().find(
        (item) => item.userId === currentUser.id
    );

    if (!existingPortfolio) {
        portfolioForm.reset();
        return;
    }

    document.getElementById("full-name").value = existingPortfolio.fullName;
    document.getElementById("headline").value = existingPortfolio.headline;
    document.getElementById("industry").value = existingPortfolio.industry;
    document.getElementById("service-type").value = existingPortfolio.serviceType;
    document.getElementById("skills").value = existingPortfolio.skills.join(", ");
    document.getElementById("sample-link").value = existingPortfolio.sampleLink;
    document.getElementById("testimonial").value = existingPortfolio.testimonial;
}

function handlePortfolioSave(event) {
    event.preventDefault();

    const currentUser = getCurrentUser();
    if (!currentUser) {
        showMessage("Please login first.");
        return;
    }

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
    showMessage("Portfolio saved successfully.");
    renderPortfolios();
}

function matchesFilter(value, filterValue) {
    if (!filterValue) return true;
    return value.toLowerCase().includes(filterValue.toLowerCase());
}

function renderPortfolios() {
    const portfolios = getPortfolios();

    const industryFilter = filterIndustry.value.trim();
    const serviceFilter = filterService.value.trim();
    const skillFilter = filterSkill.value.trim();

    const filtered = portfolios.filter((item) => {
        const skillsText = item.skills.join(" ");

        return (
            matchesFilter(item.industry, industryFilter) &&
            matchesFilter(item.serviceType, serviceFilter) &&
            matchesFilter(skillsText, skillFilter)
        );
    });

    if (filtered.length === 0) {
        portfolioList.innerHTML =
            '<p class="empty">No portfolios found. Add one or change filters.</p>';
        return;
    }

    portfolioList.innerHTML = filtered
        .map(
            (item) => `
      <article class="portfolio-item">
        <h3>${item.fullName} <span class="small">(@${item.username})</span></h3>
        <p class="meta"><strong>${item.headline}</strong></p>
        <p class="meta">Industry: ${item.industry}</p>
        <p class="meta">Service: ${item.serviceType}</p>
        <p class="meta">Skills: ${item.skills.join(", ")}</p>
        <p class="meta">Sample: <a href="${item.sampleLink}" target="_blank" rel="noreferrer">View Work</a></p>
        <p class="small">Testimonial: ${item.testimonial || "No testimonial added"}</p>
      </article>
    `
        )
        .join("");
}

function clearFilters() {
    filterIndustry.value = "";
    filterService.value = "";
    filterSkill.value = "";
    renderPortfolios();
}

registerForm.addEventListener("submit", handleRegister);
loginForm.addEventListener("submit", handleLogin);
logoutBtn.addEventListener("click", handleLogout);
portfolioForm.addEventListener("submit", handlePortfolioSave);

filterIndustry.addEventListener("input", renderPortfolios);
filterService.addEventListener("input", renderPortfolios);
filterSkill.addEventListener("input", renderPortfolios);
clearFiltersBtn.addEventListener("click", clearFilters);

updateAuthUI();
prefillPortfolioForm();
renderPortfolios();
