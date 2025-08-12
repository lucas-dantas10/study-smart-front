import { getDecks, getDeck, create, update, remove } from '@/services/deck/deckService.js'

export default {
	namespaced: true,
	state: () => ({
		list: [],
		current: null,
		loading: false,
		error: null
	}),
	getters: {
		decks: (state) => state.list,
		currentDeck: (state) => state.current
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setError(state, error) {
			state.error = error
		},
		setDecks(state, decks) {
			state.list = decks
		},
		setCurrentDeck(state, deck) {
			state.current = deck
		},
		removeDeckFromList(state, deckId) {
			state.list = state.list.filter(d => d.id !== deckId)
		}
	},
	actions: {
		async fetchDecks({ commit }) {
			commit('setLoading', true)
			commit('setError', null)
			try {
				const decks = await getDecks()
				commit('setDecks', decks)
				return decks
			} catch (error) {
				commit('setError', error)
				throw error
			} finally {
				commit('setLoading', false)
			}
		},
		async fetchDeck({ commit }, deckId) {
			commit('setLoading', true)
			commit('setError', null)
			try {
				const deck = await getDeck(deckId)
				commit('setCurrentDeck', deck)
				return deck
			} catch (error) {
				commit('setError', error)
				throw error
			} finally {
				commit('setLoading', false)
			}
		},
		async createDeck({ dispatch, commit }, title) {
			commit('setLoading', true)
			commit('setError', null)
			try {
				await create(title)
				return dispatch('fetchDecks')
			} catch (error) {
				commit('setError', error)
				throw error
			} finally {
				commit('setLoading', false)
			}
		},
		async updateDeck({ dispatch, commit }, { deckId, title }) {
			commit('setLoading', true)
			commit('setError', null)
			try {
				await update(deckId, title)
				return dispatch('fetchDecks')
			} catch (error) {
				commit('setError', error)
				throw error
			} finally {
				commit('setLoading', false)
			}
		},
		async removeDeck({ commit }, deckId) {
			commit('setLoading', true)
			commit('setError', null)
			try {
				await remove(deckId)
				commit('removeDeckFromList', deckId)
			} catch (error) {
				commit('setError', error)
				throw error
			} finally {
				commit('setLoading', false)
			}
		}
	}
}


