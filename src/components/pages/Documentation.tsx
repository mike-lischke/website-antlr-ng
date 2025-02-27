/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import "../../assets/css/markup-theme.css";
import "./css/Pages.css";

import type { ComponentChild } from "preact";
import Router from "preact-router";

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
import { ScrollToAnchor } from "../ScrollToAnchor";

interface IDocumentationState {
    // The content of the currently selected markdown file.
    markdownContent?: string;
}

// The content of the sidebar tree.
const sections: ISection[] = [
    { title: "Introduction", id: Page.Introduction, urlPath: "/documentation" },
    { title: "Getting Started", id: Page.GettingStarted, urlPath: "/documentation/getting-started" },
    {
        title: "Grammars", id: Page.Grammars, urlPath: "/documentation/grammars", children: [
            { title: "Grammar Syntax", id: Page.GrammarSyntax, urlPath: "/documentation/grammars/grammar-syntax" },
            { title: "Options", id: Page.Options, urlPath: "/documentation/grammars/options" },
            { title: "Parser Rules", id: Page.ParserRules, urlPath: "/documentation/grammars/parser-rules" },
            {
                title: "Lexer Rules",
                id: Page.LexerRules,
                file: "lexer-rules.md",
                urlPath: "/documentation/grammars/lexer-rules"
            },
            { title: "Wildcard", id: Page.Wildcard, file: "wildcard.md", urlPath: "/documentation/grammars/wildcard" },
            { title: "Unicode", id: Page.Unicode, file: "unicode.md", urlPath: "/documentation/grammars/unicode" },
        ]
    },
    { title: "Actions", id: Page.Actions, file: "actions.md", urlPath: "/documentation/actions" },
    { title: "Interpreters", id: Page.Interpreters, file: "interpreters.md", urlPath: "/documentation/interpreters" },
    {
        title: "Left Recursion",
        id: Page.LeftRecursion,
        file: "left-recursion.md",
        urlPath: "/documentation/left-recursion"
    },
    {
        title: "Listeners and Visitors",
        id: Page.ListenersAndVisitors,
        file: "listeners.md",
        urlPath: "/documentation/listeners-and-visitors"
    },
    {
        title: "Parsing Binary Content",
        id: Page.ParsingBBinaryContent,
        file: "parsing-binary-files.md",
        urlPath: "/documentation/parsing-binary-content"
    },
    { title: "Predicates", id: Page.Predicates, file: "predicates.md", urlPath: "/documentation/predicates" },
    {
        title: "Tree Matching",
        id: Page.TreeMatching,
        file: "tree-matching.md",
        urlPath: "/documentation/tree-matching"
    },
    {
        title: "Creating a Language Target",
        id: Page.CreatingALanguageTarget,
        file: "creating-a-language-target.md",
        urlPath: "/documentation/creating-a-language-target"
    },
    { title: "Building", id: Page.Building, file: "building-antlr.md", urlPath: "/documentation/building" },
    { title: "Resources", id: Page.Resources, file: "resources.md", urlPath: "/documentation/resources" },
];

export class Documentation extends ComponentBase<{}, IDocumentationState> {

    public constructor() {
        super({});

        this.state = {
        };
    }

    public render(): ComponentChild {
        const className = this.getEffectiveClassNames(["documentation", "pageHost"]);

        return (
            <Container
                orientation={Orientation.LeftToRight}
                className={className}
            >
                <SideBar
                    sections={sections}
                    currentPath={""}
                />
                <Router>
                    <ScrollToAnchor path="/:rest*" />
                    <IntroductionPage path="/documentation" />
                    <GettingStartedPage path="/documentation/getting-started" />
                    <GrammarsPage path="/documentation/grammars/:id*" />
                    <GrammarSyntaxPage path="/documentation/grammars/grammar-syntax" />
                    <OptionsPage path="/documentation/grammars/options" />
                    <ParserRulesPage path="/documentation/grammars/parser-rules" />
                    <Markdown path="/documentation/grammars/lexer-rules" fileName="/lexer-rules.md" />
                    <Markdown path="/documentation/grammars/wildcard" fileName="/wildcard.md" />
                    <Markdown path="/documentation/grammars/unicode" fileName="/unicode.md" />
                    <Markdown path="/documentation/actions" fileName="/actions.md" />
                    <Markdown path="/documentation/interpreters" fileName="/interpreters.md" />
                    <Markdown path="/documentation/left-recursion" fileName="/left-recursion.md" />
                    <Markdown path="/documentation/listeners-and-visitors" fileName="/listeners.md" />
                    <Markdown
                        path="/documentation/parsing-binary-content"
                        fileName="/parsing-binary-files.md"
                    />
                    <Markdown path="/documentation/predicates" fileName="/predicates.md" />
                    <Markdown path="/documentation/tree-matching" fileName="/tree-matching.md" />
                    <Markdown
                        path="/documentation/creating-a-language-target"
                        fileName="/creating-a-language-target.md"
                    />
                    <Markdown path="/documentation/building" fileName="/building-antlr.md" />
                    <Markdown path="/documentation/resources" fileName="/resources.md" />
                </Router>
            </Container>
        );
    }
}
