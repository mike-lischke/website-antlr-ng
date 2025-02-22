/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import type { ComponentChild } from "preact";

import { ComponentBase } from "../ui/Component/ComponentBase.js";
import { Container, Orientation } from "../ui/Container/Container.js";

export class DevTools extends ComponentBase {
    public render(): ComponentChild {
        return (
            <Container className="pageContent" orientation={Orientation.TopDown}>
                <h1>Developer Tools</h1>
                <p>
                    This page will feature developer tools.
                </p>
            </Container>
        );
    }
}
