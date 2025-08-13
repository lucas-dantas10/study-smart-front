import { me } from '@/services/auth/authService.js'

export default {
	namespaced: true,
	state: () => ({
		user: null,
		token: typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null,
		loading: false,
		error: null
	}),
	getters: {
		isAuthenticated: (state) => !!state.token,
		user: (state) => state.user
	},
	mutations: {
		setToken(state, token) {
			state.token = token
			if (token) {
				localStorage.setItem('token', token)
			} else {
				localStorage.removeItem('token')
			}
		},
		setUser(state, user) {
			state.user = user
		},
		setLoading(state, value) {
			state.loading = value
		},
		setError(state, error) {
			// Normaliza mensagens de erro para o modal
			if (error && error.response && error.response.data) {
				const data = error.response.data
				if (data && typeof data === 'object' && 'error' in data) {
					state.error = data.error
				} else {
					state.error = typeof data === 'string' ? data : (data.message || JSON.stringify(data))
				}
			} else if (error && error.message) {
				state.error = error.message
			} else {
				state.error = error
			}
		}
	},
	actions: {
		async fetchMe({ commit }) {
			commit('setLoading', true)
			commit('setError', null)
			try {
				const user = await me()
				commit('setUser', user)
				return user
			} catch (error) {
				commit('setError', error)
				throw error
			} finally {
				commit('setLoading', false)
			}
		},
		loginWithToken({ commit, dispatch }, token) {
			commit('setToken', token)
			return dispatch('fetchMe')
		},
		logout({ commit }) {
			commit('setToken', null)
			commit('setUser', null)
		}
	}
}


