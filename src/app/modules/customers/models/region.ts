export interface CountryData {
  status: string;
  'status-code': number;
  version: string;
  access: string;
  data: {
    [key: string]: {
      country: string;
      region: string;
    };
  };
}

export interface Region {
  id: string;
  title: string;
}
