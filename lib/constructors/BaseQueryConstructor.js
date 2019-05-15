import base64 from 'base-64';
import _ from 'lodash';

// return new Query Object if props contains query
export const CurrentQuery = (props) => {
    if(props.query){
        return new QueryObject(props.query);
    }
    return new QueryObject({});
}


// Query must contain a where and where.OR clause
const lensHasTopORClause = (w) => _.has(w, "where") && _.hasIn(w, 'where.OR');

// OR Clause must contain an AND key 
const lensClauseHasOneAnd = (c) => _.has(c, "AND") && _.keys(c).length === 1 && _.head(_.keys(c)) === "AND";

// Convert graphql notation {column: {op: val}} to formik arrays/objects {"key": "name", "op": "==", "val": "foo"}
const formClauses = (fc) => {
    const returns = [];
    _.forEach(fc.AND, clause => {
        _.forEach(clause, (value, key) => {
            _.forEach(value, (val, op) => {
                returns.push({op, val, key});
            });
        });
    });
    return returns;
}

// form has top OR clause with items
const formHasTopORClause = (o) => _.has(o, "OR") && o.OR.length > 0;

// Convert formik notation to graphql notation

const graphqlClauses = (gc) => {
    const returns = [];
    _.forEach(gc.AND, clause => {
        //cast form value booleans from strings
        let val;
        switch(clause.val){
            case "true":
                val = true;
                break;
            case "false":
                val = false;
                break;
            default:
                val = clause.val;
                break;
        }
        returns.push({[clause.key]:{[clause.op]:val}})
    })
    return returns;
}


// construct query elements and marshall them for formik/pagination.
export class QueryObject {
    constructor(query){
        this.query = query;
        this.pageNumber = parseInt(this.query.page) || 1;
        this.perPage = parseInt(this.query.perpage) || 50;
        this.offset = (this.perPage * (this.pageNumber - 1));
        this.lens = this.decodeLens();
        this.sort = this.lens.sort ? this.lens.sort : {};
        this.sortBy = this.lens.sort ? _.head(_.keys(this.lens.sort)) : 'id';
        this.sortOrder = this.lens.sort && this.sortBy ? this.lens.sort[this.sortBy] : 'ASC';
        this.where = this.lens.where || null;
        this.formWhere = this.marshallFormWhere();
        this.OR = this.formWhere && this.formWhere.OR ? this.formWhere.OR : [];
    }

    // json dump / decode base 64 if valid encoding / fail gracefully to empty.
    decodeLens(){
        let lens={};
        if(this.query.lens){try{lens = JSON.parse(base64.decode(this.query.lens));} catch(e){};};
        return lens;
    }

    // marshall graphql data to formik
    marshallFormWhere(){
        let marshalledWhere = null;
        if(lensHasTopORClause(this.lens)){
            marshalledWhere = {"OR":[]};
            const structuredAnds = this.lens.where.OR.filter(lensClauseHasOneAnd).map(formClauses);
            _.forEach(structuredAnds, andClause =>{
                marshalledWhere.OR.push({"AND": andClause})
            });
        }
        return marshalledWhere;
    }

}

// marshal formik values to graphql return sorts/where
export const ConstructNewQuery = (values) => {
    let lens = {};
    if(formHasTopORClause(values)){
        lens.where = {"OR": []}
        const structuredAnds = values.OR.filter(lensClauseHasOneAnd).map(graphqlClauses);
        _.forEach(structuredAnds, andClause => {
            lens.where.OR.push({"AND": andClause});
        })
    }
 
    if(values && values.sortBy && values.sortOrder){
        lens.sort = {[values.sortBy]: values.sortOrder}
    }
    return base64.encode(JSON.stringify(lens));
}

