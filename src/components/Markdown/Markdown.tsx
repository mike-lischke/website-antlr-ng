/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { type ComponentChild } from "preact";

import { Marked, type MarkedOptions } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

import Markup from "preact-markup";

import { ComponentBase, type IComponentProperties } from "../ui/Component/ComponentBase";

export interface IMarkdownProperties extends IComponentProperties {
    text: string;
    options: MarkedOptions;
}

/** A class to render markdown code as html. */
export class Markdown extends ComponentBase<IMarkdownProperties> {
    public override render(props: IMarkdownProperties): ComponentChild {
        const { text, options } = props;

        const marked = new Marked(
            markedHighlight({
                emptyLangClass: "hljs",
                langPrefix: "hljs language-",
                highlight: (code, lang, info) => {
                    const language = hljs.getLanguage(lang) ? lang : "plaintext";

                    return hljs.highlight(code, { language }).value;
                }
            })
        );

        return (
            <Markup {...props} markup={marked.parse(text, options) as string} trim={false} type="html" />
        );
    }

    static {
        const keywords = [
            "options",
            "tokens",
            "channels",
            "import",
            "fragment",
            "lexer",
            "parser",
            "grammar",
            "protected",
            "public",
            "private",
            "returns",
            "locals",
            "throws",
            "catch",
            "finally",
            "mode",
        ];

        const unicodeIdentifier = /\b[\p{ID_Start}][\p{ID_Continue}]*/u;

        hljs.registerLanguage("antlr", (hljs) => {
            return {
                case_insensitive: true,
                unicodeRegex: true,
                disableAutodetect: true,
                keywords: {
                    keyword: keywords,
                    symbols: "+ - * / = < > <= >= : | ; ->",
                },
                contains: [
                    { // Intro line.
                        begin: /^\s*\b((parser|lexer)? grammar)\b/,
                        scope: "addition",
                    },
                    hljs.COMMENT("//", "$", { scope: "comment single-line", }),
                    hljs.C_BLOCK_COMMENT_MODE,
                    { // Native code in [].
                        begin: /\[.*\]/,
                        scope: "action-text",
                    },
                    { // Options block.
                        begin: /^\s*options\s*\{/,
                        end: /\}/,
                        scope: "meta",
                        keywords: {
                            keyword: "options"
                        },
                        contains: [
                            {
                                // eslint-disable-next-line max-len
                                begin: /\b(superClass|language|tokenVocab|TokenLabelType|contextSuperClass|exportMacro)\b/,
                                scope: "attribute",
                            },
                            {
                                begin: /[=;]/,
                                scope: "punctuation",
                            },
                            {
                                begin: hljs.IDENT_RE,
                                scope: "symbol",
                            },
                            hljs.APOS_STRING_MODE,
                            hljs.NUMBER_MODE,
                        ],
                    },
                    { // Named actions.
                        begin: [
                            /^\s*/,
                            new RegExp(`@${unicodeIdentifier.source}`),
                            new RegExp(`(::${unicodeIdentifier.source})?`),
                            /\s*/,
                        ],
                        beginScope: {
                            2: "scope",
                            3: "action-name",
                        } as Record<number, string>,
                        scope: "action",
                        contains: [
                            { // Action content besides comments.
                                begin: /\{/,
                                end: /\}/,
                                scope: "action-text",
                                contains: [
                                    "self",
                                    hljs.COMMENT("//", "$", { scope: "comment single-line", }),
                                    hljs.C_BLOCK_COMMENT_MODE,
                                ],
                            },
                        ],
                    },
                    { // Parser rules.
                        begin: [/^\s*[\p{ID_Start}][\p{ID_Continue}]*\s*/u, /:/],
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        "on:begin": (data, response) => {
                            const value = data[1].trim();
                            if (value[0].startsWith(value[0].toUpperCase())) {
                                response.ignoreMatch();
                            }
                        },
                        beginScope: ["parser-rule", "rule-name", "punctuation"],
                        end: /;/,
                        endScope: "punctuation",
                        scope: "parser-rule",
                        contains: [
                            {
                                end: /;/,
                                endsParent: true,
                                scope: "rule-body",
                                contains: [
                                    hljs.COMMENT("//", "$", { scope: "comment single-line", }),
                                    hljs.C_BLOCK_COMMENT_MODE,
                                    hljs.APOS_STRING_MODE,
                                    hljs.NUMBER_MODE,
                                    { // Rule references.
                                        begin: [unicodeIdentifier, /([*+?]\?)?/],
                                        beginScope: ["", "rule-ref", "regexp"],
                                        // eslint-disable-next-line @typescript-eslint/naming-convention
                                        "on:begin": (data, response) => {
                                            if (data[0] === data[0].toUpperCase()) {
                                                response.ignoreMatch();
                                            }
                                        }
                                    },
                                    { // Token references.
                                        begin: [/\b[\p{ID_Start}][\p{ID_Continue}]*/u, /[;*+?]?/],
                                        beginScope: ["", "token-ref", "punctuation"],
                                    },
                                    {
                                        begin: /\|/,
                                        scope: "punctuation",
                                    },
                                    { // Rule element options
                                        begin: /</,
                                        end: />/,
                                        scope: "variable",
                                    }
                                ],
                            }
                        ],
                    },
                    { // Lexer rules.
                        begin: [/^\s*/, /(?:fragment\s*)?/, unicodeIdentifier, /\s*/, /:/],
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        "on:begin": (data, response) => {
                            if (!data[2].startsWith("fragment")) { // A fragment rule is always a lexer rule.
                                const value = data[3].trim();
                                if (!value[0].startsWith(value[0].toUpperCase())) {
                                    response.ignoreMatch();
                                }
                            }
                        },
                        beginScope: {
                            1: "lexer-rule",
                            3: "rule-name",
                            5: "punctuation"
                        },
                        end: /;/,
                        endScope: "punctuation",
                        scope: "lexer-rule",
                        contains: [
                            {
                                end: /;/,
                                endScope: "punctuation",
                                endsParent: true,
                                scope: "rule-body",
                                contains: [
                                    hljs.COMMENT("//", "$", { scope: "comment single-line", }),
                                    hljs.C_BLOCK_COMMENT_MODE,
                                    hljs.APOS_STRING_MODE,
                                    hljs.NUMBER_MODE,
                                    { // Action content besides comments.
                                        begin: /\{.*/,
                                        scope: "action-text",
                                    },
                                    { // Token references.
                                        begin: [/\b[\p{ID_Start}][\p{ID_Continue}]*/u, /([*+?]\??)?/],
                                        beginScope: ["", "token-ref", "regexp"],
                                    },
                                    { // Start of an alternative.
                                        begin: /\|/,
                                        scope: "punctuation",
                                    },
                                    { // Lexer commands
                                        begin: /->/,
                                        beginScope: "punctuation",
                                        end: /;/,
                                        endScope: "punctuation",
                                        scope: "lexer-command",
                                        contains: [
                                            { // Individual lexer command
                                                begin: unicodeIdentifier.source + /\s*/.source,
                                                beginScope: "lexer-command-name",
                                                scope: "lexer-command-item",
                                                contains: [
                                                    {
                                                        begin: /\(/,
                                                        end: /\)/,
                                                        scope: "lexer-command-expression"
                                                    }
                                                ]
                                            },
                                            {
                                                match: /,/,
                                                scope: "punctuation"
                                            }
                                        ]
                                    },
                                    {
                                        begin: /~/,
                                        scope: "regexp",
                                    },
                                    { // Character sets.
                                        begin: [/\[/, /.*?/, /\]/],
                                        beginScope: ["", "selector-attr", "regexp", "selector-attr"],
                                        scope: "character-set"
                                    },
                                    { // BNF modifiers
                                        begin: /([*+?]\??)/,
                                        scope: "regexp",
                                    },
                                ],
                            }
                        ],
                    },
                ],
            };
        });
    }
}
