export const COLORS = {
    green: '#007A4D', // SA flag green
    gold: '#FFB81C',  // SA flag gold/yellow
    red: '#DE3831',   // SA flag red
    blue: '#002395',  // SA flag blue
    black: '#000000'  // SA flag black
  };
  
  export const SCALE_TRANSITION_POINT = 3e9; // R3 billion
  export const SMALL_SCALE = 100;  // R100 per pixel
  export const LARGE_SCALE = 1000; // R1000 per pixel
  
  export const SOURCES = {
    minWage: "Department of Employment and Labour, March 2024",
    salaries: "Public Service Commission Report 2024",
    formal_sector: "Stats SA Quarterly Employment Statistics, 2024",
    celebrity: "Forbes Earnings Report 2023",
    corruption: {
      tembisa: "Special Investigating Unit Report, Tembisa Hospital Investigation 2023",
      gauteng: "Gauteng Department of Education Financial Report 2023",
      nkandla: "Public Protector Report on Nkandla, Updated Figures 2023",
      vbs: "Reserve Bank Investigator's Report, 2023"
    },
    corporate: "PwC Executive Directors Remuneration Report 2023",
    infrastructure: {
      police: "SAPS Annual Report 2023/24",
      education: "Department of Basic Education Infrastructure Report 2023",
      health: "Department of Health Annual Report 2023",
      social: "SASSA Annual Report 2023",
      housing: "Department of Human Settlements Annual Report 2023",
      municipal: "National Treasury Municipal Report 2023"
    },
    billionaires: "Forbes Billionaires List 2024",
    healthcare: "Department of Health Annual Report 2023",
    education: "Department of Basic Education Infrastructure Report 2023",
    housing: "Department of Human Settlements Annual Report 2023"
  } as const;