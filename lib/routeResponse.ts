import  Router  from "next/router";

export const routeResponse = (destination:string) => {
    // @ts-ignore
    Router.push(destination)
};

