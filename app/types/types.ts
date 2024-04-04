export interface ListItem  {
  id: string,
  description: string;
  isChecked: boolean;
  dateTime: string,
  dateDate: string,
  category?: options,
  handleItem?(id:string): void,
  deleteItem?(id:string):void
};

export type options = {
  value: string,
  label: string
}

export const PresetOptions: any[] = [
  
  {
    value: "Add new category",
    label:"Add new category"
  },
  {
    value: "gym",
    label: "Gym",
  },
  {
    value: "grocery",
    label: "Groceries",
  },
  {
    value: "homework",
    label: "Homework"
  }
]