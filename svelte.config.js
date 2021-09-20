import adapter from '@sveltejs/adapter-static'

export default {
	compilerOptions: {
		cssHash: (hash, css, name, filename) => {
			return `${filename}-${name}`
		}
	},
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null
		})
	}
}