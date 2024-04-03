import {
    Directive,
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
export class SplitImageListPipe implements PipeTransform{
    public transform(images: GiphyImage[], width: number, height: number): GiphyImage[][] {
        const getRelativeWidth = (size: GiphyImageSize) => height * Number(size.width) / Number(size.height);
        const result: GiphyImage[][] = [];
        let currentSubArray: GiphyImage[] = [];
        let currentWidth = 0;

        for (const item of images) {
            const actualWidth = getRelativeWidth(item.sizes.downsized) + DEFAULT_GAP;
            if (currentWidth + Number(actualWidth) <= width) {
                currentSubArray.push(item);
                currentWidth += Number(actualWidth);
            } else {
                result.push(currentSubArray);
                currentSubArray = [item];
                currentWidth = Number(actualWidth);
            }
        }

        currentSubArray.length > 0 && result.push(currentSubArray);

        return result;
    }
}
