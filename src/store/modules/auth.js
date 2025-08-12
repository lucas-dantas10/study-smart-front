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
			state.error = error
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


