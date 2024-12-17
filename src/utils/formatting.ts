export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      currencyDisplay: 'narrowSymbol'
    }).format(amount);
  };
  
  export const formatNumber = (number: number): string => {
    return new Intl.NumberFormat('en-ZA', {
      maximumFractionDigits: 1
    }).format(number);
  };
  
  export const getReadableAmount = (amount: number): string => {
    if (amount >= 1e9) {
      return `${(amount / 1e9).toFixed(1)} billion`;
    } else if (amount >= 1e6) {
      return `${(amount / 1e6).toFixed(1)} million`;
    } else if (amount >= 1e3) {
      return `${(amount / 1e3).toFixed(1)} thousand`;
    }
    return formatNumber(amount);
  };
  
  export const getYearsToEarn = (amount: number, monthlyWage: number = 4800): string => {
    const months = amount / monthlyWage;
    const years = months / 12;
    return formatNumber(years);
  };