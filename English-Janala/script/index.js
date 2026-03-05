// createElement function to show synonims
const createElement = (arr) => {
    const htmlElements = arr.map((el) => `<span class = "btn">${el}</span>`);
    return (htmlElements.join(" "));
};

// pronounce word function
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
};

// loading spinner function
const manageSpinner = (status) => {
    if (status === true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
};

// loadlesson function for learn vocab section
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLessons(json.data))
};

// remove actice class function
const removeActice = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) => btn.classList.remove("active"));
}

// loadLevelWord function for word container
const loadLevelWord = (id) => {
    manageSpinner(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActice();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active");
            displayLevelWord(data.data);
        });
};

// loadWordDetail function to show word(modal way)
const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};

// loadWordDetail function to show word(modal way)
const displayWordDetails = (word) => {

    const detailBox = document.getElementById("details-container");
    detailBox.innerHTML = `
    <div class="space-y-5">
                        <div>
                            <h2 class="text-[36px] font-semibold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i>
                                :${word.pronunciation})</h2>
                        </div>
                        <div>
                            <p class="text-2xl font-medium mb-2">Meaning</p>
                            <p class="text-2xl font-medium">${word.meaning}</p>
                        </div>
                        <div>
                            <p class="text-2xl font-medium mb-2">Example</p>
                            <p class="text-2xl">${word.sentence}</p>
                        </div>
                        <div>
                            <h2 class="font-medium text-2xl mb-2">Synonyms</h2>
                            <div class = "">${createElement(word.synonyms)}</div>
                        </div>
                        <div>
                            <button class="btn btn-outline btn-primary">Complete Learning</button>
                        </div>
                    </div>
    `;
    document.getElementById("word_modal").showModal();
}

// loadLevelWord function for word container
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full rounded-xl py-10 space-y-3">
                <img class = "mx-auto" src = "./assets/alert-error.png">
                <p class="text-[13px] text-[#79716B] font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-bangla text-[#292524] font-medium text-[34px]">নেক্সট Lesson এ যান</h2>
            </div>
        `;
        manageSpinner(false);
        return;
    };

    words.forEach((word) => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-lg shadow-sm text-center py-10 px-5 space-y-4">
                <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p class="font-semibold">Meaning/Pronuounciation</p>
                <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া  যায়নি"}"</div>
                <div class="flex justify-between items-center">
                    <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-circle-info"></i></button>
                    <button onclick = "pronounceWord('${word.word}')" class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `;
        wordContainer.append(card);
    });
    manageSpinner(false);
};

// loadlesson function for learn vocab section
const displayLessons = (lessons) => {

    // get the container and make it empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // get into every lessons
    for (let lesson of lessons) {

        // create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book"></i>Lesson - ${lesson.level_no}</button>
        `;

        // append into the container
        levelContainer.append(btnDiv);
    };
};
loadLessons();

document.getElementById("btn-search")
    .addEventListener("click", () => {
        const input = document.getElementById("input-search");
        const searchValue = input.value.trim().toLowerCase();

        fetch("https://openapi.programming-hero.com/api/words/all")
            .then((res) => res.json())
            .then((data) => {
                const allWords = data.data;
                const filterWords = allWords.filter((word) =>
                    word.word.toLowerCase().includes(searchValue)
                );
                displayLevelWord(filterWords);
            });
    });

// faq toggle
const buttons = document.querySelectorAll(".accordion-btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const content = button.nextElementSibling;
        const icon = button.querySelector(".icon");

        // close all other accordions
        document.querySelectorAll(".accordion-content")
            .forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                    item.previousElementSibling.querySelector(".icon").textContent = "+";
                }
            });

            // toggle current one
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.textContent = "+";
            }
            else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.textContent = "-";
            }
    });
});




// displayWordDetails
// createElement → function name
// word.synonyms → argument
// arr → parameter (inside the function)