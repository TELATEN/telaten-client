export interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<any>;
  hidden?: boolean;
}
