const ENTITY_TYPES = [
  "Demon", 
  "Angel", 
  "Fey", 
  "Ghost",
  "Critter", 
  "Bork"
]

const JSON_DATA_FILES = [
  "entityFocuses.json", 
  "entityCausesOfDeath.json", 
  "entityFavorites.json",
  "entityHobbies.json",
  "entityIntentions.json",
  "entityProfessions.json",
  "entityNames.json",
  "entityPhysicalProperties.json"
]

let dataObj = {};
let GLOBAL_ENTITY;

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


fetchData().then(()=>{
  GLOBAL_ENTITY = new entityTemplate();
  console.log('done', GLOBAL_ENTITY)
});


const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const getRandomDate = (oldestYearModifier = 271821, latestYearModifier = 2) => {
  const presentYear = new Date().getFullYear() - latestYearModifier;
  const oldestYear = presentYear - oldestYearModifier;
  const randomYear = getRandomInt(oldestYear, presentYear);
  const randomMonth = getRandomInt(1, 12);
  const randomDay = getRandomInt(1, 28); // Assuming all months have 28 days for simplicity
  
  return new Date(randomYear, randomMonth - 1, randomDay);
}

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
  let names = []
  for(let i = 0; i < numberOfNames; i++) {
    names.push(generateRandomName(entityType, entityGender))
  }
  return names
}


const generateRandomBirthdate = (entityType) => {
  const dataSection = dataObj.PHYSICAL_PROPERTIES[0]['ENTITY_AGES'][entityType]
  const maxAge = dataSection[0] === null ? undefined : dataSection[0];
  const minAge = dataSection[1] === null ? undefined : dataSection[1];
  return getRandomDate(maxAge, minAge)

}

const calculateAge = (birthdate) => {
  const currentDate = new Date(); 
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

const generateRandomAge = (birthdate) => {
  const currentDate = new Date(); 
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

  return getRandomInt(0, age);
}


const calculateDeathdate = (birthdate, age) => {
  // Get the birth year from the birthdate
  const birthYear = birthdate.getFullYear();

  // Calculate the year of death based on age
  const deathYear = birthYear + age;

  // Get the birth month and day
  const birthMonth = birthdate.getMonth();
  const birthDay = birthdate.getDate();

  let randomMonth = getRandomInt(0, birthMonth);
  if (randomMonth === birthMonth) {
    // If the random month is the same as the birth month, generate a day before the birthday
    randomDay = getRandomInt(0, birthDay - 1);
  } else {
    randomDay = getRandomInt(0, 28);
  }

  return new Date(deathYear, randomMonth, randomDay);
}

const generateRandomPhysicalProperty = (entityType, property) => {
  const dataSection = dataObj.PHYSICAL_PROPERTIES[0][property][entityType]
  const dataSectionLength = dataSection.length - 1
  return dataSection[getRandomInt(0, dataSectionLength)]
};

// cause of death and random focus can be combined into one function
const generateRandomCauseofDeath = () => {
  const dataSection = dataObj.DEATH_TYPES[0]
  const dataLength = dataSection.length - 1
  return dataSection[getRandomInt(0, dataLength)]
}

// cause of death and random focus can be combined into one function
const generateRandomFocus = (entityType) => {  
  const dataSection = dataObj.FOCUS_TYPES[0]
  const dataLength = dataSection.length - 1;

  return dataSection[getRandomInt(0,dataLength)]
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
  constructor() {
    this.EntityType = generateRandomPhysicalProperty("Ghost", "ENTITY_TYPES");                    
    this.Gender = generateRandomPhysicalProperty(this.EntityType, "ENTITY_GENDERS");   
    this.Sound = generateRandomPhysicalProperty(this.EntityType, "ENTITY_SOUNDS");     // needs work
    this.Name = generateRandomName(this.EntityType, this.Gender); 
    this.Birthdate = generateRandomBirthdate(this.EntityType);   
    this.Age = this.EntityType === "Ghost" ? generateRandomAge(this.Birthdate) : calculateAge(this.Birthdate);
    this.Deathdate = this.EntityType === "Ghost" ? calculateDeathdate(this.Birthdate, this.Age + 1) : false; 
    this.CauseOfDeath = this.EntityType === "Ghost" ? generateRandomCauseofDeath() : false;      
    this.Height = generateRandomPhysicalProperty(this.EntityType, "ENTITY_HEIGHTS");
    this.Weight = generateRandomPhysicalProperty(this.EntityType, "ENTITY_WEIGHTS");
    this.Arms = generateRandomPhysicalProperty(this.EntityType, "ENTITY_ARMS");
    this.Legs = generateRandomPhysicalProperty(this.EntityType, "ENTITY_LEGS");;
    this.Tails = generateRandomPhysicalProperty(this.EntityType, "ENTITY_TAILS");;
    this.Wings = generateRandomPhysicalProperty(this.EntityType, "ENTITY_WINGS");;
    // this.Flight = calculateWings();
    this.Speed = generateRandomPhysicalProperty(this.EntityType, "ENTITY_SPEED");
    this.Stealth = generateRandomPhysicalProperty(this.EntityType, "ENTITY_STEALTH");   // Does this determine the size of the blip or whether the blip works at all?
    this.Temperature = generateRandomPhysicalProperty(this.EntityType, "ENTITY_TEMPERATURE");
    this.Morality = generateRandomPhysicalProperty(this.EntityType, "ENTITY_MORALITY");
    this.Ordered = generateRandomPhysicalProperty(this.EntityType, "ENTITY_ORDERS");
    this.Focus = generateRandomFocus(this.EntityType);
    this.Glyph = generateRandomPhysicalProperty(this.EntityType, "ENTITY_GLYPHS");
    this.Candles = generateRandomPhysicalProperty(this.EntityType, "ENTITY_CANDLES");
    this.Promise = generateRandomPhysicalProperty(this.EntityType, "ENTITY_PROMISES");
    this.Intention = generateRandomIntention(this.EntityType, this.Morality);
    this.Relationships = {
      Partner: generateRandomName(this.EntityType, this.Gender), 
      Mom: generateRandomName(this.EntityType, "f"),
      Dad: generateRandomName(this.EntityType, "m"),
      Siblings: generateRandomNames(this.EntityType, generateRandomPhysicalProperty(this.EntityType, "ENTITY_GENDERS"), getRandomInt(1,5)), 
      Friends: generateRandomNames(this.EntityType, generateRandomPhysicalProperty(this.EntityType, "ENTITY_GENDERS"), getRandomInt(1,5)), 
    };
    this.Hobbies = generateRandomHobbies(this.EntityType, this.Morality, this.Ordered, getRandomInt(1, 3));
    this.Profession = generateRandomProfession(this.EntityType, this.Birthdate);
    this.Income = generateRandomIncome(this.EntityType);
    this.Favorites = {
      Food: generateRandomFavorites(this.EntityType, getRandomInt(1,2), "FOOD_TYPES"), 
      Drink: generateRandomFavorites(this.EntityType, getRandomInt(1,2), "DRINK_TYPES"), 
      Music: generateRandomFavorites(this.EntityType, getRandomInt(1,3), "MUSIC_TYPES"), 
      Literature: generateRandomFavorites(this.EntityType, getRandomInt(1,3), "BOOK_TYPES"), 
      Film: generateRandomFavorites(this.EntityType, getRandomInt(1,3), "MOVIE_TYPES"), 
      Fashion: generateRandomFavorites(this.EntityType, getRandomInt(1,2), "FASHION_TYPES"), 
      Color: generateRandomFavorites(this.EntityType, getRandomInt(1,1), "COLOR_TYPES"), 
    };
    this.Introversion = generateRandomIntroversion(this.EntityType);
    // this.Personality = generateRandomPersonality(this.EntityType);    // What does personality do? Is this for Meyer's Briggs?
    this.Hostility = 0;       // This is the value that gets read by the EMF reader.
    this.Trust = 0;           // This is the value that gets read by the Visibility meter. The more trust bigger blip? 1 glyph makes them visible?
  }
}