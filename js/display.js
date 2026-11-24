import { getFavorites, saveFavorite, removeFavorite } from "./storage.js";

export function createJobCard(job) {
  const card = document.createElement("article");
  card.className = "resource-card";

  const company = document.createElement("p");
  company.className = "card-owner";
  company.textContent = job.company_name || "Company not specified";

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = job.title;

  const description = document.createElement("p");
  description.className = "card-description";
  description.textContent = cleanText(job.description).slice(0, 180) + (cleanText(job.description).length > 180 ? "…" : "");

  const metadata = document.createElement("div");
  metadata.className = "card-meta";
  addMeta(metadata, job.category || "General");
  addMeta(metadata, job.job_type || "Remote");

  const actions = document.createElement("div");
  actions.className = "card-actions";
  const applyLink = document.createElement("a");
  applyLink.className = "card-link";
  applyLink.href = job.url;
  applyLink.target = "_blank";
  applyLink.rel = "noopener noreferrer";
  applyLink.textContent = "View job";

  const favoriteButton = document.createElement("button");
  favoriteButton.className = "favorite-button";
  favoriteButton.type = "button";
  const item = normalizeJob(job);
  setFavoriteLabel(favoriteButton, item);
  favoriteButton.addEventListener("click", () => toggleFavorite(favoriteButton, item));

  actions.append(applyLink, favoriteButton);
  card.append(company, title, description, metadata, actions);
  return card;
}

export function createRepositoryCard(repository) {
  const card = document.createElement("article");
  card.className = "resource-card";

  const owner = document.createElement("p");
  owner.className = "card-owner";
  owner.textContent = `by ${repository.owner?.login || "Unknown owner"}`;

  const title = document.createElement("h3");
  title.className = "card-title";
  const link = document.createElement("a");
  link.href = repository.html_url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = repository.name;
  title.append(link);

  const description = document.createElement("p");
  description.className = "card-description";
  description.textContent = repository.description || "No description provided.";

  const metadata = document.createElement("div");
  metadata.className = "card-meta";
  addMeta(metadata, repository.language || "Language not specified");
  addMeta(metadata, `★ ${formatCount(repository.stargazers_count)} stars`);
  addMeta(metadata, `⑂ ${formatCount(repository.forks_count)} forks`);

  const actions = document.createElement("div");
  actions.className = "card-actions";
  const repositoryLink = document.createElement("a");
  repositoryLink.className = "card-link";
  repositoryLink.href = repository.html_url;
  repositoryLink.target = "_blank";
  repositoryLink.rel = "noopener noreferrer";
  repositoryLink.textContent = "Open repository";

  const item = normalizeRepository(repository);
  const favoriteButton = document.createElement("button");
  favoriteButton.className = "favorite-button";
  favoriteButton.type = "button";
  setFavoriteLabel(favoriteButton, item);
  favoriteButton.addEventListener("click", () => toggleFavorite(favoriteButton, item));

  actions.append(repositoryLink, favoriteButton);
  card.append(owner, title, description, metadata, actions);
  return card;
}

export function normalizeJob(job) {
  return {
    type: "job",
    id: String(job.id),
    title: job.title,
    name: job.company_name || "Company not specified",
    description: cleanText(job.description).slice(0, 220),
    url: job.url,
    category: job.category || "General",
  };
}

export function normalizeRepository(repository) {
  return {
    type: "repository",
    id: String(repository.id),
    title: repository.name,
    name: repository.owner?.login || "Unknown owner",
    description: repository.description || "No description provided.",
    url: repository.html_url,
    language: repository.language || "Language not specified",
  };
}

function toggleFavorite(button, item) {
  const isSaved = getFavorites().some((saved) => saved.type === item.type && saved.id === item.id);
  if (isSaved) removeFavorite(item.type, item.id);
  else saveFavorite(item);
  setFavoriteLabel(button, item);
  document.dispatchEvent(new CustomEvent("favorites-changed"));
}

function setFavoriteLabel(button, item) {
  const isSaved = getFavorites().some((saved) => saved.type === item.type && saved.id === item.id);
  button.textContent = isSaved ? "Remove saved" : "Save";
  button.setAttribute("aria-pressed", String(isSaved));
  button.setAttribute("aria-label", `${isSaved ? "Remove" : "Save"} ${item.title}`);
}

function addMeta(container, text) {
  const span = document.createElement("span");
  span.textContent = text;
  container.append(span);
}

function cleanText(value) {
  const template = document.createElement("template");
  template.innerHTML = String(value || "");
  return template.content.textContent?.replace(/\s+/g, " ").trim() || "";
}

function formatCount(value) {
  return new Intl.NumberFormat().format(value || 0);
}
