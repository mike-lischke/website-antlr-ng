[**<span class='antlrng'>antlr-ng</span> Tool Class Hierarchy**](../README.md)

***

[<span class='antlrng'>antlr-ng</span> Tool Class Hierarchy](../README.md) / ANTLRMessage

Defined in: [../src/tool/ANTLRMessage.ts:11](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tool/ANTLRMessage.ts#L11)

The class that covers any of the tool messages (like errors)

## Methods

### getMessageTemplate()

> **getMessageTemplate**(`verbose`): `ST`

Defined in: [../src/tool/ANTLRMessage.ts:50](https://github.com/mike-lischke/antlr-ng/blob/2ed318b93aa7ec5df6b3307997046218b148443f/src/tool/ANTLRMessage.ts#L50)

#### Parameters

##### verbose

`boolean`

Whether to include additional information in the message.

#### Returns

`ST`

a template for the message, which can be used to render the final message.
