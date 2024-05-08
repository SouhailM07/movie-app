import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface onboardingPages_t {
  backgroundColor: string;
  title: string;
  img: any;
  subtitle: string;
  loop: boolean;
}

export interface arrOfOptions_t {
  label: string;
  st: boolean;
  editSt: any;
}

export interface bottomNavRoutes_t {
  name: string;
  options: { title: string; headerShown: boolean };
  component: () => React.JSX.Element;
}

export interface btnsPanel_t {
  icon: IconDefinition;
  label: string;
  color?: string;
  handler?: any;
}
[];
