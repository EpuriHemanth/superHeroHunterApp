// Get the details from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const imageUrl = urlParams.get('image');
const title = urlParams.get('title');
const description = urlParams.get('description');
const id=urlParams.get('id');
const comics = urlParams.get('comics');
const series = urlParams.get('series');
const stories = urlParams.get('stories');
// Get the home button element
const homeButton = document.getElementById('home-button');

// Add event listener to home button
homeButton.addEventListener('click', () => {
    // Navigate to index.html
    window.location.href = 'index.html';
});

document.addEventListener('DOMContentLoaded', function() {
    if (imageUrl) {
        // Set the image src attribute
        const superheroImage = document.getElementById('superhero-image');
        superheroImage.src = decodeURIComponent(imageUrl);
    }

    if (title) {
        const superheroTitle = document.getElementById('superhero-title');
        superheroTitle.textContent = `Title: ${decodeURIComponent(title)}`;
    }

    if (description) {
        const superheroDescription = document.getElementById('superhero-description');
        superheroDescription.textContent = `Description: ${decodeURIComponent(description)}`;
    } else {
        const superheroDescription = document.getElementById('superhero-description');
        superheroDescription.textContent = 'Description: No description available';
    }
    if (id) {
        const superheroId = document.getElementById('hero-id');
        superheroId.textContent = `Id: ${decodeURIComponent(id)}`;
    }

    if (comics) {
        const superheroComics = document.getElementById('superhero-comics');
        superheroComics.textContent = `Comics: ${decodeURIComponent(comics)}`;
    }

    if (series) {
        const superheroSeries = document.getElementById('superhero-series');
        superheroSeries.textContent = `Series: ${decodeURIComponent(series)}`;
    }

    if (stories) {
        const superheroStories = document.getElementById('superhero-stories');
        superheroStories.textContent = `Stories: ${decodeURIComponent(stories)}`;
    }
});