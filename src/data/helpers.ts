import { WORDS } from "./words";

export const getRandomLetter = () =>{
    // TODO
    return 'п'
}

export const getRandomWord = () => {
    return WORDS[Math.floor(Math.random()*WORDS.length)];
}

export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remSeconds = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${remSeconds}`
}