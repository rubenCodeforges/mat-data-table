import {NgModule} from '@angular/core';
import {DataTableComponent} from './DataTableComponent';
import {MatCheckboxModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatSortModule
    ],
    exports: [DataTableComponent],
    declarations: [DataTableComponent],
    providers: [],
})
export class DataTableModule {
}
