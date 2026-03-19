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
   // wordContainer.innerHTML = "";

    words.forEach( (word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        <p> catie </p>
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