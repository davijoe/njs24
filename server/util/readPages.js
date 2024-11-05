import { readPage, renderPage } from "./templatingEngine.js";

// Define the homepage and cards page using readPage and renderPage
const homepage = readPage("../client/src/pages/homepage/homepage.html");
export const homepagePage = renderPage(homepage, { tabTitle: "Home" });

const cards = readPage("../client/src/pages/cards/cards.html");
export const cardsPage = renderPage(cards, { tabTitle: "Cards" });

const chat = readPage("../client/src/pages/chat/chat.html");
export const chatPage = renderPage(chat, { tabTitle: "Chat" });

// Export readPage as both a named and default export
export { readPage };
export default readPage;