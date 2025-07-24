import { Driver } from "./driver.model";
import { DataTableResponse } from "./global.model";

export interface Team {
  teamId: string;
  teamName: string;
  teamNationality: string;
  firstAppeareance: number;
  constructorsChampionships: number;
  driversChampionships: number;
  url: string;
}

export interface DataTableTeams extends DataTableResponse {
  championshipId: string;
  season: string;
  teams: Team[];
}

export interface TeamChampionshipStanding {
  classificationId: number;
  teamId: string;
  points: number;
  position: number;
  wins: number;
  team: Team;
  teamName: string;
}

export interface TeamDetails extends DataTableResponse {
  season: number;
  teamId: string;
  team: Team;
  drivers: {
    driver: Driver
  }[]
}