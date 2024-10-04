import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async createBook(book: Book): Promise<Book> {
    return await this.bookModel.create(book);
  }

  async findById(id: string): Promise<Book> {
    id = id.trim();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with id:${id} not found`);
    }
    return book;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    // const found = this.findById(id);
    // if (!found) {
    //   throw new NotFoundException(`Book with id:${id} not found`);
    // }
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }
}
