import { writable } from 'svelte/store'

function simpleStore() {
    const { subscribe, set } = writable([])

    return {
        subscribe,
        set: (value) => set(value)
    }
}

export const sort = simpleStore()
export const itype = simpleStore()
export const whose = simpleStore()
export const myItype = simpleStore()
export const userItype = simpleStore()
export const logged = simpleStore()
export const selfTags = simpleStore()
export const itemTags = simpleStore()
export const userTags = simpleStore()
export const eventTags = simpleStore()
export const stateId = simpleStore()
export const nationId = simpleStore()
export const location = simpleStore()
export const userQuery = simpleStore()
export const itemQuery = simpleStore()
export const globalQuery = simpleStore()