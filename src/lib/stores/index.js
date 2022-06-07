import { writable } from 'svelte/store'

export const store = (defaultValue=[]) => {
    const { subscribe, set } = writable(defaultValue)

    return {
        subscribe,
        set: (value) => {
            set(value)
        }
    }
}

export const to = store()
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
export const userFields = store()
export const stateId = store()
export const nationId = store()
export const location = store()
export const userQuery = store()
export const itemQuery = store()
export const globalQuery = store()
export const isSideNavOpen = store()
export const selectedUsers = store();


export const parents = store();
export const parentItems = store();
export const children = store();
export const childItems = store();
export const items = store();
export const myTags = store();
export const selfTags = store();
export const userTags = store();
export const itemTags = store();
export const childTags = store();
export const parentTags = store();