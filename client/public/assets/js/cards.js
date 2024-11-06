let cardsData = []; // Store fetched data here

async function fetchCards() {
    try {
        const response = await fetch("/api/tests");
        const data = await response.json();
        cardsData = data; // Store the data for filtering
        renderCards(cardsData); // Render all cards initially
    } catch (error) {
        console.error("Error fetching card data:", error);
    }
}

function renderCards(cards) {
    const container = document.getElementById("cards-container");
    container.innerHTML = ""; // Clear previous cards

    cards.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.innerHTML = `
            <h2>${card.name}</h2>
            <p><strong>Type:</strong> ${card.type}</p>
            <p><strong>Set:</strong> ${card.card_set}</p>
            <p><strong>Class:</strong> ${card.player_class}</p>
            <p><strong>Health:</strong> ${card.health}</p>
            <p><strong>Artist:</strong> ${card.artist}</p>
            <p><strong>Rarity:</strong> ${card.rarity}</p>
            <button class="add-card-btn" data-card-id="${card.card_id}">➕</button>
        `;
        container.appendChild(cardDiv);

        const addButton = cardDiv.querySelector(".add-card-btn");
        addButton.addEventListener("click", async (event) => {
            const cardId = event.target.getAttribute("data-card-id");
            await addCardToProfile(cardId);
        })
    });
}

function filterCards(attribute, value) {
    const filteredCards = cardsData.filter(card => card[attribute] === value);
    renderCards(filteredCards);
}

function searchCards(term) {
    const searchTerm = term.toLowerCase();
    const filteredCards = cardsData.filter(card =>
        card.name.toLowerCase().includes(searchTerm) ||
        card.artist.toLowerCase().includes(searchTerm)
    );
    renderCards(filteredCards);
}

async function addCardToProfile(cardId) {
    try {
        const response = await fetch("/api/add-card", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cardId })
        });

        const data = await response.json();
        if (data.success) {
            alert("Card added to your profile!");
        } else {
            alert(data.error || "Failed to add card.");
        }
    } catch (error) {
        console.error("Error adding card to profile:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchCards();

    // Event listeners for filter buttons
    document.getElementById("filter-hero").addEventListener("click", () => filterCards("type", "Hero"));
    document.getElementById("filter-minion").addEventListener("click", () => filterCards("type", "Minion"));
    document.getElementById("filter-spell").addEventListener("click", () => filterCards("type", "Spell"));
    document.getElementById("filter-enchantment").addEventListener("click", () => filterCards("type", "Enchantment"));
    document.getElementById("filter-weapon").addEventListener("click", () => filterCards("type", "Weapon"));
    document.getElementById("filter-hero-power").addEventListener("click", () => filterCards("type", "Hero Power"));
    document.getElementById("filter-all").addEventListener("click", () => renderCards(cardsData));

    // Event listener for search input
    document.getElementById("search-input").addEventListener("input", (event) => {
        searchCards(event.target.value);
    });
});