export interface ImageDetails
{
imageName :string;
hotspots : Hotspot[];
}

export interface Hotspot
{
    hotspotId:string;
    xCord:Number;
    yCord:Number;
    diameter?:Number;
    markup : Markup;
    filename:string;
    template?:string;
    left:Number;
    top:Number;
}

export interface Markup
{
    title : string;
    titleImage? : string;
    footer:string;
    body:string;
}

export class Config
{
    url : string;
    site : string;
    folder : string;
}