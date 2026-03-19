const loadLessson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=> res.json())
    .then((json) => displayLesson(json.data))
}
const loadlevelword = (id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res)=> res.json())
    .then((data)=> displaylevelword(data.data)) 
}

const displaylevelword =(words)=>{
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = "";
    if(words.length == 0){
        wordContainer.innerHTML = `
             <div class="text-center col-span-full rounded-xl py-8  space-y-6">
             <img src="./assets/alert-error.png" class="mx-auto">
        <p class="font-bangla text-xl font-medium text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bangla font-bold text-3.5xl">নেক্সট Lesson এ যান</h2>
     </div>
        `;
    }

    words.forEach( (word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
           <div class="bg-white rounded-xl shadow-md text-center py-12 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold ">Meaning/Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">${word.meaning}/${word.pronunciation}</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-blue-300 opacity-70 hover:bg-blue-500 opacity-92"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-blue-300 opacity-70 hover:bg-blue-500 opacity-92"><i class="fa-solid fa-ear-listen"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card); 
    });
}


const displayLesson =(lessons)=>{
    // 1.get the container & empty
    const levelcontainer = document.getElementById("level-container")
    levelcontainer.innerHTML = ""
    // 2.get into every lessons
    for(let lesson of lessons){
           //     3,create Element
           const btnDiv = document.createElement("div");
           btnDiv.innerHTML = `  
                    <button onclick="loadlevelword(${lesson.level_no})" class="btn btn-outline btn-primary">
                    <i class="fa-solid fa-book-open"></i>Lesson -${lesson.lessonName}
                    </button>
                 
           `;
    //     4,append into container
        levelcontainer.append(btnDiv);
    }

};
loadLessson();