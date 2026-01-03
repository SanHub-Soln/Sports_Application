import { getUsers, saveUsers } from "../data/Users";

// simple hash (CodePlay safe)
function hashPassword(password) {
  return btoa(password); // base64 (demo purpose)
}

// fake JWT
function generateJWT(email) {
  return btoa(JSON.stringify({ email, time: Date.now() }));
}

export async function register({ name, email, password }) {
  const users = getUsers();

  const existing = users.find(u => u.email === email);
  if (existing) {
    throw new Error("User already exists");
  }

  const newUser = {
    name,
    email,
    password: hashPassword(password),
  };

  users.push(newUser);
  saveUsers(users);

  return {
    token: generateJWT(email),
    user: { name, email }
  };
}

export async function login({ email, password }) {
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    throw new Error("create an account by sign up, username not found");
  }

  if (user.password !== hashPassword(password)) {
    throw new Error("username or password is incorrect");
  }

  return {
    token: generateJWT(email),
    user: { name: user.name, email: user.email }
  };
}
