/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import "./Container.css";

import { ComponentChild } from "preact";

import { ComponentBase, type IComponentProperties } from "../Component/ComponentBase.js";

/** Content alignment on both the main axis and the cross axis. */
export enum ContentAlignment {
    Start = "flex-start",
    Center = "center",
    End = "flex-end",
    Stretch = "stretch",
    SpaceBetween = "space-between",
    SpaceEvenly = "space-evenly",
}

export enum ContentWrap {
    NoWrap = "nowrap",
    Wrap = "wrap",
    WrapReverse = "wrap-reverse",
}

/**
 * The orientation determines the order and direction of child elements.
 * Not to be confused with e.g. the left-to-right writing system.
 */
export enum Orientation {
    TopDown = "column",
    BottomUp = "column-reverse",
    LeftToRight = "row",
    RightToLeft = "row-reverse",
}

export interface IContainerProperties extends IComponentProperties {
    id?: string;
    orientation?: Orientation;
    mainAlignment?: ContentAlignment;
    crossAlignment?: ContentAlignment;
    wrap?: ContentWrap;
    scrollPosition?: number;
}

/** A grouping element with flex layout. */
export class Container extends ComponentBase<IContainerProperties> {
    public static override defaultProps = {
        orientation: Orientation.LeftToRight,
    };

    public render(): ComponentChild {
        const { id, children, orientation, mainAlignment, crossAlignment, wrap, style } = this.props;
        const effectiveClassName = this.getEffectiveClassNames(["container"]);

        const newStyle = {
            flexDirection: orientation,
            justifyContent: mainAlignment,
            alignItems: crossAlignment,
            flexWrap: wrap,
            ...style,
        };

        return (
            <div
                id={id}
                style={newStyle}
                className={effectiveClassName}
            >
                {children}
            </div>
        );
    }

}
