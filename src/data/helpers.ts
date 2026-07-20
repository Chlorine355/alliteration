import { WORDS } from "./words";

export const getRandomLetter = () =>{
    // TODO
    return 'п'
}

export const getRandomWord = () => {
    return WORDS[Math.floor(Math.random()*WORDS.length)];
}