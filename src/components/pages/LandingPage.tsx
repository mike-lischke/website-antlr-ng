/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import logo from "../..//assets/images/logo4.svg";
import questionMark from "../..//assets/images/question-mark.svg";
import reading from "../..//assets/images/reading.svg";
import rocket from "../..//assets/images/rocket.svg";
import target from "../..//assets/images/target.svg";
import tooling from "../..//assets/images/tooling.svg";
import grammarExample from "../../assets/images/grammar-example.png";

import { type ComponentChild } from "preact";

import { HomeSection } from "../HomeSection.js";
import { ComponentBase, type IComponentProperties } from "../ui/Component/ComponentBase.js";
import { Container, ContentAlignment, Orientation } from "../ui/Container/Container.js";

const sectionContent = [{
    heading: "What is antlr-ng?",
    text: "It's the successor of ANTLR4, a Java-based parser generator with a long history. " +
        "The antlr-ng tool takes the project to a new level, with a focus on performance and ease of use.\n\n" +
        "ANTLR was created by former professor Terence Parr and is widely used in the software industry.",
    orientation: Orientation.LeftToRight,
    image: questionMark,
},
{
    heading: "Made for the Future",
    text: "As the name suggests, <span class=\"antlrng\">antlr-ng</span> is the next generation of ANTLR, following " +
        "modern development principles, and allowing to modernize ANTLR's feature set, The tool is " +
        "written in TypeScript, which runs in browsers and terminals (using Node.js or similar).\n\nIt's a " +
        "drop-in replacement for the old ANTLR4 Java jar and can be easily integrated into your project " +
        "workflow to generate your recognizers.",
    orientation: Orientation.RightToLeft,
    image: rocket,
},
{
    heading: "Grammars a Human can Understand",
    text: "ANTLR grammars are easy to read and write. They are based on EBNF notation, which is close to " +
        "the way humans describe languages. This makes it easy to create and maintain grammars.",
    orientation: Orientation.LeftToRight,
    image: reading,
},
{
    heading: "Multi Target Code Generation",
    text: "ANTLR can generate parsers for a variety of target languages, like Java, C#, Python, and TypeScript. " +
        "This allows you to use the same grammar for different projects, even if they are written in different " +
        "programming languages.",
    orientation: Orientation.RightToLeft,
    image: target,
},
{
    heading: "Excellent Tooling",
    text: "Over the years the ANTLR community has built a rich set of tools around ANTLR4, like the ANTLR4 " +
        "extension for Visual Studio Code, the Trash command line tool set as well as number of plugins for " +
        "Visual Studio and IntelliJ IDEA.",
    orientation: Orientation.LeftToRight,
    image: tooling,
}];

export interface ILandingPageProperties extends IComponentProperties {
    path?: string;
}

export class LandingPage extends ComponentBase<ILandingPageProperties> {
    public override componentDidMount(): void {
        document.title = "antlr-ng Parser Generator";
    }

    public override render(): ComponentChild {
        const sections = sectionContent.map((content) => {
            return <HomeSection
                heading={content.heading}
                text={content.text}
                orientation={content.orientation}
                image={content.image}
            />;
        });

        const className = this.getEffectiveClassNames(["pageHost"]);

        return (
            <Container
                id="landing-page"
                orientation={Orientation.TopDown}
                className={className}
            >
                <Container
                    className="header zigzag"
                    orientation={Orientation.LeftToRight}
                    crossAlignment={ContentAlignment.Center}
                    mainAlignment={ContentAlignment.Center}
                >
                    <img className="gradient" />
                    <img className="background" />
                    <img className="logo" src={logo} />
                    <Container id="title-host" orientation={Orientation.TopDown}>
                        <div className="title">antlr-ng</div>
                        <div className="subtitle">The next generation of ANTLR</div>
                        <div className="subtitle2">
                            <b>An</b>other <b>T</b>ool for <b>L</b>anguage <b>R</b>ecognition
                        </div>
                    </Container>
                </Container>
                <Container
                    className="highlight"
                    orientation={Orientation.LeftToRight}
                    crossAlignment={ContentAlignment.Center}
                >
                    <img className="grammar-example" src={grammarExample} />
                </Container>
                <Container
                    className="main"
                    orientation={Orientation.TopDown}
                    crossAlignment={ContentAlignment.Center}
                >
                    <label className="tag-line">Parser generation for humans</label>
                    {sections}
                </Container>
            </Container>
        );
    }
}
