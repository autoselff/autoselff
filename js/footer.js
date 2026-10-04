function loadFooter() {
  const footer = document.createElement("div");
  footer.className = "footer";

  renderSocialLinks(footer);

  const container = document.querySelector(".container");
  container.appendChild(footer);
}

loadFooter();
