export function usernameCoerce(string){
    if(string){
        return string.toLowerCase().replace(' ', '')
    } else {
        return {}
    }
}