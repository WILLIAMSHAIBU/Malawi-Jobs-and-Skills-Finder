import { initializeNavigation } from "./navigation.js";
import { searchJobs } from "./remotive.js";
import { searchRepositories } from "./github.js";
import { createJobCard, createRepositoryCard } from "./display.js";

initializeNavigation();

async function loadFeaturedJobs() {
  const status = document.querySelector("#featured-jobs-status");
  const container = document.querySelector("#featured-jobs");
  try {
    const jobs = await searchJobs({ category: "software-dev" });
    container.replaceChildren(...jobs.slice(0, 3).map(createJobCard));
    status.textContent = jobs.length ? "" : "No featured jobs are available right now.";
  } catch (error) {
    status.classList.add("status--error");
    status.textContent = error instanceof Error ? error.message : "Jobs could not be loaded.";
  } finally {
    container.setAttribute("aria-busy", "false");
  }
}

async function loadFeaturedRepositories() {
  const status = document.querySelector("#featured-repositories-status");
  const container = document.querySelector("#featured-repositories");
  try {
    const repositories = await searchRepositories({ query: "beginner projects", language: "JavaScript" });
    container.replaceChildren(...repositories.slice(0, 3).map(createRepositoryCard));
    status.textContent = repositories.length ? "" : "No featured repositories are available right now.";
  } catch (error) {
    status.classList.add("status--error");
    status.textContent = error instanceof Error ? error.message : "Repositories could not be loaded.";
  } finally {
    container.setAttribute("aria-busy", "false");
  }
}

loadFeaturedJobs();
loadFeaturedRepositories();
