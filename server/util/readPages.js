import { readPage, renderPage } from "./templatingEngine.js";

// Define the homepage and cards page using readPage and renderPage
const homepage = readPage("../client/public/pages/homepage/homepage.html");
export const homepagePage = renderPage(homepage, { tabTitle: "Home" });

const cards = readPage("../client/public/pages/cards/cards.html");
export const cardsPage = renderPage(cards, { tabTitle: "Cards" });

// Export readPage as both a named and default export
export { readPage };
export default readPage;
