const portfolioList = document.getElementById("portfolio-list");
const filterIndustry = document.getElementById("filter-industry");
const filterService = document.getElementById("filter-service");
const filterSkill = document.getElementById("filter-skill");
const clearFiltersBtn = document.getElementById("clear-filters");

function matchesFilter(value, filterValue) {
  if (!filterValue) return true;
  return value.toLowerCase().includes(filterValue.toLowerCase());
}

function renderPortfolios() {
  const portfolios = getPortfolios();

  const industryFilter = filterIndustry.value.trim();
  const serviceFilter = filterService.value.trim();
  const skillFilter = filterSkill.value.trim();

  const filtered = portfolios.filter((item) => {
    const skillsText = item.skills.join(" ");

    return (
      matchesFilter(item.industry, industryFilter) &&
      matchesFilter(item.serviceType, serviceFilter) &&
      matchesFilter(skillsText, skillFilter)
    );
  });

  if (filtered.length === 0) {
    portfolioList.innerHTML =
      '<p class="empty">No portfolios found. Add one in dashboard or change filters.</p>';
    return;
  }

  portfolioList.innerHTML = filtered
    .map(
      (item) => `
      <article class="portfolio-item">
        <h3>${item.fullName} <span class="tag">@${item.username}</span></h3>
        <p><strong>${item.headline}</strong></p>
        <p>Industry: ${item.industry}</p>
        <p>Service: ${item.serviceType}</p>
        <p>Skills: ${item.skills.join(", ")}</p>
        <p>Sample: <a href="${item.sampleLink}" target="_blank" rel="noreferrer">View Work</a></p>
        <p class="small-line">Testimonial: ${item.testimonial || "No testimonial added"}</p>
      </article>
    `
    )
    .join("");
}

clearFiltersBtn.addEventListener("click", () => {
  filterIndustry.value = "";
  filterService.value = "";
  filterSkill.value = "";
  renderPortfolios();
});

filterIndustry.addEventListener("input", renderPortfolios);
filterService.addEventListener("input", renderPortfolios);
filterSkill.addEventListener("input", renderPortfolios);

renderPortfolios();
