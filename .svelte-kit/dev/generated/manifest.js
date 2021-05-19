const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../../../src/routes/__error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/reset_password.svelte"),
	() => import("../../../src/routes/edit_room/[id].svelte"),
	() => import("../../../src/routes/add_item.svelte"),
	() => import("../../../src/routes/add_room.svelte"),
	() => import("../../../src/routes/my_rooms.svelte"),
	() => import("../../../src/routes/items/[id].svelte"),
	() => import("../../../src/routes/login.svelte"),
	() => import("../../../src/routes/rooms/[id].svelte"),
	() => import("../../../src/routes/rooms.svelte"),
	() => import("../../../src/routes/beee.svelte"),
	() => import("../../../src/routes/edit/[id].svelte"),
	() => import("../../../src/routes/edit.svelte"),
	() => import("../../../src/routes/item/[id].svelte"),
	() => import("../../../src/routes/room/[id].svelte"),
	() => import("../../../src/routes/test.svelte"),
	() => import("../../../src/routes/[username].svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/reset_password.svelte
	[/^\/reset_password\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/edit_room/[id].svelte
	[/^\/edit_room\/([^/]+?)\/?$/, [c[0], c[4]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/add_item.svelte
	[/^\/add_item\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/add_room.svelte
	[/^\/add_room\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/my_rooms.svelte
	[/^\/my_rooms\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/items/[id].svelte
	[/^\/items\/([^/]+?)\/?$/, [c[0], c[8]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/login.svelte
	[/^\/login\/?$/, [c[0], c[9]], [c[1]]],

	// src/routes/rooms/[id].svelte
	[/^\/rooms\/([^/]+?)\/?$/, [c[0], c[10]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/rooms.svelte
	[/^\/rooms\/?$/, [c[0], c[11]], [c[1]]],

	// src/routes/auth/login.js
	[/^\/auth\/login\/?$/],

	// src/routes/auth/exit.js
	[/^\/auth\/exit\/?$/],

	// src/routes/auth/join.js
	[/^\/auth\/join\/?$/],

	// src/routes/beee.svelte
	[/^\/beee\/?$/, [c[0], c[12]], [c[1]]],

	// src/routes/edit/[id].svelte
	[/^\/edit\/([^/]+?)\/?$/, [c[0], c[13]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/edit.svelte
	[/^\/edit\/?$/, [c[0], c[14]], [c[1]]],

	// src/routes/item/[id].svelte
	[/^\/item\/([^/]+?)\/?$/, [c[0], c[15]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/room/[id].svelte
	[/^\/room\/([^/]+?)\/?$/, [c[0], c[16]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/test.svelte
	[/^\/test\/?$/, [c[0], c[17]], [c[1]]],

	// src/routes/[username].svelte
	[/^\/([^/]+?)\/?$/, [c[0], c[18]], [c[1]], (m) => ({ username: d(m[1])})]
];

export const fallback = [c[0](), c[1]()];