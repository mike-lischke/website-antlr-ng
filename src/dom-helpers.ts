/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import cx from "classnames";

/**
 * Conditionally returns a CSS class name from a list of names or a single name.
 *
 * @param value A value that must be truthy to return a class name.
 * @param c A single class name or a list of class names. If the value is a boolean, the list must have two entries.
 *
 * @returns The class name or undefined, depending on the truthiness of the value.
 */
export const classFromProperty = (value: unknown, c: string | string[]): string | undefined => {
    if (value == null) {
        return undefined;
    }

    if (c instanceof Array) {
        if (typeof value === "boolean") {
            return c[value ? 1 : 0];
        }

        return c[value as number];
    } else {
        if (!value) {
            return undefined;
        }
    }

    return c;
};
