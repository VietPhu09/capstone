const showMenu = (toggleID, navBarId, bodyId) => {
  const toggle = document.getElementById(toggleID);
  const navbar = document.getElementById(navBarId);
  const bodypadding = document.getElementById(bodyId);

  if (toggle && navbar) {
    toggle.addEventListener("click", () => {
      navbar.classList.toggle("show");
      toggle.classList.toggle("rotate");
      bodypadding.classList.toggle("expander");
    });
  }
};

showMenu("nav-toggle", "navbar", "body");

const linkColor = document.querySelectorAll(".nav_link");

function colorLink() {
  linkColor.forEach((l) => l.classList.remove("active"));
  this.classList.add("active");
}
linkColor.forEach((l) => l.addEventListener("click", colorLink));
