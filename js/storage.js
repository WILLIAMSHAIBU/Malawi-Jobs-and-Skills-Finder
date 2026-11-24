const KEY = "malawi-jobs-skills-favorites";

export function getFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function saveFavorite(item) {
  const favorites = getFavorites();
  if (!favorites.some((saved) => saved.type === item.type && saved.id === item.id)) {
    localStorage.setItem(KEY, JSON.stringify([...favorites, item]));
  }
}

export function removeFavorite(type, id) {
  const favorites = getFavorites().filter((item) => !(item.type === type && item.id === id));
  localStorage.setItem(KEY, JSON.stringify(favorites));
}

export function clearFavorites() {
  localStorage.removeItem(KEY);
}
