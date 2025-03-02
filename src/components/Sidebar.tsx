/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { createRef, type ComponentChild } from "preact";

import type { ColumnDefinition } from "tabulator-tables";

import { ComponentBase, SelectionType, type IComponentProperties } from "./ui/Component/ComponentBase.js";
import { Container, Orientation } from "./ui/Container/Container.js";
import { TreeGrid } from "./ui/TreeGrid/TreeGrid.js";
import { useLocation } from "preact-iso";

export enum Page {
    Actions,
    Introduction,
    GettingStarted,
    REPL,
    Grammars,
    Options,
    ParserRules,
    LexerRules,
    Wildcard,
    GrammarSyntax,
    Unicode,
    Interpreters,
    LeftRecursion,
    ListenersAndVisitors,
    ParsingBBinaryContent,
    Predicates,
    TreeMatching,
    CreatingALanguageTarget,
    Building,
    Testing,
    Resources,
}

/** A section in the sidebar. */
export interface ISection {
    id: Page;
    title: string;

    /** The path to the page. */
    urlPath: string;

    children?: ISection[];
}

export interface ISideBarProperties extends IComponentProperties {
    sections: ISection[];
    currentPath: string;
}

export class SideBar extends ComponentBase<ISideBarProperties> {
    private treeRef = createRef<TreeGrid>();

    public override componentDidUpdate(previousProps: Readonly<ISideBarProperties>): void {
        const { currentPath, sections } = this.props;

        if (currentPath !== previousProps.currentPath) {
            const tree = this.treeRef.current;
            if (tree) {
                const selected = tree.getSelectedRows();
                selected.forEach((row) => {
                    tree.deselectRow(row);
                });

                const currentSection = this.sectionFromPath(currentPath, sections);

                const rows = tree.searchAllRows("id", currentSection?.id ?? Page.Introduction);
                if (rows.length > 0) {
                    tree.selectRow([rows[0]]);
                }
            }
        }
    }

    public render(): ComponentChild {
        const { sections, currentPath } = this.props;

        const currentSection = this.sectionFromPath(currentPath, sections);
        const { route } = useLocation();

        const columns: ColumnDefinition[] = [{
            title: "antlr-ng",
            field: "title",
            resizable: false,
            headerSort: false,
        }];

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
                    selectedRows={[currentSection?.id ?? Page.Introduction]}
                    columns={columns}
                    tableData={sections}
                    onRowSelected={(row) => {
                        const data = row.getData() as ISection;
                        route(data.urlPath);
                    }}
                />
            </Container>
        );
    }

    private sectionFromPath(path: string, sections: ISection[]): ISection | undefined {
        for (const section of sections) {
            if (section.urlPath === path) {
                return section;
            }

            if (section.children && section.children.length > 0) {
                const childSection = this.sectionFromPath(path, section.children);
                if (childSection) {
                    return childSection;
                }
            }
        }

        return undefined;
    }
}
