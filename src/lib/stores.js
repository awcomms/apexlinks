import { writable } from 'svelte/store'
storage = window.localStorage

function store(name) {
    const { subscribe, set } = writable([])

    return {
        subscribe,
        set: (value) => {
            storage.set
            set(value)
        }
    }
}

export const to = store()
export const itemFields = store()
export const username = store()
export const notify = store()
export const sort = store()
export const itype = store()
export const whose = store()
export const newUser = store()
export const users = store()
export const open = store()
export const context = store()
export const myItype = store()
export const userItype = store()
export const myTags = store()
export const selfTags = store()
export const roomTags = store()
export const itemTags = store()
export const userTags = store()
export const userFields = store()
export const eventTags = store()
export const stateId = store()
export const nationId = store()
export const location = store()
export const userQuery = store()
export const itemQuery = store()
export const globalQuery = store()
export const isSideNavOpen = store()