import { link_renderer } from '@sveltejs/site-kit/utils/markdown';
import { highlight } from '$lib/utils/highlight';
import { marked } from 'marked'

const renderer = new marked.Renderer()
renderer.link = link_renderer                                                                                                                           
renderer.code = highlight
renderer.heading = (text, level) => {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

    return `
            <h${level}>
              <Link name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </Link>
              ${text}
            </h${level}>`;
}

renderer.list = (body, ordered, start) => {
    if(!ordered){
        return `
            <ul style='list-style-type: square; list-style-position: inside;'>
                ${body}
            </ul>
        `
    }
    if(ordered){
        return `
            <ol style='list-style-type: decimal; list-style-position: inside;'>
                ${body}
            </ol>
        `
    }
}

marked.setOptions({
    renderer: renderer,
    breaks: true
})

export function parseMarkdown(markdown) {
    if(markdown){
        return marked(
            markdown.replace(/^\t+/gm, match => match.split('\t').join('  '))
            .replace(/^\n+/gm, match => match.split('\n').join('<br /> \n')),
            { renderer }
        )
    } else {
        return ''
    }
}