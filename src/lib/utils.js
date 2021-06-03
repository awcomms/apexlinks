import * as api from '$lib/api'
import marked from 'marked'
import { link_renderer } from '@sveltejs/site-kit/utils/markdown.js';
import { highlight } from './highlight';

const renderer = new marked.Renderer()
renderer.link = link_renderer                                                                                                                           
renderer.code = highlight
renderer.heading = (text, level) => {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

    return `
            <h${level}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${level}>`;
  }
renderer.list = (body, ordered, start) => {
    if(!ordered){
        return `
            <ul style='list-style-type: square; list-style-position: inside;'>
                ${body}
            </ul>
        `
    }
    if(ordered){
        return `
            <ol style='list-style-type: decimal; list-style-position: inside;'>
                ${body}
            </ol>
        `
    }
}

marked.setOptions({
    renderer: renderer,
})

export let abslink = /\S+:\/\/\S+/

export function parseMarkdown(markdown) {
    if(markdown){
        return marked(
            markdown.replace(/^\t+/gm, match => match.split('\t').join('  '))
            .replace(/^\n+/gm, match => match.split('\n').join('<br /> \n')),
            { renderer }
        )
    } else {
        return ''
    }
}

export function checkEmail(string){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(string).toLowerCase())
}

export function usernameCoerce(string){
    if(string){
        return string.toLowerCase().replace(' ', '')
    } else {
        return ''
    }
}

export function initialCaps(string){
    if(string){
        return string.charAt(0).toUpperCase() + string.slice(1)
    } else {
        return ''
    }
}

export function get(endpoint) {
    return fetch(endpoint, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json())
}

export function post(endpoint, data) {
    return fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data || {}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json())
}