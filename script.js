
const url = `https://gateway.marvel.com/v1/public/comics?ts=1716284790735&apikey=e7b7127ad7ef559efafa3cb5321737c4&hash=25238d9dea00e9f631a824ac1fb96255`;

const resEl = document.getElementById('superhero-list');
const search = document.getElementById('search-bar');
const favoriteBtn = document.getElementById('favorites');

// Function to fetch data from API
function getApi(url) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Invalid Request");
            }
            return response.json();
        })
        .then((data) => {
           
            displayResults(data.data.results);
        })
        .catch((value) => {
            console.log(value);
        });
}

// Function to display results
function displayResults(results) {
    resEl.innerHTML = ''; // Clear previous results
    results.forEach(result => {
        const imageUrl = `${result.thumbnail.path}.${result.thumbnail.extension}`;
        const comics = result.comics ? encodeURIComponent(result.comics.available) : '0';
        const series = result.series ? encodeURIComponent(result.series.name) : 'No series available';
        const stories = result.stories ? encodeURIComponent(result.stories.available) : '0';
        const description = result.description ? encodeURIComponent(result.description) : 'No description available';
        const id= result.id ? encodeURIComponent(result.id) : '0';
        const item = document.createElement('div');
        item.className = 'superhero-item';
        item.innerHTML = `
            <h3 class="title-name">${result.title}</h3>
            <img src="${imageUrl}" alt="${result.title}">
            <div class="button-container">
                <button class='favorites-btn'>Add to Favorites</button>
                <button class="details-btn"
                    data-image="${encodeURIComponent(imageUrl)}"
                    data-title="${encodeURIComponent(result.title)}"
                    data-description="${description}"
                    data-id="${id}"
                    data-comics="${comics}"
                    data-series="${series}"
                    data-stories="${stories}">
                    More Details
                </button>
            </div>
        `;
        resEl.appendChild(item);
    });

    // Add event listeners to "More Details" buttons
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            
            const imageUrl = event.target.getAttribute('data-image');
            const title = event.target.getAttribute('data-title');
            const description = event.target.getAttribute('data-description');
            const id=event.target.getAttribute('data-id');
            const comics = event.target.getAttribute('data-comics');
            const series = event.target.getAttribute('data-series');
            const stories = event.target.getAttribute('data-stories');
            window.location.href = `details.html?image=${imageUrl}&title=${title}&description=${description}&id=${id}&comics=${comics}&series=${series}&stories=${stories}`;
        });
    });

    // Add event listeners to "Add to Favorites" buttons
    document.querySelectorAll('.favorites-btn').forEach(button => {
       
        button.addEventListener('click', (event) => {
            const imageUrl = event.target.closest('.superhero-item').querySelector('img').src;
            const title = event.target.closest('.superhero-item').querySelector('.title-name').textContent;

            // Get existing favorites from local storage or initialize an empty array
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            // Check if the superhero is already in the favorites list
            if (favorites.some(favorite => favorite.title === title)) {
                alert("This superhero is already present in your favorites-list.");
            } else {
                favorites.push({ title: title, image: imageUrl });
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert("Added to your favorites");
            }
        });
    });
}

// Event listener for the search bar
search.addEventListener('input', () => {
    const query = search.value.trim();
    if (query.length > 0) {
        const apiUrl = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${query}&ts=1716284790735&apikey=e7b7127ad7ef559efafa3cb5321737c4&hash=25238d9dea00e9f631a824ac1fb96255`;
        getApi(apiUrl);
    } else {
        resEl.innerHTML = ''; // Clear results if search query is empty
    }
});

// Event listener for the favorites button
favoriteBtn.addEventListener('click', () => {
    window.location.href = 'favorites.html';
});

getApi(url);