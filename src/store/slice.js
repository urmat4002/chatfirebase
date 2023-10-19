import {createSlice} from '@reduxjs/toolkit'

const initialState = {chatId: 0, currentComponent: 'chatList', currentChat: {}}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatId: (state, action) => {
      state.chatId = action.payload
    },
    setCurrentComponent: (state, action) => {
      state.currentComponent = action.payload
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload
    },
  },
})

export const {setChatId, setCurrentComponent, setCurrentChat} =
  chatSlice.actions

export const chatReducer = chatSlice.reducer
