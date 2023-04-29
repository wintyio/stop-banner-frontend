import { myConstants } from "../constants/constant";
import Party from "./Party";

interface MemberRankJson {
    name: string;
    party: number;
    count: number;
}

export default class MemberRank {
    name: string;
    party: Party | null;
    count: number;

    constructor(name: string, party: Party | null, count: number) {
        this.name = name;
        this.party = party;
        this.count = count;
    }

    static fromJSON(json: MemberRankJson) {
        return new MemberRank(json.name, myConstants.getPartyById(json.party), json.count);
    }
}
