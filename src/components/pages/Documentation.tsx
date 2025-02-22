/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import "../../assets/css/markup-theme.css";
import "./css/Pages.css";

import type { ComponentChild } from "preact";

import { Markdown } from "../Markdown/Markdown";
import { SideBar, type ISection } from "../Sidebar.js";
import { ComponentBase } from "../ui/Component/ComponentBase.js";
import { Container, Orientation } from "../ui/Container/Container.js";
import { GettingStartedPage } from "./GettingStartedPage";
import { GrammarsPage } from "./GrammarsPage";
import { GrammarSyntaxPage } from "./GrammarSyntaxPage.js";
import { IntroductionPage } from "./IntroductionPage.js";
import { OptionsPage } from "./OptionsPage";
import { Page, type PageBase } from "./PageBase";
import { ParserRulesPage } from "./ParserRulesPage";

interface IDocumentationState {
    currentSection: ISection;

    // The content of the currently selected markdown file.
    markdownContent?: string;
}

// The content of the sidebar tree.
const sections: ISection[] = [
    { title: "Introduction", id: Page.Introduction },
    { title: "Getting Started", id: Page.GettingStarted },
    {
        title: "Grammars", id: Page.Grammars, children: [
            { title: "Grammar Syntax", id: Page.GrammarSyntax },
            { title: "Options", id: Page.Options },
            { title: "Parser Rules", id: Page.ParserRules },
            { title: "Lexer Rules", id: Page.LexerRules, file: "lexer-rules.md" },
            { title: "Wildcard", id: Page.Wildcard, file: "wildcard.md" },
            { title: "Unicode", id: Page.Unicode, file: "unicode.md" },
        ]
    },
    { title: "Actions", id: Page.Actions, file: "actions.md" },
    { title: "Interpreters", id: Page.Interpreters, file: "interpreters.md" },
    { title: "Left Recursion", id: Page.LeftRecursion, file: "left-recursion.md" },
    { title: "Listeners and Visitors", id: Page.ListenersAndVisitors, file: "listeners.md" },
    { title: "Parsing Binary Content", id: Page.ParsingBBinaryContent, file: "parsing-binary-files.md" },
    { title: "Predicates", id: Page.Predicates, file: "predicates.md" },
    { title: "Tree Matching", id: Page.TreeMatching, file: "tree-matching.md" },
    { title: "Creating a Language Target", id: Page.CreatingALanguageTarget, file: "creating-a-language-target.md" },
    { title: "Building", id: Page.Building, file: "building-antlr.md" },
    { title: "Resources", id: Page.Resources, file: "resources.md" },
];

const pageIdToPageClassMap = new Map<Page, typeof PageBase>([
    [Page.Introduction, IntroductionPage as typeof PageBase],
    [Page.GettingStarted, GettingStartedPage as typeof PageBase],
    [Page.GrammarSyntax, GrammarSyntaxPage as typeof PageBase],
    [Page.Grammars, GrammarsPage as typeof PageBase],
    [Page.Options, OptionsPage as typeof PageBase],
    [Page.ParserRules, ParserRulesPage as typeof PageBase],
]);

export class Documentation extends ComponentBase<{}, IDocumentationState> {

    public constructor() {
        super({});

        this.state = {
            currentSection: { title: "Introduction", id: Page.Introduction },
        };
    }

    public override componentDidUpdate(prevProps: {}, prevState: IDocumentationState): void {
        if (prevState.currentSection !== this.state.currentSection) {
            this.setState({ markdownContent: undefined });
        }
    }

    public render(): ComponentChild {
        const { currentSection, markdownContent } = this.state;

        const className = this.getEffectiveClassNames(["documentation", "pageHost"]);

        let page: ComponentChild = null;

        if (currentSection.file) {
            if (markdownContent === undefined) {
                void this.loadMarkdownContent(currentSection.file);
                page = <div>Loading...</div>;
            } else {
                page = <Container orientation={Orientation.TopDown} className="pageContent">
                    <Markdown text={markdownContent} options={{}} />
                </Container >;
            }
        } else {
            if (markdownContent !== undefined) {
                this.setState({ markdownContent: undefined });
            }

            // eslint-disable-next-line @typescript-eslint/naming-convention
            const PageClass = pageIdToPageClassMap.get(currentSection.id);
            if (PageClass) {
                page = <PageClass
                    navigateToPage={(pageId) => {
                        const section = sections.find((section) => {
                            return section.id === pageId;
                        });

                        this.setState({ currentSection: section });
                    }}
                />;
            }
        }

        // Update the page title from the section list.
        sections.forEach((section) => {
            if (section.id === currentSection.id) {
                document.title = "antlr-ng " + section.title;
            } else if (section.children) {
                section.children.forEach((child) => {
                    if (child.id === currentSection.id) {
                        document.title = "antlr-ng " + child.title;
                    }
                });
            }
        });

        return (
            <Container
                orientation={Orientation.LeftToRight}
                className={className}
            >
                <SideBar
                    sections={sections}
                    currentSection={currentSection}
                    onSelectSection={(section) => {
                        this.setState({ currentSection: section });
                    }}
                />
                {page}
            </Container>
        );
    }

    private async loadMarkdownContent(file: string): Promise<void> {
        try {
            const response = await fetch(file);
            const text = await response.text();
            this.setState({ markdownContent: text });
        } catch (error) {
            console.error("Error loading Markdown file:", error);
        }
    }
}
