export default class Party {
    index: number;
    name: string;
    firstColor: string;
    secondColor: string;
    imgUri: string;

    constructor(index: number, name: string, firstColor: string, secondColor: string, imgUri: string) {
        this.index = index;
        this.name = name;
        this.firstColor = firstColor;
        this.secondColor = secondColor;
        this.imgUri = imgUri;
    }
}
