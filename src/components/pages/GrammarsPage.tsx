/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import type { ComponentChild } from "preact";

import { Container, Orientation } from "../ui/Container/Container";
import { ComponentBase, type IComponentProperties } from "../ui/Component/ComponentBase";

export interface IGrammarsPageProperties extends IComponentProperties {
    path: string;
}

export class GrammarsPage extends ComponentBase<IGrammarsPageProperties> {
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

                <div>
                    There are 3 types of grammars in <span className="antlrng">antlr-ng</span>:
                    <ul>
                        <li><b>Parser grammar:</b> Only contains parser rule defintions. Options and actions apply
                            only to the generated parser. Parser rules can reference other parser rules and
                            lexer rules.</li>
                        <li><b>Lexer grammar:</b> Only contains lexer rule definitions. Just like for parser
                            grammars any given option applies only to the generated lexer. It is not allowed to
                            reference parser rules in lexer rules.</li>
                        <li><b>Combined:</b> A combination of parser and lexer rules in a single file. Options that
                            can have a different meaning/value in parser and lexer apply only to the parser (e.g.
                            the super class), while others (e.g. the language) are used for both types.
                            Named actions (e.g. <code>@header</code>) must be scoped to identify where to use them
                            (e.g. <code>@parser::header</code>. Otherwise they are used for the parser.</li>
                    </ul>

                    Given the special conditions and mentioned restrictions, it is recommended to use non-combined
                    grammars whenever possible. This makes the grammar easier to understand and maintain.
                    Combined grammars are more like beginner grammars to ease
                    learning <span className="antlrng">antlr-ng</span>.
                </div>
            </Container>
        );
    }
}
