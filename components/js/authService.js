const USERS_KEY = 'wt_users';
const SESSION_KEY = 'wt_session';

const DEFAULT_ADMIN = {
  id: 1,
  name: 'Admin User',
  email: 'admin@worktunnel.com',
  password: 'admin123',
  role: 'admin',
  createdAt: '2026-03-18',
};

const safeParse = (value, fallback) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const ensureUsers = () => {
  const stored = localStorage.getItem(USERS_KEY);
  const users = safeParse(stored, []);

  if (!Array.isArray(users) || users.length === 0) {
    localStorage.setItem(USERS_KEY, JSON.stringify([DEFAULT_ADMIN]));
    return [DEFAULT_ADMIN];
  }

  return users;
};

export const listUsers = () => ensureUsers();

export const registerUser = ({ name, email, password, role, adminKey }) => {
  const users = ensureUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const alreadyExists = users.some((user) => user.email.toLowerCase() === normalizedEmail);
  if (alreadyExists) {
    throw new Error('Account already exists for this email.');
  }

  if (role === 'admin' && adminKey !== 'WORKTUNNEL_ADMIN') {
    throw new Error('Invalid admin key.');
  }

  const newUser = {
    id: Date.now(),
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: role === 'admin' ? 'admin' : 'user',
    createdAt: new Date().toISOString().slice(0, 10),
  };

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
  return newUser;
};

export const loginUser = (email, password) => {
  const users = ensureUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find(
    (currentUser) =>
      currentUser.email.toLowerCase() === normalizedEmail && currentUser.password === password,
  );

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  setSession(user);
  return user;
};

export const setSession = (user) => {
  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  // Keep legacy dashboard auth in sync.
  localStorage.setItem('token', `local-token-${Date.now()}`);
  localStorage.setItem(
    'userData',
    JSON.stringify({
      username: user.name,
      email: user.email,
      profession: user.role === 'admin' ? 'Administrator' : 'User',
      joinDate: user.createdAt,
      avatar: user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    }),
  );

  return session;
};

export const getSession = () => {
  const stored = localStorage.getItem(SESSION_KEY);
  const session = safeParse(stored, null);
  return session && typeof session === 'object' ? session : null;
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
};

export const getCurrentUser = () => {
  return getSession();
};

export const logoutUser = () => {
  clearSession();
};
