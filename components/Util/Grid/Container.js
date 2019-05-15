

export const Container = (props) => {
    if(props.classNames){
        return(
            <div className={`container ${props.classNames}`}>
                {props.children}
            </div>
        )
    };
    return(
        <div className={`container`}>
            {props.children}
        </div>
    )
}
    