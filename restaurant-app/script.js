document.addEventListener('DOMContentLoaded', () => {
    const moodButtonsContainer = document.getElementById('mood-buttons');
    const searchInput = document.getElementById('search-input');
    const restaurantGrid = document.getElementById('restaurant-grid');
    const noResultsMsg = document.getElementById('no-results');
    const resultsTitle = document.getElementById('results-title');

    let currentCategory = "すべて";
    let searchQuery = "";

    // 初期化
    initMoodButtons();
    renderRestaurants();

    // イベントリスナー
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderRestaurants();
    });

    function initMoodButtons() {
        moodCategories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = `mood-btn ${category === currentCategory ? 'active' : ''}`;
            btn.textContent = category;
            btn.addEventListener('click', () => {
                // アクティブ状態の切り替え
                document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                currentCategory = category;
                resultsTitle.textContent = category === "すべて" ? "おすすめのお店" : `${category}のおすすめ`;
                renderRestaurants();
            });
            moodButtonsContainer.appendChild(btn);
        });
    }

    function renderRestaurants() {
        restaurantGrid.innerHTML = '';
        
        const filteredRestaurants = mockRestaurants.filter(restaurant => {
            const matchCategory = currentCategory === "すべて" || restaurant.category === currentCategory;
            const matchSearch = restaurant.name.toLowerCase().includes(searchQuery) || 
                                restaurant.category.toLowerCase().includes(searchQuery) ||
                                restaurant.description.toLowerCase().includes(searchQuery);
            return matchCategory && matchSearch;
        });

        if (filteredRestaurants.length === 0) {
            noResultsMsg.classList.remove('hidden');
        } else {
            noResultsMsg.classList.add('hidden');
            filteredRestaurants.forEach(restaurant => {
                const card = document.createElement('div');
                card.className = 'restaurant-card';
                card.innerHTML = `
                    <div class="image-container">
                        <img src="${restaurant.image}" alt="${restaurant.name}" class="card-image" loading="lazy">
                    </div>
                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="restaurant-name">${restaurant.name}</h3>
                            <div class="restaurant-rating">
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                ${restaurant.rating}
                            </div>
                        </div>
                        <div class="restaurant-category">${restaurant.category}</div>
                        <p class="restaurant-desc">${restaurant.description}</p>
                    </div>
                `;
                restaurantGrid.appendChild(card);
            });
        }
    }
});
