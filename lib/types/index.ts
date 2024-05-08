export type IBlogDetail = {
    created_at: string;
    id: string;
    img_url: string;
    is_comment: boolean;
    is_public: boolean;
    title: string;
    descript: string;
    tags: string;
    blog_content: {
        blog_id: string;
        content: string;
        created_at: string;
    };
} | null

export type IBlog = {
	id: string;
	title: string;
	img_url: string;
	created_at: string;
	is_comment: boolean;
	content: string;
	is_public: boolean;
    descript: string;
    tags: string;
};
