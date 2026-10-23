export type NavigationItem = {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
};

export interface HeaderProps {
  /** Site name shown beside the logo. */
  title: string;
  pages: NavigationItem[];
}
