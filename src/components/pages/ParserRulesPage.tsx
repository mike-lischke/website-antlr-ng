/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import xyz from "../../assets/images/xyz.png";
import xyzOpt from "../../assets/images/xyz-opt.png";
import xyzPlus from "../../assets/images/xyz-plus.png";
import xyzStar from "../../assets/images/xyz-star.png";

import { type ComponentChild } from "preact";

import { Container, Orientation } from "../ui/Container/Container";
import { PageBase } from "./PageBase";

const snippet1 = `/** Javadoc comment can precede rule */
retstat : 'return' expr ';' ;`
    ;

const snippet2 = `operator:
    stat: retstat
    | 'break' ';'
    | 'continue' ';'
;`;

const snippet3 = `superClass
    : 'extends' ID
    | // empty means other alternative(s) are optional
;`;

const snippet4 = `grammar T;
stat: 'return' e ';' # Return
    | 'break' ';' # Break
    ;

e   : e '*' e # Mult
    | e '+' e # Add
    | INT # Int
;`;

const snippet5 = `export interface AListener extends ParseTreeListener {
    void enterReturn(ctx: AParser.ReturnContext);
    void exitReturn(ctx: AParser.ReturnContext);
    void enterBreak(ctx: AParser.BreakContext);
    void exitBreak(ctx: AParser.BreakContext);
    void enterMult(ctx: AParser.MultContext);
    void exitMult(ctx: AParser.MultContext);
    void enterAdd(ctx: AParser.AddContext);
    void exitAdd(ctx: AParser.AddContext);
    void enterInt(ctx: AParser.IntContext);
    void exitInt(ctx: AParser.IntContext);
}`;

const snippet6 = `e: e '*' e # BinaryOp
    | e '+' e # BinaryOp
    | INT # Int
;`;

const snippet7 = `void enterBinaryOp(ctx: AParser.BinaryOpContext);
    void exitBinaryOp(ctx: AParser.BinaryOpContext);
    void enterInt(ctx: AParser.IntContext);
    void exitInt(ctx: AParser.IntContext);
    ...`;

const snippet8 = `e : e '*' e # e
    | e '+' e # Stat
    | INT # Int
    ;`;

const snippet9 = `$ antlr-ng A.g4
error(124): A.g4:5:23: rule alt label e conflicts with rule e
error(124): A.g4:6:23: rule alt label Stat conflicts with rule stat
warning(125): A.g4:2:13: implicit definition of token INT in parser`;

const snippet10 = `inc : e '++' ;`;

const snippet11 = `export static class IncContext extends ParserRuleContext {
    public e(): EContext {... } // return context object associated with e
    ...
}`;

const snippet12 = `field : e '.' e ;`;

const snippet13 = `export static class FieldContext extends ParserRuleContext {
    public e(int i): EContext {... } // get ith e context
    public e(): EContext[] {... } // return ALL e contexts
    ...
}`;

const snippet14 = `s : field
{
    const x: EContext[] = $field.ctx.e();
    ...
}
;`;

const snippet15 = `stat: 'return' value=e ';' # Return
    | 'break' ';' # Break
    ;`;

const snippet16 = `export static class ReturnContext extends StatContext {
    public value: EContext;
    ...
}`;

const snippet17 = `array : '{' el+=INT (', ' el+=INT)* '}' ;`;

const snippet18 = `export static class ArrayContext extends ParserRuleContext {
    public el: Token[] = new Array<Token>();
    ...
}`;

const snippet19 = `elist : exprs+=e (',' exprs+=e)* ;`;

const snippet20 = `export static class ElistContext extends ParserRuleContext {
    public exprs: EContext[] = new Array<EContext>();
    ...
}`;

const snippet21 = `void r() {
    try {
        rule-body
    }
    catch (re) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
    }
    finally {
        exitRule();
    }
}`;

const snippet22 = `r: ...
    ;
    catch[e: RecognitionException] { throw e; }`;

const snippet23 = `r: ...
    ;
    catch[fpe: FailedPredicateException] {... }
    catch[e: RecognitionException] {... }`;

const snippet24 = `r: ...
    ;
    // catch blocks go first
    finally { console.log("exit rule r"); }`;

const snippet25 = `rulename[args] returns [retvals] locals [localvars] : ... ;`;

const snippet26 = `// Return the argument plus the integer value of the INT token
    add[x: number] returns [int result] : '+=' INT {$result = $x + $INT.int;} ;`;

const snippet27 = `/** Derived from rule "row : field (',' field)* '\r'? '\n' ;" */
    row[columns: string[]]
    returns [values: Map<string, string>]
    locals [const col=0]
    @init {
        $values = new Map<string,string>();
    }
    @after {
        if ($values !== undefined && $values.size > 0) {
            console.log("values = "+$values);
        }
    }
    : ...
    ;`;

const snippet28 = `export class CSVParser extends Parser {
    ...
    export static class RowContext extends ParserRuleContext {
        public columns: string[];
        public values: Map<string, string>;
        public col = 0;
        ...
    }
    ...
}`;

const snippet29 = `export class CSVParser extends Parser {
    ...
    public final RowContext row(columns: string[]) {
        const _localctx = new RowContext(_ctx, 4, columns);
        this.enterRule(_localctx, RULE_row);
        ...
    }
    ...
}`;

const snippet30 = `public final AContext a(x: Map<string, string>, y: number) {
    const _localctx = new AContext(_ctx, 0, x, y);
    this.enterRule(_localctx, RULE_a);
    ...
}`;

const snippet31 = `config : element*; // can "match" even with invalid input.`;

const snippet32 = `file : element* EOF; // don't stop early. must match all input`;

const snippet33 = `s : ID
    | ID '+'
    | ID '+' INT
    ;`;

const snippet34 = `[«action»]`;

const snippet35 = `{«action»}?`;

export class ParserRulesPage extends PageBase {
    public override componentDidMount(): void {
        this.highlightCodeBlocks();
    }

    public override render(): ComponentChild {
        return (
            <Container orientation={Orientation.TopDown} className="pageContent">
                <h1>Parser Rules</h1>
                <div>
                    Parsers consist of a set of parser rules either in a parser or a combined grammar. An
                    application launches a parser by invoking the rule function, generated
                    by <span className="antlrng">antlr-ng</span>, associated with the desired start rule. The most
                    basic rule is just a rule name followed by a single alternative terminated with a semicolon:
                </div>

                <pre><code class="language-typescript">{snippet1}</code></pre>

                <div>Rules can also have alternatives separated by the | </div>

                <pre><code class="language-typescript">{snippet2}</code></pre>

                <div>
                    Alternatives are either a list of rule elements or empty. For example, here’s a rule with an
                    empty alternative that makes the entire rule optional:
                </div>

                <pre><code class="language-typescript">{snippet3}</code></pre>

                <h2>Alternative Labels</h2>

                <div>
                    We can get more precise parse-tree listener events by labeling the outermost alternatives
                    of a rule using the # operator. All alternatives within a rule must be labeled, or none of them.
                    Here are two rules with labeled alternatives.
                </div>

                <pre><code class="language-typescript">{snippet4}</code></pre>

                <div>
                    Alternative labels do not have to be at the end of the line and there does not have to be a space
                    after the # symbol. <span className="antlrng">antlr-ng</span> generates a rule context class
                    definition for each label.
                    For example, here is the listener that <span className="antlrng">antlr-ng</span> generates:
                </div>

                <pre><code class="language-typescript">{snippet5}</code></pre>

                <div>
                    There are enter and exit methods associated with each labeled alternative. The parameters to
                    those methods are specific to alternatives.
                </div>

                <div>
                    You can reuse the same label on multiple alternatives to indicate that the parse tree walker
                    should trigger the same event for those alternatives. For example, here’s a variation on rule e
                    from grammar A above:
                </div>
                <pre><code class="language-typescript">{snippet6}</code></pre>

                <div>
                    <span className="antlrng">antlr-ng</span> would generate the following listener methods for e:
                </div>
                <pre><code class="language-typescript">{snippet7}</code></pre>

                <span className="antlrng">antlr-ng</span> gives errors if an alternative name conflicts with a rule
                name. Here’s another rewrite of rule e where two alternative labels conflict with rule names:
                <pre><code class="language-typescript">{snippet8}</code></pre>

                <div>
                    The context objects generated from rule names and labels get capitalized and so label Stat
                    conflicts with rule stat:
                </div>
                <pre><code class="language-bash">{snippet9}</code></pre>

                <h2>Rule Context Objects</h2>
                <div>
                    <span className="antlrng">antlr-ng</span> generates methods to access the rule context objects
                    (parse tree nodes) associated with each rule reference. For rules with a single rule
                    reference, <span className="antlrng">antlr-ng</span> generates a method with no arguments.
                    Consider the following rule.
                </div>
                <pre><code class="language-typescript">{snippet10}</code></pre>

                <div><span className="antlrng">antlr-ng</span> generates this context class:</div>
                <pre><code class="language-typescript">{snippet11}</code></pre>

                <div>
                    <span className="antlrng">antlr-ng</span> also provide support to access context objects when
                    there is more than a single reference to a rule:
                </div>
                <pre><code class="language-typescript">{snippet12}</code></pre>

                <div>
                    <span className="antlrng">antlr-ng</span> generates a method with an index to access the ith
                    element as well as a method to get context for all references to that rule:
                </div>
                <pre><code class="language-typescript">{snippet13}</code></pre>

                <div>
                    If we had another rule, s, that references field, an embedded action could access the
                    list of e rule matches performed by field:
                </div>
                <pre><code class="language-typescript">{snippet14}</code></pre>

                <div>
                    A listener or visitor could do the same thing. Given a pointer to a FieldContext object, f,
                    f.e() would return List&lt;EContext&gt;.
                </div>

                <h2>Rule Element Labels</h2>

                <div>You can label rule elements using the = operator to add fields to the rule context objects:</div>
                <pre><code class="language-typescript">{snippet15}</code></pre>

                <div>
                    Here "value" is the label for the return value of rule e, which is defined elsewhere.
                    Labels become fields in the appropriate parse tree node class. In this case, label value
                    becomes a field in ReturnContext because of the Return alternative label:
                </div>
                <pre><code class="language-typescript">{snippet16}</code></pre>

                <div>
                    It’s often handy to track a number of tokens, which you can do with the += “list label”
                    operator. For example, the following rule creates a list of the Token objects matched for a
                    simple array construct:
                </div>
                <pre><code class="language-typescript">{snippet17}</code></pre>

                <div>
                    <span className="antlrng">antlr-ng</span> generates a List field in the appropriate rule
                    context class:
                </div>
                <pre><code class="language-typescript">{snippet18}</code></pre>

                <div>These list labels also work for rule references:</div>
                <pre><code class="language-typescript">{snippet19}</code></pre>

                <div>
                    <span className="antlrng">antlr-ng</span> generates a field holding the list of context objects:
                </div>
                <pre><code class="language-typescript">{snippet20}</code></pre>

                <h2>Rule Elements</h2>

                <div>
                    Rule elements specify what the parser should do at a given moment just like statements
                    in a programming language. The elements can be rule, token, string literal like expression,
                    ID, and &lsquo;return&rsquo;. Here’s a complete list of the rule elements (we’ll look at actions
                    and predicates in more detail later):
                </div>

                <table className="docTable">
                    <thead>
                        <tr>
                            <th>Syntax</th><th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>T</td>
                            <td>
                                Match token T at the current input position. Tokens always begin with a capital letter.
                            </td>
                        </tr>
                        <tr>
                            <td>&lsquo;literal&rsquo;</td>
                            <td>
                                Match the string literal at the current input position. A string literal is simply a
                                token with a fixed string.
                            </td>
                        </tr>
                        <tr>
                            <td>r</td>
                            <td>
                                Match rule r at current input position, which amounts to invoking the rule just
                                like a function call. Parser rule names always begin with a lowercase letter.
                            </td>
                        </tr>
                        <tr>
                            <td>r [«args»]</td>
                            <td>
                                Match rule r at current input position, passing in a list of arguments just like a
                                function call. The arguments inside the square brackets are in the syntax of the
                                target language and are usually a comma-separated list of expressions.
                            </td>
                        </tr>
                        <tr>
                            <td>{snippet34}</td>
                            <td>
                                Execute an action immediately after the preceding alternative element and immediately
                                before the following alternative element. The action conforms to the syntax of the
                                target language. <span className="antlrng">antlr-ng</span> copies the action code to the
                                generated class verbatim, except for substituting attribute and token references such
                                as $x and $x.y.
                            </td>
                        </tr>
                        <tr>
                            <td>{snippet35}</td>
                            <td>
                                Evaluate semantic predicate «p». Do not continue parsing past a predicate if «p»
                                evaluates to false at runtime. Predicates encountered during prediction,
                                when <span className="antlrng">antlr-ng</span> distinguishes between alternatives,
                                enable or disable the alternative(s) surrounding the predicate(s).
                            </td>
                        </tr>
                        <tr>
                            <td>.</td>
                            <td>
                                Match any single token except for the end of file token. The “dot” operator is called
                                the wildcard.
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div>When you want to match everything but a particular token or set of tokens, use
                    the <code>~</code> “not” operator. This operator is rarely used in the parser but is
                    available. <code>~INT</code> matches any token except the <code>INT</code> token
                    . <code>~','</code> matches any token except the comma. <code>~(INT|ID)</code> matches
                    any token except an INT or an ID.</div>

                <div>
                    Token, string literal, and semantic predicate rule elements can take options. See Rule Element
                    Options.
                </div>

                <h2>Subrules</h2>

                <div>
                    A rule can contain alternative blocks called subrules (as allowed in Extended BNF Notation:
                    EBNF). A subrule is like a rule that lacks a name and is enclosed in parentheses. Subrules can
                    have one or more alternatives inside the parentheses. Subrules cannot define attributes with
                    locals and returns like rules can. There are four kinds of subrules (x, y, and z represent
                    grammar fragments):
                </div>

                <table className="docTable">
                    <thead>
                        <tr>
                            <th>Syntax</th><th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src={xyz} /></td>
                            <td>(x|y|z). Match any alternative within the subrule exactly once. Example:
                                <br />
                                <code>
                                    returnType : (type | &lsquo;void&rsquo;) ;
                                </code>
                            </td>
                        </tr>
                        <tr>
                            <td><img src={xyzOpt} /></td>
                            <td>(x|y|z)? Match nothing or any alternative within subrule. Example:
                                <br />
                                <code>
                                    classDeclaration
                                    : &lsquo;class&rsquo; ID (typeParameters)? (&lsquo;extends&rsquo; type)?
                                    (&lsquo;implements&rsquo; typeList)?
                                    classBody
                                    ;
                                </code>
                            </td>
                        </tr>
                        <tr>
                            <td><img src={xyzStar} /></td>
                            <td>(x|y|z)* Match an alternative within subrule zero or more times. Example:
                                <br />
                                <code>
                                    annotationName : ID (&lsquo;.&rsquo; ID)* ;
                                </code>
                            </td>
                        </tr>
                        <tr>
                            <td><img src={xyzPlus} /></td>
                            <td>(x|y|z)+ Match an alternative within subrule one or more times. Example:
                                <br />
                                <code>
                                    annotations : (annotation)+ ;
                                </code>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    You can suffix the <code>?</code>, <code>*</code>, and <code>+</code> subrule operators with
                    the nongreedy operator, which is also a question mark: <code>??</code>, <code>*?</code>,
                    and <code>+?</code>. See Section 15.6, Wildcard Operator and Nongreedy Subrules.
                </div>

                <div>
                    As a shorthand, you can omit the parentheses for subrules composed of a single alternative
                    with a single rule element reference. For example, <code>annotation+</code> is the same
                    as <code>(annotation)+</code> and <code>ID+</code> is the same as <code>(ID)+</code>.
                    Labels also work with the shorthand. <code>ids+=INT+</code> make a list of <code>INT</code> token
                    objects.
                </div>

                <h2>Catching Exceptions</h2>

                <div>
                    When a syntax error occurs within a rule, <span className="antlrng">antlr-ng</span> catches the
                    exception, reports the error, attempts to recover (possibly by consuming more tokens), and then
                    returns from the rule. Every rule is wrapped in a <code>try/catch/finally</code> statement:
                </div>
                <pre><code class="language-typescript">{snippet21}</code></pre>

                <div>
                    In Section 9.5, Altering ANTLR’s Error Handling Strategy,  we saw how to use a strategy object
                    to alter <span className="antlrng">antlr-ng</span>’s error handling. Replacing the strategy
                    changes the strategy for all rules, however.
                    To alter the exception handling for a single rule, specify an exception after the rule definition:
                </div>
                <pre><code class="language-typescript">{snippet22}</code></pre>

                <div>
                    That example shows how to avoid default error reporting and recovery. r rethrows the exception,
                    which is useful when it makes more sense for a higher-level rule to report the error. Specifying
                    any exception clause, prevents <span className="antlrng">antlr-ng</span> from generating a clause to
                    handle <code>RecognitionException</code>.
                </div>

                <div>You can specify other exceptions as well:</div>
                <pre><code class="language-typescript">{snippet23}</code></pre>

                <div>
                    The code snippets inside curly braces and the exception “argument” actions must be written in
                    the target language; Java, in this case. When you need to execute an action even if an exception
                    occurs, put it into the <code>finally</code> clause:
                </div>
                <pre><code class="language-typescript">{snippet24}</code></pre>

                <div>
                    The finally clause executes right before the rule triggers <code>exitRule</code> before returning.
                    If you want to execute an action after the rule finishes matching the alternatives but before it
                    does its cleanup work, use an <code>after</code> action.
                </div>

                <div>Here’s a complete list of exceptions:</div>

                <table className="docTable">
                    <thead>
                        <tr>
                            <th>Exception name</th><th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>RecognitionException</td>
                            <td>
                                The superclass of all exceptions thrown by an <span className="antlrng">antlr-ng</span>-
                                generated recognizer. It’s a subclass of RuntimeException to avoid the hassles of
                                checked exceptions. This exception records where the recognizer (lexer or parser)
                                was in the input, where it was in the ATN (internal graph data structure representing
                                the grammar), the rule invocation stack, and what kind of problem occurred.
                            </td>
                        </tr>
                        <tr>
                            <td>NoViableAltException</td>
                            <td>
                                Indicates that the parser could not decide which of two or more paths to take by looking
                                at the remaining input. This exception tracks the starting token of the offending input
                                and also knows where the parser was in the various paths when the error occurred.
                            </td>
                        </tr>
                        <tr>
                            <td>LexerNoViableAltException</td>
                            <td>
                                The equivalent of NoViableAltException but for lexers only.
                            </td>
                        </tr>
                        <tr>
                            <td>InputMismatchException</td>
                            <td>
                                The current input Token does not match what the parser expected.
                            </td>
                        </tr>
                        <tr>
                            <td>FailedPredicateException</td>
                            <td>
                                A semantic predicate that evaluates to false during prediction renders the surrounding
                                alternative nonviable. Prediction occurs when a rule is predicting which alternative
                                to take. If all viable paths disappear, parser will throw NoViableAltException. This
                                predicate gets thrown by the parser when a semantic predicate evaluates to false outside
                                of prediction, during the normal parsing process of matching tokens and calling rules.
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h2>Rule Attribute Definitions</h2>

                <div>There are a number of action-related syntax elements associated with rules to be aware of. Rules
                    can have arguments, return values, and local variables just like functions in a programming
                    language. (Rules can have actions embedded among the rule elements, as we’ll see in Section 15.4,
                    Actions and Attributes.) <span className="antlrng">antlr-ng</span> collects all of the variables
                    you define and stores them in the rule context object. These variables are usually called
                    attributes. Here’s the general syntax showing all possible attribute definition locations:
                </div>
                <pre><code class="language-typescript">{snippet25}</code></pre>

                <div>
                    The attributes defined within those [&hellip;] can be used like any other variable. Here is a
                    sample rule that copies parameters to return values:
                </div>
                <pre><code class="language-typescript">{snippet26}</code></pre>

                <div>
                    The args, locals, and return <code>[...]</code> are generally in the target language but with
                    some constraints. The <code>[...]</code> string is a comma-separated list of declarations either
                    with prefix or postfix type notation or no-type notation. The elements can have initializer such
                    as <code>[int x = 32, float y]</code> but don&rsquo;t go too crazy as we are parsing this generic
                    text manually
                    in <a
                        href="https://github.com/antlr/antlr4/blob/master/tool/src/org/antlr/v4/parse/ScopeParser.java">
                        ScopeParser
                    </a>.
                </div>

                <ul>
                    <li>
                        Java, CSharp, C++ use <code>int x</code> notation but C++ must use a slightly altered notation
                        for array references, <code>int[] x</code>, to fit in the <em>type</em> <em>id</em> syntax
                        .</li>
                    <li>
                        Go and Swift give the type after the variable name, but Swift requires a <code>:</code> in
                        between. Go <code>i int</code>, Swift <code>i:int</code>.  For Go target, you must either
                        use <code>int i</code> or <code>i:int</code>
                        .</li>
                    <li>
                        Python and JavaScript don&rsquo;t specify static types so actions are just identifier lists
                        such as <code>[i,j]</code>.
                    </li>
                </ul>

                <div>
                    Technically any target could use either notation. For examples,
                    see <a
                        // eslint-disable-next-line max-len
                        href="https://github.com/antlr/antlr4/blob/master/tool-testsuite/test/org/antlr/v4/test/tool/TestScopeParsing.java">
                        TestScopeParsing
                    </a>.
                </div>

                <div>
                    As with the grammar level, you can specify rule-level named actions. For rules, the valid
                    names are <code>init</code> and <code>after</code>. As the names imply, parsers execute init
                    actions immediately before trying to match the associated rule and execute after actions
                    immediately after matching the rule. <span className="antlrng">antlr-ng</span> after actions
                    do not execute as part of the finally code block of the generated rule function. Use
                    the <span className="antlrng">antlr-ng</span> finally action to place code in the
                    generated rule function finally code block.
                </div>

                <div>
                    The actions come after any argument, return value, or local attribute definition actions.
                    The <code>row</code> rule preamble from Section 10.2, Accessing Token and Rule Attributes
                    illustrates the syntax nicely:
                    actions/CSV.g4
                </div>
                <pre><code class="language-antlr">{snippet27}</code></pre>

                <div>
                    Rule row takes argument columns, returns values, and defines local variable col. The “actions”
                    in square brackets are copied directly into the generated code:
                </div>
                <pre><code class="language-typescript">{snippet28}</code></pre>

                <div>
                    The generated rule functions also specify the rule arguments as function arguments, but they are
                    quickly copied into the local RowContext object:
                </div>
                <pre><code class="language-typescript">{snippet29}</code></pre>

                <div>
                    <span className="antlrng">antlr-ng</span> tracks nested <code>[...]</code> within the action
                    so that <code>String[]</code> columns is parsed properly. It also tracks angle brackets so
                    that commas within generic type parameters do not signify the start of another
                    attribute. <code>Map&lt;String,String&gt;</code> values is one attribute definition.
                </div>

                <div>
                    There can be multiple attributes in each action, even for return values. Use a comma to separate
                    attributes within the same action:
                </div>
                <pre><code class="language-typescript">a[Map&lt;String,String&gt; x, int y] : ... ;</code></pre>

                <div>ANTLR interprets that action to define two arguments, x and y:</div>
                <pre><code class="language-typescript">{snippet30}</code></pre>

                <h2>Start Rules and EOF</h2>

                <div>
                    A start rule is the rule engaged first by the parser; it’s the rule function called by the
                    language application. For example, a language application that parsed to Java code might
                    call <code>parser.compilationUnit()</code> for a <code>JavaParser</code> object
                    called <code>parser</code>. Any rule in the grammar can act as a start rule.
                </div>

                <div>Start rules don’t necessarily consume all of the input. They consume only as much input as
                    needed to match an alternative of the rule. For example, consider the following rule that
                    matches one, two, or three tokens, depending on the input.
                </div>

                <pre><code class="language-typescript">{snippet33}</code></pre>

                <div>
                    Upon <code>a+3</code>, rule <code>s</code> matches the third alternative. Upon <code>a+b</code>,
                    it matches the second alternative and ignores the final <code>b</code> token. Upon <code>a b</code>,
                    it matches the first alternative, ignoring the <code>b</code> token. The parser does not consume
                    the complete input in the latter two cases because rule <code>s</code> doesn’t explicitly say that
                    end of file must occur after matching an alternative of the rule.
                </div>

                <div>
                    This default functionality is very useful for building things like IDEs. Imagine the IDE wanting
                    to parse a method somewhere in the middle of a big Java file. Calling
                    rule <code>methodDeclaration</code> should try to match just a method and ignore whatever comes
                    next.
                </div>

                <div>
                    On the other hand, rules that describe entire input files should reference special
                    predefined-token <code>EOF</code>. If they don’t, you might scratch your head for a while
                    wondering why the start rule doesn’t report errors for any input no matter what you give it.
                    Here’s a rule that’s part of a grammar for reading configuration files:
                </div>
                <pre><code class="language-typescript">{snippet31}</code></pre>

                <div>
                    Invalid input would cause <code>config</code> to return immediately without matching any input
                    and without reporting an error. Here’s the proper specification:
                </div>
                <pre><code class="language-typescript">{snippet32}</code></pre>

            </Container >
        );
    }
}
