/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import logo from "../../assets/images/logo4.svg";

import { type ComponentChild } from "preact";

import { ComponentBase } from "../ui/Component/ComponentBase";
import { Container, ContentAlignment, Orientation } from "../ui/Container/Container.js";

export class IntroductionPage extends ComponentBase {
    public static title = "antlr-ng Introduction";

    public override render(): ComponentChild {
        return (
            <Container id="introduction" className="pageContent" orientation={Orientation.TopDown}>
                <Container id="logoBox" orientation={Orientation.LeftToRight} crossAlignment={ContentAlignment.Center}>
                    <img src={logo} className="logo"></img>
                    <h1>Introducing <span className="antlrng">antlr-ng</span>:<br /> the Next Generation Parser
                        Generator of ANTLR</h1>
                </Container>
                <span className="antlrng">antlr-ng</span> is the next evolution step of the old ANTLR4 Java tool for
                language recognition, designed as a TypeScript npm package. It's based on ANTLR version 4.13.2 and
                serves as a parser generator, allowing developers to create parsers for various programming languages
                and custom grammars. This powerful library offers several key features and improvements over its
                predecessor, making it an attractive option for developers working on language processing tasks.

                <h2>Key Features and Improvements</h2>

                <span className="antlrng">antlr-ng</span> builds upon the foundation of ANTLR4 while introducing
                several enhancements:
                <ol>
                    <li>
                        <span className="bold">TypeScript Implementation</span>: The entire codebase has been
                        transformed from Java to TypeScript, providing better integration with modern web and Node.js
                        projects.
                    </li>
                    <li>
                        <span className="bold">Multi-language Support</span>: <span className="antlrng">antlr-ng</span>
                        can generate parser and lexer classes for multiple target languages, including
                        TypeScript/JavaScript, Java, C++, C#, Go, Python3, Dart, Swift, and PHP.
                    </li>
                    <li>
                        <span className="bold">Dynamic Configuration</span>: one of the planned features is to allow to
                        dynamically load generators for target languages. This opens the door for many new features
                        like customization of the generation process, private target generators, complex file
                        generation etc.</li>
                </ol>

                <div className="note">
                    <b>Note:</b> This documentation is a work in progress and will be updated as the project
                    evolves. The individual pages are rendered from markdown files, which have been copied from the
                    ANTLR4 documentation and adapted where necessary. The content may not yet fully reflect the
                    capabilities of <span className="antlrng">antlr-ng</span>.<br /><br />

                    Pages which contain Java code snippets have not been adapted yet and may not work as
                    expected.
                </div>

                <h2>Usage and Integration</h2>

                <div>For a detailed description of how to use <span className="antlrng">antlr-ng</span> see the <a
                    href="/documentation/getting-started"
                >
                    Getting Started Page
                </a>.</div>

                <h2>Compatibility and Migration</h2>

                The <span className="antlrng">antlr-ng</span> tool aims to be a drop-in replacement for ANTLR4,
                with full compatibility for existing grammars and generated parsers. Developers can migrate their
                projects to <span className="antlrng">antlr-ng</span> with minimal effort, leveraging the enhanced
                features and performance benefits of the new tool.

                <h2>Future Developments</h2>

                The <span className="antlrng">antlr-ng</span>project is actively evolving, with several planned
                improvements:

                <ol>
                    <li>
                        <span className="bold">Browser Compatibility</span>: Future versions aim to support
                        running <span className="antlrng">antlr-ng</span> directly in web browsers, expanding its
                        versatility.
                    </li>
                    <li>
                        <span className="bold">Dynamic Loading of Generators</span>: Since TypeScript is a scripting
                        language it is easy to load additional scripts at runtime, allowing so also tool users
                        (not only target developers) to customize the generation process.
                    </li>
                    <li>
                        <span className="bold">Better Import Handling</span>: Allows users to control grammar import
                        at the rule level.
                    </li>
                    <li>
                        <span className="bold">Separation of Tool and
                            Targets</span>: <span className="antlrng">antlr-ng</span> finally separates itself from
                        the target generators, in a way which makes target support development completely
                        independent.
                    </li>
                </ol>

                <h2>Advantages of Using antlr-ng</h2>

                <ol>
                    <li>
                        <span className="bold">Modern TypeScript Ecosystem</span>: With its focus on TypeScript and
                        ESM, a<span className="antlrng">antlr-ng</span> integrates seamlessly with modern development
                        practices and paradigms.
                    </li>
                    <li>
                        <span className="bold">Productivity</span>:
                        The <span className="antlrng">antlr-ng</span> tool significantly enhances developer
                        productivity by simplifying the process of creating and maintaining parsers for evolving
                        languages or formats.
                    </li>
                    <li>
                        <span className="bold">Flexibility</span>: The multi-language support allows developers to
                        generate parsers for various target languages from a single grammar definition.
                    </li>
                    <li>
                        <span className="bold">Automatic Parse Tree
                            Generation</span>: <span className="antlrng">antlr-ng</span> automatically generates
                        parse trees, saving developers from manually augmenting grammars with tree construction
                        operations.
                    </li>
                    <li>
                        <span className="bold">Listener and Visitor Pattern Support</span>: The tool generates
                        parse-tree walkers implementing both listener and visitor patterns, providing flexibility in
                        how developers interact with the parsed structure.
                    </li>
                </ol>

                <h2>Considerations and Limitations</h2>

                While <span className="antlrng">antlr-ng</span> offers numerous advantages, developers should
                consider the following:
                <ol>
                    <li>
                        <span className="bold">Learning Curve</span>: For those unfamiliar with ANTLR, there may be a
                        learning curve in understanding grammar definition and parser generation concepts.</li>
                    <li>
                        <span className="bold">Ongoing Development</span>: As the tool is still evolving, developers
                        should be prepared for potential changes and updates in future versions.</li>
                    <li>
                        <span className="bold">Specific Use Cases</span>: While
                        powerful, <span className="antlrng">antlr-ng</span> may be overkill for simple parsing tasks.
                        Developers should evaluate whether a full parser generator is necessary for their specific
                        use case.
                    </li>
                </ol>

                In conclusion, <span className="antlrng">antlr-ng</span> represents a significant advancement in the
                field of parser generation, particularly for TypeScript and JavaScript developers.Its combination of
                performance, flexibility, and modern language support makes it a valuable tool for projects involving
                complex language processing tasks.As the project continues to evolve, it promises to become an even
                more integral part of the language recognition toolkit for developers across various programming
                languages and environments.

                <h2>License</h2>

                <div>
                    Like it's predecessor <span className="antlrng">antlr-ng</span> is licensed under the BSD 3-Clause
                    License. For more information see
                    the <a href="https://opensource.org/licenses/BSD-3-Clause" target="_blank">BSD 3-Clause License</a>.
                </div>

            </Container>
        );
    }
}
