export class CreateBookDto {
    name: string;
    author: string;
    year_of_publication: number;
    publisher: string;
    description?: string;
}