/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import githhubIconLight from "../../../assets/images/github-icon-light.svg";

import type { ComponentChild } from "preact";

import { PageType } from "../../../index.js";
import { ComponentBase, type IComponentProperties } from "../Component/ComponentBase.js";
import { Container, ContentAlignment, Orientation } from "../Container/Container.js";

export interface IMainMenuProperties extends IComponentProperties {
    onChangeSection: (section: PageType) => void;
}

export class MainMenu extends ComponentBase<IMainMenuProperties> {
    public override render(): ComponentChild {
        const className = this.getEffectiveClassNames(["menu"]);

        return (
            <Container
                className={className}
                orientation={Orientation.LeftToRight}
                mainAlignment={ContentAlignment.Start}
                crossAlignment={ContentAlignment.Center}
            >
                <label className="menu-item">&copy; 2025, Mike Lischke</label>
                <a className="menu-item" href="/" style={{ marginLeft: "auto" }}>Home</a>
                <a className="menu-item" href="/documentation">Documentation</a>
                <a className="menu-item" href="/downloads">Downloads</a>
                <a className="menu-item" href="/devtools">Developent Tools</a>
                <a className="menu-item" href="/playground">Playground</a>

                <a href="https://github.com/mike-lischke/antlr-ng" style="margin-left: auto">
                    <img src={githhubIconLight} />
                </a>
            </Container>

        );
    }

    private handleSectionChange = (section: PageType): void => {
        const { onChangeSection } = this.props;

        onChangeSection(section);
    };
}
