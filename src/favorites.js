import { initializeNavigation } from "./navigation.js";
import { getFavorites, removeFavorite, clearFavorites } from "./storage.js";

initializeNavigation();

const status = document.querySelector("#favorites-status");
const results = document.querySelector("#favorites-results");
const clearButton = document.querySelector("#clear-favorites");

function renderFavorites() {
  const favorites = getFavorites();
  results.replaceChildren();

  if (!favorites.length) {
    status.textContent = "You have no saved items yet.";
    clearButton.disabled = true;
    return;
  }

  clearButton.disabled = false;
  status.textContent = `${favorites.length} saved ${favorites.length === 1 ? "item" : "items"}`;

  favorites.forEach((item) => {
    const card = document.createElement("article");
    card.className = "resource-card";

    const owner = document.createElement("p");
    owner.className = "card-owner";
    owner.textContent = item.type === "job" ? "Saved remote job" : "Saved programming resource";

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = item.title;

    const name = document.createElement("p");
    name.className = "card-description";
    name.textContent = item.name;

    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = item.description || "No description available.";

    const actions = document.createElement("div");
    actions.className = "card-actions";
    const link = document.createElement("a");
    link.className = "card-link";
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = item.type === "job" ? "View job" : "Open repository";

    const removeButton = document.createElement("button");
    removeButton.className = "favorite-button";
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      removeFavorite(item.type, item.id);
      renderFavorites();
    });

    actions.append(link, removeButton);
    card.append(owner, title, name, description, actions);
    results.append(card);
  });
}

clearButton.addEventListener("click", () => {
  clearFavorites();
  renderFavorites();
});

document.addEventListener("favorites-changed", renderFavorites);
renderFavorites();
