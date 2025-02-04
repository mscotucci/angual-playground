export interface MenuItem {
  id: string;
  label: string;
  icon?: string; // This will now be the SVG path
  route?: string;
  children?: MenuItem[];
}
