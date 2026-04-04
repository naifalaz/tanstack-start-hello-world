export type ProductSearchResult = {
    id: number;
    title: string;
    description: string | null;
    score: number;
  };

  export type FaqSource = {
    title: string;
    url?: string;
    snippet?: string;
  };

  export type FaqAskResponse = {
    answer: string;
    sources: FaqSource[];
  };