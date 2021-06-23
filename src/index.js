document.addEventListener('DOMContentLoaded', function(){

const URL = 'http://localhost:3000/pups'
const dogBar = document.getElementById('dog-bar')

let eachDogName, dogBarInnerSpan

fetch(URL)
.then(resp=>resp.json())
.then((data)=>{addToDogBar(data)})

function addToDogBar(obj){
    eachDogName = Object.values(obj)
    for(i=0;i<eachDogName.length;i++){
        dogBarInnerSpan = dogBar.appendChild(document.createElement('span'))
        dogBarInnerSpan.innerHTML = eachDogName[i].name
        console.log(dogBarInnerSpan)
    }
}

})