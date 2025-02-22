/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import "./Button.css";

import { ComponentChild, createRef } from "preact";

import {
    ComponentBase, DragEventType, IComponentProperties, MouseEventCallback, MouseEventType
} from "../Component/ComponentBase.js";
import { Orientation } from "../Container/Container.js";

export interface IButtonProperties extends IComponentProperties {
    innerRef?: preact.RefObject<HTMLDivElement>;

    caption?: string;
    round?: boolean;
    orientation?: Orientation;

    /** When set the button gets no min width or extra padding. */
    imageOnly?: boolean;

    /** If set this button gets a different background. */
    isDefault?: boolean;

    focusOnClick?: boolean;

    onContextMenu?: MouseEventCallback;
}

export class Button extends ComponentBase<IButtonProperties> {

    private buttonRef: preact.RefObject<HTMLDivElement>;
    private dragInsideCounter = 0;

    public constructor(props: IButtonProperties) {
        super(props);

        // Have to handle the `disabled` property manually because we have to disable a div instead of a button element.
        this.addHandledProperties("innerRef", "round", "orientation", "imageOnly", "isDefault", "requestType",
            "disabled", "focusOnClick");

        this.connectEvents("onMouseDown");

        if (props.draggable) {
            this.connectDragEvents();
        }

        this.buttonRef = props.innerRef ?? createRef<HTMLDivElement>();
    }

    public render(): ComponentChild {
        const { children, caption, style, orientation, round, imageOnly, disabled, isDefault } = this.props;
        const className = this.getEffectiveClassNames([
            "button",
            this.classFromProperty(round, "round"),
            this.classFromProperty(imageOnly, "imageOnly"),
            this.classFromProperty(disabled, "disabled"),
            this.classFromProperty(isDefault, "default"),
        ]);

        const content = children ?? caption;
        const newStyle = {
            ...style,
            flexDirection: orientation,
        };

        return (
            // Using a div here instead of a button because we want to be able to not allow focus
            // but still be able to drag the button.
            <div
                ref={this.buttonRef}
                style={newStyle}
                className={className}
                tabIndex={0}
                role="button"
                {...this.unhandledProperties}
            >
                {content}
            </div >
        );
    }

    protected override handleMouseEvent(type: MouseEventType, e: MouseEvent): boolean {
        switch (type) {
            case MouseEventType.Down: {
                const { focusOnClick } = this.props;
                if (focusOnClick) {
                    this.buttonRef.current?.focus();
                } else {
                    e.preventDefault();
                }

                break;
            }

            case MouseEventType.Click: {
                e.stopImmediatePropagation();

                break;
            }

            default: {
                /* istanbul ignore next */
                break;
            }
        }

        return true;
    }

    protected override handleDragEvent(type: DragEventType, e: DragEvent): boolean {
        const element = e.currentTarget as HTMLElement;
        if (!e.dataTransfer) {
            return true;
        }

        switch (type) {
            case DragEventType.Start: {
                e.dataTransfer.setData(`sourceid:${(e.target as HTMLElement).id}`, "");
                e.dataTransfer.effectAllowed = "move";
                e.stopPropagation();

                break;
            }

            case DragEventType.Over: {
                e.preventDefault();
                break;
            }

            case DragEventType.Enter: {
                if (this.dragInsideCounter === 0) {
                    element.classList.add("dropTarget");
                }
                ++this.dragInsideCounter;
                e.stopPropagation();

                break;
            }

            case DragEventType.Leave: {
                --this.dragInsideCounter;
                if (this.dragInsideCounter === 0) {
                    element.classList.remove("dropTarget");
                }
                e.stopPropagation();

                break;
            }

            case DragEventType.Drop: {
                this.dragInsideCounter = 0;
                element.classList.remove("dropTarget");
                e.stopPropagation();
                e.preventDefault();

                break;
            }

            default: {
                break;
            }
        }

        return true;
    }

}
