[**<span class='antlrng'>antlr-ng</span> Tool Class Hierarchy**](../README.md)

***

[<span class='antlrng'>antlr-ng</span> Tool Class Hierarchy](../README.md) / CommonTree

Defined in: [../src/tree/CommonTree.ts:9](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L9)

A tree node that is wrapper for a Token object.

## Properties

### childIndex

> **childIndex**: `number` = `-1`

Defined in: [../src/tree/CommonTree.ts:23](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L23)

What index is this node in the child list? Range: 0..n-1

***

### parent

> **parent**: `null` \| `CommonTree` = `null`

Defined in: [../src/tree/CommonTree.ts:14](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L14)

Who is the parent node of this node? If null, implies node is root.

***

### startIndex

> **startIndex**: `number` = `-1`

Defined in: [../src/tree/CommonTree.ts:17](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L17)

What token indexes bracket all tokens associated with this node and below?

***

### stopIndex

> **stopIndex**: `number` = `-1`

Defined in: [../src/tree/CommonTree.ts:20](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L20)

What token indexes bracket all tokens associated with this node and below?

***

### token?

> `optional` **token**: `Token`

Defined in: [../src/tree/CommonTree.ts:11](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L11)

A single token is the payload.

## Methods

### addChild()

> **addChild**(`t`?): `void`

Defined in: [../src/tree/CommonTree.ts:61](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L61)

Adds t as child of this node.

Warning: if t has no children, but child does and child isNil then this routine moves children to t via
`t.children = child.children`, i.e., without copying the array.

#### Parameters

##### t?

`CommonTree`

The child to add.

#### Returns

`void`

***

### addChildren()

> **addChildren**(`kids`): `void`

Defined in: [../src/tree/CommonTree.ts:102](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L102)

Adds all elements of kids list as children of this node.

#### Parameters

##### kids

`CommonTree`[]

The children to add.

#### Returns

`void`

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

***

### getAncestor()

> **getAncestor**(`ttype`): `null` \| `CommonTree`

Defined in: [../src/tree/CommonTree.ts:362](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L362)

Walks upwards and get first ancestor with this token type.

#### Parameters

##### ttype

`number`

The token type to check for.

#### Returns

`null` \| `CommonTree`

The first ancestor of this node with the specified token type, or `null` if no ancestor with
         the type exists.

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

`CommonTree`

The child to insert.

#### Returns

`void`

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

`CommonTree`

The tree to replace the deleted children with.

#### Returns

`void`

***

### setUnknownTokenBoundaries()

> **setUnknownTokenBoundaries**(): `void`

Defined in: [../src/tree/CommonTree.ts:314](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L314)

For every node in this subtree, make sure it's start/stop token's are set. Walks depth first, visits bottom up.
Only updates nodes with at least one token index < 0.

#### Returns

`void`

***

### toStringTree()

> **toStringTree**(): `string`

Defined in: [../src/tree/CommonTree.ts:380](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tree/CommonTree.ts#L380)

Prints out a whole tree not just a node.

#### Returns

`string`

A string representation of the tree.
