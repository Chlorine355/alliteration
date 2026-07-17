export type Team = {
    id: number;
    name: string;
    score: number;
}

export type GameSettings = {
    targetScore: number;
    time: number;
    penaltyForSkip: boolean;
}

export type Game = {
    settings: GameSettings;
    teams: Team[];
    currentTeamId: number;
    currentLetter: string;
    isOn: boolean;
}