const categoriesContainer = document.getElementById("categories-container");

// 
async function loadCategories() {
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    data.categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline w-full";
        categoriesContainer.append(btn);
        btn.textContent = category.category_name;
    });
}; 
loadCategories();