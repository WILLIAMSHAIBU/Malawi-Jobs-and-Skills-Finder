import { searchRepositories } from "./github.js";
import { createRepositoryCard } from "./display.js";
import { initializeNavigation } from "./navigation.js";

const form = document.querySelector("#search-form");
const queryInput = document.querySelector("#query");
const languageSelect = document.querySelector("#language");
const searchButton = document.querySelector("#search-button");
const statusMessage = document.querySelector("#status");
const resultCount = document.querySelector("#result-count");
const results = document.querySelector("#results");

let activeRequest;
initializeNavigation();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  activeRequest?.abort();

  const controller = new AbortController();
  activeRequest = controller;
  searchButton.disabled = true;
  results.setAttribute("aria-busy", "true");
  statusMessage.classList.remove("status--error");
  statusMessage.textContent = "Searching GitHub repositories…";
  resultCount.textContent = "";
  results.replaceChildren();

  try {
    const repositories = await searchRepositories({
      query: queryInput.value,
      language: languageSelect.value,
      signal: controller.signal,
    });

    if (controller.signal.aborted) return;

    if (!repositories.length) {
      statusMessage.textContent = "No repositories found. Try a different keyword or language.";
      return;
    }

    statusMessage.textContent = "";
    resultCount.textContent = `${repositories.length} repositories`;
    results.append(...repositories.map(createRepositoryCard));
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return;
    statusMessage.classList.add("status--error");
    statusMessage.textContent =
      error instanceof Error ? error.message : "Something went wrong while searching GitHub.";
  } finally {
    if (activeRequest === controller) {
      activeRequest = undefined;
      searchButton.disabled = false;
      results.setAttribute("aria-busy", "false");
    }
  }
});
