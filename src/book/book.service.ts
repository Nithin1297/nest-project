import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const books = await this.bookModel.find({ ...keyword });
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

  async deleteById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
