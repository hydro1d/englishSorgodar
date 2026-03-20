//synonym fetch . convert to string when array throws
const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
};


const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};


const loadLessson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data))
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn-active")
    lessonButtons.forEach(btn => btn.classList.remove("active"));
};

const loadlevelword = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();//remove all active class
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            //class jeta click kore ota tei thakbe active
            clickBtn.classList.add("active")
            displaylevelword(data.data)
        })
}
//async use
const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};


const displayWordDetails = (word) => {
    const detailbox = document.getElementById("details-container");
    detailbox.innerHTML = `
            <div class="">
            <h2 class="font-bold text-2xl ">${word.word}(<i class="fa-solid fa-microphone-lines"></i>):${word.pronunciation}</h2>
        </div>
        <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
        </div>
            <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
        </div>
            <div class="">
            <h2 class="font-bold">Synonym</h2>
  <div class="">${createElements(word.synonyms)}</div>
        </div>
    `;
    document.getElementById("my_modal_5").showModal()
}


const displaylevelword = (words) => {
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `
             <div class="text-center col-span-full rounded-xl py-8  space-y-6">
             <img src="./assets/alert-error.png" class="mx-auto">
        <p class="font-bangla text-xl font-medium text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bangla font-bold text-3.5xl">নেক্সট Lesson এ যান</h2>
     </div>
        `;
         manageSpinner(false);
         return;
    }

    words.forEach((word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
           <div class="bg-white rounded-xl shadow-md text-center py-12 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold ">Meaning/Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">${word.meaning}/${word.pronunciation}</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-blue-300 opacity-70 hover:bg-blue-500 opacity-92"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-blue-300 opacity-70 hover:bg-blue-500 opacity-92"><i class="fa-solid fa-ear-listen"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    });
     manageSpinner(false);
}


const displayLesson = (lessons) => {
    // 1.get the container & empty
    const levelcontainer = document.getElementById("level-container")
    levelcontainer.innerHTML = ""
    // 2.get into every lessons
    for (let lesson of lessons) {
        //     3,create Element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `  
                    <button id="lesson-btn-${lesson.level_no}" onclick="loadlevelword(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn-active">
                    <i class="fa-solid fa-book-open"></i>Lesson -${lesson.lessonName}
                    </button>
                 
           `;
        //     4,append into container
        levelcontainer.append(btnDiv);
    }

};
loadLessson();