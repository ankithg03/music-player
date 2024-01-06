export const getTitle = (path: string) => {
    let title = 'home'
    switch (path) {
        case '/':
            title = 'home'
            break;
        case '/playlist':
            title = 'playlist'
            break

        case '/album':
            title = 'album'
            break

        default:
            break;
        
    }
    return title
}
