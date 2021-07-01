export interface Video{
    _id: string,
    author:string,
    description:string,
    likes: number,
    src:string,
    thumbnail:string,
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