export interface ListItem  {
  id: string,
  description: string;
  isChecked: boolean;
  dateTime: string,
  dateDate: string,
  category: options,
  handleItem?(id:string): void,
  deleteItem?(id:string):void
};

export type options = {
  value: string,
  label: string
}

export const PresetOptions: options[] = [  
  {
    value: "Add new category",
    label:"Add new category"
  },
  {
    value: "Gym",
    label: "Gym",
  },
  {
    value: "Groceries",
    label: "Groceries",
  },
  {
    value: "Homework",
    label: "Homework"
  }
]