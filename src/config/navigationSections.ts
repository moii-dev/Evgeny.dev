import en from '../i18n/locales/en.json';
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
    label: en["HOME"],
    shortLabel: en["HOME"],
    index: '00',
    order: 0,
    kicker: en["OVERVIEW"],
  },
  {
    id: 'projects',
    label: en["PROJECTS"],
    shortLabel: en["WORK"],
    index: '01',
    order: 1,
    kicker: en["SELECTED WORK"],
  },
  {
    id: 'about',
    label: en["ABOUT ME"],
    shortLabel: en["ABOUT"],
    index: '02',
    order: 2,
    kicker: en["PHILOSOPHY"],
  },
  {
    id: 'stack',
    label: en["TECH STACK"],
    shortLabel: en["STACK"],
    index: '03',
    order: 3,
    kicker: en["CAPABILITIES"],
  },
  {
    id: 'contact',
    label: en["CONTACT"],
    shortLabel: en["TALK"],
    index: '04',
    order: 4,
    kicker: en["GET IN TOUCH"],
  },
];
