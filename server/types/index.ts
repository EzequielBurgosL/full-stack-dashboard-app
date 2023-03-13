export type HourTraffic = {
  hour: number;
  traffic: number;
}

export type DayTraffic = {
  day: number;
  hourly_traffic: HourTraffic[];
}

export type MonthTraffic = DayTraffic[];

export type Article = {
  id: string;
  url: string;
  author: string;
  image_url: string;
  geo: string;
  daily_traffic: MonthTraffic;
}

export type ArticlesTraffic = {
  traffic_data: Article[];
}