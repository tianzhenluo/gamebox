import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let herosDes = {}

const state = {
    herosDes
}

export default new Vuex.Store({
    state
})