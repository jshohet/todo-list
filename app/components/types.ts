export interface ListItem  {
  id: string,
  description: string;
  isChecked: boolean;
  handleItem?(id:string): void
};