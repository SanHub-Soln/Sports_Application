// src/data/userdata.js

const USER_DATA_KEY = "user_data_db";

// get full user data object
export function getUserData(email) {
  const data = JSON.parse(localStorage.getItem(USER_DATA_KEY)) || {};
  return data[email] || { favorites: [] };
}

// save full user data object
export function saveUserData(email, userData) {
  const data = JSON.parse(localStorage.getItem(USER_DATA_KEY)) || {};
  data[email] = userData;
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
}

// toggle favorite
export function toggleFavorite(email, matchId) {
  const userData = getUserData(email);
  const favorites = userData.favorites.includes(matchId)
    ? userData.favorites.filter(id => id !== matchId)
    : [...userData.favorites, matchId];

  saveUserData(email, { ...userData, favorites });
  return favorites;
}
