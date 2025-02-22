/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import type { ComponentChild } from "preact";
import { PageBase } from "./PageBase";
import { Container, Orientation } from "../ui/Container/Container";

export class GrammarsPage extends PageBase {
    public override render(): ComponentChild {
        return (
            <Container className="pageContent" orientation={Orientation.TopDown}>
                <h1>Grammars</h1>

                Grammars are the fundamental element to describe a language. They are written in a special
                language called <span className="antlrng">antlr-ng</span> grammar syntax. This section gives an
                overview of the different parts of a grammar and how they are used in the parser generation process.

                The following topics are covered in this section:
                <ul>
                    <li><b>Grammar Syntax:</b> a graphical approach to
                        the <span className="antlrng">antlr-ng</span>  grammar structure.</li>
                    <li><b>Options:</b> How to customize the generation process.</li>
                    <li><b>Parser Rules:</b> A closer look at parser rules (non-terminals).</li>
                    <li><b>Lexer Rules:</b> How are tokens (terminals) defined?</li>
                    <li><b>Wildcard:</b> About matching any input. Greedy or not greedy is the question.</li>
                    <li><b>Unicode:</b> How to define tokens with any Unicode character?</li>
                </ul>
            </Container>
        );
    }
}
