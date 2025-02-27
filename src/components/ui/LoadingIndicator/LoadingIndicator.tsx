/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import "./LoadingIndicator.css";

import { Component, type ComponentChild } from "preact";

/** A very simple loading animation component. */
export class LoadingIndicator extends Component {
    public override render(): ComponentChild {
        return (
            <div class="loading-indicator">
                <div class="loading-indicator-spinner"></div>
                <span>Loading...</span>
            </div>
        );
    }
}
