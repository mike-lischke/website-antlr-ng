/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { createRef, type ComponentChild } from "preact";

import type { ColumnDefinition, RowComponent } from "tabulator-tables";

import type { Page } from "./pages/PageBase.js";
import { ComponentBase, SelectionType, type IComponentProperties } from "./ui/Component/ComponentBase.js";
import { Container, Orientation } from "./ui/Container/Container.js";
import { TreeGrid } from "./ui/TreeGrid/TreeGrid.js";

/** A section in the sidebar. */
export interface ISection {
    id: Page;
    title: string;

    /** Indicates whether a markdown is to be shown. */
    file?: string;

    children?: ISection[];
}

export interface ISideBarProperties extends IComponentProperties {
    sections: ISection[];
    currentSection: ISection;

    onSelectSection?: (section: ISection) => void;
}

export class SideBar extends ComponentBase<ISideBarProperties> {
    private treeRef = createRef<TreeGrid>();

    public override componentDidUpdate(previousProps: Readonly<ISideBarProperties>): void {
        const { currentSection } = this.props;

        if (currentSection.id !== previousProps.currentSection.id) {
            const tree = this.treeRef.current;
            if (tree) {
                tree.deselectRow(previousProps.currentSection.id);
                tree.selectRow([currentSection.id]);
            }
        }
    }

    public render(): ComponentChild {
        const { sections, currentSection } = this.props;

        const columns: ColumnDefinition[] = [
            {
                title: "antlr-ng",
                field: "title",
                resizable: false,
                headerSort: false,
            },
        ];

        const className = this.getEffectiveClassNames(["sidebar"]);

        return (
            <Container
                orientation={Orientation.LeftToRight}
                className={className}
            >
                <TreeGrid
                    ref={this.treeRef}
                    options={{
                        treeColumn: "title",
                        selectionType: SelectionType.Single,
                        showHeader: true,
                        layout: "fitColumns",
                        expandedLevels: [true, true, true],
                    }}
                    selectedRows={[currentSection.id]}
                    columns={columns}
                    tableData={sections}
                    onRowSelected={this.handleRowSelected}
                />
            </Container>
        );
    }

    private handleRowSelected = (row: RowComponent) => {
        const { onSelectSection } = this.props;
        const data = row.getData() as ISection;

        onSelectSection?.(data);
    };

}
