/**
 * `columnName` - The displayed name of the column
 * `columnKey` - the path or array of paths of the collection object the value of which will be rendered,
 *      Supports leveled path (myProperty.someKey)
 * `columnKeySeparator`  - if columnKey is array can be used as separator for the joined values;
 * `isDate` - if the value is a date , this flag will apply a pipe to render a date
 * `dateFormat` - customize date format , defaults to `short`,
 *      see formating here https://angular.io/api/common/DatePipe#pre-defined-format-options
 * `timezone` - timezone see info here https://angular.io/api/common/DatePipe#pre-defined-format-options
 * `isImage` - if the value is a image , this flag will render a image
 * `isEditable` - apply a input field to the value , allows to edit it
 * `showSize` - if is an array this flag will render its size
 * `arrayKey` - if is a array of objects will render its value selected by key or keys array
 * `arrayValueSeparator` - if provided will be used to join the arrayKeys values using it
 * `findBy` - If is an array will find a element by given `predicate` and select a value by `path`
 * `isInvisible` - not visible
 * `icon, iconAction, iconGetClass` - if a icon should be show , call back action if icon is clicked, conditional css class
 * `valuePrefix, valuePrefixNoValue` - sets a prefix value for column , sets a prefix value if column value is empty
 */

export interface GeneralTableColumn {
    columnName: string;
    columnKeySuffix?: string;
    columnKey: string | string[];
    columnKeySeparator?: string;
    isDate?: boolean;
    dateFormat?: string;
    timezone?: string;
    findBy?: { predicate: (element: any) => boolean, path: string };
    isImage?: boolean;
    isEditable?: boolean;
    showSize?: boolean;
    arrayKey?: string | string[];
    arrayValueSeparator?: string;
    countBadgeKey?: string;
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
