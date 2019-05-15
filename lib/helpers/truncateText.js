
export const truncateText = (text, characters) => {
    if(text.length > characters) {
        return (
            <span> { text.substring(0, characters)} ...</span>
        )
    }
    return(
        <span> {text} </span>
    )
}