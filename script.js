const API_KEY = 'c3e7e0f9a2msh9541025fef72972p19b90ejsn2b4a44807bbe';
const URBAN_DICTIONARY_API_URL = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define';

const termInput = document.getElementById('term-input');
const definitionsContainer = document.getElementById('definitions-container');

// Function to fetch definitions from the API and render them on the page
async function fetchAndRenderDefinitions(term) {
  try {
    // Make a request to the API with the entered term as a parameter
    const response = await fetch(`${URBAN_DICTIONARY_API_URL}?term=${term}`, {
      headers: {
        'X-RapidAPI-Key': API_KEY
      }
    });
    const data = await response.json();

    // Clear the container
    definitionsContainer.innerHTML = '';

    // Loop through the definitions and render them on the page
    data.list.forEach(definition => {
      const definitionDiv = document.createElement('div');
      definitionDiv.className = 'definition';

      const wordP = document.createElement('p');
      wordP.className = 'word';
      wordP.textContent = definition.word;
      definitionDiv.appendChild(wordP);

      const meaningP = document.createElement('p');
      meaningP.className = 'meaning';
      meaningP.innerHTML = definition.definition;
      definitionDiv.appendChild(meaningP);

      const exampleP = document.createElement('p');
      exampleP.className = 'example';
      exampleP.textContent = definition.example;
      definitionDiv.appendChild(exampleP);

      definitionsContainer.appendChild(definitionDiv);
    });
  } catch (error) {
    console.error(error);
  }
}

// Event listener for the form submission
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  const term = termInput.value;
  fetchAndRenderDefinitions(term);
});

// Call the fetchAndRenderDefinitions function with a default term
fetchAndRenderDefinitions('JavaScript');
