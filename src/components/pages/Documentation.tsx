/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import "../../assets/css/markup-theme.css";
import "./css/Pages.css";

import type { ComponentChild } from "preact";
import { Route, Router, useLocation } from "preact-iso";

import { Markdown } from "../Markdown/Markdown";
import { Page, SideBar, type ISection } from "../Sidebar.js";
import { ComponentBase } from "../ui/Component/ComponentBase.js";
import { Container, Orientation } from "../ui/Container/Container.js";
import { GettingStartedPage } from "./GettingStartedPage";
import { GrammarsPage } from "./GrammarsPage";
import { GrammarSyntaxPage } from "./GrammarSyntaxPage.js";
import { IntroductionPage } from "./IntroductionPage.js";
import { OptionsPage } from "./OptionsPage";
import { ParserRulesPage } from "./ParserRulesPage";

interface IDocumentationState {
    // The content of the currently selected markdown file.
    markdownContent?: string;
}

// The content of the sidebar tree.
const sections: ISection[] = [
    { title: "Introduction", id: Page.Introduction, urlPath: "/documentation" },
    { title: "Getting Started", id: Page.GettingStarted, urlPath: "/documentation/getting-started" },
    { title: "Other Useful Tools", id: Page.REPL, urlPath: "/documentation/repl" },
    {
        title: "Grammars", id: Page.Grammars, urlPath: "/documentation/grammars", children: [
            { title: "Grammar Syntax", id: Page.GrammarSyntax, urlPath: "/documentation/grammars/grammar-syntax" },
            { title: "Options", id: Page.Options, urlPath: "/documentation/grammars/options" },
            { title: "Parser Rules", id: Page.ParserRules, urlPath: "/documentation/grammars/parser-rules" },
            { title: "Lexer Rules", id: Page.LexerRules, urlPath: "/documentation/grammars/lexer-rules" },
            { title: "Wildcard", id: Page.Wildcard, urlPath: "/documentation/grammars/wildcard" },
            { title: "Unicode", id: Page.Unicode, urlPath: "/documentation/grammars/unicode" },
        ]
    },
    { title: "Actions", id: Page.Actions, urlPath: "/documentation/actions" },
    { title: "Interpreters", id: Page.Interpreters, urlPath: "/documentation/interpreters" },
    { title: "Left Recursion", id: Page.LeftRecursion, urlPath: "/documentation/left-recursion" },
    {
        title: "Listeners and Visitors",
        id: Page.ListenersAndVisitors,
        urlPath: "/documentation/listeners-and-visitors"
    },
    {
        title: "Parsing Binary Content",
        id: Page.ParsingBBinaryContent,
        urlPath: "/documentation/parsing-binary-content"
    },
    { title: "Predicates", id: Page.Predicates, urlPath: "/documentation/predicates" },
    { title: "Tree Matching", id: Page.TreeMatching, urlPath: "/documentation/tree-matching" },
    {
        title: "Creating a Language Target",
        id: Page.CreatingALanguageTarget,
        urlPath: "/documentation/creating-a-language-target"
    },
    { title: "Building", id: Page.Building, urlPath: "/documentation/building" },
    { title: "Testing", id: Page.Testing, urlPath: "/documentation/testing" },
    { title: "Resources", id: Page.Resources, urlPath: "/documentation/resources" },
];

export class Documentation extends ComponentBase<{}, IDocumentationState> {

    public constructor() {
        super({});

        this.state = {};
    }

    public render(): ComponentChild {
        const className = this.getEffectiveClassNames(["documentation", "pageHost"]);
        const { url } = useLocation();

        return (
            <Container
                orientation={Orientation.LeftToRight}
                className={className}
            >
                <SideBar
                    sections={sections}
                    currentPath={url}
                />
                <Router>
                    <Route path="/" component={IntroductionPage} />
                    <GettingStartedPage path="/getting-started" />
                    <Markdown path="/repl" fileName="/repl.md" />
                    <GrammarsPage path="/grammars/" />
                    <GrammarSyntaxPage path="/grammars/grammar-syntax" />
                    <OptionsPage path="/grammars/options" />
                    <ParserRulesPage path="/grammars/parser-rules" />
                    <Markdown path="/grammars/lexer-rules" fileName="/lexer-rules.md" />
                    <Markdown path="/grammars/wildcard" fileName="/wildcard.md" />
                    <Markdown path="/grammars/unicode" fileName="/unicode.md" />
                    <Markdown path="/actions" fileName="/actions.md" />
                    <Markdown path="/interpreters" fileName="/interpreters.md" />
                    <Markdown path="/left-recursion" fileName="/left-recursion.md" />
                    <Markdown path="/listeners-and-visitors" fileName="/listeners.md" />
                    <Markdown path="/parsing-binary-content" fileName="/parsing-binary-files.md" />
                    <Markdown path="/predicates" fileName="/predicates.md" />
                    <Markdown path="/tree-matching" fileName="/tree-matching.md" />
                    <Markdown path="/creating-a-language-target" fileName="/creating-a-language-target.md" />
                    <Markdown path="/building" fileName="/building-antlr.md" />
                    <Markdown path="/testing" fileName="/testing-antlr.md" />
                    <Markdown path="/resources" fileName="/resources.md" />
                </Router>
            </Container>
        );
    }
}
