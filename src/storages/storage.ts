import { configureStore } from '@reduxjs/toolkit'
import flows from '../components/flow-list/reducer';

const store = configureStore({
  reducer: {
    flows: flows,
  }
})