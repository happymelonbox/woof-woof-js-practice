document.addEventListener('DOMContentLoaded', function(){

const URL = 'http://localhost:3000/pups'
const dogBar = document.getElementById('dog-bar')
const dogInfoDiv = document.getElementById('dog-info')

let eachDog, eachDogName, dogBarInnerSpan, dogInfoImg, dogInfoTitle, dogInfoGOrB, dogInfo, goodBoy, dogId
let isClicked = false

fetch(URL)
.then(resp=>resp.json())
.then((data)=>{addToDogBar(data)})

function addToDogBar(obj){
    eachDog = Object.values(obj)
    for(let i=0;i<eachDog.length;i++){
        eachDogName = eachDog[i].name
        dogBarInnerSpan = dogBar.appendChild(document.createElement('span'))
        dogBarInnerSpan.innerHTML = eachDogName
        dogBarInnerSpan.style.cursor = 'pointer'
        dogBarInnerSpan.addEventListener('click', function(){openDogInfo(eachDog[i].name, eachDog[i].image, eachDog[i].isGoodDog), eachDog[i].id})
        console.log(eachDogName[i].id)
    }
}

function openDogInfo(name, image, isGood, id){
    if(isClicked){
        dogInfo = document.querySelectorAll('.dogInfo')
        for(i=0;i<dogInfo.length;i++){
            dogInfo[i].remove()
        }
    }
    isClicked = true
    dogId = id
    console.log(dogId)
    dogInfoImg = dogInfoDiv.appendChild(document.createElement('img'))
    dogInfoImg.setAttribute('src', image)
    dogInfoImg.setAttribute('class', 'dogInfo')
    dogInfoTitle = dogInfoDiv.appendChild(document.createElement('h2'))
    dogInfoTitle.setAttribute('class', 'dogInfo')
    dogInfoTitle.innerHTML = name
    dogInfoGOrB = dogInfoDiv.appendChild(document.createElement('button'))
    dogInfoGOrB.setAttribute('class', 'dogInfo')
    if(isGood){
        dogInfoGOrB.innerHTML = 'Good doggo'
        goodBoy = true
    } else {
        dogInfoGOrB.innerHTML = 'Bad doggo'
        goodBoy = false
    }
    dogInfoGOrB.addEventListener('click', function(){toggleGB(dogId)})
}

function toggleGB(idNumber){
    if (goodBoy){
        dogInfoGOrB.innerHTML = 'Bad doggo'
        goodBoy = false
        
    } else if (!goodBoy){
        dogInfoGOrB.innerHTML = 'Good doggo'
        goodBoy = true
    }
    fetch(URL+`/:${idNumber}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify( {isGood : goodBoy } ) 
    })
}

})