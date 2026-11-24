const API_URL = "https://remotive.com/api/remote-jobs";

export async function searchJobs({ category = "", query = "", signal } = {}) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (query.trim()) params.set("search", query.trim());
  params.set("limit", "20");

  const response = await fetch(`${API_URL}?${params}`, {
    headers: { Accept: "application/json" },
    signal,
  });
  if (!response.ok) {
    throw new Error(`Remotive could not complete the request (HTTP ${response.status}).`);
  }

  const data = await response.json();
  if (!Array.isArray(data.jobs)) {
    throw new Error("Remotive returned an unexpected response.");
  }
  return data.jobs;
}
