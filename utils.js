function arrayMatches(array, text){
    return array.some(exp => text.toLowerCase().includes(exp.toLowerCase()))
}