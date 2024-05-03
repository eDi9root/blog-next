export type IBlogDetail = {
    created_at: string;
    id: string;
    img_url: string;
    is_comment: boolean;
    is_public: boolean;
    title: string;
    blog_content: {
        blog_id: string;
        content: string;
        created_at: string;
    };
} | null
