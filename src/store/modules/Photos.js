import axios from 'axios'
import { apiUrl } from '../../config'

export default {
  namespaced: true,
  state: {
    photos: [],
    request: {
      pending: false,
      error: false,
      success: false
    },
    allPhotosLoaded: false
  },
  mutations: {
    UPDATE_PHOTOS (state, data) {
      state.photos = data
    },
    ADD_PHOTOS (state, data) {
      state.photos = [...state.photos, ...data]
    },
    START_REQUEST (state) {
      state.request = {
        pending: true,
        error: false,
        success: false
      }
    },
    END_REQUEST (state) {
      state.request = {
        pending: false,
        error: false,
        success: true
      }
    },
    ERROR_REQUEST (state) {
      state.request = {
        pending: false,
        error: true,
        success: false
      }
    },
    TOGGLE_ALL_PHOTOS_LOADED (state) {
      state.allPhotosLoaded = !state.allPhotosLoaded
    },
    ADD_VOTE (state, id) {
      const photo = state.photos.find(photo => photo._id === id)
      photo.votes += 1
    }
  },
  actions: {
    async addVote ({ commit }, id) {
      try {
        commit('START_REQUEST')
        await axios.put(`${apiUrl}/photos/vote/${id}`)
        commit('ADD_VOTE', id)
        commit('END_REQUEST')
      } catch (err) {
        commit('ERROR_REQUEST')
      }
    },
    async fetchPhotosFromAPI ({ commit, state }, { url, page }) {
      try {
        // if it's first set of photos and allPhotosLoaded is true => make it default false
        if (state.allPhotosLoaded && page === 1) commit('TOGGLE_ALL_PHOTOS_LOADED')
        // it's not the first page and allPhotosLoaded is true? => stop function
        if (state.allPhotosLoaded) return false
        commit('START_REQUEST')
        const res = await axios.get(url)
        await new Promise((resolve, reject) => { setTimeout(resolve, 2000) })
        commit('END_REQUEST')
        // if the set is not full, toggle allPhotosLoaded
        if (res.data.length < 12) commit('TOGGLE_ALL_PHOTOS_LOADED')
        if (page > 1) commit('ADD_PHOTOS', res.data)
        else commit('UPDATE_PHOTOS', res.data)
      } catch (err) {
        commit('ERROR_REQUEST')
      }
    },
    async fetchPhotos ({ dispatch }, page) {
      dispatch('fetchPhotosFromAPI', { url: `${apiUrl}/photos/${page}`, page })
    },
    async fetchCategoryPhotos ({ dispatch }, { category, page }) {
      dispatch('fetchPhotosFromAPI', { url: `${apiUrl}/photos/${category}/${page}`, page })
    }
  }
}
