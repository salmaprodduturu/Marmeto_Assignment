const searchInput = document.getElementById('searchInput');
const productList = document.getElementById('productList');

// Function to fetch and display all products
function displayAllProducts() {
    fetch('https://products-api-2ttf.onrender.com/api/products')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to display products
function displayProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = createProductCard(product);
        productList.appendChild(productCard);
    });
}

// Function to create product card
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product');
    
    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;
    productCard.appendChild(productImage);
    
    const productTitle = document.createElement('p');
    productTitle.textContent = product.title;
    productCard.appendChild(productTitle);
    
    return productCard;
}

// Function to filter products based on search term
function filterProducts(searchTerm) {
    fetch('https://products-api-2ttf.onrender.com/api/products')
        .then(response => response.json())
        .then(products => {
            const filteredProducts = products.filter(product =>
                product.title.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Display all products when the page loads
window.addEventListener('load', displayAllProducts);

// Event listener for search input
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm.length === 0) {
        displayAllProducts();
        return;
    }

    filterProducts(searchTerm);
});
