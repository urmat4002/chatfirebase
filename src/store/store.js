import {configureStore} from '@reduxjs/toolkit'
import {chatReducer} from './slice'

export const store = configureStore({reducer: {chat: chatReducer}})
