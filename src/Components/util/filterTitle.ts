export const filterTitle = (title:string) =>{
    return title?.replaceAll('&quot;', '"')
}