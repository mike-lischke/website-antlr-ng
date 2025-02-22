
/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import type { ComponentChild } from "preact";

import { Markdown } from "../Markdown/Markdown";
import { Container, Orientation } from "../ui/Container/Container";
import { PageBase } from "./PageBase";

interface ILexerRulesPageState {
    markdownContent: string;
}

export class LexerRulesPage extends PageBase<{}, ILexerRulesPageState> {
    public constructor(props: {}) {
        super(props);

        this.state = { markdownContent: "" };
    }

    public override componentDidMount(): void {
        void this.loadMarkdownContent();
    }

    public override render(): ComponentChild {
        const { markdownContent } = this.state;

        return (
            <Container orientation={Orientation.TopDown} className="pageContent">
                <Markdown text={markdownContent} options={{}} />
            </Container >
        );
    }

    private async loadMarkdownContent(): Promise<void> {
        try {
            const response = await fetch("lexer-rules.md");
            const text = await response.text();
            this.setState({ markdownContent: text });
        } catch (error) {
            console.error("Error loading Markdown file:", error);
        }
    }
}
