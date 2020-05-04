export interface Algorithm {
  id: string;
  name: string;
  type?: string;
  rank?: number;
  customDisplayText?: string;
  description: string;
  defaultDisplayText: string;
}
