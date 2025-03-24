/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, type ComponentChild } from "preact";

interface ICustomLinkProperties {
    href: string;
    onLinkClick: (href: string) => void;
}

export class CustomLink extends Component<ICustomLinkProperties> {
    public render(): ComponentChild {
        const { href, children } = this.props;

        return <a href={href} onClick={this.handleClick} target="_blank">{children}</a>;
    }

    private handleClick = (event: MouseEvent): void => {
        const { href, onLinkClick } = this.props;
        const l = window.location.href;

        if (l.endsWith("documentation/api") && !href.startsWith("https://") && !href.startsWith("http://")) {
            event.preventDefault();
            event.stopImmediatePropagation();

            const ref = href.startsWith("../") ? href.substring(3) : href;
            onLinkClick(ref);
        }
    };
}
