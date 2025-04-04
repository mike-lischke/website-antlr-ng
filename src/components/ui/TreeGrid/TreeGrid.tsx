/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import "tabulator-tables/dist/css/tabulator_simple.min.css";
import "./TreeGrid.css";

import {
    CellComponent, ColumnComponent, ColumnDefinition, DataTreeModule, EditModule, FilterModule, FormatModule,
    FrozenRowsModule, InteractionModule, MenuModule, Options, ReactiveDataModule, ResizeColumnsModule,
    ResizeRowsModule, ResizeTableModule, RowComponent, SelectRowModule, SortModule, Tabulator, TooltipModule,
    type RowLookup, type RowRangeLookup,
} from "tabulator-tables";

import { ComponentChild, createRef } from "preact";

import { waitFor } from "../../../utils.js";
import { ComponentBase, IComponentProperties, SelectionType } from "../Component/ComponentBase.js";

/** This type excludes methods from the Tabulator type, which are implemented in the TreeGrid. */
export type TabulatorProxy = Omit<Tabulator, "setData" | "setColumns" | "getSelectedRows">;

export enum SetDataAction {
    /** Like Set, but doesn't do any additional handling like scrolling, filtering, sorting and so on. */
    Replace,

    /** Requires an index field in each row and updates only existing data (for matching indexes) */
    Update,

    /** Adds new records to existing data. */
    Add,

    /** Full update of the grid content. */
    Set,
}

interface ITreeGridMenuEntry {
    label?: string | ((component: RowComponent) => string);
    disabled?: boolean;
    separator?: boolean;

    menu?: ITreeGridMenuEntry[]; // For sub menus.

    action?: (e: Event, column: ColumnComponent) => void;
}

/** Options to fine tune the behavior/look of the tree beyond the component properties. */
export interface ITreeGridOptions {
    /** The field name in the tree data, which uniquely identifies a record/row (default: "id") */
    index?: string;

    /** The field name in the tree data, which contains child node data (default: children). */
    childKey?: string;

    /**
     * The field name of the column to use for the outline.
     * If specified it enables the display of a tree in that column.
     */
    treeColumn?: string;

    /** The number of pixels child nodes should be indented */
    treeChildIndent?: number;

    /** Determines how columns are initially laid out (default: none). */
    layout?: "fitData" | "fitDataFill" | "fitDataStretch" | "fitDataTable" | "fitColumns";

    /**
     * If true then columns are laid out again when new data arrives (default: true).
     * Especially for cells with auto wrapping content this is essential, to correctly compute the row heights.
     */
    layoutColumnsOnNewData?: boolean;

    /** If false, no header is shown (default: true). */
    showHeader?: boolean;

    /** If true horizontal and/or vertical grid lines are shown. */
    verticalGridLines?: boolean;
    horizontalGridLines?: boolean;

    /** If true, odd rows get a slightly lighter background. */
    alternatingRowBackgrounds?: boolean;

    selectionType?: SelectionType;

    /** Used to expand specific levels in the tree on first display. */
    expandedLevels?: boolean[];

    /** If true then the user can vertically resize rows using the mouse. */
    resizableRows?: boolean;

    /** If true then the grid content is scrolled to the first selected item if the selection is modified. */
    autoScrollOnSelect?: boolean;

    /** Enforce the rowHeight to the given number in pixel */
    rowHeight?: number;

    /** Ensures the first selected row is visible */
    scrollToFirstSelected?: boolean;
}

interface ITreeGridProperties extends IComponentProperties {
    /**
     * The height for the grid. Can be given as number of pixels or a CSS property.
     * If not specified, the grid will act according to its CSS rules.
     */
    height?: string | number;

    /** The index of the row to which the table should scroll initially. */
    topRowIndex?: number;

    /**
     * For convenience these fields allow to specify initial (or static) data.
     * Most of the time you want to use `setColumns` and `setData` instead.
     */
    columns?: ColumnDefinition[];
    tableData?: unknown[];

    /**
     * A list of rows that should be selected initially. If a list of strings is given then the strings are
     * interpreted as ids (they use the index field in the data for identification). If a list of numbers is given
     * then the numbers are interpreted as row indices. Indices are one-based!
     * Note that the specified selection mode might limit that list (no selection or single selection).
     *
     * Important: The selection is only applied if initial data is set and only for the top level items.
     */
    selectedRows?: string[] | number[] | RowComponent[];
    options?: ITreeGridOptions;

    /** Menu entries for Tabulator provided menu. Do not mix with the `onRowContext` member. */
    rowContextMenu?: ITreeGridMenuEntry[];

    /**
     * The number of rows to freeze at the top.
     * Note: it is not possible to update this property after the grid has been created.
     */
    frozenRows?: number;

    onRowExpanded?: (row: RowComponent, level: number) => void;
    onRowCollapsed?: (row: RowComponent, level: number) => void;

    /** Return the initial expansion state of the given row. */
    isRowExpanded?: (row: RowComponent, level: number) => boolean;

    onFormatRow?: (row: RowComponent) => void;

    /** Triggered when a row context is required. It allows to show an own menu implementation. */
    onRowContext?: (event: Event, row: RowComponent) => void;

    /** Ditto for single cells. */
    onCellContext?: (event: Event, cell: CellComponent) => void;

    onCellClick?: (event: Event, cell: CellComponent) => void;
    onRowClick?: (event: Event, row: RowComponent) => void;

    onRowSelected?: (row: RowComponent) => void;
    onRowDeselected?: (row: RowComponent) => void;

    /**
     * Triggered whenever the grid is vertically scrolled. `rowIndex` represents the index of the row at top of the
     * grid at this moment.
     */
    onVerticalScroll?: (rowIndex: number) => void;

    onColumnResized?: (column: ColumnComponent) => void;
}

/**
 * This component shows data in dynamic lists with or without a tree column, or can show only a tree.
 * It differs in the way data is added from other controls. Data (columns, rows) can be passed in as properties and
 * can also be added on demand using the methods `setColumns` and `setRows`.
 */
export class TreeGrid extends ComponentBase<ITreeGridProperties> {

    /** A counter to manage redraw blocks (public for testing). */
    public updateLockCount = 0;

    private hostRef = createRef<HTMLDivElement>();
    private tabulator?: Tabulator;
    private tableReady = false;
    private timeoutId: ReturnType<typeof setTimeout> | null = null;

    // True when the grid is in edit mode.
    private isEditing = false;

    public constructor(props: ITreeGridProperties) {
        super(props);

        this.addHandledProperties(
            "height", "scrollTop", "columns", "tableData", "options", "selectedIds", "rowContextMenu", "frozenRows",
            "onRowExpanded", "onRowCollapsed", "isRowExpanded", "onFormatRow", "onRowContext", "onCellContext",
            "onRowSelected", "onRowDeselected", "onVerticalScroll", "onColumnResized",
        );
    }

    static {
        Tabulator.registerModule([DataTreeModule, SelectRowModule, ReactiveDataModule, MenuModule, ResizeTableModule,
            ResizeColumnsModule, FormatModule, InteractionModule, EditModule, FilterModule, SortModule,
            ResizeRowsModule, FrozenRowsModule, TooltipModule]);
    }

    public override componentDidMount(): void {
        const { tableData } = this.props;

        // istanbul ignore else
        if (this.hostRef.current) {
            // The tabulator options can contain data, passed in as properties.
            this.timeoutId = null;
            this.tabulator = new Tabulator(this.hostRef.current, this.tabulatorOptions);
            this.tabulator.on("tableBuilt", () => {
                const { topRowIndex, selectedRows, options } = this.props;

                // The tabulator field must be assigned. We are in one of its events.
                this.tabulator!.off("tableBuilt");

                if (tableData) {
                    if (selectedRows && selectedRows.length > 0) {
                        this.tabulator!.selectRow(selectedRows);
                        if (options?.scrollToFirstSelected) {
                            void this.tabulator!.scrollToRow(selectedRows[0], "top", false);
                        }
                    }

                    // Assign the table holder class our fixed scrollbar class too.
                    if (this.hostRef.current) {
                        (this.hostRef.current.lastChild as HTMLElement).classList.add("fixedScrollbar");
                    }

                    if (topRowIndex != null) {
                        const topRow = this.tabulator!.getRowFromPosition(topRowIndex);
                        void this.tabulator!.scrollToRow(topRow, "top", false);
                    }
                }

                this.tableReady = true;
            });

            this.tabulator.on("dataTreeRowExpanded", this.handleRowExpanded);
            this.tabulator.on("dataTreeRowCollapsed", this.handleRowCollapsed);
            this.tabulator.on("rowContext", this.handleRowContext);
            this.tabulator.on("cellClick", this.handleCellClick);
            this.tabulator.on("cellContext", this.handleCellContext);
            this.tabulator.on("rowSelected", this.handleRowSelected);
            this.tabulator.on("rowClick", this.handleRowClicked);
            this.tabulator.on("rowDeselected", this.handleRowDeselected);
            this.tabulator.on("columnResized", this.handleColumnResized);
            this.tabulator.on("scrollVertical", this.handleVerticalScroll);
            this.tabulator.on("scrollHorizontal", this.handleVerticalScroll);
            this.tabulator.on("cellEditing", this.handleCellEditing);
            this.tabulator.on("cellEdited", this.handleCellEdited);
            this.tabulator.on("cellEditCancelled", this.handleCellEditCancelled);
        }
    }

    public override componentWillUnmount(): void {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    public render(): ComponentChild {
        const { options } = this.props;

        const className = this.getEffectiveClassNames([
            "treeGrid",
            this.classFromProperty(options?.horizontalGridLines, "horizontalGrid"),
            this.classFromProperty(options?.verticalGridLines, "verticalGrid"),
            this.classFromProperty(options?.alternatingRowBackgrounds, "alternatingRows"),
        ]);

        return (
            <div
                ref={this.hostRef}
                className={className}
                {...this.unhandledProperties}
            />
        );
    }

    /**
     * Provides access to the underlying Tabulator table object.
     *
     * @returns The table when it is available otherwise undefined.
     */
    public get table(): Promise<TabulatorProxy | undefined> {
        return new Promise((resolve) => {
            void waitFor(1000, () => {
                return this.tableReady;
            }).then((success) => {
                if (success) {
                    resolve(this.tabulator);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    public setColumns(columns: ColumnDefinition[]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.table.then(() => {
                this.tabulator?.setColumns(columns);
                resolve();
            }).catch((reason: unknown) => {
                reject(reason as Error);
            });
        });
    }

    public getColumns(): ColumnComponent[] | undefined {
        if (this.tableReady && this.tabulator) {
            return this.tabulator.getColumns();
        }
    }

    public async setData(data: unknown[], action: SetDataAction): Promise<void> {
        const table = await this.table;

        switch (action) {
            case SetDataAction.Replace: {
                await table?.replaceData(data as Array<{}>);

                break;
            }

            case SetDataAction.Update: {
                await table?.updateData(data as Array<{}>);

                break;
            }

            case SetDataAction.Set: {
                await (table as Tabulator).setData(data);

                break;
            }

            default: { // Add
                await table?.addData(data as Array<{}>);

                break;
            }
        }
    }

    /**
     * @param rangeLookup Limit the rows that are returned based on a RowRangeLookup setting
     *
     * @returns all rows currently in the table, which match the given lookup value.
     */
    public getRows(rangeLookup?: RowRangeLookup): RowComponent[] {
        if (this.tableReady && this.tabulator) {
            return this.tabulator.getRows(rangeLookup);
        }

        return [];
    }

    /**
     * @returns a row that matches the given row selector.
     *
     * @param selector A value that identifies the row. It is compared to the index field in the data.
     */
    public getRow(selector: RowLookup): RowComponent | undefined {
        if (this.tableReady && this.tabulator) {
            return this.tabulator.getRow(selector);
        }
    }

    /** @returns the currently selected rows in the table. */
    public getSelectedRows(): RowComponent[] {
        if (this.tableReady && this.tabulator) {
            return this.tabulator.getSelectedRows();
        }

        return [];
    }

    public selectRows(rowIndices: number[]): void {
        if (this.tableReady && this.tabulator) {
            const rows = rowIndices.map((rowIndex) => {
                return this.tabulator!.getRowFromPosition(rowIndex);
            });
            this.tabulator.selectRow(rows);
        }
    }

    /**
     * This method is the recursive alternative to the Tabulator method `searchRows`, which only finds top level rows.
     * It only supports the `=` filter type currently.
     *
     * @param field The field in the data to search.
     * @param value The value to search for.
     *
     * @returns All rows that match the search criteria.
     */
    public searchAllRows(field: string, value: unknown): RowComponent[] {
        const matchedRows: RowComponent[] = [];

        const searchRows = (rows: RowComponent[]): void => {
            for (const row of rows) {
                if (row.getData()[field] === value) {
                    matchedRows.push(row);
                }

                if (row.getTreeChildren().length) {
                    searchRows(row.getTreeChildren());
                }
            }
        };

        searchRows(this.getRows());

        return matchedRows;
    }

    /**
     * @returns the row that matches the given index chain, which consists of zero-based values.
     *
     * @param index A list of indexes, each addressing a level in the tree.
     */
    public getRowFromIndex(index: number[]): RowComponent | undefined {
        if (this.tableReady && this.tabulator) {

            const rowFromIndex = (rows: RowComponent[]): RowComponent | undefined => {
                const current = index.shift();
                if (current === undefined) {
                    return undefined;
                }

                if (current < 0 || current > rows.length) {
                    return undefined;
                }

                if (index.length === 0) {
                    return rows[current];
                }

                return rowFromIndex(rows[current].getTreeChildren());
            };

            const rows = this.tabulator.getRows();

            return rowFromIndex(rows);
        }

        return undefined;
    }

    public selectRow(lookup?: RowLookup[] | true | string): void {
        if (this.tableReady && this.tabulator) {
            this.tabulator.selectRow(lookup);
        }
    }

    public deselectRow(lookup?: RowLookup): void {
        if (this.tableReady && this.tabulator) {
            this.tabulator.deselectRow(lookup);
        }
    }

    /**
     * Sets the grid to a special mode where no visual updates are done until `endUpdate()` was called.
     * Calls to `beginUpdate()` and `endUpdate()` must be balanced to avoid a complete redraw block.
     */
    public beginUpdate(): void {
        if (this.tableReady && this.tabulator) {
            ++this.updateLockCount;
            if (this.updateLockCount === 1) {
                this.tabulator.blockRedraw();
            }
        }
    }

    /**
     * Decreases the update counter. If that counter becomes 0, normal rendering is enabled again.
     * Calls to `beginUpdate()` and `endUpdate()` must be balanced to avoid a complete redraw block.
     */
    public endUpdate(): void {
        if (this.tableReady && this.tabulator) {
            if (this.updateLockCount > 0) {
                --this.updateLockCount;
                if (this.updateLockCount === 0) {
                    this.tabulator.restoreRedraw();
                }
            }
        }
    }

    public scrollToRow(item: number | RowLookup): Promise<void> {
        if (this.tableReady && this.tabulator) {
            if (typeof item === "number") {
                const row = this.tabulator.getRowFromPosition(item);

                return this.tabulator.scrollToRow(row, "top", true);
            } else {
                return this.tabulator.scrollToRow(item, "center", true);
            }
        }

        return Promise.resolve();
    }

    public scrollToBottom(): Promise<void> {
        if (this.tableReady && this.tabulator) {
            const rows = this.tabulator.getRows();

            if (rows.length > 0) {
                return this.tabulator.scrollToRow(rows[rows.length - 1], "top", true);
            }
        }

        return Promise.resolve();
    }

    public async addRow(row: {}): Promise<void> {
        if (this.tableReady && this.tabulator) {
            await this.tabulator.addRow(row);
        }

        return Promise.resolve();
    }

    /**
     * Transforms the component properties into a tabulator options object.
     *
     * @returns The tabulator options.
     */
    private get tabulatorOptions(): Options {
        const {
            height = "100%", columns = [], tableData, options, rowContextMenu, frozenRows = 0, isRowExpanded,
            onFormatRow,
        } = this.props;

        let selectableRows: number | boolean | "highlight";
        switch (options?.selectionType) {
            case SelectionType.Highlight: {
                selectableRows = "highlight";
                break;
            }

            case SelectionType.Single: {
                selectableRows = 1;
                break;
            }

            case SelectionType.Multi: {
                selectableRows = true;
                break;
            }

            default: {
                selectableRows = false;
                break;
            }
        }

        const result: Options = {
            debugInvalidOptions: false,

            index: options?.index ?? "id",
            columns,
            data: tableData,
            frozenRows,

            dataTree: options?.treeColumn != null,
            dataTreeChildIndent: options?.treeChildIndent ?? 16,
            dataTreeChildField: options?.childKey ?? "children",
            dataTreeElementColumn: options?.treeColumn,
            dataTreeExpandElement: "<span class='treeToggle codicon codicon-chevron-right' />",
            dataTreeCollapseElement: "<span class='treeToggle expanded codicon codicon-chevron-down' />",
            dataTreeBranchElement: false,
            dataTreeStartExpanded: options?.expandedLevels ?? false,

            rowFormatter: onFormatRow,

            headerVisible: options?.showHeader ?? true,
            selectableRows,
            selectableRowsRangeMode: "click",
            editTriggerEvent: "dblclick",
            reactiveData: false, // Very slow when enabled.

            rowContextMenu,

            autoResize: true,
            renderVertical: "virtual",

            layoutColumnsOnNewData: options?.layoutColumnsOnNewData ?? true,
            resizableRows: options?.resizableRows,
            rowHeight: options?.rowHeight,

            // We have to set a fixed height to enable the virtual DOM in Tabulator. However this is a severe
            // limitation in flex box layouts, which need extra counter measures.
            height,
        };

        // Tabulator is not consistent when dealing with missing callback functions. In some situations it tests for
        // null before accessing a callback, and sometimes it does not and creates an exception when null is assigned.
        if (isRowExpanded) {
            result.dataTreeStartExpanded = isRowExpanded;
        }

        if (options?.layout) {
            result.layout = options.layout;
        }

        return result;
    }

    private handleRowExpanded = (row: RowComponent, level: number): void => {
        const { onRowExpanded } = this.props;
        row.getElement().classList.add("expanded");

        onRowExpanded?.(row, level);
    };

    private handleRowCollapsed = (row: RowComponent, level: number): void => {
        const { onRowCollapsed } = this.props;

        row.getElement().classList.remove("expanded");

        onRowCollapsed?.(row, level);
    };

    private handleRowContext = (event: Event, row: RowComponent): void => {
        const { onRowContext } = this.props;

        onRowContext?.(event, row);
    };

    private handleCellClick = (event: Event, cell: CellComponent): void => {
        const { onCellClick } = this.props;

        onCellClick?.(event, cell);
    };

    private handleCellContext = (event: Event, cell: CellComponent): void => {
        const { onCellContext } = this.props;

        onCellContext?.(event, cell);
    };

    private handleRowClicked = (event: Event, row: RowComponent): void => {
        const { onRowClick } = this.props;

        onRowClick?.(event, row);
    };

    private handleRowSelected = (row: RowComponent): void => {
        const { options } = this.props;

        if (options?.autoScrollOnSelect) {
            const selected = this.tabulator?.getSelectedRows() ?? [];
            if (selected.length > 0) {
                void this.tabulator?.scrollToRow(selected[0], "center", false);
            }
        }

        const { onRowSelected } = this.props;

        onRowSelected?.(row);
    };

    private handleRowDeselected = (row: RowComponent): void => {
        const { onRowDeselected } = this.props;

        onRowDeselected?.(row);
    };

    private handleColumnResized = (column: ColumnComponent): void => {
        const { onColumnResized } = this.props;

        onColumnResized?.(column);
    };

    /**
     * Called when the vertical position of the grid changes.
     *
     * @param _top The new vertical position in pixels. However, that is not very useful, because this value
     *             cannot be applied to the grid directly.
     */
    private handleVerticalScroll = (_top: number): void => {
        const { onVerticalScroll } = this.props;

        const rows = this.tabulator!.getRows("visible");
        if (rows.length > 0) {
            const topRow = rows[0];

            onVerticalScroll?.(topRow.getPosition() as number);
        }
    };

    private handleCellEditing = () => {
        this.isEditing = true;
    };

    private handleCellEdited = () => {
        this.isEditing = false;
    };

    private handleCellEditCancelled = () => {
        this.isEditing = false;
    };
}
