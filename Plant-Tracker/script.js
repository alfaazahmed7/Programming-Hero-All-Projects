let thrivingList = [];
let strugglingList = [];
let currentStatus = "All";

let total = document.getElementById("total");
let thrivingCount = document.getElementById("thriving-count");
let strugglingCount = document.getElementById("struggling-count");

const allFilterBtn = document.getElementById("all-filter-btn");
const thrivingFilterBtn = document.getElementById("thriving-filter-btn");
const strugglingFilterBtn = document.getElementById("struggling-filter-btn");

const allCardSection = document.getElementById("all-cards");
const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filtered-section");

function calculateCount() {
    total.innerText = allCardSection.children.length;
    thrivingCount.innerText = thrivingList.length;
    strugglingCount.innerText = strugglingList.length;
}
calculateCount();

// step 01
function toggleStyle(id) {
    // adding gray color and text black for all
    allFilterBtn.classList.add("bg-gray-300", "text-black");
    thrivingFilterBtn.classList.add("bg-gray-300", "text-black");
    strugglingFilterBtn.classList.add("bg-gray-300", "text-black");

    // if any button has bg black and text white them remove it
    allFilterBtn.classList.remove("bg-black", "text-white");
    thrivingFilterBtn.classList.remove("bg-black", "text-white");
    strugglingFilterBtn.classList.remove("bg-black", "text-white");

    // get the clicked button using the id
    const selected = document.getElementById(id);
    currentStatus = id;

    // adding black bg and text black for current button
    selected.classList.remove("bg-gray-300", "text-black");
    selected.classList.add("bg-black", "text-white");

    // show and hidden particular section
    // fitleting while clicking the filter button(All, Thriving, Struggling)
    if (id == 'thriving-filter-btn') {
        allCardSection.classList.add("hidden");
        filterSection.classList.remove("hidden");
        renderThriving();
    }
    else if (id == 'all-filter-btn') {
        allCardSection.classList.remove("hidden");
        filterSection.classList.add("hidden");
    }
    else if (id == "struggling-filter-btn") {
        allCardSection.classList.add("hidden");
        filterSection.classList.remove("hidden");
        renderStruggling();
    }
}

// step 02 - delegation
mainContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("thriving-btn")) {
        const parentNode = event.target.parentNode.parentNode;

        const plantName = parentNode.querySelector(".plant-name").innerText;
        const light = parentNode.querySelector(".light").innerText;
        const water = parentNode.querySelector(".water").innerText;
        const status = parentNode.querySelector(".status").innerText;
        const notes = parentNode.querySelector(".notes").innerText;

        parentNode.querySelector(".status").innerText = "Thrive";
        const cardInfo = {
            plantName,
            light,
            water,
            status: "Thrive",
            notes
        }

        const plantExist = thrivingList.find(item => item.plantName === cardInfo.plantName);
        if (!plantExist) {
            // if (plantExist === undefined)
            //if no matching plant was found
            thrivingList.push(cardInfo);
        }

        strugglingList = strugglingList.filter(item => item.plantName != cardInfo.plantName);
        if (currentStatus === 'struggling-filter-btn') {
            renderStruggling();
        }

        calculateCount();
    }

    else if (event.target.classList.contains("struggling-btn")) {
        const parentNode = event.target.parentNode.parentNode;

        const plantName = parentNode.querySelector(".plant-name").innerText;
        const light = parentNode.querySelector(".light").innerText;
        const water = parentNode.querySelector(".water").innerText;
        const status = parentNode.querySelector(".status").innerText;
        const notes = parentNode.querySelector(".notes").innerText;

        parentNode.querySelector(".status").innerText = "Struggle";
        const cardInfo = {
            plantName,
            light,
            water,
            status: "Struggle",
            notes
        }

        const plantExist = strugglingList.find(item => item.plantName === cardInfo.plantName);
        if (!plantExist) {
            // if (plantExist === undefined)
            //if no matching plant was found
            strugglingList.push(cardInfo);
        }

        thrivingList = thrivingList.filter(item => item.plantName != cardInfo.plantName);

        if (currentStatus == "thriving-filter-btn") {
            renderThriving();
        }

        calculateCount();
    }
});

// step 03 - html file create
function renderThriving() {
    filterSection.innerHTML = "";

    // creating innerhtml
    for (thrive of thrivingList) {
        let div = document.createElement("div");
        div.className = "card flex justify-between border-2 p-5 border-gray-300 rounded-lg"
        div.innerHTML = `
        <div class="space-y-4">
                    <div>
                        <p class="plant-name text-3xl">${thrive.plantName}</p>
                        <p class="latin-name opacity-70">Latin Name</p>
                    </div>
                    <div class="flex gap-5">
                        <p class="light bg-gray-500 p-3 rounded-lg">Bright Indicate</p>
                        <p class="water  bg-gray-500 p-3 rounded-lg">Weekly</p>
                    </div>
                    <div class="max-w-[170px] text-center">
                        <p class="status border-2 border-gray-500 px-4 py-2 rounded-lg">${thrive.status}</p>
                    </div>
                    <div>
                        <p class="notes opacity-70">New leaf unfurling by the east window.</p>
                    </div>
                    <div class="flex gap-5">
                        <button class="thriving-btn border-2 py-3 px-5 border-green-500 text-green-500 rounded-lg">Thrive</button>
                        <button class="struggling-btn border-2 py-3 px-5 border-red-500 text-red-500 rounded-lg">Struggling</button>
                    </div>
                </div>

                <div>
                    <button id="btn-delete" class="text-red-500 border-2 p-2 rounded-lg bg-red-200">Delete</button>
                </div>
        `;
        filterSection.appendChild(div);
    }
}

function renderStruggling() {
    filterSection.innerHTML = "";

    for (struggle of strugglingList) {
        let div = document.createElement("div");
        div.className = "card flex justify-between border-2 p-5 border-gray-300 rounded-lg"
        div.innerHTML = `
        <div class="space-y-4">
                    <div>
                        <p class="plant-name text-3xl">${struggle.plantName}</p>
                        <p class="latin-name opacity-70">Latin Name</p>
                    </div>
                    <div class="flex gap-5">
                        <p class="light bg-gray-500 p-3 rounded-lg">Bright Indicate</p>
                        <p class="water  bg-gray-500 p-3 rounded-lg">Weekly</p>
                    </div>
                    <div class="max-w-[170px] text-center">
                        <p class="status border-2 border-gray-500 px-4 py-2 rounded-lg">${struggle.status}</p>
                    </div>
                    <div>
                        <p class="notes opacity-70">New leaf unfurling by the east window.</p>
                    </div>
                    <div class="flex gap-5">
                        <button class="thriving-btn border-2 py-3 px-5 border-green-500 text-green-500 rounded-lg">Thrive</button>
                        <button class="struggling-btn border-2 py-3 px-5 border-red-500 text-red-500 rounded-lg">Struggling</button>
                    </div>
                </div>

                <div>
                    <button id="btn-delete" class="text-red-500 border-2 p-2 rounded-lg bg-red-200">Delete</button>
                </div>
        `;
        filterSection.appendChild(div);
    }
}