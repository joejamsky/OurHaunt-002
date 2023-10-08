const ENTITY_TYPES=["Demon","Angel","Fey","Ghost","Critter","Bork"],JSON_DATA_FILES=["entityFocuses.json","entityCausesOfDeath.json","entityFavorites.json","entityHobbies.json","entityIntentions.json","entityProfessions.json","entityNames.json","entityPhysicalProperties.json"];let GLOBAL_ENTITY,dataObj={};async function fetchData(){for(let t=0;t<JSON_DATA_FILES.length;t++)try{const e=await fetch(`../assets/data/${JSON_DATA_FILES[t]}`),n=await e.json(),a=n.key,o=n.data;Object.assign(dataObj,{[a]:[o]})}catch(t){console.error(t.message)}}fetchData().then((()=>{GLOBAL_ENTITY=new entityTemplate,console.log("done",GLOBAL_ENTITY)}));const getRandomInt=(t,e)=>(t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t),getRandomFloat=(t,e)=>{const n=Math.random()*(e-t)+t;return parseFloat(n.toFixed(1))},getRandomDate=(t=271821,e=2)=>{const n=(new Date).getFullYear()-e,a=getRandomInt(n-t,n),o=getRandomInt(1,12),i=getRandomInt(1,28);return new Date(a,o-1,i)},generateRandomName=(t,e)=>{const n=dataObj.NAME_TYPES[0][t],a=n.length-1;return"Ghost"===t?"m"===e?n[getRandomInt(0,120)]:"f"===e?n[getRandomInt(121,a)]:n[getRandomInt(0,a)]:n[getRandomInt(0,a)]},generateRandomNames=(t,e,n=1)=>{let a=[];for(let o=0;o<n;o++)a.push(generateRandomName(t,e));return a},generateRandomBirthdate=t=>{const e=dataObj.PHYSICAL_PROPERTIES[0].ENTITY_AGES[t],n=null===e[0]?void 0:e[0],a=null===e[1]?void 0:e[1];return getRandomDate(n,a)},calculateAge=t=>{const e=new Date,n=t.getFullYear(),a=e.getFullYear(),o=t.getMonth(),i=e.getMonth(),r=t.getDate(),s=e.getDate();let h=a-n;return(i<o||i===o&&s<r)&&h--,h},generateRandomAge=t=>{const e=new Date,n=t.getFullYear(),a=e.getFullYear(),o=t.getMonth(),i=e.getMonth(),r=t.getDate(),s=e.getDate();let h=a-n;return(i<o||i===o&&s<r)&&h--,getRandomInt(0,h)},calculateDeathdate=(t,e)=>{const n=t.getFullYear()+e,a=t.getMonth(),o=t.getDate();let i=getRandomInt(0,a);return randomDay=getRandomInt(0,i===a?o-1:28),new Date(n,i,randomDay)},generateRandomPhysicalProperty=(t,e)=>{const n=dataObj.PHYSICAL_PROPERTIES[0][e][t],a=n.length-1;return n[getRandomInt(0,a)]},generateRandomCauseofDeath=()=>{const t=dataObj.DEATH_TYPES[0],e=t.length-1;return t[getRandomInt(0,e)]},generateRandomFocus=t=>{const e=dataObj.FOCUS_TYPES[0],n=e.length-1;return e[getRandomInt(0,n)]},generateRandomIntention=(t,e)=>{let n;switch(e){case"good":n="GOOD_INTENTIONS";break;case"neutral":n="Bork"===t?"SCIENTIFIC_INTENTIONS":"NEUTRAL_INTENTIONS";break;case"evil":n="EVIL_INTENTIONS";break;default:n="ERROR"}const a=dataObj.INTENTION_TYPES[0][n],o=a.length-1;return a[getRandomInt(0,o)]},generateRandomHobbies=(t,e,n,a)=>{let o,i,r=[];switch(e){case"neutral":case"good":for(let t=0;t<a;t++)o=dataObj.HOBBIES_TYPE[0].NEUTRAL_HOBBIES,i=o.length-1,r.push(o[getRandomInt(0,i)]);return r;case"evil":for(let t=0;t<a;t++)o=dataObj.HOBBIES_TYPE[0].EVIL_HOBBIES,i=o.length-1,r.push(o[getRandomInt(0,i)]);return r;default:return"Error"}},generateRandomProfession=(t,e)=>{let n;return e.year>1950?(n=dataObj.PROFESSION_TYPES[0][1].MODERN_WHITE_COLLAR.length-1,dataObj.PROFESSION_TYPES[0][1].MODERN_WHITE_COLLAR[getRandomInt(0,n)]):(n=dataObj.PROFESSION_TYPES[0][0].PRE_MODERN.length-1,dataObj.PROFESSION_TYPES[0][0].PRE_MODERN[getRandomInt(0,n)])},generateRandomIncome=t=>getRandomInt(0,1e10),generateRandomIntroversion=t=>getRandomInt(0,10),generateRandomPersonality=t=>getRandomInt(0,10),generateRandomFavorites=(t,e,n)=>{const a=dataObj.FAVORITE_TYPES[0][n],o=a.length-1;let i=[];for(let t=0;t<e;t++)i.push(a[getRandomInt(0,o)]);return i};class entityTemplate{constructor(){this.EntityType=generateRandomPhysicalProperty("All","ENTITY_TYPES"),this.Gender=generateRandomPhysicalProperty(this.EntityType,"ENTITY_GENDERS"),this.Sound=generateRandomPhysicalProperty(this.EntityType,"ENTITY_SOUNDS"),this.Name=generateRandomName(this.EntityType,this.Gender),this.Birthdate=generateRandomBirthdate(this.EntityType),this.Age="Ghost"===this.EntityType?generateRandomAge(this.Birthdate):calculateAge(this.Birthdate),this.Deathdate="Ghost"===this.EntityType&&calculateDeathdate(this.Birthdate,this.Age+1),this.CauseOfDeath="Ghost"===this.EntityType&&generateRandomCauseofDeath(),this.Height=generateRandomPhysicalProperty(this.EntityType,"ENTITY_HEIGHTS"),this.Weight=generateRandomPhysicalProperty(this.EntityType,"ENTITY_WEIGHTS"),this.Arms=generateRandomPhysicalProperty(this.EntityType,"ENTITY_ARMS"),this.Legs=generateRandomPhysicalProperty(this.EntityType,"ENTITY_LEGS"),this.Tails=generateRandomPhysicalProperty(this.EntityType,"ENTITY_TAILS"),this.Wings=generateRandomPhysicalProperty(this.EntityType,"ENTITY_WINGS"),this.Speed=generateRandomPhysicalProperty(this.EntityType,"ENTITY_SPEED"),this.Stealth=generateRandomPhysicalProperty(this.EntityType,"ENTITY_STEALTH"),this.Temperature=generateRandomPhysicalProperty(this.EntityType,"ENTITY_TEMPERATURE"),this.Morality=generateRandomPhysicalProperty(this.EntityType,"ENTITY_MORALITY"),this.Ordered=generateRandomPhysicalProperty(this.EntityType,"ENTITY_ORDERS"),this.Focus=generateRandomFocus(this.EntityType),this.Glyph=generateRandomPhysicalProperty(this.EntityType,"ENTITY_GLYPHS"),this.Candles=generateRandomPhysicalProperty("All","ENTITY_CANDLES"),this.Promise=generateRandomPhysicalProperty(this.EntityType,"ENTITY_PROMISES"),this.Intention=generateRandomIntention(this.EntityType,this.Morality),this.Relationships={Partner:generateRandomName(this.EntityType,this.Gender),Mom:generateRandomName(this.EntityType,"f"),Dad:generateRandomName(this.EntityType,"m"),Siblings:generateRandomNames(this.EntityType,generateRandomPhysicalProperty(this.EntityType,"ENTITY_GENDERS"),getRandomInt(1,5)),Friends:generateRandomNames(this.EntityType,generateRandomPhysicalProperty(this.EntityType,"ENTITY_GENDERS"),getRandomInt(1,5))},this.Hobbies=generateRandomHobbies(this.EntityType,this.Morality,this.Ordered,getRandomInt(1,3)),this.Profession=generateRandomProfession(this.EntityType,this.Birthdate),this.Income=(this.EntityType,getRandomInt(0,1e10)),this.Favorites={Food:generateRandomFavorites(this.EntityType,getRandomInt(1,2),"FOOD_TYPES"),Drink:generateRandomFavorites(this.EntityType,getRandomInt(1,2),"DRINK_TYPES"),Music:generateRandomFavorites(this.EntityType,getRandomInt(1,3),"MUSIC_TYPES"),Literature:generateRandomFavorites(this.EntityType,getRandomInt(1,3),"BOOK_TYPES"),Film:generateRandomFavorites(this.EntityType,getRandomInt(1,3),"MOVIE_TYPES"),Fashion:generateRandomFavorites(this.EntityType,getRandomInt(1,2),"FASHION_TYPES"),Color:generateRandomFavorites(this.EntityType,getRandomInt(1,1),"COLOR_TYPES")},this.Introversion=(this.EntityType,getRandomInt(0,10)),this.Hostility=0,this.Trust=0,this.Frequency=getRandomFloat(88.1,107.9),this.Modulation=generateRandomPhysicalProperty(this.EntityType,"ENTITY_MODULATION")}}