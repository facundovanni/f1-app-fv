import { DataTableResponse } from "./global.model";

export interface Driver {
    driverId: string,
    driverName: string,
}

export interface DataTableDrivers extends DataTableResponse {
    drivers: Driver[];
  }