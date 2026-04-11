export type FilterType =
  | 'chips-string'
  | 'chips-number'
  | 'chips-boolean'
  | 'chips-nullable'
  | 'price-range';

export interface FilterConfig {
  type:           FilterType;
  label:          string;
  field:          string;
  options?:       (string | number)[];
  suffix?:        string;
  hideFromSpecs?: boolean;
  nullLabel?:     string;
}
