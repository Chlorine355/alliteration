export type Team = {
    name: string;
    score: number;
}

export type GameSettings = {
    targetScore: number;
    time: number;
    penaltyForSkip: boolean;
    fixedLetter: string;
}

export type Game = {
    settings: GameSettings;
    teams: Team[];
    currentTeamIdx: number;
    currentLetter: string;
    isOn: boolean;
}