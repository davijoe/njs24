import fs from "fs";

export function readPage(path) {
  return fs.readFileSync(path).toString();
}

export function renderPage(page, config = {}) {
  const header = fs
    .readFileSync("../client/src/components/header/header.html")
    .toString();
  const footer = fs
    .readFileSync("../client/src/components/footer/footer.html")
    .toString();
  const login = fs
    .readFileSync("../client/src/components/login/login.html")
    .toString();

  const authButtons = config.username
    ? `<li><a href="/api/v1/profile">${config.username}</a></li>`
    : `
      <li><a href="#" id="login-link">Login</a></li>
      <li><a href="#" id="signup-link">Signup</a></li>
    `;

  // Add success message if it exists
  const successMessageScript = `
    <script>
      var successMessage = "${config.successMessage || ''}";
    </script>
  `;

  return (
    header
      .replace("$tabTitle$", config.tabTitle || "Hearthstonejs")
      .replace("$authButtons$", authButtons) +
    login +
    page +
    footer +
    successMessageScript
  );  
}
