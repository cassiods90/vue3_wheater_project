import { defineStore } from 'pinia'

export const useCounter = defineStore('counter', {
    state: function () {
        return {
            count: 0,
        }
    },

    getters: {
        getCounter(state) {
            return `Counter ${state.count}`
        },
    },

    actions: {
        increment() {
            this.count++
        },
        decrement() {
            this.count--
        },
    },
})
