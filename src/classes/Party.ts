export default class Party {
    id: number;
    name: string;
    firstColor: string;
    secondColor: string;
    imgUri: string;

    constructor(id: number, name: string, firstColor: string, secondColor: string, imgUri: string) {
        this.id = id;
        this.name = name;
        this.firstColor = firstColor;
        this.secondColor = secondColor;
        this.imgUri = imgUri;
    }
}
