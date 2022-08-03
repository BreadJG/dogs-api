let timer
let deleteDelay
async function start(){
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        createDogList(data.message);
    } catch {
        console.log('There was a problem fetching the data.')
    }
};

start();

function createDogList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange='loadByBreed(this.value)'>
        <option>Choose a Breed</option>
        ${Object.keys(breedList).map(function(breed){
            return `<option>${breed}</option>`
        }).join('')}
    </select>`
}

async function loadByBreed(breed){
    if(breed != 'Choose a Breed'){
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await response.json();
        createSlideshow(data.message);
     }
}

function createSlideshow(images){
    let number = 0
    clearInterval(timer)
    clearTimeout(deleteDelay)
    if(images.legth > 1){
        document.getElementById('slideshow').innerHTML = `
        <div class="slide" style="background-image: url(${images[0]})"> </div>
        <div class="slide" style="background-image: url(${images[1]})"> </div>`
    } else {
        document.getElementById('slideshow').innerHTML = `
        <div class="slide" style="background-image: url(${images[0]})"> </div>
        <div class="slide"></div>`
    }

    number += 2;
    timer = setInterval(nextSlide, 3000)
    
    function nextSlide(){
        document.getElementById('slideshow').insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url(${images[number]})"></div>`)
        deleteDelay = setTimeout(function (){
            document.querySelector(".slide").remove();
        }, 1000)
        if (number + 1 >= images.legth) {
            number = 0;
        } else {
            number++
        }
    }
}

