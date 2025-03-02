/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import type { ComponentChild } from "preact";

import { highlightCodeBlocks } from "../../dom-helpers";
import { ComponentBase, type IComponentProperties } from "../ui/Component/ComponentBase";
import { Container, Orientation } from "../ui/Container/Container";

const snippet1 = "options { name1 = value1; ... nameN = valueN; };";

const snippet2 = `grammar Hi;
a : 'hi' ;

// Run generation: antlr-ng -DsuperClass=XX Hi.g4
// which produces this:
class HiParser extends XX {`;

const snippet4 = `lexer grammar SomeLexer;
ID : [a-z]+;

parser grammar R;
options {tokenVocab = SomeLexer;}
tokens {A, B, C} // normally, these would be token types 1, 2, 3
a : ID ;

// Lexer tokens:
ID=1

// Parser tokens:
A=2
B=3
C=4
ID=1`;

const snippet5 = `grammar T2;
options {TokenLabelType = MyToken;}
a: x=ID ;

// TokenLabelType is used for x in T2Parser.
public MyToken x;`;

const snippet6 = `lexer grammar L;
options {caseInsensitive = true; }
ENGLISH_TOKEN:   [a-z]+;
GERMAN_TOKEN:    [äéöüß]+;
FRENCH_TOKEN:    [àâæ-ëîïôœùûüÿ]+;
CROATIAN_TOKEN:  [ćčđšž]+;
ITALIAN_TOKEN:   [àèéìòù]+;
SPANISH_TOKEN:   [áéíñóúü¡¿]+;
GREEK_TOKEN:     [α-ω]+;
RUSSIAN_TOKEN:   [а-я]+;
WS:              [ ]+ -> skip;`;

const snippet7 = `grammar ExprLR;

expr: expr '^'<assoc=right> expr
    | expr '*' expr // match subexpressions joined with '*' operator
    | expr '+' expr // match subexpressions joined with '+' operator
    | INT // matches simple integer atom
    ;

INT : '0'..'9'+ ;
WS : [ \\n]+ -> skip ;`;

const snippet8 = `ints[int max]
locals [int i = 1]
    : INT ( ',' {$i++;} {$i & lt;=$max}? < fail={"exceeded max " + $max}> INT )*
    ;`;

const snippet9 = `{...}?<fail={doSomethingAndReturnAString()}>`;

const snippet10 = `$ antlr-ng -Dlanguage=C MyGrammar.g4
error(31):  antlr-ng cannot generate C code as of version 1.0`;

export interface IOptionsPageProperties extends IComponentProperties {
    path: string;
}

export class OptionsPage extends ComponentBase<IOptionsPageProperties> {
    public override componentDidMount(): void {
        highlightCodeBlocks();
    }

    public override render(): ComponentChild {
        return (
            <Container
                id="options"
                className="pageContent"
                orientation={Orientation.TopDown}>
                <h1>Options</h1>

                <div>There are a number of options that you can specify at the grammar and rule element level
                    (there are currently no rule options.) These change
                    how <span className="antlrng">antlr-ng</span> generates code from your grammar. The general syntax
                    is:</div>

                <pre><code className="language-antlr">{snippet1}</code></pre>

                <div>
                    where a value can be an identifier, a qualified identifier (for example, a.b.c), a string,
                    and an integer.
                </div>

                <h2 >Grammar Options</h2>

                <div>
                    All grammars can use the following options. In combined grammars, all options except language
                    pertain only to the generated parser. Options may be set either within the grammar file using the
                    options syntax (described above) or when invoking <span className="antlrng">antlr-ng</span> on
                    the command line, using the <code>-D</code> option
                    (see the <a href="/documentation/getting-started">Getting Started Page</a>.) The following
                    examples demonstrate both mechanisms; note that <code>-D</code> overrides options within the
                    grammar.
                </div>

                <h3 ><code>superClass</code></h3>

                <div>Set the superclass of the generated parser or lexer. For combined grammars, it sets the superclass
                    of the parser.</div>

                <div><pre><code className="language-antlr">
                    {snippet2}
                </code></pre></div>

                <h3 ><code>language</code></h3>

                <div>Generate code in the indicated language, if <span className="antlrng">antlr-ng</span> is able
                    to do so. Otherwise, you will see an error message like this:</div>

                <div><pre><code className="language-bash">{snippet10}</code></pre></div>

                <h3 ><code>tokenVocab</code></h3>

                <div>ANTLR assigns token type numbers to the tokens as it encounters them in a file. To use different
                    token type values, such as with a separate lexer, use this option to
                    have <span className="antlrng">antlr-ng</span> pull in
                    the <code>tokens</code> file. <span className="antlrng">antlr-ng</span> generates
                    a <code>tokens</code> file from each grammar.</div>

                <div><pre><code className="language-antlr">{snippet4}</code></pre></div>

                <h3 ><code>TokenLabelType</code></h3>

                <div>ANTLR normally uses type <code>Token</code> when it generates variables referencing tokens. If you
                    have passed a <code>TokenFactory</code> to your parser and lexer so that they create custom tokens,
                    you should set this option to your specific type. This ensures that the context objects know your
                    type for fields and method return values.</div>

                <div><pre><code className="language-antlr">{snippet5}</code></pre></div>

                <h3 ><code>contextSuperClass</code></h3>

                <div>Specify the super class of parse tree internal nodes. Default is <code>ParserRuleContext</code>.
                    Should derive from ultimately <code>ParserRuleContext</code> at minimum.
                    You can use <code>contextSuperClass=RuleContextWithAltNum</code> for convenience. It adds a
                    backing field for <code>altNumber</code>, the alt matched for the
                    associated rule node.</div>

                <h3 ><code>caseInsensitive</code></h3>

                <div><span className="antlrng">antlr-ng</span> supports case-insensitive lexers using a
                    grammar option. For example, the parser from the following grammar:</div>

                <div><pre><code className="language-antlr">{snippet6}</code></pre></div>

                <div>matches words such as the following:</div>

                <div><pre><code className="plaintext">abcXYZ äéöüßÄÉÖÜß àâæçÙÛÜŸ ćčđĐŠŽ
                    àèéÌÒÙ áéÚÜ¡¿ αβγΧΨΩ абвЭЮЯ</code></pre></div>

                <div>ANTLR considers only one-length chars in all cases. For instance, german lower <code>ß</code> is
                    not treated as upper <code>ss</code> and vice versa.</div>

                <div>The mechanism works by automatically transforming grammar references to characters to there
                    upper/lower case equivalent; e.g., <code>a</code> to <code>[aA]</code>. This means that you do not
                    need to convert your input characters to uppercase&ndash;token text will be as it appears in the
                    input stream.</div>

                <h2 >Rule Options</h2>

                <h3 >caseInsensitive</h3>

                <div>
                    The tool support <code>caseInsensitive</code> lexer rule option that is described in <a
                        href="/documentation/grammars/lexer-rules">Lexer Rules Page</a>.</div>

                <h2>Rule Element Options</h2>

                <div>Token options have the form <code>T&lt;name=value&gt;</code>. The only token option
                    is <code>assoc</code>, and it accepts values <code>left</code> and <code>right</code>. Here’s
                    a sample grammar with a left-recursive expression rule that specifies a token option on
                    the <code>^</code> exponent operator token:</div>

                <div><pre><code className="language-antlr">{snippet7}</code></pre></div>

                <div>Semantic predicates also accept an option. The only valid option is the <code>fail</code> option,
                    which takes either a string literal in double-quotes or an action that evaluates to a string. The
                    string literal or string result from the action should be the message to emit upon predicate
                    failure.</div>

                <div><pre><code className="language-antlr">{snippet8}</code></pre></div>

                <div>The action can execute a function as well as compute a string when a predicate fails:
                    <code>{snippet9}</code></div>

                <br />
                <br />
            </Container >
        );
    }
}
