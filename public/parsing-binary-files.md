# Parsing Binary Files

Parsing binary files is no different than parsing character-based files except that the "characters" are actually bytes not code points.  From a lexer/parser point of view, there is no difference except that the characters are likely not printable. If you want to match a special 2-byte marker 0xCA then 0xFE, the following rule is sufficient.

```antlr
MARKER : '\u00CA' '\u00FE' ;
```

The parser of course would refer to that token like any other token. Here is a sample grammar for use with the code snippets below (for parsing IP v4 addresses).

```antlr
grammar IP;

file : ip+ (MARKER ip)* ;

ip : BYTE BYTE BYTE BYTE ;

MARKER : '\u00CA' '\u00FE' ;
BYTE : '\u0000'..'\u00FF' ;
```

Notice that `BYTE` is using a range operator to match anything between 0 and 255. We can't use character classes like `[a-z]` naturally because we are not parsing character codes. All Unicode escape codes have to be in the range 0-255, after all we are parsing byte values.

If there are actual characters like `$` or `!` encoded as bytes in the binary file, you can refer to them via literals like `'$'` as you normally would. See `'.'` in the grammar.
 
## Binary streams

Depending on the target language you will need to figure out a way to load binary files. In Java there are character streams, while in TypeScript and JavaScript you have to feed a string to the lexer, so you will have to convert your binary input to a string there.

Once the lexer gets an input stream or string, it doesn't care whether the characters come from / represent bytes or actual Unicode characters.

Let's look at a Java example. We need to create a stream of bytes satisfactory to <span class="antlrng">antlr-ng</span>, which is as simple as:

```java
CharStream bytesAsChar = CharStreams.fromFileName("/tmp/ips", StandardCharsets.ISO_8859_1);
```

The `ISO-8859-1` encoding is just the 8-bit char encoding for LATIN-1, which effectively tells the stream to treat each byte as a character. That's what we want. Then we have the usual test rig:


```java
CharStream bytesAsChar = CharStreams.fromFileName("/tmp/ips", StandardCharsets.ISO_8859_1);
IPLexer lexer = new IPLexer(bytesAsChar);
CommonTokenStream tokens = new CommonTokenStream(lexer);
IPParser parser = new IPParser(tokens);
ParseTree tree = parser.file();
IPBaseListener listener = new MyIPListener();
ParseTreeWalker.DEFAULT.walk(listener, tree);
```

Here is the listener:

```java
class MyIPListener extends IPBaseListener {
	@Override
	public void exitIp(IPParser.IpContext ctx) {
		List<TerminalNode> octets = ctx.BYTE();
		short[] ip = new short[4];
		for (int i = 0; i<octets.size(); i++) {
			String oneCharStringHoldingOctet = octets.get(i).getText();
			ip[i] = (short)oneCharStringHoldingOctet.charAt(0);
		}
		System.out.println(Arrays.toString(ip));
	}
}
```

We can't just print out the text because we are not reading in text. We need to emit each byte as a decimal value. The output should be the following when you run the test code:

```
[172, 0, 0, 1]
[10, 10, 10, 1]
[10, 10, 10, 99]
```

## Error handling in binary files

Error handling proceeds exactly like any other parser. For example, let's alter the binary file so that it is missing one of the 0's in the first IP address:

```java
public static final byte[] bytes = {
	(byte)172, 0, 1, (byte)0xCA, (byte)0xFE, // OOOPS
	(byte)10, 10, 10, 1, (byte)0xCA, (byte)0xFE,
	(byte)10, 10, 10, 99
};
```

Running the original test case gives us:

```
line 1:4 extraneous input '.' expecting BYTE
line 1:6 mismatched input 'Êþ' expecting '.'
[172, 0, 1, 0]
[10, 10, 10, 1]
[10, 10, 10, 99]
```

That `'Êþ'` is just to the character representation of two bytes 0xCA and 0xFE. Using the enhanced binary stream, we see:

```
line 1:4 extraneous input '46(0x2E)' expecting BYTE
line 1:6 mismatched input '202(0xCA)254(0xFE)' expecting '.'
[172(0xAC), 0(0x0), 1(0x1)]
[10(0xA), 10(0xA), 10(0xA), 1(0x1)]
[10(0xA), 10(0xA), 10(0xA), 99(0x63)]
```
