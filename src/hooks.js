import * as cookie from 'cookie'
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

export function getSession(request){
    return {
        token: request.locals.token
    }
}

export async function handle({ request, resolve}) {
    const cookies = cookie.parse(request.headers.cookie || '')
    const token = cookies.token
    request.locals.token = token || null

    if(request.headers['x-forwarded-proto'] !== 'https' && !dev){
        path = request.path || ''
        return {
            headers: {
                Location: `https://${request.host}${path}`
            },  
            status: 301
        }
    }

    const response = await resolve(request)
    if(prerendering && response.headers['content-type'] === 'text/html') {
        response.body = minify(response.body, min_opts)
    }
    return response
}
