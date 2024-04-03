export interface GiphyApiModel {
    data: Datum[];
    meta: Meta;
    pagination: Pagination;
}

interface Pagination {
    total_count: number;
    count: number;
    offset: number;
}

interface Meta {
    status: number;
    msg: string;
    response_id: string;
}

interface Datum {
    type: string;
    id: string;
    url: string;
    slug: string;
    bitly_gif_url: string;
    bitly_url: string;
    embed_url: string;
    username: string;
    source: string;
    title: string;
    rating: string;
    content_url: string;
    source_tld: string;
    source_post_url: string;
    is_sticker: number;
    import_datetime: string;
    trending_datetime: string;
    images: Images;
    user?: User;
    analytics_response_payload: string;
    analytics: Analytics;
    alt_text: string;
    index_id?: number;
    tags?: string[];
    featured_tags?: string[];
    user_tags?: string[];
    is_hidden?: number;
    is_removed?: number;
    is_community?: number;
    is_anonymous?: number;
    is_featured?: number;
    is_realtime?: number;
    [p: string]: any;
}

interface Analytics {
    onload: Onload;
    onclick: Onload;
    onsent: Onload;
}

interface Onload {
    url: string;
}

interface User {
    id?: number;
    avatar_url: string;
    banner_image: string;
    banner_url: string;
    profile_url: string;
    username: string;
    display_name: string;
    description: string;
    instagram_url: string;
    website_url: string;
    is_verified: boolean;
    [p: string]: any;
}

interface Images {
    original: Original;
    downsized: BaseImageModel;
    downsized_large: BaseImageModel;
    downsized_medium: BaseImageModel;
    downsized_small: DownsizedSmall;
    downsized_still: BaseImageModel;
    fixed_height: FixedHeight;
    fixed_height_downsampled: FixedHeightDownsampled;
    fixed_height_small: FixedHeight;
    fixed_height_small_still: BaseImageModel;
    fixed_height_still: BaseImageModel;
    fixed_width: FixedHeight;
    fixed_width_downsampled: FixedHeightDownsampled;
    fixed_width_small: FixedHeight;
    fixed_width_small_still: BaseImageModel;
    fixed_width_still: BaseImageModel;
    looping: Looping;
    original_still: BaseImageModel;
    original_mp4: DownsizedSmall;
    preview: DownsizedSmall;
    preview_gif: BaseImageModel;
    preview_webp: BaseImageModel;
    "480w_still": BaseImageModel;
    hd?: DownsizedSmall;
    "4k"?: DownsizedSmall;
    source: BaseImageModel,
}

interface Looping {
    mp4_size: string;
    mp4: string;
}

interface FixedHeightDownsampled {
    height: string;
    width: string;
    size: string;
    url: string;
    webp_size: string;
    webp: string;
}

interface FixedHeight {
    height: string;
    width: string;
    size: string;
    url: string;
    mp4_size: string;
    mp4: string;
    webp_size: string;
    webp: string;
}

interface DownsizedSmall {
    height: string;
    width: string;
    mp4_size: string;
    mp4: string;
}

interface BaseImageModel {
    height: string;
    width: string;
    size: string;
    url: string;
}

interface Original extends BaseImageModel{
    mp4_size: string;
    mp4: string;
    webp_size: string;
    webp: string;
    frames: string;
    hash: string;
}
