export interface NavigationSection {
  id: string;
  label: string;
  shortLabel?: string;
  index: string;
  order: number;
  kicker: string;
}

export const NAVIGATION_SECTIONS: NavigationSection[] = [
  {
    id: 'home',
    label: 'HOME',
    shortLabel: 'HOME',
    index: '00',
    order: 0,
    kicker: 'OVERVIEW',
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    shortLabel: 'WORK',
    index: '01',
    order: 1,
    kicker: 'SELECTED WORK',
  },
  {
    id: 'about',
    label: 'ABOUT ME',
    shortLabel: 'ABOUT',
    index: '02',
    order: 2,
    kicker: 'PHILOSOPHY',
  },
  {
    id: 'stack',
    label: 'TECH STACK',
    shortLabel: 'STACK',
    index: '03',
    order: 3,
    kicker: 'CAPABILITIES',
  },
  {
    id: 'contact',
    label: 'CONTACT',
    shortLabel: 'TALK',
    index: '04',
    order: 4,
    kicker: 'GET IN TOUCH',
  },
];
