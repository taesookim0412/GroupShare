export interface Video{
    _id: string,
    author:string,
    date: string,
    description:string,
    likes: number,
    src:string,
    thumbnailGif:string,
    thumbnailPng:string,
    title:string,
    url:string,
    views:number
}
// export interface Video{
//     title:string,
//     author:string,
//     thumbnail:string,
//     views:string
// }

export interface VideoDataResponse{
    status:string,
    videos: Video[]
}