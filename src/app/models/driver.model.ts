import { DataTableResponse } from "./global.model";

export interface Driver {
  driverId: string;
  name: string;
  surname: string;
  shortName: string;
  number: number | null;
  nationality: string;
  birthday: string;
  url: string;
  points?: number;
  position?: number;
  wins?: number;
}

export interface DataTableDrivers extends DataTableResponse {
  championshipId: string;
  season: string;
  drivers: Driver[];
}

export interface DriverDetail extends DataTableResponse {
  driver: Driver[];
}

export interface DriverSearchParams {
  year?: number;
  name?: string;
}

export interface DriverChampionshipStanding {
  classificationId: number,
  driverId: string,
  teamId: string,
  points: number,
  position: number,
  wins: number,
  driver?: Driver,
  driverName: string
}