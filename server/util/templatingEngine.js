import fs from "fs";

export function readPage(path) {
  return fs.readFileSync(path).toString();
}

export function renderPage(page, config = {}) {
  const header = fs
    .readFileSync("../client/public/components/header/header.html")
    .toString();
  const footer = fs
    .readFileSync("../client/public/components/footer/footer.html")
    .toString();
  const login = fs
    .readFileSync("../client/public/components/login/login.html")
    .toString();

  // Add success message if it exists
  const successMessageScript = `
    <script>
      var successMessage = "${config.successMessage || ''}";
    </script>
  `;

  return (
    header.replace("$tabTitle$", config.tabTitle || "Hearthstonejs") +
    login +
    page +
    footer +
    successMessageScript // Inject the message here as part of the final HTML
  );
}
