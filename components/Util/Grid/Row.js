

export const Row = (props) => {
    if(props.classNames){
        return(
            <div className={`row ${props.classNames}`}>
                {props.children}
            </div>
        )
    };
    return(
        <div className={`row`}>
            {props.children}
        </div>
    )
}
    