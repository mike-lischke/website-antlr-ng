/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@vscode/codicons/dist/codicon.css";

import "./assets/css/style.css";
import "./assets/css/theme.css";

import { Component, render, type ComponentChild } from "preact";

import { Documentation } from "./components/pages/Documentation.js";
import { LandingPage } from "./components/pages/LandingPage.js";
import { MainMenu } from "./components/ui/MainMenu/MainMenu.js";
import { Downloads } from "./components/pages/Download.js";
import { DevTools } from "./components/pages/DevTools.js";
import { Playground } from "./components/pages/Playground.js";

export const enum PageType {
    Home,
    Documentation,
    Download,
    DevTools,
    Playground,
}

interface IAppState {
    currentSection: PageType;
}

export class App extends Component<{}, IAppState> {

    public constructor() {
        super();

        this.state = {
            currentSection: PageType.Home,
        };
    }

    public override render(): ComponentChild {
        const { currentSection } = this.state;

        const menu = <MainMenu
            onChangeSection={(section) => {
                this.setState({ currentSection: section });
            }}
        />;

        switch (currentSection) {
            case PageType.Home: {
                return <>
                    {menu}
                    <LandingPage />
                </>;
            }

            case PageType.Documentation: {
                return <>
                    {menu}
                    <Documentation />
                </>;
            }

            case PageType.Download: {
                return <>
                    {menu}
                    <Downloads />
                </>;
            }

            case PageType.DevTools: {
                return <>
                    {menu}
                    <DevTools />
                </>;
            }

            case PageType.Playground: {
                return <>
                    {menu}
                    <Playground />
                </>;
            }

            default: {
                return <>
                    {menu}
                </>;
            }
        }
    }
}

render(<App />, document.body);
