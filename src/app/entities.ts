export interface ContentDetails {
    sourceType : SourceType
    sourceFilename: string;
    hotspots: Hotspot[];
}
export enum SourceType
{
    image,
    article
}
export interface Hotspot {
    hotspotId: string;
    shape: string;
    coords: string;
    markup: Markup;
    targetFilename: string;
    template?: string;
    placement? : string;
    offset? : Number;
    left?:Number;
    top? : Number;
}

export interface Markup {
    title: string;
    titleImage?: string;
    footer: string;
    body: string;
}

export class Config {
    url: string;
    site: string;
    contentFolder: string;
    errors : Error[];
}

export class Error{
    errorCode : string;
    errorMessage : string;
}