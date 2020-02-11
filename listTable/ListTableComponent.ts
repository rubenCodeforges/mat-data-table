import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import {DataTableComponent} from '../dataTable/DataTableComponent';
import {GeneralTableColumn} from '../dataModels/GeneralTableColumn';
import * as _ from 'lodash';

@Component({
    selector: 'cf-list-table',
    templateUrl: 'listTable.html',
    styleUrls: ['listTable.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})

export class ListTableComponent extends DataTableComponent implements OnInit, AfterViewInit {
    @ContentChild(TemplateRef, {static: false}) actionMenuTemplate: TemplateRef<any>;
    @Input() hasScroll = false;
    @Input() sortDirection = '';
    @Input() isSticky = false;
    @Input() columnSuffixTemplate: TemplateRef<any>;
    @Input() columnPrefixTemplate: TemplateRef<any>;
    @Output() addClick = new EventEmitter();

    public onAdd() {
        this.addClick.emit();
    }

    public hasNoAvatar(url: string): boolean {
        return _.isEmpty(url);
    }

    public getElementValue(element, column: GeneralTableColumn, canTruncate = true) {
        let value = _.isArray(column.columnKey) ?
            _.join(_.compact(_.map(column.columnKey, (key) => _.get(element, key))), column.columnKeySeparator || ' ') :
            _.get(element, column.columnKey);
        if (column.findBy) {
            value = _.get(_.find(value, column.findBy.predicate), column.findBy.path);
        }
        if (_.isArray(value)) {
            if (column.arrayKey) {
                const keys = _.isArray(column.arrayKey) ? column.arrayKey : [column.arrayKey];

                value = _.map(value, (v) => {
                    return _.map(keys, k => v[k]);
                }).join();
                value = value.replace(/,/g, column.arrayValueSeparator || '\n');
            } else {
                value = column.showSize ?
                    _.size(value) :
                    column.newlineArrayItems ? value.join('\n') : value.join(', ');
            }
        }
        if (!value) {
            return column.valuePrefixNoValue ? column.valuePrefixNoValue + value : value;
        }
        if (column.truncateSize && canTruncate) {
            value = _.truncate(value, {length: column.truncateSize || 30});
        }
        return column.valuePrefix ? column.valuePrefix + value : value;
    }
}
