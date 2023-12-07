export type DataFromApi = {
  altitude: number;
  isActionRequired: boolean;
  isAscending: boolean;
  statusMessage: string;
  temperature: number;
  velocity: number;
};

export type DataFromWs = {
  Altitude: number;
  IsActionRequired: boolean;
  IsAscending: boolean;
  StatusMessage: string;
  Temperature: number;
  Velocity: number;
};

export type Action = { acted: boolean; status: string | null };
