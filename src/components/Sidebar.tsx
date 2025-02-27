/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { createRef, type ComponentChild } from "preact";

//import { useLocation } from "preact-iso";
import type { ColumnDefinition } from "tabulator-tables";

import { ComponentBase, SelectionType, type IComponentProperties } from "./ui/Component/ComponentBase.js";
import { Container, Orientation } from "./ui/Container/Container.js";
import { TreeGrid } from "./ui/TreeGrid/TreeGrid.js";
import { route } from "preact-router";

export enum Page {
    Actions,
    Introduction,
    GettingStarted,
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
    Resources,
}

/** A section in the sidebar. */
export interface ISection {
    id: Page;
    title: string;

    /** The path to the page. */
    urlPath: string;

    /** Indicates whether a markdown is to be shown. */
    file?: string;

    children?: ISection[];
}

export interface ISideBarProperties extends IComponentProperties {
    sections: ISection[];
    currentPath: string;
}

export class SideBar extends ComponentBase<ISideBarProperties> {
    private treeRef = createRef<TreeGrid>();

    public override componentDidUpdate(previousProps: Readonly<ISideBarProperties>): void {
        const { currentPath } = this.props;

        if (currentPath !== previousProps.currentPath) {
            const tree = this.treeRef.current;
            if (tree) {
                const previousSection = previousProps.sections.find((section) => {
                    return section.urlPath === previousProps.currentPath;
                });

                if (previousSection) {
                    tree.deselectRow(previousSection.id);
                }

                const currentSection = this.props.sections.find((section) => {
                    return section.urlPath === currentPath;
                });

                if (currentSection) {
                    tree.selectRow([currentSection.id]);
                }
            }
        }
    }

    public render(): ComponentChild {
        const { sections, currentPath } = this.props;

        //const { route } = useLocation();

        const subPath = currentPath.substring("/documentation".length);
        const currentSection = sections.find((section) => {
            return section.urlPath === subPath;
        });

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
}
