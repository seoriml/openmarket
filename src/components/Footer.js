export default function Header() {
  const footer = document.createElement("footer");
  footer.innerHTML = `
        <p>&copy; 2024 Open Market</p>
      `;
  return footer;
}
