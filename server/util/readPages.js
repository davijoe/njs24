import { readPage, renderPage } from "./templatingEngine.js";

// Define the homepage and cards page using readPage and renderPage
const homepage = readPage("../client/src/pages/homepage/homepage.html");
export const homepagePage = renderPage(homepage, { tabTitle: "Home" });

const cards = readPage("../client/src/pages/cards/cards.html");
export const cardsPage = renderPage(cards, { tabTitle: "Cards" });

const chat = readPage("../client/src/pages/chat/chat.html");
export const chatPage = renderPage(chat, { tabTitle: "Chat" });

const test = readPage("../client/src/pages/test/test.html");
export const testPage = renderPage(test, { tabTitle: "Test" });

const profile = readPage("../client/src/pages/profile/profile.html");
export const profilePage = renderPage(profile, { tabTitle: "Profile" });

// Export readPage as both a named and default export
export { readPage };
export default readPage;