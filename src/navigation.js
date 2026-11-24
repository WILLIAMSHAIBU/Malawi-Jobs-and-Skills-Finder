export function initializeNavigation() {
  const button = document.querySelector(".menu-button");
  const navigation = document.querySelector(".main-nav");
  if (!button || !navigation) return;

  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!open));
    navigation.classList.toggle("main-nav--open", !open);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      button.setAttribute("aria-expanded", "false");
      navigation.classList.remove("main-nav--open");
    }
  });
}
