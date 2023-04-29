import { myConstants } from "../constants/constant";
import Party from "./Party";

export interface PartyRankJson {
    party_id: number;
    count: number;
}

export default class PartyRank {
    party: Party;
    count: number;
    percent: number;

    constructor(party: Party, count: number) {
        this.party = party;
        this.count = count;
        this.percent = 0;
    }

    static fromJSON(json: PartyRankJson) {
        return new PartyRank(myConstants.getPartyById(json.party_id), json.count);
    }

    toChartData() {
        return { title: this.party?.name, value: this.count, color: this.party?.firstColor };
    }

    setPercent(percent: number) {
        this.percent = percent;
    }
}
