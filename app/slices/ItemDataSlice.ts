import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ListItem } from '../types/types';

export const itemDataSlice = createSlice({
    name: 'itemData',
    initialState:{
        itemData: [] as ListItem[]
    },    
    reducers: {
        setItemData: (state, action: PayloadAction<ListItem[]>) =>{
            if (Array.isArray(state.itemData)) {
              state.itemData = action.payload;
            }
        }
    }
})

export const {setItemData} = itemDataSlice.actions;

export default itemDataSlice.reducer;


