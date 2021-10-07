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

export async function handle({ request, render}) {
    const { token } = cookie.parse(request.headers.cookie || '')
    console.log('handle token', token)
    const res = await send({method: 'GET', path: 'tokens', auth: token })
    console.log('handle api res: ', res)
    
    if (res.id) {
        request.locals.user = res
        request.locals.token = token
    }

    if(!dev){
        if (request.headers['x-forwarded-proto'] !== 'https') {
            console.log('request.path: ', request.path)
            const path = request.path === '/' ? '/apexlinks' : request.path
            return {
                headers: {
                    Location: `https://${request.host}${path}`
                },  
                status: 301
            }
        }
    }

    const response = await render(request)

    if(prerendering && response.headers['content-type'] === 'text/html') {
        response.body = minify(response.body, min_opts)
    }
    return response
}
