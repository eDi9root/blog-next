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

export type IBlogDetailComment = {
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
    comment: {
        id: string;
        created_at: string;
        display_name: string;
        descript: string;
        post: string;
        email: string;
        url: string;
    };
    user: {
        id: string;
        created_at: string;
        email: string;
        display_name: string;
        image_url: string;
        role: string;
    }
} | null
