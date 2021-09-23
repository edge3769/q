import adapter from '@sveltejs/adapter-static'

export default {
    // compilerOptions: {
    // 	cssHash: ({hash, css, name, filename}) => {
    // 	// default
    // 		return `svelte-${hash(css)}`
    // 	}
    // },
    kit: {
        adapter: adapter({
            pages: 'Ticket-Xpress/components/book-a-trip',
            assets: 'Ticket-Xpress/assets/css/book-a-trip',
            fallback: null
        })
    }
}