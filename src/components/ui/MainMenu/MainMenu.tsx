/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import githhubIconLight from "../../../assets/images/github-icon-light.svg";

import type { ComponentChild } from "preact";

import { PageType } from "../../../index.js";
import { Button } from "../Button/Button.js";
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
                <Button
                    caption="Home"
                    className="menu-item"
                    style={{ marginLeft: "auto" }}
                    onClick={() => {
                        this.handleSectionChange(PageType.Home);
                    }} />
                <Button
                    caption="Documentation"
                    className="menu-item"
                    onClick={() => {
                        this.handleSectionChange(PageType.Documentation);
                    }} />
                <Button
                    caption="Download"
                    className="menu-item"
                    onClick={() => {
                        this.handleSectionChange(PageType.Download);
                    }} />
                <Button
                    caption="Dev Tools"
                    className="menu-item"
                    onClick={() => {
                        this.handleSectionChange(PageType.DevTools);
                    }} />
                <Button
                    caption="Playground"
                    className="menu-item"
                    onClick={() => {
                        this.handleSectionChange(PageType.Playground);
                    }} />
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
