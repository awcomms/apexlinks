export const manifest = {
	appDir: "_app",
	assets: new Set(["BingSiteAuth.xml","apexlinks-144.png","apexlinks-192.png","apexlinks-512.png","apple-touch-icon-1024x1024.png","apple-touch-icon-120x120.png","apple-touch-icon-152x152.png","apple-touch-icon-167x167.png","apple-touch-icon-180x180.png","favicon.ico","junegull.ttf","manifest.webmanifest","placeholder.png","service-worker.js"]),
	mimeTypes: {".xml":"application/xml",".png":"image/png",".ico":"image/vnd.microsoft.icon",".ttf":"font/ttf",".webmanifest":"application/manifest+json"},
	_: {
		entry: {"file":"start-e4ba7f1a.js","js":["start-e4ba7f1a.js","chunks/index-3c306420.js","chunks/index-b8508cdc.js","chunks/singletons-d1fb5791.js"],"css":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/10.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/9.js'),
			() => import('./nodes/12.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/11.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'endpoint',
				id: "send",
				pattern: /^\/send\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/send.js')
			},
			{
				type: 'endpoint',
				id: "robots.txt",
				pattern: /^\/robots\.txt$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/robots.txt.js')
			},
			{
				type: 'page',
				id: "audio",
				pattern: /^\/audio\/?$/,
				names: [],
				types: [],
				path: "/audio",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "edit",
				pattern: /^\/edit\/?$/,
				names: [],
				types: [],
				path: "/edit",
				shadow: null,
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				id: "login",
				pattern: /^\/login\/?$/,
				names: [],
				types: [],
				path: "/login",
				shadow: null,
				a: [0,5],
				b: [1]
			},
			{
				type: 'page',
				id: "t",
				pattern: /^\/t\/?$/,
				names: [],
				types: [],
				path: "/t",
				shadow: null,
				a: [0,6],
				b: [1]
			},
			{
				type: 'endpoint',
				id: "auth/login",
				pattern: /^\/auth\/login\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/auth/login.js')
			},
			{
				type: 'endpoint',
				id: "auth/join",
				pattern: /^\/auth\/join\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/auth/join.js')
			},
			{
				type: 'endpoint',
				id: "auth/exit",
				pattern: /^\/auth\/exit\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/auth/exit.js')
			},
			{
				type: 'page',
				id: "event/[id]",
				pattern: /^\/event\/([^/]+?)\/?$/,
				names: ["id"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,7],
				b: [1]
			},
			{
				type: 'page',
				id: "t/[id]",
				pattern: /^\/t\/([^/]+?)\/?$/,
				names: ["id"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,8],
				b: [1]
			},
			{
				type: 'page',
				id: "u/[id]",
				pattern: /^\/u\/([^/]+?)\/?$/,
				names: ["id"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,9],
				b: [1]
			},
			{
				type: 'page',
				id: "t/[id]/about",
				pattern: /^\/t\/([^/]+?)\/about\/?$/,
				names: ["id"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,10],
				b: [1]
			},
			{
				type: 'page',
				id: "t/[id]/edit",
				pattern: /^\/t\/([^/]+?)\/edit\/?$/,
				names: ["id"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,11],
				b: [1]
			},
			{
				type: 'page',
				id: "u/[id]/about",
				pattern: /^\/u\/([^/]+?)\/about\/?$/,
				names: ["id"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,12],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
