const USERS_KEY = "users_db";

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function updateUserFavorites(email, favorites) {
  const users = getUsers();
  const updated = users.map(u =>
    u.email === email ? { ...u, favorites } : u
  );
  saveUsers(updated);
}

export function getUserFavorites(email) {
  const user = getUsers().find(u => u.email === email);
  return user?.favorites || [];
}
