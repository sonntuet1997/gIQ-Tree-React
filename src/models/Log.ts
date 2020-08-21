import {Model} from "react3l/core";

export class Log extends Model {
    public url: string = "";
    public processedFile: string = "";

    constructor() {
        super();
    }
}