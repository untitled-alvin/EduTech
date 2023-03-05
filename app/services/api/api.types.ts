/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

export interface PaginatorDto {
  total: number;
  previous?: any;
  next?: any;
  limit: number;
  current: number;
}

export interface SubcategoriesDto {
  collection?: CategoryDto[];
}


export interface CategoryDto {
  value: string;
  subcategories?: SubcategoriesDto;
  rss_label?: string;
  label?: string;
}

export interface CategoriesResponse {
  href?: string;
  collection?: CategoryDto[];
}

export interface SourceDto {
  // href: string;
  title: string;
  // status: string;
  // is_migration?: boolean;
  // import?: any;
  // image_url?: string;
  id: string;
  // episodes?: SourceEpisodesDto;
  // current_user_permission?: string;
}

export interface SourceEpisodesDto {
  count?: number;
}


export interface SourcesResponse {
  href?: string;
  pages: PaginatorDto;
  collection?: SourceDto[];
}


export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
