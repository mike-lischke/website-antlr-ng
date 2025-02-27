/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/* eslint-disable max-len */

import "./css/diagram-light.css";

import { type ComponentChild } from "preact";

import { Button } from "../ui/Button/Button.js";
import { ComponentBase, type IComponentState } from "../ui/Component/ComponentBase";
import { Container, ContentAlignment, Orientation } from "../ui/Container/Container.js";
import { LoadingIndicator } from "../ui/LoadingIndicator/LoadingIndicator";

interface IGrammarSyntaxPageState extends IComponentState {
    parserGrammarSyntax?: ComponentChild;
    lexerGrammarSyntax?: ComponentChild;

    currentPageContent?: ComponentChild;
}

export class GrammarSyntaxPage extends ComponentBase<{}, IGrammarSyntaxPageState> {
    public constructor(props: {}) {
        super(props);

        this.state = {
        };
    }

    public override componentDidMount(): void {
        void this.loadData();
    }

    public override render(): ComponentChild {
        const { currentPageContent } = this.state;

        if (!currentPageContent) {
            return <LoadingIndicator />;
        }

        return (
            <Container
                className="pageContent"
                orientation={Orientation.TopDown}
                mainAlignment={ContentAlignment.Start}
            >
                <h1>The <span className="antlrng">antlr-ng</span> Grammar Syntax Visually Explained</h1>
                <p>
                    The following diagrams show the syntax of the <span className="antlrng">antlr-ng</span> grammar as rail road diagrams (RRD).
                    These diagrams have been created using the <a target="blank" href="https://marketplace.visualstudio.com/items?itemName=mike-lischke.vscode-antlr4">ANTLR extension for VS Code</a>.
                    <br /><br />Rounded boxes describe non-terminals, while rectangles stand for terminals.
                </p>
                <Container className="tabContainer" mainAlignment={ContentAlignment.Center}>
                    <Button caption="Parser Rules" id="parser" onClick={this.handlePageClick} />
                    <Button caption="Lexer Symbols" id="lexer" onClick={this.handlePageClick} />
                </Container>
                {currentPageContent}
            </Container>
        );
    }

    private handlePageClick = (e: MouseEvent): void => {
        const { parserGrammarSyntax, lexerGrammarSyntax } = this.state;

        const target = e.target as HTMLButtonElement;
        const id = target.id;

        switch (id) {
            case "parser": {
                this.setState({ currentPageContent: parserGrammarSyntax, });

                break;
            }

            case "lexer": {
                this.setState({ currentPageContent: lexerGrammarSyntax, });

                break;
            }
        }
    };

    private async loadData(): Promise<void> {
        const { parserGrammarSyntax } = await import("./parser-rules-diagram.js");
        const { lexerGrammarSyntax } = await import("./lexer-symbols-diagram.js");

        this.setState({ currentPageContent: parserGrammarSyntax, parserGrammarSyntax, lexerGrammarSyntax });
    }
}
