let monsterData


fetch('../src/assets/data/ghostProperties.json')
  .then(response => response.json())
  .then(data => {
    // Use the parsed JSON data here
    monsterData = data[getRandomInt(2)] 
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error loading JSON:', error);
});


const emfLights = document.querySelectorAll('.emf-light-bulb')
function addHostility() {
    if(monsterData.hostility < 5){
        monsterData.hostility += 1;
    }
    
    emfLights.forEach((light, i) => {
        if(monsterData.hostility >= i){
            light.classList.remove('emf-light-off')
        }
    })
}

function removeHostility() {
    if(monsterData.hostility > 0){
        monsterData.hostility -= 1;
    }
    
    emfLights.forEach((light, i) => {
        if(monsterData.hostility < i){
            light.classList.add('emf-light-off')
        }
    })
}