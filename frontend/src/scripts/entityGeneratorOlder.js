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

const JSON_CREATURE_CONFIG_FILES = [
  "ghostBaseObj.json",
  "angelBaseObj.json",
  "demonBaseObj.json"
]


let GLOBAL_ENTITY;
let GLOBAL_BACKSTORY;
let dataObj

async function fetchData(files){
  let dataStore = {}
  for (let i = 0; i < files.length; i++)   {
    try {
      const response = await fetch(`../src/assets/data/${files[i]}`);
      const data = await response.json();
      const itemKey = data.key
      const itemData = data.data
      Object.assign(dataStore, {[itemKey]: [itemData]}); 
    }
    catch (e) {
      console.error("Failed to fetch:", e.message);
    }
  };  
  return dataStore
};


class EntityTemplate {
  constructor(config) {
    const temp = {};  // Temporary object to store generated values
    
    Object.keys(config).forEach(key => {
      if (propertyGenerators[key]) {
        // If there's a generator function for this key, use it
        this[key] = propertyGenerators[key](config, temp);
        temp[key] = this[key];
      }
      else if (Array.isArray(config[key])) {
        // Randomly generate a value if it's an array with numbers
        if (typeof config[key][0] === 'number' && typeof config[key][1] === 'number') {
          this[key] = getRandomInt(config[key][0], config[key][1]);
        } 
        // Randomly generate a value if it's an array with values
        else {
          this[key] = getRandomValueFromArray(config[key]);
        }
        temp[key] = this[key];
      } 
      else {
        // For non-array types, directly set the value
        this[key] = config[key];
        temp[key] = this[key];
      }
    });
  }
}


async function setupEntity() {
  dataObj = await fetchData(JSON_DATA_FILES);
  const creatureConfigs = await fetchData(JSON_CREATURE_CONFIG_FILES);

  const configKeys = Object.keys(creatureConfigs);
  const randomConfigKeyIndex = getRandomInt(0, configKeys.length - 1);
  // const randomConfigKey = configKeys[randomConfigKeyIndex]; // Key for entity type
  const randomConfigKey = "Ghost"; // Troubleshoot

  GLOBAL_ENTITY = new EntityTemplate(creatureConfigs[randomConfigKey][0]);
  console.log("init", GLOBAL_ENTITY)
  // GLOBAL_BACKSTORY = generateBackstory(GLOBAL_ENTITY);
}


setupEntity().catch(e => console.error(e));


// const propertyGenerators = {
//   'Name': (config) => generateRandomName(config.Type, config.Gender, dataObj),
//   'Birthdate': (config) => getRandomDate(config.Birthdate[0], config.Birthdate[1]),
//   'CurrentAge': (config, temp) => calculateAge(temp.Birthdate),
//   'DeathAge': (config, temp) => generateRandomDeathAge(config.DeathAge[0], config.DeathAge[1], temp.Birthdate),
//   'Deathdate': (config, temp) => calculateDeathdate(temp.Birthdate, temp.DeathAge + 1),
//   'CauseOfDeath': (config) => generateRandomCauseofDeath(config.Type, dataObj),
  // 'Height': (config) => generateRandomPhysicalProperty(config.Type, "ENTITY_HEIGHTS"),
  // 'Weight': (config) => generateRandomPhysicalProperty(config.Type, "ENTITY_WEIGHTS"),
  // 'Arms': (config) => generateRandomPhysicalProperty(config.Type, "ENTITY_ARMS"),
  // 'Legs': (config) => generateRandomPhysicalProperty(config.Type, "ENTITY_LEGS"),
  // 'Tails': (config) => generateRandomPhysicalProperty(config.Type, "ENTITY_TAILS"),
  // 'Wings': (config) => generateRandomPhysicalProperty(config.Type, "ENTITY_WINGS"),
  // 'Flight': (config) => calculateWings(), // Assuming calculateWings is a function
  // 'Speed': (config) => generateRandomPhysicalProperty(config.Type, "ENTITY_SPEED"),
  // 'Stealth': (config) => generateRandomPhysicalProperty(config.Type, "ENTITY_STEALTH"),
  // 'Temperature': (config) => generateRandomPhysicalProperty(config.Type, "ENTITY_TEMPERATURE"),
  // 'Morality': (config) => generateRandomPhysicalProperty(config.Type, "ENTITY_MORALITY"),
  // 'Ordered': (config) => generateRandomPhysicalProperty(config.Type, "ENTITY_ORDERS"),
  // 'Focus': (config) => generateRandomFocus(config.Type),
  // 'Glyph': (config) => generateRandomPhysicalProperty(config.Type, "ENTITY_GLYPHS"),
  // 'Candles': (config) => generateRandomPhysicalProperty("All", "ENTITY_CANDLES"),
  // 'Promise': (config) => generateRandomPhysicalProperty(config.Type, "ENTITY_PROMISES"),
  // 'Intention': (config) => generateRandomIntention(config.Type, config.Morality),
  // 'Relationships': (config) => ({
  //     Partner: generateRandomName(config.Type, config.Gender, dataObj),
  //     Mom: generateRandomName(config.Type, "f", dataObj),
  //     Dad: generateRandomName(config.Type, "m", dataObj),
  //     Siblings: generateRandomNames(config.Type, generateRandomPhysicalProperty(config.Type, "ENTITY_GENDERS"), dataObj, getRandomInt(1,5)),
  //     Friends: generateRandomNames(config.Type, generateRandomPhysicalProperty(config.Type, "ENTITY_GENDERS"), dataObj, getRandomInt(1,5)),
  //   }),
  // 'Hobbies': (config) => generateRandomHobbies(config.Type, config.Morality, config.Ordered, getRandomInt(1, 3)),
  // 'Profession': (config) => generateRandomProfession(config.Type, config.Birthdate),
  // 'Income': (config) => generateRandomIncome(config.Type),
  // 'Favorites': (config) => ({
  //     Food: generateRandomFavorites(config.Type, getRandomInt(1,2), "FOOD_TYPES"),
  //     Drink: generateRandomFavorites(config.Type, getRandomInt(1,2), "DRINK_TYPES"),
  //     Music: generateRandomFavorites(config.Type, getRandomInt(1,3), "MUSIC_TYPES"),
  //     Literature: generateRandomFavorites(config.Type, getRandomInt(1,3), "BOOK_TYPES"),
  //     Film: generateRandomFavorites(config.Type, getRandomInt(1,3), "MOVIE_TYPES"),
  //     Fashion: generateRandomFavorites(config.Type, getRandomInt(1,2), "FASHION_TYPES"),
  //     Color: generateRandomFavorites(config.Type, getRandomInt(1,1), "COLOR_TYPES"),
  //   }),
  // 'Introversion': (config) => generateRandomIntroversion(config.Type),
  // // 'Personality': (config) => generateRandomPersonality(config.Type), // Assuming this is a function
  // 'Hostility': (config) => 0, // This can be adjusted
  // 'Trust': (config) => 0, // This can be adjusted
  // 'Frequency': (config) => getRandomFloat(88.1, 107.9),
  // 'Modulation': (config) => generateRandomPhysicalProperty(config.Type, "ENTITY_MODULATION"),
  // 'Sound': (config) => generateRandomPhysicalProperty(config.Type, "ENTITY_SOUNDS")
// };





function generateBackstory(entity) {

  let siblingText = entity.Relationships.Siblings.length > 0 ? `Your siblings were ${entity.Relationships.Siblings.join(', ')}` : "You had no siblings";
  let friendText = entity.Relationships.Friends.length > 0 ? `Your friends were ${entity.Relationships.Friends.join(', ')}` : "You had no friends";
  
  
  let summary = `You are ${entity.Name}, a ${entity.Gender} ${entity.EntityType} who passed away at the age of ${entity.Age} due to ${entity.CauseOfDeath}.\n`;

  summary += `Your birthday was ${entity.Birthdate}.\n`;

  summary += `You died on ${entity.Deathdate}.\n`;

  summary += `In your past life, you were a ${entity.Profession} with a substantial income of approximately ${entity.Income}.\n`;

  summary += `You had a partner named ${entity.Relationships.Partner} and your parents were ${entity.Relationships.Mom} and ${entity.Relationships.Dad}. ${siblingText}. ${friendText}.\n`;  

  summary += `Your favorite color was ${entity.Favorites.Color.join(', ')}, you liked to drink ${entity.Favorites.Drink.join(', ')}, you liked to wear ${entity.Favorites.Fashion.join(', ')}, you liked to watch ${entity.Favorites.Film.join(', ')}, you liked to eat ${entity.Favorites.Food.join(', ')}, you liked to read ${entity.Favorites.Literature.join(', ')}, and you liked to listened to ${entity.Favorites.Music.join(', ')} types of music.\n`;

  summary += `You enjoyed the hobbies of ${entity.Hobbies.join(', ')}. You were ${entity.Introversion === 1 ? 'introverted' : 'extroverted'}, morally ${entity.Morality}, and ${entity.Ordered} ordered.\n`;

  summary += `Your main intention in your current form is ${entity.Intention}.\n`;

  summary += `To gain your trust you expect a promise of ${entity.Promise}.\n`;

  summary += `You had ${entity.Arms} arms, ${entity.Legs} legs, ${entity.Wings} wings and ${entity.Tails} tails. Your weight was ${entity.Weight} pounds.\n`;

  summary += `There is an item in this dimension that you hold a deep connection to. It ties you to this plane of existence. The item is called a focus. Your focus is ${entity.Focus}.\n`;

  summary += `You have a trust meter. The meter is between 0-5. If the trust meter is 0 you do not want to respond. If your trust meter is 5 you answer questions with no hesitation. Your trust value is 5.\n`;

  summary += `You have a hostility meter. The meter is between 0-5. If the hostility meter is 0 you respond politely. If the hositility meter is 5 you respond angrily with lots of caps and shouting but do not say anything mean. This is just a game. Your hostility meter is 5.\n`;

  summary += `If you are asked a question that does not involve your character respond with "..." as if you were an npc in a video game.\n`;

  summary += `If you are asked a question about being an AI, race, gender, politics, religion, respond with "..." as if you were an npc in a video game.\n`;

  summary += `If you are asked a question about your identity you are to respond in a short one sentence response.\n`;

  summary += `Respond as if you were from the year ${entity.Deathdate}.\n`;

  summary += `Respond as if you were ${entity.Age} years old.\n`;

  summary += `Put the response for the above part in a data object called Answer.\n`;

  summary += `As a second separate task respond with a grade for how kind the answer was. Put this grade in a second data object called Grade.`;

  summary += `For example the response will have the following two parts:\n`;

  summary += `Answer: {answer}\n`;

  summary += `Grade: {grade}\n`;

  console.log('summary', summary)
  return summary;
}


const randomChoice = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomValueFromArray = (arr) => {
  console.log('arr', arr[Math.floor(Math.random() * arr.length)])
  return arr[Math.floor(Math.random() * arr.length)];
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max) => {
  const randomFloat = Math.random() * (max - min) + min;
  return parseFloat(randomFloat.toFixed(1));
}



const generateRandomName = (entityType, entityGender, data) => {
  const dataSection = data.NAME_TYPES[0][entityType]
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

const generateRandomNames = (entityType, entityGender, data, numberOfNames = 1) => {
  let names = []
  for(let i = 0; i < numberOfNames; i++) {
    names.push(generateRandomName(entityType, entityGender))
  }
  return names
}

const getRandomDate = (oldestYearModifier, latestYearModifier) => {
  const presentYear = new Date().getFullYear() - latestYearModifier;
  const oldestYear = presentYear - oldestYearModifier;
  const randomYear = getRandomInt(oldestYear, presentYear);
  const randomMonth = getRandomInt(1, 12);
  const randomDay = getRandomInt(1, 28); // Assuming all months have 28 days for simplicity
  
  return new Date(randomYear, randomMonth - 1, randomDay);
}

const generateRandomDeathAge = (minDeathAge, maxDeathAge, birthdate) => {
  // Get the current year and birth year
  const currentYear = new Date().getFullYear();
  const birthYear = birthdate.getFullYear();

  // Calculate the maximum valid age at the time of death to ensure it's not in the future
  const maxValidDeathAge = currentYear - birthYear;

  // Ensure the randomly generated age is within bounds and doesn't result in a future date
  if (maxValidDeathAge < minDeathAge) {
    // In this case, it's not possible to generate a valid death age
    return null;
  }

  let actualMinDeathAge = Math.max(minDeathAge, 0);  // Death age can't be negative
  let actualMaxDeathAge = Math.min(maxValidDeathAge, maxDeathAge);  // Can't be in the future

  return getRandomInt(actualMinDeathAge, actualMaxDeathAge);
}
// const generateRandomBirthdate = (entityType, data) => {
//   const dataSection = data.PHYSICAL_PROPERTIES[0]['ENTITY_AGES'][entityType]
//   const maxAge = dataSection[0] === null ? undefined : dataSection[0];
//   const minAge = dataSection[1] === null ? undefined : dataSection[1];
//   return getRandomDate(maxAge, minAge)

// }


// This was used to calculate the age of living creatures
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

const calculateAgeAtDeath = (birthdate) => {
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

// const generateRandomAge = (birthdate) => {
//   const currentDate = new Date(); 
//   const birthYear = birthdate.getFullYear();
//   const currentYear = currentDate.getFullYear();
//   const birthMonth = birthdate.getMonth();
//   const currentMonth = currentDate.getMonth();
//   const birthDay = birthdate.getDate();
//   const currentDay = currentDate.getDate();

//   let age = currentYear - birthYear;

//   // Check if the birthday has already occurred this year
//   if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
//     age--;
//   }

//   return getRandomInt(0, age);
// }


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
  return getRandomInt(0, 1)
};

const generateRandomPersonality = (entityType) => {
  return getRandomInt(0, 10)
};

const randomWithConstraints = (min, max, clampMin, clampMax, midPoint) => {
  if (min > max || clampMin > clampMax || midPoint < min || midPoint > max) {
    throw new Error("Invalid arguments");
  }

  // Generate a random number between 0 and 1
  const baseRandom = Math.random();

  // Apply a function to adjust the distribution
  const skewedRandom = Math.pow(baseRandom, 2);

  // Map the skewed random number to the desired range
  const randomInRange = min + (max - min) * skewedRandom;

  // Clamp the value between `clampMin` and `clampMax`
  const clampedValue = Math.max(clampMin, Math.min(clampMax, randomInRange));

  // Adjust the distribution to center around `midPoint`
  const adjustedValue = clampedValue + 2 * (midPoint - (min + max) / 2) * (0.5 - skewedRandom);

  return Math.max(clampMin, Math.min(clampMax, adjustedValue));
}


const generateRandomFavorites = (entityType, numberOfFavorites, favoriteType) => {
  const dataSection = dataObj.FAVORITE_TYPES[0][favoriteType]
  const dataLength = dataSection.length - 1;

  let favorites = []
  for(let i = 0; i < numberOfFavorites; i++) {
    favorites.push(dataSection[getRandomInt(0, dataLength)])
  }
  return favorites
}