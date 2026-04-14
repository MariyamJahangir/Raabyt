export interface Product {
  name: string;
  slug: string;
  description: string;
  features?: string[];
  icon?: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  coverImage?: string;
  tags?: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  linkedin?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FAQ {
  question: string;
  answer: string;
}
