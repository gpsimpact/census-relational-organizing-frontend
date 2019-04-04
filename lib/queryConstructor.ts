import base64 from 'base-64';
import _ from 'lodash';


export const CurrentQuery = (props:any) => {
    if(props.query){
        return new QueryObject(props.query);
    }
    return new QueryObject({});
}


export class QueryObject {
    query: any;
    pageNumber: number;
    page: number;
    perPage: number;
    offset: number;
    where: any;
    sort: any;
    lens: any;
    marshalledWhere: any;

    constructor(query){
        this.query = query;
        this.pageNumber = parseInt(this.query.page) || 1;
        this.page = query.page || 1;
        this.perPage = parseInt(this.query.perpage) || 50;
        this.offset = (this.perPage * (this.pageNumber - 1));
        this.lens = this.decodeLens();
        this.sort = this.lens.sort || {};
        this.where = this.lens.where || {};
    }

    decodeLens(){
        let lens = {};
        if(this.query.lens){
            try {
                lens = JSON.parse(base64.decode(this.query.lens));
                console.log('lens', lens);
            } catch(e){
                console.log(e);
            }
        };
        return lens;
    }
    mapClause(clause, primaryObject) {
        console.log(clause);
        console.log(primaryObject);
    }
    
}