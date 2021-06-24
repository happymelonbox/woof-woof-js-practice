document.addEventListener('DOMContentLoaded', function(){

const URL = 'http://localhost:3000/pups'
const dogBar = document.getElementById('dog-bar')
const dogInfoDiv = document.getElementById('dog-info')
const goodDogFilter = document.getElementById('good-dog-filter')

let eachDog, dogBarInnerSpan, dogInfoImg, dogInfoTitle, dogInfoGOrB, dogInfo, goodDogs, dogId, allDogs
let isClicked = false

goodDogFilter.addEventListener('click', function(){dogFilterToggle()})

fetch(URL)
.then(resp=>resp.json())
.then((data)=>{addToDogBar(data)})

function dogFilterToggle(){
    if(!isClicked){
        isClicked = true
        goodDogFilter.innerHTML = 'Filter good dogs: ON'
        removeAllDogs()
        fetch(URL)
        .then(resp=>resp.json())
        .then((data)=>{addGoodDogToDogBar(data)})
    } else {
        isClicked = false
        goodDogFilter.innerHTML = 'Filter good dogs: OFF'
        removeAllDogs()
        fetch(URL)
        .then(resp=>resp.json())
        .then((data)=>{addToDogBar(data)})
    }
}

function addToDogBar(obj){
    eachDog = Object.values(obj)
    for(let i=0;i<eachDog.length;i++){
        eachDogI = eachDog[i]
        dogBarInnerSpan = dogBar.appendChild(document.createElement('span'))
        dogBarInnerSpan.setAttribute('class', 'allDogs')
        dogBarInnerSpan.innerHTML = eachDogI.name
        dogBarInnerSpan.style.cursor = 'pointer'
        dogBarInnerSpan.addEventListener('click', function(){openDogInfo(eachDog[i])})
    }
}

function addGoodDogToDogBar(obj){
    eachDog = Object.values(obj)
    for(let i=0;i<eachDog.length;i++){
        eachDogI = eachDog[i]
        if(eachDogI.isGoodDog){
            dogBarInnerSpan = dogBar.appendChild(document.createElement('span'))
            dogBarInnerSpan.setAttribute('class', 'allDogs')
            dogBarInnerSpan.innerHTML = eachDogI.name
            dogBarInnerSpan.style.cursor = 'pointer'
            dogBarInnerSpan.addEventListener('click', function(){openDogInfo(eachDog[i])})
        }
    }
}

function removeAllDogs(){
    allDogs = document.querySelectorAll('span.allDogs')
        for (k=0; k<allDogs.length; k++){
            allDogs[k].remove()
        }
}

function openDogInfo(arg){
    if(isClicked){
        dogInfo = document.querySelectorAll('.dogInfo')
        for(i=0;i<dogInfo.length;i++){
            dogInfo[i].remove()
        }
    }
    isGood = arg.isGoodDog
    isClicked = true
    dogId = arg.id
    console.log(dogId)
    dogInfoImg = dogInfoDiv.appendChild(document.createElement('img'))
    dogInfoImg.setAttribute('src', arg.image)
    dogInfoImg.setAttribute('class', 'dogInfo')
    dogInfoTitle = dogInfoDiv.appendChild(document.createElement('h2'))
    dogInfoTitle.setAttribute('class', 'dogInfo')
    dogInfoTitle.innerHTML = arg.name
    dogInfoGOrB = dogInfoDiv.appendChild(document.createElement('button'))
    dogInfoGOrB.setAttribute('class', 'dogInfo')
    if(isGood){
        dogInfoGOrB.innerHTML = 'Good doggo'
        isGood = true
    } else {
        dogInfoGOrB.innerHTML = 'Bad doggo'
        isGood = false
    }
    dogInfoGOrB.addEventListener('click', function(){toggleGB(arg)})
}

function toggleGB(dog){
    if (isGood){
        dogInfoGOrB.innerHTML = 'Bad doggo'
        isGood = false
    } else if(!isGood){
        dogInfoGOrB.innerHTML = 'Good doggo'
        isGood = true
    }
    fetch(URL+`/${dog.id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify( {
            'id': dog.id,
            'name': dog.name,
            'isGoodDog' : isGood,
            'image': dog.image
        })
    })
    .then(resp=>resp.json())
    .then(data=>console.log(data))
}

})