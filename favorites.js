
document.addEventListener('DOMContentLoaded', () => {
    const favoritesListEl = document.getElementById('favorites-list');
    const homeBtn=document.getElementById('home-btn');
    
    //Adding event to the home-btn
    homeBtn.addEventListener('click',()=>{
        window.location.href='index.html';
    })

    // Function to display favorites
    function displayFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favoritesListEl.innerHTML = ''; // Clear previous favorites

        favorites.forEach(favorite => {
            const item = document.createElement('li');
            item.className = 'favorite-item';
            item.innerHTML = `
                <h3 class="title-name">${favorite.title}</h3>
                <img src="${favorite.image}" alt="${favorite.title}">
                <button class='remove-btn'>Remove from Favorites</button>
            `;
            favoritesListEl.appendChild(item);
        });

        // Add event listeners to "Remove from Favorites" buttons
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                
                const title = event.target.closest('.favorite-item').querySelector('.title-name').textContent;
                
                // Get existing favorites from local storage
                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                // Filter out the item to be removed
                favorites = favorites.filter(favorite => favorite.title !== title);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                
                // Refresh the favorites list display
                displayFavorites();
            });
        });
    }

    // Display favorites on page load
    displayFavorites();
});