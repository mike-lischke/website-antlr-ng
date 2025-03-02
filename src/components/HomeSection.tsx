/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, type ComponentChild } from "preact";
import cx from "classnames";

import { Container, ContentAlignment, Orientation } from "./ui/Container/Container.js";

interface IHomeSectionProperties {
    heading: string;
    text: string;
    orientation: Orientation;
    className?: string;
    image?: string;
}

export class HomeSection extends Component<IHomeSectionProperties> {
    public render(): ComponentChild {
        const { heading, text, orientation, className = "", image } = this.props;

        const effectiveClassName = cx(["ang", "home-section", className.replaceAll("ang", "")]);

        return (
            <Container
                orientation={orientation}
                className={effectiveClassName}
                crossAlignment={ContentAlignment.Center}
            >
                <Container orientation={Orientation.TopDown} >
                    <div className="section-heading"> {heading} </div>
                    <div className="section-text"> {text} </div>
                </Container>
                {image && <img className="section-image" src={image} />}
            </Container>
        );
    }
}
