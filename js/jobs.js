import { searchJobs } from "./remotive.js";
import { createJobCard } from "./display.js";
import { initializeNavigation } from "./navigation.js";

const form = document.querySelector("#job-search-form");
const queryInput = document.querySelector("#job-query");
const categorySelect = document.querySelector("#job-category");
const button = document.querySelector("#job-search-button");
const status = document.querySelector("#job-status");
const count = document.querySelector("#job-result-count");
const results = document.querySelector("#job-results");

let activeRequest;
initializeNavigation();
loadJobs();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  loadJobs();
});

async function loadJobs() {
  activeRequest?.abort();
  const controller = new AbortController();
  activeRequest = controller;
  button.disabled = true;
  results.setAttribute("aria-busy", "true");
  status.classList.remove("status--error");
  status.textContent = "Loading remote jobs…";
  count.textContent = "";
  results.replaceChildren();

  try {
    const jobs = await searchJobs({
      query: queryInput.value,
      category: categorySelect.value,
      signal: controller.signal,
    });
    if (controller.signal.aborted) return;
    if (!jobs.length) {
      status.textContent = "No jobs found. Try another keyword or category.";
      return;
    }
    status.textContent = "";
    count.textContent = `${jobs.length} jobs`;
    results.append(...jobs.map(createJobCard));
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return;
    status.classList.add("status--error");
    status.textContent = error instanceof Error ? error.message : "Jobs could not be loaded.";
  } finally {
    if (activeRequest === controller) {
      activeRequest = undefined;
      button.disabled = false;
      results.setAttribute("aria-busy", "false");
    }
  }
}
