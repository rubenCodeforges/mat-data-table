#### DataTable, ListTable Modules

BothModules are part of the `AdminTableModule`.
It is possible to import per module all it once.

#### Usage: 

```html
<app-admin-table 
    [dataSet]="exampleData" 
    [displayedColumns]="displayedColumns">
</app-admin-table>

<app-admin-list-table 
    [dataSet]="exampleData" 
    [displayedColumns]="displayedColumns">
</app-admin-list-table>

```

#### API: 

DataTableComponent Inputs: 

```typescript

    @Input() searchTerm = '';
    @Input() filter: { key: string, value: any };
    @Input() dataSet: any[];
    @Input() displayedColumns: GeneralTableColumn[] = [];
    @Input() settings = {
        pageIndexSubtractor: 1,
        pagination: false,
        checkBoxColumn: false,
        hasAddButton: false,
        actionMenu: true
    };
```

`searchTerm` - used for filtering by search term
`filter` - used for filtering by key value pair
`dataSet` - the collection to render
`displayedColumns` - The column configuration array, see [General Table Column](#gerneral-table-column) for description
`settings` - the table configuration
 - `pageIndexSubtractor` - used for pagination default 1
 - `pagination` - enables pagination, (disabled in current project)
 - `checkBoxColumn` - enables a checkbox column, if true will show additional column in the rendered table.
 - `hasAddButton` - enables a add button on the rendered table
 - `actionMenu` - enables a action menu , will render new column for each row with action menu see [Action Menu](#action-menu)
 
DataTableComponent Outputs: 

```typescript
    @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
    @Output() rowSelected: EventEmitter<any> = new EventEmitter<any>();
```

PageChange: event fired on a page change
RowSelected: when a row was selected

##### Action menu

In order to use the actionMenu enable the settings `actionMenu (default: true)`  and provide a template for the menu:

```html
 <app-admin-list-table [dataSet]="dataSet" [displayedColumns]="displayedColumns">
    <ng-template let-element>
        <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="doSomething(element)">
                <mat-icon>edit</mat-icon>
                <span>Edit</span>
            </button>
            <button mat-menu-item disabled>
                <mat-icon>voicemail</mat-icon>
                <span>Check voicemail</span>
            </button>
            <button mat-menu-item>
                <mat-icon>notifications_off</mat-icon>
                <span>Disable alerts</span>
            </button>
        </mat-menu>
    </ng-template>
</app-admin-list-table>

```
Please note that the menu template should be wrapped in `<ng-template>`
The `let-element` in the `ng-template` gets a reference to the element of your array.

ListTableComponent Inputs: 

ListTableComponent extends the DataTableComponent so it will have same inputs and outputs.
There are but listTable specific ones. 

Input:

```typescript
    @Input() hasScroll: boolean;
    @Input() columnSuffixTemplate: TemplateRef<any>;
    @Input() columnPrefixTemplate: TemplateRef<any>;
    @Input() isSticky = false;
```

- `hasSroll` - determines if table has a scroll or not
- `columnSuffixTemplate` - you can provide a template as a column suffix. See [Template suffix prefix](#template-suffix-prefix)
- `columnSuffixTemplate` - you can provide a template as a column prefix. See [Template suffix prefix](#template-suffix-prefix)
- `isSticky` - enables sticky table header ( default : false )

Output:

```typescript
    @Output() addClick = new EventEmitter();
```

- triggers on add button click


#### General Table Column

```typescript
export interface GeneralTableColumn {
    columnName: string;
    columnKey: string;
    isDate?: boolean;
    dateFormat?: string;
    timezone?: string;
    isImage?: boolean;
    isEditable?: boolean;
    showSize?: boolean;
    findBy?: {predicate: (element: any) => boolean, path: string };
    arrayKey?: string | string[];
    arrayValueSeparator?: string;
    newlineArrayItems?: boolean;
    truncateSize?: number;
    sortingDisabled?: boolean;
    isInvisible?: boolean;
    icon?: string;
    iconAction?: (element: any) => any;
    iconGetClass?: (element: any) => any;
    valuePrefix?: string;
    valuePrefixNoValue?: string;
    isAvatar?: boolean;
    columnClass?: string;
    link?: {
        href: string;
        labelKey?: string;
        hrefKey?: string;
    };
    options?: any[];
}

```

The General Table Column is configuration item for each column

- `columnName` - The displayed name of the column
- `columnKey` - the path or array of paths of the collection object the value of which will be rendered, Supports leveled path `(myProperty.someKey)`
- `columnKeySeparator`  - if columnKey is array can be used as separator for the joined values;
- `isDate` - if the value is a date , this flag will apply a pipe to render a date
- `dateFormat` - customize date format , defaults to `short`, see formating here https://angular.io/api/common/DatePipe#pre-defined-format-options 
- `timezone` - timezone see info here https://angular.io/api/common/DatePipe#pre-defined-format-options 
- `isImage` - if the value is a image , this flag will render a image
- `isEditable` - apply a input field to the value , allows to edit it
- `showSize` - if is an array this flag will render its size
- `showSize` - if is an array this flag will render its size
- `arrayKey` - if is a array of objects will render its value selected by key or keys array
- `arrayValueSeparator` - if provided will be used to join the arrayKeys values using it
- `findBy` - If is an array will find a element by given `predicate` and select a value by `path` 
- `isInvisible` - not visible 
- `icon, iconAction, iconGetClass` - if a icon should be show , call back action if icon is clicked, conditional css class
- `valuePrefix, valuePrefixNoValue` - sets a prefix value for column , sets a prefix value if column value is empty
