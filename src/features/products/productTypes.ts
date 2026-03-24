export type Product = {
    id: string;
    created_at: string;
    title: string;
    description: string | null;
    badge_text: number;
    featured: boolean;
    is_selected: boolean;
    image_url: string;
  };