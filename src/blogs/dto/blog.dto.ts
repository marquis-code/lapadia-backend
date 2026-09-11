export class CreateBlogDto {
  title: string;
  content: string;
  authorName?: string;
  coverImage?: string;
  tags?: string[];
  published?: boolean;
}

export class UpdateBlogDto {
  title?: string;
  content?: string;
  authorName?: string;
  coverImage?: string;
  tags?: string[];
  published?: boolean;
}
