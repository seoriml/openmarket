export default class Footer {
  render() {
    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = `
        <p>&copy; 2024 Open Market</p>
      `;
    return footer;
  }
}
