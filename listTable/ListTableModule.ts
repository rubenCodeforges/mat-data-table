import {NgModule} from '@angular/core';
import {ListTableComponent} from './ListTableComponent';
import {
    MatBadgeModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
} from '@angular/material';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        MatGridListModule,
        MatTableModule,
        MatSortModule,
        MatProgressBarModule,
        MatBadgeModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatMenuModule,
    ],
    exports: [ListTableComponent],
    declarations: [ListTableComponent],
    providers: [],
})
export class ListTableModule {
}


