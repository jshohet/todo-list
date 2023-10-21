export interface ListItem  {
  id: string,
  description: string;
  isChecked: boolean;
  scheduledToDelete: boolean;
  handleItem?(id:string): void,
  deleteItem?(id:string):void
};