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
  teams: Team[];
}