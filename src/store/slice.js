import {createSlice} from '@reduxjs/toolkit'

const initialState = {chatId: 0}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatId: (state, action) => {
      console.log(state)
    },
  },
})

export const {setChatId} = chatSlice.actions

export const chatReducer = chatSlice.reducer
