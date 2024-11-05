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
    successMessageScript
  );
}
