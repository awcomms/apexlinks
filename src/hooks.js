import * as cookie from 'cookie'
import { send } from '$lib/send'
import {minify} from 'html-minifier'
import { dev, prerendering } from '$app/env'

const min_opts = {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    decodeEntities: true,
    html5: true,
    ignoreCustomComments: [/^#/],
    minifyCSS: true,
    minifyJS: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    sortAttributes: true,
    sortClassName: true
}

export function getSession(request) {
    return {
        user: request.locals.user
    }
}

export async function handle({ event, resolve}) {
    const {request} = event
    const { token } = cookie.parse(request.headers.cookie || '')

    let res = await send({method: 'GET', path: 'tokens', auth: token })

    if (res && res.id) {
        request.locals.user = res
        request.locals.token = token
    }

    if(!dev){
        if (request.headers['x-forwarded-proto'] !== 'https') {
            return {
                headers: {
                    Location: `https://${request.host}${request.url.pathname}`
                },  
                status: 301
            }
        }
    }

    const response = await resolve(event)

    if(prerendering && response.headers['content-type'] === 'text/html') {
        response.body = minify(response.body, min_opts)
    }
    return response
}
