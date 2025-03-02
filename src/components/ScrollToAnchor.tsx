/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, type ComponentChild } from "preact";

export interface IScrollToAnchorProperties {
    path?: string;
}

export class ScrollToAnchor extends Component<IScrollToAnchorProperties> {
    public override componentDidMount() {
        this.scrollToHash();
    }

    public override componentDidUpdate(prevProps: IScrollToAnchorProperties) {
        if (this.props.path !== prevProps.path) {
            this.scrollToHash();
        }
    }

    public override render(): ComponentChild {
        return null;
    }

    private scrollToHash() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        }
    }
}
