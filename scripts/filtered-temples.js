const $ = (selector) => document.querySelector(selector);
const newE = (tag) => document.createElement(tag);

document.addEventListener('DOMContentLoaded', () => {
  fetch('temples.json')
    .then(response => response.json())
    .then(data => {
      window.templesData = data; 
      displayTemples(data); 
    })
    .catch(error => {
      console.error('Error fetching the JSON file:', error);
    });

  
  $("#old").addEventListener('click', (e) => {
    e.preventDefault();
    const oldTemples = window.templesData.filter(temple => new Date(temple.dedicated).getFullYear() < 2000);
    displayTemples(oldTemples);
  });

 
  $("#new").addEventListener('click', (e) => {
    e.preventDefault();
    const newTemples = window.templesData.filter(temple => new Date(temple.dedicated).getFullYear() >= 2000);
    displayTemples(newTemples);
  });

  
  $("#large").addEventListener('click', (e) => {
    e.preventDefault();
    const largeTemples = window.templesData.filter(temple => temple.area > 30000);
    displayTemples(largeTemples);
  });

  
  $("#small").addEventListener('click', (e) => {
    e.preventDefault();
    const smallTemples = window.templesData.filter(temple => temple.area <= 30000);
    displayTemples(smallTemples);
  });

  
  $("#home").addEventListener('click', (e) => {
    e.preventDefault();
    displayTemples(window.templesData);
  });
});

const displayTemples = (temples) => {
  const cards = $("#temple-cards");
  cards.innerHTML = ''; 
  temples.forEach(temple => {
    const card = newCard(temple);
    cards.appendChild(card);
  });
};

const newCard = (temple) => {
  const div = newE("div");
  div.className = 'max-w-sm rounded overflow-hidden shadow-lg m-4';

  const img = newE("img");
  img.className = 'w-full';
  img.src = temple.imageUrl;
  img.alt = temple.templeName;
  img.onerror = () => {
    img.src = 'https://via.placeholder.com/400x250?text=Image+not+available';
  };

  div.innerHTML = `
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">${temple.templeName}</div>
      <p class="text-gray-700 text-base">${temple.location}</p>
      <p class="text-gray-700 text-base">Dedicated: ${temple.dedicated}</p>
      <p class="text-gray-700 text-base">Area: ${temple.area} sq ft</p>
    </div>
  `;
  div.insertBefore(img, div.firstChild);

  return div;
};


temples =[];