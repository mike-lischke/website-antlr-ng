[**<span class='antlrng'>antlr-ng</span> Tool Class Hierarchy**](../README.md)

***

[<span class='antlrng'>antlr-ng</span> Tool Class Hierarchy](../README.md) / GrammarRootAST

Defined in: [../src/tool/ast/GrammarRootAST.ts:16](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tool/ast/GrammarRootAST.ts#L16)

This is the root node for a grammar (for the top level grammarSpec rule).

## Extends

- `GrammarASTWithOptions`

## Implements

- `IGrammarRootAST`

## Properties

### astType

> `readonly` **astType**: `string` = `"GrammarASTWithOptions"`

Defined in: [../src/tool/ast/GrammarASTWithOptions.ts:14](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tool/ast/GrammarASTWithOptions.ts#L14)

A discriminator to distinguish between different grammar AST types without creating a circular dependency.

#### Implementation of

`IGrammarRootAST.astType`

#### Inherited from

`GrammarASTWithOptions.astType`

***

### atnState?

> `optional` **atnState**: `ATNState`

Defined in: [../src/tool/ast/GrammarAST.ts:27](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tool/ast/GrammarAST.ts#L27)

If we build an ATN, we make AST node point at left edge of ATN construct

#### Implementation of

`IGrammarRootAST.atnState`

#### Inherited from

`GrammarASTWithOptions.atnState`

***

### childIndex

> **childIndex**: `number` = `-1`

Defined in: [../src/tree/CommonTree.ts:23](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L23)

What index is this node in the child list? Range: 0..n-1

#### Implementation of

`IGrammarRootAST.childIndex`

#### Inherited from

`GrammarASTWithOptions.childIndex`

***

### g

> **g**: `Grammar`

Defined in: [../src/tool/ast/GrammarAST.ts:24](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tool/ast/GrammarAST.ts#L24)

For process AST nodes from imported grammars.

#### Implementation of

`IGrammarRootAST.g`

#### Inherited from

`GrammarASTWithOptions.g`

***

### parent

> **parent**: `null` \| [`CommonTree`](CommonTree.md) = `null`

Defined in: [../src/tree/CommonTree.ts:14](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L14)

Who is the parent node of this node? If null, implies node is root.

#### Implementation of

`IGrammarRootAST.parent`

#### Inherited from

`GrammarASTWithOptions.parent`

***

### startIndex

> **startIndex**: `number` = `-1`

Defined in: [../src/tree/CommonTree.ts:17](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L17)

What token indexes bracket all tokens associated with this node and below?

#### Implementation of

`IGrammarRootAST.startIndex`

#### Inherited from

`GrammarASTWithOptions.startIndex`

***

### stopIndex

> **stopIndex**: `number` = `-1`

Defined in: [../src/tree/CommonTree.ts:20](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L20)

What token indexes bracket all tokens associated with this node and below?

#### Implementation of

`IGrammarRootAST.stopIndex`

#### Inherited from

`GrammarASTWithOptions.stopIndex`

***

### token?

> `optional` **token**: `Token`

Defined in: [../src/tree/CommonTree.ts:11](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L11)

A single token is the payload.

#### Implementation of

`IGrammarRootAST.token`

#### Inherited from

`GrammarASTWithOptions.token`

***

### tokenStream

> `readonly` **tokenStream**: `TokenStream`

Defined in: [../src/tool/ast/GrammarRootAST.ts:21](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tool/ast/GrammarRootAST.ts#L21)

Track stream used to create this tree

#### Implementation of

`IGrammarRootAST.tokenStream`

## Methods

### addChild()

> **addChild**(`t`?): `void`

Defined in: [../src/tree/CommonTree.ts:61](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L61)

Adds t as child of this node.

Warning: if t has no children, but child does and child isNil then this routine moves children to t via
`t.children = child.children`, i.e., without copying the array.

#### Parameters

##### t?

[`CommonTree`](CommonTree.md)

The child to add.

#### Returns

`void`

#### Implementation of

`IGrammarRootAST.addChild`

#### Inherited from

`GrammarASTWithOptions.addChild`

***

### addChildren()

> **addChildren**(`kids`): `void`

Defined in: [../src/tree/CommonTree.ts:102](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L102)

Adds all elements of kids list as children of this node.

#### Parameters

##### kids

[`CommonTree`](CommonTree.md)[]

The children to add.

#### Returns

`void`

#### Implementation of

`IGrammarRootAST.addChildren`

#### Inherited from

`GrammarASTWithOptions.addChildren`

***

### freshenParentAndChildIndexes()

> **freshenParentAndChildIndexes**(`offset`?): `void`

Defined in: [../src/tree/CommonTree.ts:217](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L217)

Sets the parent and child index values for all child of t.

#### Parameters

##### offset?

`number`

The index to start from.

#### Returns

`void`

#### Implementation of

`IGrammarRootAST.freshenParentAndChildIndexes`

#### Inherited from

`GrammarASTWithOptions.freshenParentAndChildIndexes`

***

### getAltLabel()

> **getAltLabel**(): `null` \| `string`

Defined in: [../src/tool/ast/GrammarAST.ts:119](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tool/ast/GrammarAST.ts#L119)

Walk ancestors of this node until we find ALT with
 alt!=null or leftRecursiveAltInfo!=null. Then grab label if any.
 If not a rule element, just returns null.

#### Returns

`null` \| `string`

#### Implementation of

`IGrammarRootAST.getAltLabel`

#### Inherited from

`GrammarASTWithOptions.getAltLabel`

***

### getAncestor()

> **getAncestor**(`ttype`): `null` \| [`CommonTree`](CommonTree.md)

Defined in: [../src/tree/CommonTree.ts:362](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L362)

Walks upwards and get first ancestor with this token type.

#### Parameters

##### ttype

`number`

The token type to check for.

#### Returns

`null` \| [`CommonTree`](CommonTree.md)

The first ancestor of this node with the specified token type, or `null` if no ancestor with
         the type exists.

#### Implementation of

`IGrammarRootAST.getAncestor`

#### Inherited from

`GrammarASTWithOptions.getAncestor`

***

### getOptionAST()

> **getOptionAST**(`key`): `undefined` \| `GrammarAST`

Defined in: [../src/tool/ast/GrammarASTWithOptions.ts:60](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tool/ast/GrammarASTWithOptions.ts#L60)

Gets AST node holding value for option key; ignores default options
and command-line forced options.

#### Parameters

##### key

`string`

#### Returns

`undefined` \| `GrammarAST`

#### Implementation of

`IGrammarRootAST.getOptionAST`

#### Inherited from

`GrammarASTWithOptions.getOptionAST`

***

### insertChild()

> **insertChild**(`i`, `t`): `void`

Defined in: [../src/tree/CommonTree.ts:125](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L125)

Inserts child t at child position i (0..n - 1) by shifting children i + 1..n - 1 to the right one position. Sets
parent/indexes properly but does NOT collapse nil-rooted t's that come in here like addChild.

#### Parameters

##### i

`number`

The index to insert the child at.

##### t

[`CommonTree`](CommonTree.md)

The child to insert.

#### Returns

`void`

#### Implementation of

`IGrammarRootAST.insertChild`

#### Inherited from

`GrammarASTWithOptions.insertChild`

***

### replaceChildren()

> **replaceChildren**(`startChildIndex`, `stopChildIndex`, `t`): `void`

Defined in: [../src/tree/CommonTree.ts:154](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L154)

Deletes children from start to stop and replaces with t even if t is a list (nil-root tree). Number of children
can increase or decrease. For huge child lists, inserting children can force walking rest of
children to set their child index - could be slow.

#### Parameters

##### startChildIndex

`number`

The index to start deleting children.

##### stopChildIndex

`number`

The index to stop deleting children.

##### t

[`CommonTree`](CommonTree.md)

The tree to replace the deleted children with.

#### Returns

`void`

#### Implementation of

`IGrammarRootAST.replaceChildren`

#### Inherited from

`GrammarASTWithOptions.replaceChildren`

***

### setUnknownTokenBoundaries()

> **setUnknownTokenBoundaries**(): `void`

Defined in: [../src/tree/CommonTree.ts:314](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L314)

For every node in this subtree, make sure it's start/stop token's are set. Walks depth first, visits bottom up.
Only updates nodes with at least one token index < 0.

#### Returns

`void`

#### Implementation of

`IGrammarRootAST.setUnknownTokenBoundaries`

#### Inherited from

`GrammarASTWithOptions.setUnknownTokenBoundaries`

***

### toStringTree()

> **toStringTree**(): `string`

Defined in: [../src/tree/CommonTree.ts:380](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L380)

Prints out a whole tree not just a node.

#### Returns

`string`

A string representation of the tree.

#### Implementation of

`IGrammarRootAST.toStringTree`

#### Inherited from

`GrammarASTWithOptions.toStringTree`
