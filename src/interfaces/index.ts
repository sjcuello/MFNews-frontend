import { Status } from "../types";

export interface Article {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  author: string;
  isChecked: boolean;
  markAsDeleted: boolean;
}

export interface ArticleForm {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  author: string;
}

export interface ItemsState {
  data: Article[];
  status: Status
  error: string | null
}
