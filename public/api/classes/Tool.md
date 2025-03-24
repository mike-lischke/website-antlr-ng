[**<span class='antlrng'>antlr-ng</span> Tool Class Hierarchy**](../README.md)

***

[<span class='antlrng'>antlr-ng</span> Tool Class Hierarchy](../README.md) / Tool

Defined in: [../src/Tool.ts:44](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/Tool.ts#L44)

The main class in antlr-ng, which is used to do full grammar processing and output generation.

## Implements

- `ITool`

## Methods

### checkForRuleIssues()

> **checkForRuleIssues**(`g`): `boolean`

Defined in: [../src/Tool.ts:254](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/Tool.ts#L254)

Important enough to avoid multiple definitions that we do very early, right after AST construction. Also check
for undefined rules in parser/lexer to avoid exceptions later. Return true if we find multiple definitions of
the same rule or a reference to an undefined rule or parser rule ref in lexer rule.

#### Parameters

##### g

`Grammar`

The grammar to check.

#### Returns

`boolean`

true if there are issues with the rules.

#### Implementation of

`ITool.checkForRuleIssues`

***

### createGrammar()

> **createGrammar**(`grammarAST`): `IGrammar`

Defined in: [../src/Tool.ts:349](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/Tool.ts#L349)

Given the raw AST of a grammar, create a grammar object associated with the AST. Once we have the grammar object,
ensure that all nodes in tree referred to this grammar. Later, we will use it for error handling and generally
knowing from where a rule comes from.

#### Parameters

##### grammarAST

[`GrammarRootAST`](GrammarRootAST.md)

The raw AST of the grammar.

#### Returns

`IGrammar`

The grammar object.

#### Implementation of

`ITool.createGrammar`

***

### generate()

> **generate**(`parameters`): `boolean`

Defined in: [../src/Tool.ts:119](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/Tool.ts#L119)

Initiates a full generation process with the given parameters.

#### Parameters

##### parameters

`IToolParameters`

Details about the generation process (source + target files, options, etc.).

#### Returns

`boolean`

true if the run was successful, false otherwise.

#### Implementation of

`ITool.generate`

***

### getOutputDirectory()

> **getOutputDirectory**(`fileNameWithPath`): `string`

Defined in: [../src/Tool.ts:539](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/Tool.ts#L539)

#### Parameters

##### fileNameWithPath

`string`

path to input source.

#### Returns

`string`

the location where ANTLR will generate output files for a given file. This is a base directory and
output files will be relative to here in some cases such as when -o option is used and input files are
given relative to the input directory.

#### Implementation of

`ITool.getOutputDirectory`

***

### getOutputFile()

> **getOutputFile**(`g`, `fileName`): `string`

Defined in: [../src/Tool.ts:497](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/Tool.ts#L497)

This method is used by all code generators to create new output files. If the outputDir set by -o is not present
it will be created. The final filename is sensitive to the output directory and the directory where the grammar
file was found. If -o is /tmp and the original grammar file was foo/t.g4 then output files go in /tmp/foo.

The output dir -o spec takes precedence if it's absolute. E.g., if the grammar file dir is absolute the output
dir is given precedence. "-o /tmp /usr/lib/t.g4" results in "/tmp/T.java" as output (assuming t.g4 holds T.java).

If no -o is specified, then just write to the directory where the grammar file was found.

#### Parameters

##### g

`Grammar`

The grammar for which we are generating a file.

##### fileName

`string`

The name of the file to generate.

#### Returns

`string`

The full path to the output file.

#### Implementation of

`ITool.getOutputFile`

***

### loadGrammar()

> **loadGrammar**(`fileName`): `Grammar`

Defined in: [../src/Tool.ts:388](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/Tool.ts#L388)

Convenience method to load and process an ANTLR grammar. Useful when creating interpreters. If you need to
access to the lexer grammar created while processing a combined grammar, use getImplicitLexer() on returned
grammar.

#### Parameters

##### fileName

`string`

The name of the grammar file to load.

#### Returns

`Grammar`

The grammar object.

#### Implementation of

`ITool.loadGrammar`

***

### loadImportedGrammar()

> **loadImportedGrammar**(`g`, `nameNode`): `null` \| `Grammar`

Defined in: [../src/Tool.ts:404](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/Tool.ts#L404)

Try current dir then dir of g then lib dir.

#### Parameters

##### g

`Grammar`

The grammar to import.

##### nameNode

`GrammarAST`

The node associated with the imported grammar name.

#### Returns

`null` \| `Grammar`

The imported grammar or null if not found.

#### Implementation of

`ITool.loadImportedGrammar`

***

### process()

> **process**(`g`, `parameters`, `genCode`): `void`

Defined in: [../src/Tool.ts:158](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/Tool.ts#L158)

To process a grammar, we load all of its imported grammars into subordinate grammar objects. Then we merge the
imported rules into the root grammar. If a root grammar is a combined grammar, we have to extract the implicit
lexer. Once all this is done, we process the lexer first, if present, and then the parser grammar

#### Parameters

##### g

`Grammar`

The grammar to process.

##### parameters

`IToolParameters`

Details about the generation process (source + target files, options, etc.).

##### genCode

`boolean`

Whether to generate code or not.

#### Returns

`void`

#### Implementation of

`ITool.process`
