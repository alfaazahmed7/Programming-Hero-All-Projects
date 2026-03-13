let currentStatus = "tab-all";
const allContainer = document.getElementById("all-cart-container");
const openContainer = document.getElementById("open-cart-container");
const closedContainer = document.getElementById("closed-cart-container");
const spinner = document.getElementById("spinner");


// toggle button logic
function switchTab(id) {

    const tabs = ["tab-all", "tab-open", "tab-closed"];

    tabs.forEach(tab => {
        const el = document.getElementById(tab);
        el.classList.remove("bg-[#4a00ff]", "border-2", "border-[#4A00FF]", "text-white");
        el.classList.add("bg-white", "text-[#64748B]", "border-2", "border-[#E4E4E7]");
    });

    const selected = document.getElementById(id);
    currentStatus = id;

    selected.classList.remove("bg-white", "text-[64748B]", "border-2", "border-[#E4E4E7]");
    selected.classList.add("bg-[#4a00ff]", "border-2", "border-[#4A00FF]", "text-white");


    // toggle buttons functionality to show carts
    if (currentStatus === "tab-all") {
        // loadCarts() function to display all carts
        async function loadCarts() {
            showLoading();
            const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
            const data = await res.json();
            hideLoading();
            showCarts(data.data);
        }
        loadCarts();
    }

    if (currentStatus === "tab-open") {
        // loadOpenCarts() function to display only status:open carts
        async function loadOpenCarts() {
            showLoading();
            const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
            const result = await res.json();

            const openIssues = result.data.filter(issue => issue.status === "open");
            hideLoading();
            showCarts(openIssues);

        }
        loadOpenCarts();
    }

    if (currentStatus === "tab-closed") {
        // loadClosedCarts() function to display only status:closed carts
        async function loadClosedCarts() {
            showLoading();
            const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
            const result = await res.json();

            const closedIssues = result.data.filter(issue => issue.status === "closed");
            hideLoading();
            showCarts(closedIssues);
        }
        loadClosedCarts();
    }
}
switchTab(currentStatus);

// search funtionality
document.getElementById("btn-search")
    .addEventListener("click", () => {
        const input = document.getElementById("input-search");
        const searchValue = input.value;

        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
            .then(res => res.json())
            .then(data => {
                const allCarts = data.data;
                const filterCarts = allCarts.filter(cart =>
                    cart.title.toLowerCase().includes(searchValue.toLowerCase()) || cart.description.toLowerCase().includes(searchValue)
                );

                if (filterCarts.length === 0) {
                    allContainer.innerHTML = `
        <div class="text-center col-span-full bg-white rounded-lg py-10">
            <p class="text-[#64748B] text-lg font-semibold p-10">We couldn't find any issues matching your search. Try different keywords.</p>
        </div>
    `;
                    return;
                }
                showCarts(filterCarts);
            });
    });

// spinner functionality
function showLoading() {
    spinner.classList.remove("hidden");
    allContainer.classList.add("hidden");
}
function hideLoading() {
    allContainer.classList.remove("hidden");
    spinner.classList.add("hidden");
}

// count function
function totalCount() {
    const totalCarts = document.getElementById("total-carts");
    const allCarts = allContainer.children.length;
    const updateTotalCarts = totalCarts.innerText = allCarts;
    // console.log(updateTotalCarts);
}

// // loadCarts() function to display all carts
// async function loadCarts() {
//     const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
//     const result = await res.json();
//     showCarts(data.data);
// }
// loadCarts();

function showCarts(carts) {
    allContainer.innerHTML = "";

    carts.forEach(cart => {
        // console.log(cart.id);

        // card.className classes
        let cardClasses = "";

        if (cart.status === "open") {
            cardClasses = "border-t-4 border-t-[#00A96E]";
        }
        if (cart.status === "closed") {
            cardClasses = "border-t-4 border-t-[#A855F7]";
        }

        // cart.priority classes
        let priorityClass = "";

        if (cart.priority === "high") {
            priorityClass = "bg-[#FEECEC] text-[#EF4444]"
        }
        if (cart.priority === "medium") {
            priorityClass = "bg-[#FFF6D1] text-[#F59E0B]";
        }
        if (cart.priority === "low") {
            priorityClass = "bg-[#EEEFF2] text-[#9CA3AF]";
        }

        // cart.labels[0] classes
        let cartLabelsZeroIcon = "";
        let cartLabelsZero = "";

        if (cart.labels[0] === "bug") {
            cartLabelsZero = "bg-[#FECACA] text-[#EF4444]";
            cartLabelsZeroIcon = `<i class="fa-solid fa-bug" style="color: rgb(255, 83, 83);"></i>`;
        }
        if (cart.labels[0] === "enhancement") {
            cartLabelsZero = "bg-[#DEFCE8] text-[#00A96E]";
            cartLabelsZeroIcon = `<i class="fa-solid fa-wand-magic-sparkles" style="color: rgb(26, 178, 27);"></i>`;
        }
        if (cart.labels[0] === "documentation") {
            cartLabelsZero = "bg-[#CCE0FF] text-[#485696]";
            cartLabelsZeroIcon = `<i class="fa-solid fa-file-lines" style="color: rgb(112, 111, 247);"></i>`;
        }

        // cart.labels[1] classes
        let cartLabelsOneIcon = "";
        let cartLabelsOne = "";

        if (cart.labels[1] === "help wanted") {
            cartLabelsOne = "bg-[#FFF8DB] text-[#D97706]"
            cartLabelsOneIcon = `<i class="fa-solid fa-user-astronaut" style="color: rgb(216, 177, 91);"></i>`;

        }
        if (cart.labels[1] === "good first issue") {
            cartLabelsOne = "bg-red-200 text-[#2f3e46]"
            cartLabelsOneIcon = `<i class="fa-solid fa-circle-exclamation" style="color: rgb(244, 102, 102);"></i>`;
        }
        if (cart.labels[1] === "enhancement") {
            cartLabelsOne = "bg-[#DEFCE8] text-[#00A96E]"
            cartLabelsOneIcon = `<i class="fa-solid fa-wand-magic-sparkles" style="color: rgb(26, 178, 27);"></i>`;
        }

        // dynamic image
        let statusImage = "";

        if (cart.status === "open") {
            statusImage = "./assets/Open-Status.png"
        }
        if (cart.status === "closed") {
            statusImage = "./assets/Closed-Status.png"
        }

        const card = document.createElement("div");
        card.className = `${cardClasses} bg-white rounded-lg cursor-pointer`;
        card.innerHTML = `
        <div  onclick = "openCartModal(${cart.id})" class = "p-4">
        <div class="flex justify-between items-center mb-3">
                <img src="${statusImage}" alt="">
                <span class="${priorityClass} py-1 px-4 font-medium rounded-lg text-[14px]">${cart.priority.toUpperCase()}</span>
            </div>
            <div class="mb-2">
                <p class="text-[16px] font-semibold text-[#1F2937] line-clamp-1">${cart.title}</p>
            </div>
            <div class="mb-3">
                <p class="text-[14px] text-[#64748B] line-clamp-2">${cart.description} 
                </p>
            </div>
            <div class="flex">
                <span class="${cartLabelsZero} text-[14px] rounded-lg py-1 px-3"> ${cartLabelsZeroIcon} ${cart.labels[0].toUpperCase()}</span>
                ${cart.labels[1] ? `
    <span class="${cartLabelsOne} flex-wrap py-1 px-2 rounded-lg text-[14px] font-medium">
        ${cartLabelsOneIcon} ${cart.labels[1].toUpperCase()}
    </span>
    ` : ""}
            </div>
            <div class="pt-5">
                <hr class=" text-[#E4E4E7]">
            </div>
            <div class="my-4">
                <p class="text-[14px] text-[#64748B]">${cart.assignee.toUpperCase()}</p>
                <p class="text-[14px] text-[#64748B]">${new Date(cart.updatedAt).toLocaleString("en-Us", { timeZone: "Asia/Jakarta" })}</p>
            </div>
            </div>
        `;
        allContainer.appendChild(card);
        totalCount();
    });
}

// modal functionality
async function openCartModal(id) {

    const cartDetailsModal = document.getElementById("cart-details-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalStatus = document.getElementById("modal-status");
    const modalAuthor = document.getElementById("modal-author");
    const modalUpdateAt = document.getElementById("modal-updateat");
    const modalLevelZero = document.getElementById("modal-level-zero");
    const modalLevelOne = document.getElementById("modal-level-one");
    const modalDescription = document.getElementById("modal-description");
    const modalAssignee = document.getElementById("modal-assignee");
    const modalPriority = document.getElementById("modal-priority");

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const result = await res.json();
    const cartDetails = result.data;
    // console.log(cartDetails);
    modalTitle.textContent = cartDetails.title;

    modalStatus.textContent = cartDetails.status.toUpperCase();
    modalStatus.classList = "text-[12px] font-medium py-1 px-2 rounded-lg";
    if (modalStatus.textContent === "OPEN") {
        modalStatus.textContent = "OPENED";
    }
    if (modalStatus.textContent === "OPENED") {
        modalStatus.classList.add("bg-[#00A96E]", "text-white");
    }
    if (modalStatus.textContent === "CLOSED") {
        modalStatus.classList.add("bg-[#A855F7]", "text-[#ffe5ec]");
    }

    modalAuthor.textContent = cartDetails.author.toUpperCase();

    const date = new Date(cartDetails.updatedAt);
    modalUpdateAt.textContent = date.toLocaleDateString("en-US", { timeZone: "Asia/Jakarta" });

    const label = cartDetails.labels?.[0]?.toUpperCase();
    modalLevelZero.className = "text-[12px] rounded-lg py-1 px-3";
    if (label === "BUG") {
        modalLevelZero.classList.add("bg-[#FECACA]", "text-[#EF4444]");
        modalLevelZero.innerHTML = `<i class="fa-solid fa-bug" style="color: rgb(255, 83, 83);"></i>
        ${label}`;
    }
    if (label === "ENHANCEMENT") {
        modalLevelZero.classList.add("bg-[#DEFCE8]", "text-[#00A96E]");
        modalLevelZero.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles" style="color: rgb(26, 178, 27);"></i>
        ${label}`;
    }
    if (label === "DOCUMENTATION") {
        modalLevelZero.classList.add("bg-[#CCE0FF]", "text-[#485696]");
        modalLevelZero.innerHTML = `<i class="fa-solid fa-file-lines" style="color: rgb(112, 111, 247);"></i>
        ${label}`;
    }

    const labelOne = cartDetails.labels?.[1]?.toUpperCase();
    // reset second label
    modalLevelOne.textContent = "";
    modalLevelOne.className = "hidden";
    modalLevelOne.className = "text-[12px] rounded-lg py-1 px-3";
    if (labelOne === "HELP WANTED") {
        modalLevelOne.classList.add("bg-[#FFF8DB]", "text-[#D97706]");
        modalLevelOne.innerHTML = `<i class="fa-solid fa-user-astronaut" style="color: rgb(216, 177, 91);"></i>
        ${labelOne}`;
    }
    if (labelOne === "GOOD FIRST ISSUE") {
        modalLevelOne.classList.add("bg-red-200", "text-[#2f3e46]");
        modalLevelOne.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="color: rgb(244, 102, 102);"></i>
        ${labelOne}`;
    }
    if (labelOne === "ENHANCEMENT") {
        modalLevelOne.classList.add("bg-[#DEFCE8]", "text-[#00A96E]");
        modalLevelOne.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles" style="color: rgb(26, 178, 27);"></i>
        ${labelOne}`;
    }

    modalDescription.textContent = cartDetails.description;

    modalAssignee.textContent = cartDetails.assignee.toUpperCase();
    if (modalAssignee.textContent === "") {
        modalAssignee.textContent = "NAME NOT FOUND"
    }

    modalPriority.textContent = cartDetails.priority.toUpperCase();
    modalPriority.className = " py-1 px-2 text-[12px] font-medium rounded-xl"
    if (modalPriority.textContent === "HIGH") {
        modalPriority.classList.add("bg-[#EF4444]", "text-white");
    }
    else if (modalPriority.textContent === "MEDIUM") {
        modalPriority.classList.add("bg-[#FFF6D1]", "text-[#F59E0B]");
    }
    else if (modalPriority.textContent === "LOW") {
        modalPriority.classList.add("bg-[#778da9]", "text-[#fdf0d5]");
    }

    cartDetailsModal.showModal();
}