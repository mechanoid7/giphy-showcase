import {
    Pipe,
    PipeTransform,
} from "@angular/core";
import {
    GiphyImage,
    GiphyImageSize,
} from "../../models/giphy.model";

const DEFAULT_GAP = 10;

@Pipe({
    name: "appSplitImageList",
    standalone: true,
})
export class SplitImageListPipe implements PipeTransform {
    public transform(images: GiphyImage[], width: number, height: number): GiphyImage[][] {
        height = height - DEFAULT_GAP;
        const getRelativeWidth = (size: GiphyImageSize): number => height * Number(size.width) / Number(size.height);
        const result: GiphyImage[][] = [];
        let currentSubArray: GiphyImage[] = [];
        let currentWidth = 0;

        for (const item of images) {
            const actualWidth = getRelativeWidth(item.sizes.downsized);
            item.sizes.downsized.height = height;
            item.sizes.downsized.width = actualWidth;
            const offsetWidht = actualWidth + DEFAULT_GAP;

            if (currentWidth + actualWidth <= width) {
                currentSubArray.push(item);
                currentWidth += offsetWidht;
            } else {
                result.push(currentSubArray);
                currentSubArray = [item];
                currentWidth = offsetWidht;
            }
        }

        currentSubArray.length > 0 && result.push(currentSubArray);

        return result;
    }
}
