const $ = (selector) => document.querySelector(selector);
const newE = (tag) => document.createElement(tag);

document.addEventListener('DOMContentLoaded', () => {
  fetch('temples.json')
    .then(response => response.json())
    .then(data => {
      displayTemples(data);
    })
    .catch(error => {
      console.error('Error fetching the JSON file:', error);
    });
});

const displayTemples = (temples) => {
  const cards = $("#temple-cards");
  temples.forEach(temple => {
    const card = newCard(temple);
    cards.appendChild(card);
  });
};

const newCard = (temple) => {
  const div = newE("div");
  div.className = 'max-w-sm rounded overflow-hidden shadow-lg m-4'; // Tailwind CSS classes

  const img = newE("img");
  img.className = 'w-full';
  img.src = temple.imageUrl;
  img.alt = temple.templeName;
  img.onerror = () => {
    img.src = 'https://via.placeholder.com/400x250?text=Image+not+available'; // Placeholder image in case of error
  };

  div.innerHTML = `
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">${temple.templeName}</div>
      <p class="text-gray-700 text-base">${temple.location}</p>
      <p class="text-gray-700 text-base">Dedicated: ${temple.dedicated}</p>
      <p class="text-gray-700 text-base">Area: ${temple.area} sq ft</p>
    </div>
  `;
  div.insertBefore(img, div.firstChild); // Insert image before the text content

  return div;
};
