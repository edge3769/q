import adapter from '@sveltejs/adapter-static'
// import { pxToRem } from './preprocessors/index.js'

export default {
    kit: {
        adapter: adapter({
            pages: 'Ticket-Xpress/components/book-a-trip',
            assets: 'Ticket-Xpress/assets/css/book-a-trip',
            fallback: null
        })
    },
}