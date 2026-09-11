import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import slugify from 'slugify';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const slug = slugify(createBlogDto.title, { lower: true, strict: true });
    // Check if slug exists, append random string if it does
    const existing = await this.blogModel.findOne({ slug });
    const finalSlug = existing ? `${slug}-${Math.floor(Math.random() * 10000)}` : slug;

    const newBlog = new this.blogModel({
      ...createBlogDto,
      slug: finalSlug,
    });
    return newBlog.save();
  }

  async findAll(publishedOnly = false): Promise<Blog[]> {
    const query = publishedOnly ? { published: true } : {};
    return this.blogModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findOne(slugOrId: string): Promise<Blog> {
    const blog = await this.blogModel.findOne({
      $or: [{ slug: slugOrId }, { _id: slugOrId.match(/^[0-9a-fA-F]{24}$/) ? slugOrId : null }],
    }).exec();
    
    if (!blog) {
      throw new NotFoundException(`Blog with ID/Slug ${slugOrId} not found`);
    }
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogModel.findByIdAndUpdate(id, updateBlogDto, { new: true }).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async remove(id: string): Promise<Blog> {
    const blog = await this.blogModel.findByIdAndDelete(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }
}
