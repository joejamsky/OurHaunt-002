const ENTITY_TYPES = [
  "Demon", 
  "Angel", 
  "Fey", 
  "Ghost",
  "Critter", 
  "Bork"
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

  const randomYear = getRandomInt(oldestYear, presentYear);
  const randomMonth = getRandomInt(1, 12);
  const randomDay = getRandomInt(1, 28); // Assuming all months have 28 days for simplicity
  
  const formattedDate = new Date(randomYear, randomMonth - 1, randomDay);

  return formattedDate;
}


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

const generateRandomEntityType = () => {
  return ENTITY_TYPES[getRandomInt(0,ENTITY_TYPES.length - 1)]
};


const generateRandomName = (entityType, entityGender) => {
  const dataSection = dataObj.NAME_TYPES[0][entityType]
  const dataSectionLength = dataSection.length - 1
  if(entityType === "Ghost") {
    if(entityGender === "m") {
      return dataSection[getRandomInt(0, 120)]
    } else if (entityGender === "f") {
      return dataSection[getRandomInt(121, dataSectionLength)]
    } else {
      return dataSection[getRandomInt(0, dataSectionLength)]
    }
  } else {
    return dataSection[getRandomInt(0, dataSectionLength)]
  }

}

const generateRandomNames = (entityType, entityGender, numberOfNames = 1) => {

  if(numberOfNames > 1) {
    let names = []
    for(let i = 0; i < numberOfNames; i++) {
      names.push(generateRandomName(entityType, entityGender))
    }
    return names
  } else {
    return generateRandomName(entityType, entityGender)
  }
}

const generateEntityStats = () => {
  

}


const generateRandomGender = (entityType) => {
  const dataSection = dataObj.PHYSICAL_PROPERTIES[0]['GENDER_TYPES'][entityType]
  const dataSectionLength = dataSection.length - 1
  return dataSection[getRandomInt(0, dataSectionLength)]
}

const generateRandomSound = (entityType) => {
  switch(entityType) {
    case "Demon":
      return false
     
    case "Angel":
      return false
     
    case "Fey":
      return false
     
    case "Ghost":
      return false
     
    case "Critter":
      return false
     
    case "Bork":
      return false
     
    default:
      return "Error"
  }
}

// const getRandomDate = (oldestYear = -271821, latestYearModifier = 2) => {
const generateRandomBirthdate = (entityType) => {
  const dataSection = dataObj.PHYSICAL_PROPERTIES[0]['ENTITY_AGES'][entityType]
  const maxAge = dataSection[0] === null ?  undefined : dataSection[0];
  const minAge = dataSection[1] === null ? undefined: dataSection[1];
  return getRandomDate(maxAge, minAge)

}

const calculateAge = (birthdate) => {
  const currentDate = new Date(); // Get the current date
  const birthYear = birthdate.getFullYear();
  const currentYear = currentDate.getFullYear();
  const birthMonth = birthdate.getMonth();
  const currentMonth = currentDate.getMonth();
  const birthDay = birthdate.getDate();
  const currentDay = currentDate.getDate();

  let age = currentYear - birthYear;

  // Check if the birthday has already occurred this year
  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--;
  }

  return age;
}

//wrie a function that takes in a birthdate and an age and returns a deathdate
const calculateDeathdate = (birthdate, age) => {
  const currentDate = new Date(); // Get the current date
  const birthYear = birthdate.getFullYear();
  const currentYear = currentDate.getFullYear();
  const birthMonth = birthdate.getMonth();
  const currentMonth = currentDate.getMonth();
  const birthDay = birthdate.getDate();
  const currentDay = currentDate.getDate();

  let deathYear = birthYear + age;
  let deathMonth = birthMonth;
  let deathDay = birthDay;

  // Check if the birthday has already occurred this year
  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    deathYear--;
  }

  return new Date(deathYear, deathMonth, deathDay);
}

const generateRandomCauseofDeath = () => {
  const dataSection = dataObj.DEATH_TYPES[0]
  const dataLength = dataSection.length - 1
  return dataSection[getRandomInt(0, dataLength)]
}

const generateRandomHeight = (entityType) => {
  const dataSection = dataObj.PHYSICAL_PROPERTIES[0]['ENTITY_HEIGHTS'][entityType]
  const dataSectionLength = dataSection.length - 1
  return dataSection[getRandomInt(0, dataSectionLength)]
};

const generateRandomWeight = (entityType) => {
  const dataSection = dataObj.PHYSICAL_PROPERTIES[0]['ENTITY_WEIGHTS'][entityType]
  const dataSectionLength = dataSection.length - 1
  return dataSection[getRandomInt(0, dataSectionLength)]
};

const generateRandomArms = (entityType) => {
  const dataSection = dataObj.PHYSICAL_PROPERTIES[0]['ENTITY_ARMS'][entityType]
  const dataSectionLength = dataSection.length - 1
  return dataSection[getRandomInt(0, dataSectionLength)]
};

const generateRandomLegs = (entityType) => {
  const dataSection = dataObj.PHYSICAL_PROPERTIES[0]['ENTITY_LEGS'][entityType]
  const dataSectionLength = dataSection.length - 1
  return dataSection[getRandomInt(0, dataSectionLength)]
};

const generateRandomTails = (entityType) => {
  const dataSection = dataObj.PHYSICAL_PROPERTIES[0]['ENTITY_TAILS'][entityType]
  const dataSectionLength = dataSection.length - 1
  return dataSection[getRandomInt(0, dataSectionLength)]
};

const generateRandomWings = (entityType) => {
  const dataSection = dataObj.PHYSICAL_PROPERTIES[0]['ENTITY_WINGS'][entityType]
  const dataSectionLength = dataSection.length - 1
  return dataSection[getRandomInt(0, dataSectionLength)]
};

const generateRandomSpeed = (entityType) => {
  const dataSection = dataObj.PHYSICAL_PROPERTIES[0]['ENTITY_SPEED'][entityType]
  const dataSectionLength = dataSection.length - 1
  return dataSection[getRandomInt(0, dataSectionLength)]
};

const generateRandomStealth = (entityType) => {  
  const dataSection = dataObj.PHYSICAL_PROPERTIES[0]['ENTITY_STEALTH'][entityType]
  const dataSectionLength = dataSection.length - 1
  return dataSection[getRandomInt(0, dataSectionLength)]
};

const generateRandomTemperature = (entityType) => {
  const dataSection = dataObj.PHYSICAL_PROPERTIES[0]['ENTITY_TEMPERATURE'][entityType]
  const dataSectionLength = dataSection.length - 1
  return dataSection[getRandomInt(0, dataSectionLength)]
};

const generateRandomMorality = (entityType) => {
  const dataSection = dataObj.PHYSICAL_PROPERTIES[0]['ENTITY_MORALITY'][entityType]
  const dataSectionLength = dataSection.length - 1
  return dataSection[getRandomInt(0, dataSectionLength)]
};

const generateRandomOrdered = (entityType) => {
  const dataSection = dataObj.PHYSICAL_PROPERTIES[0]['ENTITY_ORDERS'][entityType]
  const dataSectionLength = dataSection.length - 1
  return dataSection[getRandomInt(0, dataSectionLength)]
};

const generateRandomFocus = (entityType) => {  
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
  const dataLength = FOCUS_TYPES.length - 1;

  return FOCUS_TYPES[getRandomInt(0,dataLength)]
};

const generateRandomIntention = (entityType, morality) => {
  
  let sectionConverter 

  switch(morality) {
    case "good":
     sectionConverter = "GOOD_INTENTIONS"
     break;
    case "neutral":
      if(entityType === "Bork") {
        sectionConverter = "SCIENTIFIC_INTENTIONS"
      } else {
        sectionConverter = "NEUTRAL_INTENTIONS"
      }
      break;
    case "evil":
      sectionConverter = "EVIL_INTENTIONS"
      break;
    default:
      sectionConverter = "ERROR"
      break;
  }

  const dataSection = dataObj.INTENTION_TYPES[0][sectionConverter]
  const dataLength = dataSection.length - 1

  return dataSection[getRandomInt(0, dataLength)];
};

const generateRandomHobbies = (entityType, morality, ordered, numberOfHobbies) => {

  let dataSection
  let dataLength
  let hobbies = []

  switch(morality) {
    // case "good":
    //   dataLength = dataObj.HOBBIES_TYPE[0].GOOD_HOBBIES.length - 1;
    //   return dataObj.HOBBIES_TYPE[0].GOOD_HOBBIES[0, dataLength];
     
    case "neutral":
    case "good":
      for(let i = 0; i <numberOfHobbies; i++) {
        dataSection = dataObj.HOBBIES_TYPE[0].NEUTRAL_HOBBIES
        dataLength = dataSection.length - 1
        hobbies.push(dataSection[getRandomInt(0, dataLength)])
      }
    
      return hobbies;
    case "evil":
      for(let i = 0; i < numberOfHobbies; i++) {
        dataSection = dataObj.HOBBIES_TYPE[0].EVIL_HOBBIES
        dataLength = dataSection.length - 1
        hobbies.push(dataSection[getRandomInt(0, dataLength)])
      }
      return hobbies;
    default:
      return "Error"
  }
};

const generateRandomProfession = (entityType, birthdate) => {
  
  let dataLength
  if(birthdate.year > 1950) {
    dataLength = dataObj.PROFESSION_TYPES[0][1].MODERN_WHITE_COLLAR.length - 1   // This second array value could be randomized for white collar vs blue collar
    return dataObj.PROFESSION_TYPES[0][1].MODERN_WHITE_COLLAR[getRandomInt(0, dataLength)]
  } else {
    dataLength = dataObj.PROFESSION_TYPES[0][0].PRE_MODERN.length - 1
    return dataObj.PROFESSION_TYPES[0][0].PRE_MODERN[getRandomInt(0, dataLength)]
  }
};

const generateRandomIncome = (entityType) => {
  return getRandomInt(0, 10000000000)
};

const generateRandomIntroversion = (entityType) => {
  return getRandomInt(0, 10)
};

const generateRandomPersonality = (entityType) => {
  return getRandomInt(0, 10)
};

const generateRandomFavorites = (entityType, numberOfFavorites, favoriteType) => {
  const dataSection = dataObj.FAVORITE_TYPES[0][favoriteType]
  const dataLength = dataSection.length - 1;

  let favorites = []
  for(let i = 0; i < numberOfFavorites; i++) {
    favorites.push(dataSection[getRandomInt(0, dataLength)])
  }
  return favorites
}

class entityTemplate {
  constructor(entityType) {
    this.EntityType =  entityType,                    
    this.Gender = generateRandomGender(entityType);   
    this.Sound = generateRandomSound(entityType);     // needs work
    this.Name = generateRandomName(entityType, this.Gender); 
    this.Birthdate = generateRandomBirthdate(entityType);   
    this.Age = calculateAge(this.Birthdate);                // needs work
    this.Deathdate = entityType === "Ghost" ? calculateDeathdate(this.Birthdate, this.Age) : false; 
    this.CauseOfDeath = entityType === "Ghost" ? generateRandomCauseofDeath() : false;      
    this.Height = generateRandomHeight(entityType);
    this.Weight = generateRandomWeight(entityType);
    this.Arms = generateRandomArms(entityType);
    this.Legs = generateRandomLegs(entityType);;
    this.Tails = generateRandomTails(entityType);;
    this.Wings = generateRandomWings(entityType);;
    // this.Flight = calculateWings();
    this.Speed = generateRandomSpeed(entityType);
    this.Stealth = generateRandomStealth(entityType);   // Does this determine the size of the blip or whether the blip works at all?
    this.Temperature = generateRandomTemperature(entityType);
    this.Morality = generateRandomMorality(entityType);
    this.Ordered = generateRandomOrdered(entityType);
    this.Focus = generateRandomFocus(entityType);
    this.Intention = generateRandomIntention(entityType, this.Morality);
    this.Relationships = {
      Partner: generateRandomName(entityType, this.Gender), 
      Mom: generateRandomName(entityType, "f"),
      Dad: generateRandomName(entityType, "m"),
      Siblings: generateRandomNames(entityType, generateRandomGender(entityType), getRandomInt(1,5)), 
      Friends: generateRandomNames(entityType, generateRandomGender(entityType), getRandomInt(1,5)), 
    };
    this.Hobbies = generateRandomHobbies(entityType, this.Morality, this.Ordered, getRandomInt(1, 3));
    this.Profession = generateRandomProfession(entityType, this.Birthdate);
    this.Income = generateRandomIncome(entityType);
    this.Favorites = {
      Food: generateRandomFavorites(entityType, getRandomInt(1,2), "FOOD_TYPES"), 
      Drink: generateRandomFavorites(entityType, getRandomInt(1,2), "DRINK_TYPES"), 
      Music: generateRandomFavorites(entityType, getRandomInt(1,3), "MUSIC_TYPES"), 
      Literature: generateRandomFavorites(entityType, getRandomInt(1,3), "BOOK_TYPES"), 
      Film: generateRandomFavorites(entityType, getRandomInt(1,3), "MOVIE_TYPES"), 
      Fashion: generateRandomFavorites(entityType, getRandomInt(1,2), "FASHION_TYPES"), 
      Color: generateRandomFavorites(entityType, getRandomInt(1,1), "COLOR_TYPES"), 
    };
    this.Introversion = generateRandomIntroversion(entityType);
    // this.Personality = generateRandomPersonality(entityType);    // What does personality do? Is this for Meyer's Briggs?
    this.Hostility = 0;       // This is the value that gets read by the EMF reader.
    this.Trust = 0;           // This is the value that gets read by the Visibility meter. The more trust bigger blip? 1 glyph makes them visible?
  }
}