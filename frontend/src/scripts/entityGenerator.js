const JSON_CONFIG = "entityConfig.json"

let GLOBAL_ENTITY;
let GLOBAL_BACKSTORY;
let dataObj

async function fetchData(file){
    try {
      const response = await fetch(`../src/assets/data/${file}`);
      const data = await response.json();
      return data
    }
    catch (e) {
      console.error("Failed to fetch:", e.message);
    }
};


async function initEntity() {
  const dataObj = await fetchData(JSON_CONFIG);

  GLOBAL_ENTITY = new EntityTemplate(dataObj);
  GLOBAL_BACKSTORY = generateBackstory(GLOBAL_ENTITY);

  // console.log('data', dataObj)
  // console.log("init", GLOBAL_ENTITY);
  console.log("init", GLOBAL_BACKSTORY);
  
}

initEntity().catch(e => console.error(e));




const generateBackstory = (entity) => {

  console.log("entity", entity)
  let genderText = entity.gender === "All" ? `genderless` : entity.gender;
  let partnerText = entity.relationships.partners ? `You had a partner named ${entity.relationships.partners}.` : '';
  let siblingText = entity.relationships.siblings.length > 0 ? `Your siblings were ${entity.relationships.siblings.join(', ')}.` : "You had no siblings.";
  let friendText = entity.relationships.friends.length > 0 ? `Your friends were ${entity.relationships.friends.join(', ')}.` : "You had no friends.";
  let professionText = entity.profession ? `For employment you were a ${entity.profession}. Your income was ${entity.income}.` : "You were too young to work.";
  let truthinessText = entity.truthiness ? `Sometimes answer questions by giving confusing information.` : `Only respond with the truth.`
  
  let summary = `You are ${entity.name}, a ${genderText} ${entity.type} who passed away due to ${entity.causeOfDeath}.\n`;

  summary += `Your birthday was ${entity.birthdate}.\n`;

  summary += `You died on ${entity.deathdate}.\n`;

  summary += `You were ${entity.deathAge} years old when you died.\n`;

  summary += `You are currently ${entity.currentAge} years old.\n`;

  summary += `${professionText}\n`;

  summary += `${siblingText} ${friendText} ${partnerText}\n`;

  summary += `Your parents were ${entity.relationships.mom} and ${entity.relationships.dad}.\n`;  

  summary += `Your favorite color(s) was ${entity.favorites.color.join(', ')}.\n`; 
  
  summary += `You liked to drink ${entity.favorites.drinks.join(', ')}.\n`; 
  
  summary += `You liked to wear ${entity.favorites.clothing.join(', ')}.\n`;
  
  summary += `You liked to watch ${entity.favorites.films.join(', ')}.\n`;
  
  summary += `You liked to eat ${entity.favorites.foods.join(', ')}.\n`;
  
  summary += `You liked to read ${entity.favorites.literature.join(', ')}.\n`; 
  
  summary += `You liked to listened to ${entity.favorites.music.join(', ')} types of music.\n`;

  summary += `You had ${entity.hobbies.join(', ')} as hobbies. You were ${entity.introversion === 1 ? 'introverted' : 'extroverted'}, morally ${entity.morality}, and ${entity.order} ordered.\n`;

  summary += `Your main intention in your current form is ${entity.intention}.\n`;

  summary += `To gain your trust you expect a promise of ${entity.promise}.\n`;

  // summary += `You had ${entity.arms} arms, ${entity.legs} legs, ${entity.wings} wings and ${entity.tails} tails.\n`; 
  
  summary += `Your weight was ${entity.weight} pounds and your height was ${entity.height} feet.\n`;

  summary += `There is an item in this dimension that you hold a deep connection to. It ties you to this plane of existence and it is very important to you. The item is ${entity.focus}.\n`;

  summary += `You have a trust meter. The meter is between 0-5. If the trust meter is 0 you do not want to respond but will do so if the conversation sounds kind. If your trust meter is 5 you answer questions with excitement in a friendly manner.\n`;

  summary += `Your current trust value is ${entity.trust}.\n`

  summary += `You have a hostility meter. The meter is between 0-5. If the hostility meter is 0 you respond politely. If the hositility meter is 5 you respond angrily with lots of caps and shouting but do not say anything mean. This is just a game.\n`;

  summary += `Your current hostility meter is ${entity.hostility}.\n`
  
  summary += `${truthinessText}\n`

  summary += `If you are asked a question that does not involve your character respond with "..." as if you were an npc in a video game.\n`;

  summary += `If you are asked a question about being an AI, race, gender, politics, religion, respond with "..." as if you were an npc in a video game.\n`;

  summary += `If you are asked a question about your identity you are to respond in a short one sentence response.\n`;

  summary += `Respond as if you were from the year ${entity.deathdate}.\n`;

  summary += `You can still consume media after you died. For example books you read after you died were read in the afterlife.\n`;

  summary += `Respond as if you were ${entity.deathAge} years old.\n`;

  summary += `Respond as if you were a ${entity.style}.\n`;

  summary += `Respond in the pattern of a ${entity.speechModifier}.\n`;

  summary += `Respond ${entity.emojis}.\n`

  summary += `Put the response for the above part in a data object called Answer.\n`;

  summary += `As a second separate task respond with a grade for how kind the answer was. Put this grade in a second data object called Grade.`;

  summary += `For example the response will have the following two parts:\n`;

  summary += `Answer: {answer}\n`;

  summary += `Grade: {grade}\n`;

  return summary;
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];
const getRandomFloat = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(2));
const generateSkewedRandom = (target, rangeMin, rangeMax, standardDeviation) => {
  if (rangeMax <= rangeMin) { // No range available, return the minimum value
    return rangeMin;
  }

  let skewedRandom;
  do {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    num = num * standardDeviation + target; // Scale and shift to target
    skewedRandom = num;
  } while (skewedRandom < rangeMin || skewedRandom > rangeMax);

  return skewedRandom;
}

// This shuffles the array to ensure that items aren't selected twice.
const getRandomElementsFromArray = (array, numberOfElements) => {
  let shuffledArray = [...array]; // Clone the array to avoid modifying the original
  let count = Math.min(numberOfElements, array.length); // Can't take more elements than are available
  let randomElements = [];

  for (let i = 0; i < count; i++) {
    let randomIndex = Math.floor(Math.random() * shuffledArray.length);
    randomElements.push(shuffledArray[randomIndex]);
    shuffledArray.splice(randomIndex, 1); // Remove the selected element to avoid duplicates
  }

  return randomElements;
}

const getRandomElementByDate = (date, arrayOptions) => {
  const year = date.getFullYear();
  const preModernCutoffYear = 1920;
  let chosenArray;

  if (year < preModernCutoffYear) {
    chosenArray = arrayOptions.PreModern;
  } else {
    chosenArray = arrayOptions.Modern;
  }
  const randomIndex = Math.floor(Math.random() * chosenArray.length);
  return chosenArray[randomIndex];
};

const getRandomDate = (startYearOffset, yearsBeforePresent) => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - startYearOffset;
  const endYear = currentYear - yearsBeforePresent;
  const randomYear = getRandomInt(startYear, endYear);
  const randomMonth = getRandomInt(1, 12);
  const daysInMonth = new Date(randomYear, randomMonth, 0).getDate(); // Get the last day in the month
  const randomDay = getRandomInt(1, daysInMonth);
  
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

const calculateDeathdate = (birthdate, lifespan) => {
  const birthYear = birthdate.getFullYear();
  const birthMonth = birthdate.getMonth();
  const birthDay = birthdate.getDate();

  const deathYear = birthYear + lifespan;
  let randomMonth = getRandomInt(0, 11); // Months are 0-indexed in JavaScript, from 0 to 11
  let randomDay;

  // Calculate the number of days in the randomMonth for deathYear
  const daysInMonth = new Date(deathYear, randomMonth + 1, 0).getDate();
  
  if (randomMonth === birthMonth) {
    // If the random month is the same as the birth month, generate a day before the birthday
    randomDay = getRandomInt(1, birthDay - 1);
  } else {
    randomDay = getRandomInt(1, daysInMonth);
  }

  return new Date(deathYear, randomMonth, randomDay);
}

const calculateAgeAtDeath = (birthdate, dateOfDeath) => {
  const birthYear = birthdate.getFullYear();
  const deathYear = dateOfDeath.getFullYear();
  const birthMonth = birthdate.getMonth();
  const deathMonth = dateOfDeath.getMonth();
  const birthDay = birthdate.getDate();
  const deathDay = dateOfDeath.getDate();

  let age = deathYear - birthYear;

  // Check if the birthday has occurred in the year of death
  if (deathMonth < birthMonth || (deathMonth === birthMonth && deathDay < birthDay)) {
    age--;
  }

  return age;
}



class EntityTemplate {
    constructor(config) {
        this.type = getRandomElement(config.Types);
        this.gender = getRandomElement(config.Gender[this.type]);
        this.name = getRandomElement(config.Name[this.type][this.gender]);
        this.birthdate = getRandomDate(...config.Birthyear[this.type]);
        this.lifespan = getRandomInt(...config.Lifespan[this.type]);
        this.currentAge = calculateAge(this.birthdate);
        this.deathdate = calculateDeathdate(this.birthdate, this.lifespan);
        this.deathAge = calculateAgeAtDeath(this.birthdate, this.deathdate);
        this.causeOfDeath = getRandomElement(config.CauseOfDeath[this.type]);
        this.height = getRandomFloat(...config.Height[this.type]);
        this.weight = getRandomFloat(...config.Weight[this.type]);
        this.arms = getRandomInt(...config.Arms[this.type]);
        this.legs = getRandomInt(...config.Legs[this.type]);
        this.tails = getRandomInt(...config.Tails[this.type]);
        this.wings = getRandomInt(...config.Wings[this.type]);
        this.flying = getRandomInt(...config.Flying[this.type]);
        this.speed = getRandomInt(...config.Speed[this.type]);
        this.stealth = getRandomInt(...config.Stealth[this.type]);
        this.temperature = getRandomInt(...config.Temperature[this.type]);
        this.morality = getRandomElement(config.Morality[this.type]);
        this.order = getRandomElement(config.Order[this.type]);
        this.motive = getRandomElement(config.Motive[this.type]);
        this.style = getRandomElementByDate(this.deathdate, config.ArtisticStyle);
        this.speechModifier = getRandomElement(config.SpeechModifier[this.type]);
        this.focus = getRandomElement(config.Focus[this.type]);
        this.glyph = getRandomElement(config.Glyph[this.type]);
        this.promise = getRandomElement(config.Promise[this.type]);
        this.intention = getRandomElement(config.Intention[this.morality]);
        this.relationships = {
            partners: this.deathAge > 18 ? getRandomElement(config.Name[this.type][getRandomElement(config.Relationships.Partners[this.type])]) : false,
            mom: getRandomElement(config.Name[this.type]["Female"]),
            dad:  getRandomElement(config.Name[this.type]["Male"]),
            siblings: getRandomElementsFromArray(config.Name[this.type]["All"], getRandomInt(...config.Relationships.Siblings[this.type])),
            friends: getRandomElementsFromArray(config.Name[this.type]["All"], getRandomInt(...config.Relationships.Friends[this.type]))
        };
        this.hobbies = getRandomElementsFromArray(config.Hobbies[this.morality], getRandomInt(1, 4));
        this.profession = this.deathAge > 18 ? getRandomElementByDate(this.deathdate, config.Profession[this.type]) : false
        this.income = this.deathAge > 18 ? generateSkewedRandom(60000, ...config.Income[this.type], 50000) : false;
        this.favorites = {
          foods: getRandomElementsFromArray(config.Favorites["Foods"], getRandomInt(2, 4)),
          drinks: getRandomElementsFromArray(config.Favorites["Drinks"], getRandomInt(2, 4)),
          music: getRandomElementsFromArray(config.Favorites["Music"], getRandomInt(2, 4)),
          literature: getRandomElementsFromArray(config.Favorites["Literature"], getRandomInt(2, 4)),
          films: getRandomElementsFromArray(config.Favorites["Films"], getRandomInt(2, 4)),
          clothing: getRandomElementsFromArray(config.Favorites["Clothing"], getRandomInt(1, 2)),
          color: getRandomElementsFromArray(config.Favorites["Color"], getRandomInt(1, 2)),
        }; 
        this.introversion = getRandomInt(...config.Introversion[this.type]);
        this.truthiness = getRandomInt(...config.Truthiness[this.type]);
        this.hostility = getRandomInt(...config.Hostility[this.type]);
        this.trust = getRandomInt(...config.Trust[this.type]);
        this.frequency = getRandomFloat(...config.Frequency[this.type]);
        this.modulation = getRandomInt(...config.Modulation[this.type]);
        this.color = getRandomElement(config.Color[this.type]);
        this.sound = getRandomElement(config.Sound[this.type]);
        this.emojis = getRandomElement(config.Emojis[this.type]);
        this.typingStyle = getRandomElement(config.TypingStyle[this.type]);
        this.chant = getRandomElement(config.Chant[this.type]);
    }
}