const API_URL = "https://api.github.com/search/repositories";

export async function searchRepositories({ query, language, signal }) {
  const keyword = query.trim();
  if (!keyword) {
    throw new Error("Enter a keyword or project topic to search.");
  }

  const searchTerms = [keyword];
  if (language) {
    searchTerms.push(`language:${language}`);
  }

  const params = new URLSearchParams({
    q: searchTerms.join(" "),
    sort: "stars",
    order: "desc",
    per_page: "20",
  });
  const response = await fetch(`${API_URL}?${params}`, {
    headers: { Accept: "application/vnd.github+json" },
    signal,
  });

  if (!response.ok) {
    if (response.status === 403 && response.headers.get("x-ratelimit-remaining") === "0") {
      throw new Error("GitHub's search limit has been reached. Please try again later.");
    }
    throw new Error(`GitHub could not complete the search (HTTP ${response.status}).`);
  }

  const data = await response.json();
  if (!Array.isArray(data.items)) {
    throw new Error("GitHub returned an unexpected response. Please try again.");
  }

  return data.items;
}
