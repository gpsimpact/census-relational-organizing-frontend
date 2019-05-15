

export const Col = (props) => {
    if(props.classNames){
        return(
            <div className={`${props.classNames}`}>
                {props.children}
            </div>
        )
    };
    return(
        <div className="col-lg-12">
            {props.children}
        </div>
    )
}
    