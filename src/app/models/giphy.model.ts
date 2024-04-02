export enum GiphyContentType {
    STICKERS = "stickers",
    GIFS = "gifs",
}

const giphyConstants = {
    v1: "v1",
    base: "https://api.giphy.com",
    trending: "trending",
    search: "search",
};

export class GiphyEndpoints {
    public static search = (type: GiphyContentType) =>
        `${giphyConstants.base}/${giphyConstants.v1}/${type}/${giphyConstants.search}`;

    public static trending = (type: GiphyContentType) =>
        `${giphyConstants.base}/${giphyConstants.v1}/${type}/${giphyConstants.trending}`;
}

export interface GiphyImageSize {
    height: string;
    size: string;
    url: string;
    width: string;
}

export interface GiphyImage {
    title: string;
    sizes: {
        original: GiphyImageSize;
        downsized: GiphyImageSize;
    };
    uploadDate: string;
}
