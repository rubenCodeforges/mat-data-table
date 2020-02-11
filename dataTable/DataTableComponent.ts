import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatSort, MatTableDataSource, PageEvent, Sort} from '@angular/material';
import {GeneralTableColumn} from '../dataModels/GeneralTableColumn';
import {SelectionModel} from '@angular/cdk/collections';
import * as _ from 'lodash';

@Component({
    styleUrls: ['DataTable.scss'],
    selector: 'cf-data-table',
    templateUrl: 'DataTable.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DataTableComponent implements OnInit, AfterViewInit, OnChanges {
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ContentChild(TemplateRef, {static: false}) actionMenuTemplate: TemplateRef<any>;

    @Input() searchTerm = '';
    @Input() filter: { key: string, value: any };
    @Input() dataSet: any[];
    @Input() displayedColumns: GeneralTableColumn[] = [];
    @Input() settings: DataTableSettings = {
        pageIndexSubtractor: 1,
        pagination: false,
        checkBoxColumn: false,
        inMemorySort: true,
        hasAddButton: false,
        actionMenu: true
    };

    @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
    @Output() sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();
    @Output() rowSelected: EventEmitter<any> = new EventEmitter<any>();

    public dataSource: MatTableDataSource<any>;
    public columnIds: string[] = [];
    public selection = new SelectionModel<any>(true, []);

    ngOnInit(): void {
        this.initSources();
        this.initColumns();
    }

    ngAfterViewInit(): void {
        if (this.dataSet) {
            this.dataSource.sort = this.settings.inMemorySort ? this.sort : undefined;
            this.sort.sortChange
                .subscribe((event) => this.sortChange.emit(event));
        }

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!_.isEmpty(this.dataSource)) {
            this.updateData();
            this.initColumns();
        } else {
            this.initSources();
        }
    }

    public getColumnsToDisplay(): string[] {
        return this.columnIds;
    }

    public rowSelect(row: any): void {
        this.rowSelected.emit(row);
    }

    public onPageChange(pageEvent: PageEvent): void {
        this.pageChange.emit(pageEvent);
    }

    public isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    public masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    private initSources() {
        if (this.dataSet) {
            this.dataSource = new MatTableDataSource<any>(this.dataSet);
        }
    }

    private updateData() {
        this.dataSource.data = this.dataSet;
        this.applyFilter();
        this.dataSource.filter = this.searchTerm;
    }

    private applyFilter() {
        if (!_.isUndefined(this.filter)) {
            if (_.isNull(this.filter)) {
                this.dataSource.data = this.dataSet;
            } else {
                this.dataSource.data = _.filter(this.dataSource.data, (item) => {
                    return item[this.filter.key] === this.filter.value;
                });
            }
        }
    }

    private initColumns() {
        if (this.displayedColumns) {
            this.columnIds = this.displayedColumns
                .map(column => column.columnKey + (column.columnKeySuffix || ''));
            if (this.settings.checkBoxColumn) {
                this.columnIds.unshift('select');
            }
            if (this.settings.actionMenu) {
                this.columnIds.push('action');
            }
        }
    }
}

export interface DataTableSettings {
    pageIndexSubtractor?: number;
    pagination?: boolean;
    checkBoxColumn?: boolean;
    inMemorySort?: boolean;
    hasAddButton?: boolean;
    actionMenu?: boolean;
}
