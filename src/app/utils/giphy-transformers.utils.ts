import {GiphyApiModel} from "../models/giphy-api.model";
import {
    GiphyImage,
    GiphyImageSize,
} from "../models/giphy.model";

type ImagesApiModel = GiphyApiModel["data"][number]["images"];
export const transformGiphyApiToImages = (response: GiphyApiModel): GiphyImage[] => {
    const getImageSize = (image: ImagesApiModel["original"] | ImagesApiModel["downsized"]): GiphyImageSize => ({
        height: image.height,
        size: image.size,
        url: image.url,
        width: image.width,
    });

    return response.data.map(image => ({
        title: image.title,
        sizes: {
            original: getImageSize(image.images.original),
            downsized: getImageSize(image.images.downsized),
        },
        uploadDate: image.import_datetime,
    }));
};

export const getTotalItems = (data: GiphyApiModel): number => data.pagination.total_count;
