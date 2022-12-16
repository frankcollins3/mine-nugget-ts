import { configureStore } from '@reduxjs/toolkit'
import game from 'slices/game/gameslice'


const store = configureStore({
  reducer: {
    game: game.reducer
  },
})

export default store
