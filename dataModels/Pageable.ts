import {PageRequest} from './PageRequest';

export interface Pageable<T> {
    content: T[];
    total: number;
    page_request: PageRequest;
}

export interface CrudPageable<T> {
    data: T[];
    total: number;
    count: number;
    pageCount: number;
}
