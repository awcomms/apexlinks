import { writable } from 'svelte/store'
import { browser } from '$app/env'

const setStorage = (value, name) => {
    let toStore = JSON.stringify(value)
    window.localStorage.setItem(name, toStore)
}

const setStorageIfBrowser = (value, name) => {
    if (browser) setStorage(value, name)
}

export function store(name) {
    let storeValue
    if (browser) {
        storeValue = window.localStorage.getItem(name)
        console.log(storeValue)
        try {
            storeValue = JSON.parse(storeValue)
        } catch {
            storeValue = storeValue
        }
    }
    const { subscribe, set } = writable(storeValue || [])

    return {
        subscribe, //: subscribe(value => setStorageIfBrowser(value, name)),
        set: (value) => {
            setStorageIfBrowser(value, name)
            set(value)
        }
    }
}