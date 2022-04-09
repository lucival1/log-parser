export class FormattedLogDto {
  id: string;
  service_name: string;
  process: string;
  'sample#load_avg_1m': string;
  'sample#load_avg_5m': string;
  'sample#load_avg_15m': string;
  'slow_computation'?: string;
}
