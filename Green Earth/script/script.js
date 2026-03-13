const categoriesContainer = document.getElementById("categories-container");
const treesContainer = document.getElementById("trees-container");
const loadingSpinner = document.getElementById("loading-spinner");
const allTreesBtn = document.getElementById("all-trees-btn");
const treeDetailsModal = document.getElementById("tree-details-modal");
const modalImage = document.getElementById("modal-image");
const modalCategory = document.getElementById("modal-category");
const modalDescription = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");
const modalTitle = document.getElementById("modal-title");
const totalPrice = document.getElementById("total-price");
const cartContainer = document.getElementById("cart-container");
const emptyCartContainer = document.getElementById("empty-cart-container");
let cart = [];

// loadCategories function to display category buttons
async function loadCategories() {
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    data.categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline w-full";
        btn.textContent = category.category_name;
        btn.onclick = () => selectCategory(category.id, btn);
        categoriesContainer.append(btn);
    });
};
loadCategories();

// click category button function to select separately
async function selectCategory(categoryId, btn) {
    showLoading();

    const allButtons = document.querySelectorAll("#categories-container button, #all-trees-btn");
    allButtons.forEach((btn) => {
        btn.classList.remove("btn-pp")
        btn.classList.add("btn-outline");
    });
    btn.classList.add("btn-pp");
    btn.classList.remove("btn-outline");

    const res = await fetch(
        `https://openapi.programming-hero.com/api/category/${categoryId}`,
    );
    const data = await res.json();
    console.log(data);
    displayTrees(data.plants);

    hideLoading();
};

// loading spinner funtions
function showLoading() {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
}
function hideLoading() {
    loadingSpinner.classList.add("hidden");
}

// all trees btn button
allTreesBtn.addEventListener("click", () => {
    const allButtons = document.querySelectorAll("#categories-container button, #all-trees-btn");
    allButtons.forEach((btn) => {
        btn.classList.remove("btn-pp")
        btn.classList.add("btn-outline");
    });
    allTreesBtn.classList.add("btn-pp");
    allTreesBtn.classList.remove("btn-outline");

    loadTress();
})

// displayTrees function to display all plants
async function loadTress() {
    showLoading();

    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();

    hideLoading();
    displayTrees(data.plants);
}

function displayTrees(trees) {
    treesContainer.innerHTML = "";

    trees.forEach((tree) => {
        const card = document.createElement("div");
        card.className = "card bg-white shadow-sm";
        card.innerHTML = `
        <figure>
                            <img src="${tree.image}"
                                alt="${tree.name}"
                                class = "h-48 w-full object-cover cursor-pointer"
                                onclick = "openTreeModal(${tree.id})" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title text-sm font-semibold text-[#1F2937] cursor-pointer hover:text-green-700" onclick = "openTreeModal(${tree.id})">${tree.name}</h2>
                            <p class="text-[12px] text-[#1F2937] line-clamp-2">${tree.description}
                            </p>
                            <div class="">
                                <p class="text-[#15803D] text-sm font-medium bg-[#DCFCE7] p-1 rounded-xl w-[60%] text-center">${tree.category}</p>
                            </div>
                            <div class="flex justify-between items-center">
                                <h2 class="font-semibold text-xl text-[#4ade80]">$${tree.price}</h2>
                                <button onclick = "addToCart(${tree.id}, '${tree.name}', '${tree.price}')" class="btn btn-primary">Cart</button>
                            </div>
                        </div>
        `;
        treesContainer.appendChild(card);
    });
};

// cart modal
async function openTreeModal(treeId) {
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${treeId}`);
    const data = await res.json();
    const plantDetails = data.plants;
    modalTitle.textContent = plantDetails.name;
    modalImage.src = plantDetails.image;
    modalDescription.textContent = plantDetails.description;
    modalPrice.textContent = plantDetails.price;
    modalCategory.textContent = plantDetails.category;
    treeDetailsModal.showModal();
}
loadTress();

// add to cart functionality
function addToCart(id, name, price) {
    // console.log(id, name, price);
    const existingItem = cart.find((item) => item.id === id);

    // price = Number(price);

    if (existingItem) {
        existingItem.quantity += 1;
    }
    else {
        cart.push({
            id,
            name,
            price,
            quantity: 1,
        });
    }
    updateCart();
};

function updateCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
            emptyCartContainer.classList.remove("hidden");
            totalPrice.textContent = `$${0}`;
            return;
        }
        emptyCartContainer.classList.add("hidden");

    let total = 0;
    cart.forEach((item) => {
        total += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.className = "card card-body bg-white";
        cartItem.innerHTML = `
        <div class="flex justify-between items-center">
                                    <div>
                                        <h2>${item.name}</h2>
                                        <p>$${item.price} * ${item.quantity}</p>
                                    </div>
                                    <button onclick = "removeFromCart(${item.id})" class="btn btn-ghost">X</button>
                                </div>
                                <p class="text-right font-semibold text-xl">$${item.price * item.quantity}</p>
        `;
        cartContainer.appendChild(cartItem);
    });
    totalPrice.innerText = `$${total}`;
};

function removeFromCart(treeId) {
    const updateCartElements = cart.filter((item) => item.id != treeId);
    cart = updateCartElements;
    updateCart();
};