const ENTITY_TYPES = [
  "Demon", 
  "Angel", 
  "Fey", 
  "Ghost",
  "Critter", 
  "Bork"
]
const MORALITY_TYPES = ['good', 'neutral', 'evil']
const ORDERED_TYPES = ['chaotic', 'neutral', 'lawful']
const FOCUS_TYPES = [
  "Old Mirror",
  "Music Box",
  "Family Heirloom",
  "Vintage Doll",
  "Locked Chest",
  "Painting or Portrait",
  "Pocket Watch",
  "Ancient Book",
  "Jewelry",
  "Weapon",
  "Cursed Painting",
  "Antique Furniture",
  "Symbolic Amulet",
  "Vintage Phonograph",
  "Haunted Sculpture",
  "Family Portrait Album",
  "Broken Pocket Watch",
  "Mysterious Gemstone",
  "Forgotten Relic",
  "Time-Worn Journal"
]




const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const formatYear = (year) => {
  if (year <= 0) {
      return `${year} BCE`;
  } else {
      return year.toString();
  }
}

const getRandomDate = (oldestYear = -271821, latestYearModifier = 2) => {
  const presentYear = new Date().getFullYear() - latestYearModifier;

  const randomYear = formatYear(getRandomInt(oldestYear, presentYear));
  const randomMonth = getRandomInt(1, 12);
  const randomDay = getRandomInt(1, 28); // Assuming all months have 28 days for simplicity
  
  
  const formattedDate = {
    Day: randomDay,
    Month: randomMonth,
    Year: randomYear
  };

  return formattedDate;
}



const generateRandomEntityType = () => {
  return ENTITY_TYPES[getRandomInt(0,ENTITY_TYPES.length - 1)]
};



// To get year zero date must be current date - 2
// const randomDate = getRandomDate(0, 2022);

// getRandomName(getRandomInt(0, ENTITY_TYPES.length - 1))

const JSON_DATA_FILES = [
  "entityCausesOfDeath.json", 
  "entityFavorites.json",
  "entityHobbies.json",
  "entityIntentions.json",
  "entityJobs.json",
  "entityNames.json",
  "entityPhysicalProperties.json"
]

let dataObj = {};

async function fetchData(){
  for (let i = 0; i < JSON_DATA_FILES.length; i++)   {
    try {
      const response = await fetch(`../src/assets/data/${JSON_DATA_FILES[i]}`);
      const data = await response.json();
        const itemKey = data.key
        const itemData = data.data
        Object.assign(dataObj, {[itemKey]: [itemData]}); 
    }
    catch (e) {
      console.error(e.message);
    }
  };  
};


// const Entity = fetchData().then(()=>{
const entity = fetchData().then(()=>{
  console.log('dataObj', dataObj)
  const entityObj = new entityTemplate(generateRandomEntityType())
  console.log("entity done", entityObj)
});


const getEntityTypeIndex = (entityType) => {
  return ENTITY_TYPES.findIndex(item => item === entityType)
}

const generateRandomName = (entityType, entityGender) => {
  console.log('gender', entityGender)
  const entityIndex = getEntityTypeIndex(entityType)
  const dataSection = dataObj.NAME_TYPES[0][entityIndex][entityType]
  const dataSectionLength = dataSection.length - 1

  if(entityType === "Ghost" && entityGender === "m"){
    return dataSection[getRandomInt(0, 120)]
  } else if (entityType === "Ghost" && entityGender === "f") {
    return dataSection[getRandomInt(120, dataSectionLength)]
  } else {
    return dataSection[getRandomInt(0, dataSectionLength)]
  }
  
};

const generateEntityStats = () => {
  

}


const generateRandomGender = (entityType) => {
  const dataSection = dataObj.PHYSICAL_PROPERTIES[0]['GENDER_TYPES']
  const dataSectionLength = dataSection.length - 1

  switch(entityType) {
    case "Demon":
      return dataSection[getRandomInt(0, dataSectionLength)]
     
    case "Angel":
      return dataSection[getRandomInt(1, 2)]
     
    case "Fey":
      return dataSection[getRandomInt(1, 2)]
     
    case "Ghost":
      return dataSection[getRandomInt(0, 2)]
     
    case "Critter":
      return dataSection[getRandomInt(1, 2)]
     
    case "Bork":
      return dataSection[getRandomInt(6, 9)]
     
    default:
      return "Error"
  }
  
}


class entityTemplate {
  constructor(entityType) {
    this.EntityType =  entityType,
    this.Gender = generateRandomGender(entityType);
    this.Name = generateRandomName(entityType, this.Gender);
    this.Birthdate = {
      Day: 0,
      Month: 0,
      Year: 0
    };
    this.Age = "";
    this.Deathdate = {
      Day: 0,
      Month: 0,
      Year: 0
    };
    this.Dead = false;
    this.CauseOfDeath = "";
    this.Height = 0;
    this.Weight = 0;
    this.Arms = 0;
    this.Legs = 0;
    this.Tails = 0;
    this.Wings = 0;
    this.Flight = false;
    this.Speed = 0;
    this.Stealth = false;
    this.Temperature = 0;
    this.Morality = "";
    this.Ordered = "";
    this.Focus = "";
    this.Intention = "";
    this.Relationships = {
      Partner: false,
      Mom: true,
      Dad: true,
      Siblings: [],
      Friends: []
    };
    this.Hobbies = [];
    this.Profession = [];
    this.Income = 0;
    this.Favorites = {
      Food: [],
      Drink: [],
      Music: [],
      Literature: [],
      Film: [],
      Fashion: [],
      Color: []
    };
    this.Introversion = 0;
    this.Personality = 0;
    this.Hostility = 0;
    this.Trust = 0;
  }
}