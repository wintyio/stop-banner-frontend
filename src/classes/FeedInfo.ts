import { myConstants } from "../constants/constant";

interface FeedInfoJson {
    id: number;
    name: string;
    img: string;
    lat: number;
    lng: number;
    address: string;
    createDate: string;
    names: Array<string>;
    parties: Array<number>;
}

export class FeedInfo {
    id: number;
    partyName: string;
    partyMemberName: string;
    location: Array<number>;
    address: string;
    userName: string;
    date: Date;
    imgUrl: string;

    constructor(
        id: number,
        partyName: string,
        partyMemberName: string,
        location: Array<number>,
        address: string,
        userName: string,
        date: Date,
        imgUrl: string
    ) {
        this.id = id;
        this.partyName = partyName;
        this.partyMemberName = partyMemberName;
        this.location = location;
        this.address = address;
        this.userName = userName;
        this.date = date;
        this.imgUrl = imgUrl;
    }

    static fromJSON(json: FeedInfoJson) {
        return new FeedInfo(json.id, myConstants.getPartyNameById(json.parties[0]), json.names[0], [json.lat, json.lng], json.address, json.name, new Date(json.createDate), json.img);
    }
}