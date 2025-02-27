/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/* eslint-disable max-len */

import { type ComponentChild } from "preact";

import { highlightCodeBlocks } from "../../dom-helpers";
import { ComponentBase } from "../ui/Component/ComponentBase";
import { Container, Orientation } from "../ui/Container/Container";

const helpOutput = `> antlr-ng -h
Usage: program [options] <grammar...>

Arguments:
  grammar                                A list of grammar files.

Options:
  -o, --output-directory <path>          specify output directory where all output is generated
  --lib <path>                           specify location of grammars, tokens files
  --atn [boolean]                        Generate rule augmented transition network diagrams. (default: false)
  -e, --encoding <string>                Specify grammar file encoding; e.g., ucs-2. (default: "utf-8")
  --message-format [string]              Specify output style for messages in antlr, gnu, vs2005. (choices: "antlr", "gnu", "vs2005", default: "antlr")
  --long-messages [boolean].             Show exception details when available for errors and warnings. (default: false)
  -l, --generate-listener [boolean]      Generate parse tree listener. (default: true)
  -v, --generate-visitor [boolean]       Generate parse tree visitor. (default: false)
  -p, --package <name>                   Specify a package/namespace for the generated code.
  -d, --generate-dependencies [boolean]  Generate file dependencies. (default: false)
  -D, --define <key=value...>            Set/override a grammar-level option.
  -w, --warnings-are-errors [boolean]    Treat warnings as errors. (default: false)
  -f, --force-atn [boolean]              Use the ATN simulator for all predictions. (default: false)
  --log [boolean]                        Dump lots of logging info to antlrng-timestamp.log. (default: false)
  --exact-output-dir [boolean]           All output goes into -o dir regardless of paths/package (default: false)
  -V, --version                          output the version number
  -h, --help                             display help for command
`;

const codeGenerationCode = `
    const getEvalInfoForString = (grammarString: string, pattern: string): string[] => {
        const g = new Grammar(grammarString);
        g.tool.process(g, false);

        const evals: string[] = [];
        if (!g.ast.hasErrors) {
            const sem = new SemanticPipeline(g);
            sem.process();

            let factory = new ParserATNFactory(g);
            if (g.isLexer()) {
                factory = new LexerATNFactory(g as LexerGrammar);
            }

            g.atn = factory.createATN();

            const gen = new CodeGenerator(g);
            const outputFileST = gen.generateParser(g.tool.toolParameters);

            const debug = false;
            const interp = new DebugInterpreter(outputFileST.groupThatCreatedThisInstance,
                outputFileST.impl!.nativeGroup.errMgr, debug);
            const scope = new InstanceScope(undefined, outputFileST as ST);
            const sw = new StringWriter();
            const out = new AutoIndentWriter(sw);
            interp.exec(out, scope);

            for (const e of interp.evals) {
                if (e.includes(pattern)) {
                    evals.push(e);
                }
            }
        }

        return evals;
    };
`;

export class GettingStartedPage extends ComponentBase {
    public override componentDidMount(): void {
        highlightCodeBlocks();
    }

    public override render(): ComponentChild {
        return (
            <Container
                id="gettingStarted"
                className="pageContent"
                orientation={Orientation.TopDown}>
                <h1>Getting Started</h1>
                <div>
                    The <span className="antlrng">antlr-ng</span> node package can be used in two ways: as a command
                    line tool or as a library in your TypeScript/JavaScript project. It
                    needs <a href="https://www.nodejs.org" target="_blank">Node.js</a> being installed on your box.
                    Any version 20.x or later can be used and any platform which runs Node.js also can
                    run <span className="antlrng">antlr-ng</span>.
                </div>

                <h2>Using the Tool On the Command Line</h2>

                <div>
                    This is probably the most common use case, especially when switching from ANTLR4
                    to <span className="antlrng">antlr-ng</span>. First install the tool globally via NPM:
                    <pre><code className="language-bash" >npm i -g antlr-ng</code></pre>
                </div>

                <div>
                    If you don't have NPM installed, you can download it
                    from <a href="https://www.nodejs.org" target="_blank">https://www.nodejs.org</a>.<br /><br />
                    The installation command puts the package in the global NPM cache and creates a link to it in a
                    folder which is in your system PATH. Hence you can directly execute it:</div>

                <pre><code className="language-bash">{helpOutput}</code></pre>

                Now you can start using the tool to generate parsers and lexers for your grammars, for example:

                <pre>
                    <code className="language-bash">antlr-ng -Dlanguage=Java -l -v -o output MyGrammar.g4</code>
                </pre>

                <div>
                    Pretty much the same as with ANTLR4, with only very few differences in the options. For example
                    there are no separate options that disable a feature like <code>-no-visitor</code>. Instead
                    use <code>-v false</code> to disable the listener generation (or just don't specify
                    <code>-v</code> at all).
                </div><br />
                <div className="note">
                    <b>Attention:</b> To avoid confusing optional values and grammar names (arguments) do not specify
                    parameters directly before the grammar names. For example `-l` can optionally take a boolean.
                    Omitting that like in `-l MyGrammar.g4` makes the tool think that `MyGrammar.g4` is the boolean
                    value for the `-l` option. So either sort the parameters in a way that keeps those with a value
                    (like the output path) directly before the grammar file names, or use `--` to separate
                    options and arguemnts.
                </div>

                <div>
                    Another pretty common use case is to generate parsers and lexer as part of a TypeScript project.
                    You can still use the global installation of <span className="antlrng">antlr-ng</span> for that, but
                    you can also install it locally in your project:

                    <pre><code className="language-bash">npm i --save-dev antlr-ng</code></pre>
                </div>

                <h2>Using the Tool Code In Your TypeScript Project</h2>

                <div>
                    This is the other way to use the tool. You can use the parser and lexer generators directly in your
                    TypeScript project. This is especially useful when you want to generate parsers and lexers at
                    runtime (e.g. in a web application).

                    <div className="note">
                        <b>Note:</b> The current version of <span className="antlrng">antlr-ng</span> uses Node.js
                        modules for the loading and writing of files. This is not compatible with a browser
                        environment. A future version will address this issue.
                    </div>

                    Many unit tests in the <span className="antlrng">antlr-ng</span> project use this approach. Below is
                    a code snippet from the <code>TestCodeGeneration.spec.ts</code> file:

                    <pre><code className="language-typescript">{codeGenerationCode}</code></pre>

                    This code snippet shows how to create a Grammar object from a grammar string, process it, and
                    generate a parser template from it. This template could be used to generate the parser code. In
                    this code example, however, an interpreter is used to evaluate the generated code.
                    <br /><br />
                </div>

            </Container>
        );
    }
}
