const portfolioList = document.getElementById("portfolio-list");
const filterIndustry = document.getElementById("filter-industry");
const filterService = document.getElementById("filter-service");
const filterSkill = document.getElementById("filter-skill");
const clearFiltersBtn = document.getElementById("clear-filters");
const discoverTotalCount = document.getElementById("discover-total-count");
const discoverResultCount = document.getElementById("discover-result-count");
const discoverActiveFilters = document.getElementById("discover-active-filters");
const discoverShownCount = document.getElementById("discover-shown-count");

function matchesFilter(value, filterValue) {
  if (!filterValue) return true;
  return value.toLowerCase().includes(filterValue.toLowerCase());
}

function renderPortfolios() {
  const portfolios = getPortfolios();
  discoverTotalCount.textContent = portfolios.length;

  const industryFilter = filterIndustry.value.trim();
  const serviceFilter = filterService.value.trim();
  const skillFilter = filterSkill.value.trim();
  const activeFilterCount = [industryFilter, serviceFilter, skillFilter].filter(Boolean).length;
  discoverActiveFilters.textContent = activeFilterCount;

  const filtered = portfolios.filter((item) => {
    const skillsText = item.skills.join(" ");

    return (
      matchesFilter(item.industry, industryFilter) &&
      matchesFilter(item.serviceType, serviceFilter) &&
      matchesFilter(skillsText, skillFilter)
    );
  });

  if (filtered.length === 0) {
    discoverShownCount.textContent = "0";
    discoverResultCount.textContent = `Showing 0 of ${portfolios.length} profiles`;
    portfolioList.innerHTML =
      '<p class="empty">No portfolios found. Add one in dashboard or change filters.</p>';
    return;
  }

  discoverShownCount.textContent = filtered.length;
  discoverResultCount.textContent = `Showing ${filtered.length} of ${portfolios.length} profiles`;

  portfolioList.innerHTML = filtered
    .map(
      (item) => `
      <article class="portfolio-item">
        <h3>${item.fullName} <span class="tag">@${item.username}</span></h3>
        <p class="portfolio-headline">${item.headline}</p>
        <div class="portfolio-facts">
          <p class="portfolio-fact"><span>Industry</span><strong>${item.industry}</strong></p>
          <p class="portfolio-fact"><span>Service</span><strong>${item.serviceType}</strong></p>
        </div>
        <div class="portfolio-meta">
          ${item.skills.map((skill) => `<span>${skill}</span>`).join("")}
        </div>
        <p class="portfolio-sample">Sample: <a href="${item.sampleLink}" target="_blank" rel="noreferrer">View work</a></p>
        <p class="small-line portfolio-testimonial">Testimonial: ${item.testimonial || "No testimonial added"}</p>
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
