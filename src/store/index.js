import { createStore } from 'vuex'
import auth from './modules/auth'
import deck from './modules/deck'
import card from './modules/card'

const store = createStore({
	modules: {
		auth,
		deck,
		card
	}
})

export default store


