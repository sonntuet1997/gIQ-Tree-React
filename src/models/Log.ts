import {Model} from "react3l/core";
import nextId from "react-id-generator/lib/nextId";

export class Log extends Model {
    public url: string = "";
    public processedFile: string = "";
    public visible: boolean = false;
    public id: string = nextId();

    constructor() {
        super();
    }
}