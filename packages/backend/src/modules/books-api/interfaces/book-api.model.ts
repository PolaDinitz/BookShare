interface BookApi {
    id: string;
    title: string;
    author: string;
    categories: Array<string>;
    description: string;
    imageUrl?: string;
}

