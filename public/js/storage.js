const STORAGE_KEYS = {
  USERS: "opb_users",
  CURRENT_USER: "opb_current_user_id",
  PORTFOLIOS: "opb_portfolios"
};

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

function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}
