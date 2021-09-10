import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "..\\..\\src\\hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"utf-8\" />\r\n    <meta\r\n      name=\"viewport\"\r\n      content=\"width=device-width, initial-scale=1, shrink-to-fit=no\"\r\n    />\r\n    " + head + "\r\n  </head>\r\n  <body>\r\n    <div>" + body + "</div>\r\n  </body>\r\n</html>\r\n";

let options = null;

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: "/./_app/start-d43a9b42.js",
			css: ["/./_app/assets/start-a8cd1609.css"],
			js: ["/./_app/start-d43a9b42.js","/./_app/chunks/vendor-03273fa1.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => "/./_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: error => {
			console.error(error.stack);
			error.stack = options.get_stack(error);
		},
		hooks: get_hooks(user_hooks),
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		read: settings.read,
		root,
		router: true,
		ssr: true,
		target: null,
		template,
		trailing_slash: "never"
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [{"file":"building.png","size":536,"type":"image/png"},{"file":"calabar.png","size":113319,"type":"image/png"},{"file":"heart.png","size":747,"type":"image/png"},{"file":"jalingo.png","size":4134,"type":"image/png"},{"file":"leaf.png","size":501,"type":"image/png"},{"file":"leaf.png4","size":546,"type":null},{"file":"map.png","size":388,"type":"image/png"},{"file":"navigation.png","size":392,"type":"image/png"},{"file":"poppins.ttf","size":158192,"type":"font/ttf"},{"file":"sail.png","size":724,"type":"image/png"},{"file":"select.png","size":488,"type":"image/png"},{"file":"taxi.png","size":591,"type":"image/png"},{"file":"trip-card/building.png","size":565,"type":"image/png"},{"file":"trip-card/leaf.png","size":546,"type":"image/png"},{"file":"trip-card/map.png","size":388,"type":"image/png"},{"file":"trip-card/navigation.png","size":417,"type":"image/png"}],
	layout: ".svelte-kit/build/components/layout.svelte",
	error: ".svelte-kit/build/components/error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: [".svelte-kit/build/components/layout.svelte", "src/routes/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, render }) => render(request))
});

const module_lookup = {
	".svelte-kit/build/components/layout.svelte": () => import("./components\\layout.svelte"),".svelte-kit/build/components/error.svelte": () => import("./components\\error.svelte"),"src/routes/index.svelte": () => import("..\\..\\src\\routes\\index.svelte")
};

const metadata_lookup = {".svelte-kit/build/components/layout.svelte":{"entry":"/./_app/layout.svelte-196d7d0a.js","css":[],"js":["/./_app/layout.svelte-196d7d0a.js","/./_app/chunks/vendor-03273fa1.js"],"styles":null},".svelte-kit/build/components/error.svelte":{"entry":"/./_app/error.svelte-0d5b1a07.js","css":[],"js":["/./_app/error.svelte-0d5b1a07.js","/./_app/chunks/vendor-03273fa1.js"],"styles":null},"src/routes/index.svelte":{"entry":"/./_app/pages/index.svelte-4c4b476f.js","css":["/./_app/assets/pages/index.svelte-f1fe44be.css"],"js":["/./_app/pages/index.svelte-4c4b476f.js","/./_app/chunks/vendor-03273fa1.js"],"styles":null}};

async function load_component(file) {
	return {
		module: await module_lookup[file](),
		...metadata_lookup[file]
	};
}

init({ paths: {"base":"","assets":"/."} });

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}