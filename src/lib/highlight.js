import { langs } from '@sveltejs/site-kit/utils/markdown.js';

export function highlight(source, lang) {
	const plang = langs[lang] || ''
	const highlighted = source.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

	return `<pre class='language-${plang}'><code>${highlighted}</code></pre>`;
}
