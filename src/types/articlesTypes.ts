export type TagsCategory = {
  article_id: number;
  category_id: number;
};

export type Category = {
  id: number;
  name: string;
  style: string;
  slug: string;
  parent_id?: number;
  created_at?: string;
  updated_at?: string;
  pivot?: TagsCategory;
};

export type TagsPivot = {
  article_id: number;
  tag_id: number;
};

export type Tags = {
  id: number;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
  pivot?: TagsPivot;
};

export type Author = {
  id: number;
  name: string;
  role: string;
  email: string;
  email_verified_at?: number;
  created_at?: string;
  updated_at?: string;
};

export type Articles = {
  id: number;
  author_id?: number;
  title: string;
  slug: string;
  excerpt?: string;
  alt: string;
  content?: string;
  featured_image: string;
  status?: string;
  published_at?: string;
  view_count?: string;
  created_at?: string;
  categories: Category[];
  tags: Tags[];
  updated_at?: string;
  author?: Author;
};

