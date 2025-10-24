import { Controller, Param, Query, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create_book.dto';
import { UpdateBookDto } from './dtos/update_book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly bookService: BooksService){
    }

    @Get()
    findAll(@Query('page') page: number, @Query('limit') limit: number){
        return this.bookService.findAll(Number(page) || 1, Number(limit) || 5 );
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.bookService.findOne(id);
    } 

    @Post()
    create(@Body() createBookDto: CreateBookDto){
        return this.bookService.create(createBookDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto){
        return this.bookService.update(id, updateBookDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.bookService.delete(id);
    }
}
