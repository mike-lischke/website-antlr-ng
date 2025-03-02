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
import { ErrorBoundary, LocationProvider, Route, Router } from "preact-iso";

import { DevTools } from "./components/pages/DevTools.js";
import { Documentation } from "./components/pages/Documentation.js";
import { Downloads } from "./components/pages/Download.js";
import { LandingPage } from "./components/pages/LandingPage.js";
import { Playground } from "./components/pages/Playground.js";
import { MainMenu } from "./components/ui/MainMenu/MainMenu.js";

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
        const menu = <MainMenu
            onChangeSection={(section) => {
                this.setState({ currentSection: section });
            }}
        />;

        return (
            <LocationProvider>
                <ErrorBoundary>
                    {menu}
                    <Router>
                        <Route path="/" component={LandingPage} />
                        <Route path="/documentation/" component={Documentation} />
                        <Route path="/documentation/*" component={Documentation} />
                        <Route path="/downloads" component={Downloads} />
                        <Route path="/devtools" component={DevTools} />
                        <Route path="/playground" component={Playground} />
                    </Router >
                </ErrorBoundary>
            </LocationProvider>
        );
    }
}

render(<App />, document.body);
