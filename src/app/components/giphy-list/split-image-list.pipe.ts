import {
    Directive,
    Pipe,
    PipeTransform,
} from "@angular/core";
import {GiphyImage} from "../../models/giphy.model";

@Pipe({
    name: "appSplitImageList",
    standalone: true,
})
export class SplitImageListPipe implements PipeTransform{
    public transform(images: GiphyImage[], width: number): GiphyImage[][] {
        const result: GiphyImage[][] = [];
        let currentSubArray: GiphyImage[] = [];
        let currentWidth = 0;

        for (const item of images) {
            if (currentWidth + Number(item.sizes.downsized.width) <= width) {
                currentSubArray.push(item);
                currentWidth += Number(item.sizes.downsized.width);
            } else {
                result.push(currentSubArray);
                currentSubArray = [item];
                currentWidth = Number(item.sizes.downsized.width);
            }
        }

        currentSubArray.length > 0 && result.push(currentSubArray);

        return result;
    }
}
