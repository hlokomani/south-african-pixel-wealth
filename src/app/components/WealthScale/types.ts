export interface ImpactBlockData {
    cost: number;
    description: string;
    source: string;
  }
  
  export interface WealthDataPoint {
    amount: number;
    label: string;
    message: string;
    source: string;
    impactBlock?: ImpactBlockData;
  }
  
  export interface ScaleData {
    scale: 'small' | 'large';
    data: WealthDataPoint[];
  }
  
  export interface Message {
    threshold: number;
    message: string;
  }