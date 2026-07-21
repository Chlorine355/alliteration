import { COMMON_WORDS } from "./commonWords";

const getRandomFromListOrString = (a: string[] | string) => {
    return a[Math.floor(Math.random() * a.length)]
}

export const getRandomLetter = () => {
    return getRandomFromListOrString('пстокнвра')
}

export const getRandomWord = () => {
    return getRandomFromListOrString(COMMON_WORDS);
}

export const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remSeconds = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${remSeconds}`
}