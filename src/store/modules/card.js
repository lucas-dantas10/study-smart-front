import { getCardsByDeckId, getCardsByStudy, getCardById, save, update, remove } from '@/services/card/cardService.js'
import { review } from '@/services/review/reviewService.js'

export default {
	namespaced: true,
	state: () => ({
		byDeck: {},
		studyCards: [],
		currentCard: null,
		loading: false,
		error: null
	}),
	getters: {
		cardsByDeck: (state) => (deckId) => state.byDeck[deckId] || [],
		studyCards: (state) => state.studyCards,
		currentCard: (state) => state.currentCard
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setError(state, error) {
			state.error = error
		},
		setCardsForDeck(state, { deckId, cards }) {
			state.byDeck = { ...state.byDeck, [deckId]: cards }
		},
		setStudyCards(state, cards) {
			state.studyCards = cards
		},
		setCurrentCard(state, card) {
			state.currentCard = card
		}
	},
	actions: {
		async fetchCardsByDeck({ commit }, deckId) {
			commit('setLoading', true)
			commit('setError', null)
			try {
				const cards = await getCardsByDeckId(deckId)
				commit('setCardsForDeck', { deckId, cards })
				return cards
			} catch (error) {
				commit('setError', error)
				throw error
			} finally {
				commit('setLoading', false)
			}
		},
		async fetchStudyCards({ commit }, deckId) {
			commit('setLoading', true)
			commit('setError', null)
			try {
				const cards = await getCardsByStudy(deckId)
				commit('setStudyCards', cards)
				return cards
			} catch (error) {
				commit('setError', error)
				throw error
			} finally {
				commit('setLoading', false)
			}
		},
		async fetchCard({ commit }, cardId) {
			commit('setLoading', true)
			commit('setError', null)
			try {
				const card = await getCardById(cardId)
				commit('setCurrentCard', card)
				return card
			} catch (error) {
				commit('setError', error)
				throw error
			} finally {
				commit('setLoading', false)
			}
		},
		async saveCard({ dispatch, commit }, { front, back, deckId }) {
			commit('setLoading', true)
			commit('setError', null)
			try {
				await save(front, back, deckId)
				return dispatch('fetchCardsByDeck', deckId)
			} catch (error) {
				commit('setError', error)
				throw error
			} finally {
				commit('setLoading', false)
			}
		},
		async updateCard({ dispatch, commit }, { cardId, front, back, deckId }) {
			commit('setLoading', true)
			commit('setError', null)
			try {
				await update(cardId, front, back)
				if (deckId) {
					return dispatch('fetchCardsByDeck', deckId)
				}
			} catch (error) {
				commit('setError', error)
				throw error
			} finally {
				commit('setLoading', false)
			}
		},
		async removeCard({ dispatch, commit }, { cardId, deckId }) {
			commit('setLoading', true)
			commit('setError', null)
			try {
				await remove(cardId)
				if (deckId) {
					return dispatch('fetchCardsByDeck', deckId)
				}
			} catch (error) {
				commit('setError', error)
				throw error
			} finally {
				commit('setLoading', false)
			}
		},
		async reviewCard({ commit }, { cardId, level }) {
			commit('setLoading', true)
			commit('setError', null)
			try {
				await review(cardId, level)
			} catch (error) {
				commit('setError', error)
				throw error
			} finally {
				commit('setLoading', false)
			}
		}
	}
}


