import { minify } from 'html-minifier'
import { prerendering } from '$app/env'

const { NODE_ENV } = process.env;

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

export async function handle({ request, resolve }) {
    const response = await resolve(request)
    if (prerendering && response.headers['content-type'] === 'text/html') {
        response.body = minify(response.body, min_opts)
    }
    return response
}