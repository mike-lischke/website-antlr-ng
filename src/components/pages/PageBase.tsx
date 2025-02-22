/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import type { ComponentChild } from "preact";

import hljs from "highlight.js";

import { ComponentBase, type IComponentProperties, type IComponentState } from "../ui/Component/ComponentBase.js";

export enum Page {
    Actions,
    Introduction,
    GettingStarted,
    Grammars,
    Options,
    ParserRules,
    LexerRules,
    Wildcard,
    GrammarSyntax,
    Unicode,
    Interpreters,
    LeftRecursion,
    ListenersAndVisitors,
    ParsingBBinaryContent,
    Predicates,
    TreeMatching,
    CreatingALanguageTarget,
    Building,
    Resources,

}

export interface IPageBaseProperties extends IComponentProperties {
    navigateToPage?: (pageId: Page) => void;
}

/** The base component for our pages. */
export class PageBase<P extends IPageBaseProperties = IPageBaseProperties, S extends IComponentState = {}>
    extends ComponentBase<P, S> {

    //public static title = "antlr-ng Parser Generator";

    public render(): ComponentChild {
        return null;
    }

    protected navigateToPage(pageId: Page): void {
        const { navigateToPage } = this.props;

        navigateToPage?.(pageId);
    }

    protected highlightCodeBlocks() {
        const codeBlocks = document.querySelectorAll('pre code[class^="language-"]');
        codeBlocks.forEach((block) => {
            hljs.highlightElement(block as HTMLElement);
        });
    }
}
