import stringSimilarity from 'string-similarity';
import levenary from 'levenary';
import levenshtein from 'fast-levenshtein';

export const isStudent = false;

export async function isImage (url) {
    if (url.match(/\.jpg|\.png|\.jpeg|\.apng|\.avif|\.gif|\.jfif|\.pjpeg|\.pjp|\.svg|\.webp/gi)) {
        return true
    }
    return false
}

export async function databaseLoad (strict) {
    console.log("Conectado.");
    window.database = (await import('../database.json')).default;
    console.log(database);
    
    return 200;
}

export async function ayuda (msg) {
    msg = msg.toLowerCase();
    let compareArray = Object.keys(database);
    let levenaryIdea = levenary(msg, compareArray);
    let thisString;
    let judgeThis = stringSimilarity.findBestMatch(msg, compareArray);
    let minSimilarity = 0.33;
    let comparisonThreshold = 0.25;
    let diceString = judgeThis.bestMatch.target;
    let compareLevDice = stringSimilarity.compareTwoStrings(levenaryIdea, diceString);
    if (compareLevDice > comparisonThreshold) {
      let tellLevAboutDice = levenshtein.get(msg, diceString);
      if (tellLevAboutDice >= msg.length/2) {
        thisString = levenaryIdea;
      }
      else {
        thisString = diceString;
      }
    }
    else {
      thisString = diceString;
    }
    let finalSimilarity = stringSimilarity.compareTwoStrings(msg, thisString);
    let options = findRecommendations(msg);
    if (options.length === 0) { options = [{reply: 'No entendí.'}, {reply: 'Lo siento, ¿podrías repetirlo?'}, {reply: 'Prueba a utilizar palabras clave como el concepto, la materia o el tema.'}]; }
    let response = options[Math.floor(Math.random()*options.length)];
    if (finalSimilarity >= minSimilarity){
      response = database[thisString];
    }
    return response;
}
export function makeMessage (replyOBJ, author, pfp) {
    return {
        content: replyOBJ.reply || '\u200b',
        attachments: replyOBJ.attachments,
        theme: replyOBJ.theme,
        poster: {
            pfp: pfp || './icon.png',
            name: author || 'Asistente'
        }
    }
}

export function findRecommendations (tema, options) {
    let recommended = [];
    for (let element in database) {
        if (stringSimilarity.compareTwoStrings(database[element].theme.toLowerCase(), tema.toLowerCase()) >= 0.9 && !(options && database[element].reply === options.exclude)) {
            recommended.push(database[element]);
        }
    }
    return recommended;
}

export function databaseInString () {
    let data = JSON.stringify(database, null, 4);
    return data;
}

export function databaseQueries () {
    let data = [];
    for (let query in database) {
        data.push(database[query]);
    }
    return data;
}
