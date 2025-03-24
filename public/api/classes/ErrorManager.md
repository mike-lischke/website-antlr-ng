[**<span class='antlrng'>antlr-ng</span> Tool Class Hierarchy**](../README.md)

***

[<span class='antlrng'>antlr-ng</span> Tool Class Hierarchy](../README.md) / ErrorManager

Defined in: [../src/tool/ErrorManager.ts:41](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tool/ErrorManager.ts#L41)

A class to take care of individual [ANTLRMessage](ANTLRMessage.md)s. It can notify registered listeners about incomming
messages and ensures proper formatting of the messages.

## Properties

### errorTypes

> **errorTypes**: `Set`\<`IssueCode`\>

Defined in: [../src/tool/ErrorManager.ts:48](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tool/ErrorManager.ts#L48)

All errors that have been generated

## Methods

### toolError()

#### Call Signature

> **toolError**(`errorType`, ...`args`): `void`

Defined in: [../src/tool/ErrorManager.ts:159](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tool/ErrorManager.ts#L159)

Raise a predefined message with some number of parameters for the StringTemplate but for which there
is no location information possible.

##### Parameters

###### errorType

`IssueCode`

The identifier of the issue.

###### args

...`unknown`[]

The arguments to pass to the StringTemplate

##### Returns

`void`

#### Call Signature

> **toolError**(`errorType`, `e`, ...`args`): `void`

Defined in: [../src/tool/ErrorManager.ts:160](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tool/ErrorManager.ts#L160)

Raise a predefined message with some number of parameters for the StringTemplate but for which there
is no location information possible.

##### Parameters

###### errorType

`IssueCode`

The identifier of the issue.

###### e

`Error`

###### args

...`unknown`[]

The arguments to pass to the StringTemplate

##### Returns

`void`
