export const InjectMiddleWhere = (where, clause) => {
    return Object.assign({}, where, clause);
}