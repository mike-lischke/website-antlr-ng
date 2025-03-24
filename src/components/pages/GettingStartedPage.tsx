/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/* eslint-disable max-len */

import { type ComponentChild } from "preact";

import { highlightCodeBlocks } from "../../dom-helpers";
import { ComponentBase, type IComponentProperties } from "../ui/Component/ComponentBase";
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

const codeGenerationCode = `import * as nodeFs from "fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

import { memfs } from "memfs";
import { useFileSystem, Tool } from "antlr-ng";

// Prepare a fresh virtual file system.
const { fs } = memfs();

// Tell the tool to use this file system.
useFileSystem(fs);

// Provide the templates in the virtual file system.
fs.mkdirSync("/templates", { recursive: true });
... read the files and store them in the virtual fs ...

// A helper function to exectute the paser interpreter using grammar objects.
const testInterp = (lg: LexerGrammar, g: Grammar, startRule: string, input: string,
    expectedParseTree: string): ParseTree => {
    const lexEngine = lg.createLexerInterpreter(CharStream.fromString(input));
    const tokens = new CommonTokenStream(lexEngine);
    const parser = g.createParserInterpreter(tokens);
    const t = parser.parse(g.rules.get(startRule)!.index);

    expect(t.toStringTree(parser), expectedParseTree);

    return t;
};

const lg = new LexerGrammar(
    "lexer grammar L;\\n" +
    "A : 'a' ;\\n");
lg.tool.process(lg, {} as IToolParameters, false);

const g = new Grammar(
    "parser grammar T;\\n" +
    "s :  ;",
    lg);
g.tool.process(g, {} as IToolParameters, false);

testInterp(lg, g, "s", "", "s");
testInterp(lg, g, "s", "a", "s");
`;

export interface IGettingStartedPageProperties extends IComponentProperties {
    path: string;
}

export class GettingStartedPage extends ComponentBase<IGettingStartedPageProperties> {
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
                    If you don't have NPM installed, you can download Node.js
                    from <a href="https://www.nodejs.org" target="_blank">https://www.nodejs.org</a> which includes
                    NPM. This is all you need to run the tool.<br /><br />
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
                    <b>Attention:</b> To avoid problems, don't specify options with optional boolean values
                    directly before the grammar names. For example `-l` can optionally take a boolean.
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

                <h2>Using the Tool Code in Your TypeScript Project</h2>

                <div>
                    For specialized handling it is useful to run the tool directly. You can load a grammar and process
                    it, to get its ATN or just do a syntax check. Other options are running unit tests or generate files
                    in memory. The tool pipeline is running on a virtual filesystem (memfs) which allows to work
                    independent of Node.js. This fs must be setup to contain all files needed for processing and will
                    receive generated files. This allows to run <span className="antlrng">antlr-ng</span> in a browser
                    environment as well. This is the setup used for the <span className="antlrng">antlr-ng</span>
                    playground on this website.<br /><br />

                    A typcial approach looks like shown below. We setup a new virtual filesystem. A grammar object
                    is created from a grammar string and processed.

                    <pre><code className="language-typescript">{codeGenerationCode}</code></pre>

                    This example (apart from the memfs setup) is taken from
                    the <a href="https://github.com/mike-lischke/antlr-ng/blob/main/tests/TestParserInterpreter.spec.ts#L27" target="_blank">TestParserInterpreter.spec.ts</a> file
                    which is part of the unit test suite.<br /><br />
                </div>

            </Container>
        );
    }
}
