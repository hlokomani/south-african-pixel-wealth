import { ScaleData, Message } from './types';
import { SOURCES } from './constants';
import { getYearsToEarn } from '@/utils/formatting';

export const MESSAGES: Message[] = [
  { 
    threshold: 200000,
    message: "A police constable protecting our communities makes less than many middle managers"
  },
  { 
    threshold: 1000000,
    message: "R1 million: What a corrupt Tembisa Hospital tender cost taxpayers could have funded a clinic's supplies"
  },
  { 
    threshold: 10000000,
    message: "R10 million: A JSE CEO makes this much while the average worker makes 50 times less"
  },
  { 
    threshold: 100000000,
    message: "R100 million: We're entering territory where corruption costs could build entire schools"
  },
  {
    threshold: 1000000000,
    message: "R1 billion: We're approaching amounts that could transform entire communities"
  }
];

export const createWealthData = (): ScaleData[] => [
  {
    scale: "small", // R100/pixel
    data: [
      {
        amount: 1000,
        label: "Daily income for a public school teacher",
        message: "While minimum wage workers earn just R150",
        source: SOURCES.minWage
      },
      {
        amount: 4800,
        label: "Monthly minimum wage",
        message: "A minimum wage worker makes R4,800 per month. Over 6 million South Africans live on this or less",
        source: SOURCES.minWage,
        impactBlock: {
          cost: 4800,
          description: "Monthly cost of basic food for a family of four",
          source: SOURCES.minWage
        }
      },
      {
        amount: 190000,
        label: "Police Constable annual salary",
        message: "A police constable risks their life to protect communities for R190,000 per year",
        source: SOURCES.salaries,
        impactBlock: {
          cost: 180000,
          description: "Monthly budget for community safety initiatives in a high-crime area",
          source: SOURCES.infrastructure.police
        }
      },
      {
        amount: 257000,
        label: "Average formal sector salary",
        message: "The average formal sector worker makes R257,000 per year - but most South Africans earn less than this",
        source: SOURCES.formal_sector
      },
      {
        amount: 850000,
        label: "Tembisa Hospital tender corruption",
        message: "R850,000 wasted on corrupt food tenders at just one hospital",
        source: SOURCES.corruption.tembisa,
        impactBlock: {
          cost: 800000,
          description: "Annual medical supplies for a rural clinic serving thousands",
          source: SOURCES.infrastructure.health
        }
      },
      {
        amount: 8500000,
        label: "Average JSE CEO salary",
        message: "The average JSE-listed company CEO earns R8.5 million per year - 148 times the minimum wage",
        source: SOURCES.corporate,
        impactBlock: {
          cost: 8500000,
          description: "Annual salaries for 45 police constables protecting communities",
          source: SOURCES.salaries
        }
      },
      {
        amount: 45000000,
        label: "Trevor Noah's estimated annual earnings",
        message: "Trevor Noah earned around R45 million annually during his Daily Show years",
        source: SOURCES.celebrity,
        impactBlock: {
          cost: 43200000,
          description: "Could fund 750 university students' annual tuition",
          source: SOURCES.infrastructure.education
        }
      },
      {
        amount: 431000000,
        label: "Gauteng school decontamination scandal",
        message: "R431 million wasted on unnecessary school decontamination during the pandemic",
        source: SOURCES.corruption.gauteng,
        impactBlock: {
          cost: 425000000,
          description: "Cost to build 17 new primary schools in underserved areas",
          source: SOURCES.infrastructure.education
        }
      },
      {
        amount: 600000000,
        label: "Nkandla homestead upgrade",
        message: "R600 million of taxpayer money spent on private homestead upgrades",
        source: SOURCES.corruption.nkandla,
        impactBlock: {
          cost: 600000000,
          description: "Could have built 1,000 RDP houses for homeless families",
          source: SOURCES.infrastructure.housing
        }
      },
      {
        amount: 2300000000,
        label: "VBS Bank looting",
        message: "R2.3 billion stolen from VBS Bank, affecting many poor communities who lost their savings",
        source: SOURCES.corruption.vbs,
        impactBlock: {
          cost: 2300000000,
          description: "Could have funded basic services for an entire small municipality for a year",
          source: SOURCES.infrastructure.municipal
        }
      }
    ]
  },
  {
    scale: "large", // R1000/pixel
    data: [
      {
        amount: 13500000000,
        label: "Patrice Motsepe's wealth",
        message: "Patrice Motsepe's wealth: R13.5 billion from mining and investments",
        source: SOURCES.billionaires,
        impactBlock: {
          cost: 13000000000,
          description: "Could provide essential medicines to all public hospitals for a year",
          source: SOURCES.healthcare
        }
      },
      {
        amount: 42000000000,
        label: "Nicky Oppenheimer's wealth",
        message: "Nicky Oppenheimer's wealth: R42 billion from diamonds and investments",
        source: SOURCES.billionaires,
        impactBlock: {
          cost: 40000000000,
          description: "Could eliminate pit toilets in all South African schools",
          source: SOURCES.education
        }
      },
      {
        amount: 51300000000,
        label: "Johann Rupert's wealth",
        message: `Johann Rupert's wealth: R51.3 billion - it would take a minimum wage worker ${getYearsToEarn(51300000000)} years to earn this much`,
        source: SOURCES.billionaires,
        impactBlock: {
          cost: 50000000000,
          description: "Could provide basic water infrastructure to 5 million South Africans",
          source: SOURCES.housing
        }
      }
    ]
  }
];