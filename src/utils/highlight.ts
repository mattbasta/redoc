import * as Prism from 'prismjs';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-c.js';
import 'prismjs/components/prism-clike.js';
import 'prismjs/components/prism-http.js';
import 'prismjs/components/prism-markup.js'; // xml
import 'prismjs/components/prism-python.js';

const DEFAULT_LANG = 'clike';

Prism.languages.insertBefore(
  'javascript',
  'string',
  {
    'property string': {
      pattern: /([{,]\s*)"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i,
      lookbehind: true,
    },
  } as any,
  undefined as any,
);

Prism.languages.insertBefore(
  'javascript',
  'punctuation',
  {
    property: {
      pattern: /([{,]\s*)[a-z]\w*(?=\s*:)/i,
      lookbehind: true,
    },
  },
  undefined as any,
);

/**
 * Highlight source code string using Prism.js
 * @param source source code to highlight
 * @param lang highlight language
 * @return highlighted source code as **html string**
 */
export function highlight(source: string | number | boolean, lang: string = DEFAULT_LANG): string {
  lang = lang.toLowerCase();
  let grammar = Prism.languages[lang];
  if (!grammar) {
    grammar = Prism.languages[DEFAULT_LANG];
  }
  return Prism.highlight(source.toString(), grammar, lang);
}
