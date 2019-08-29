import { IsAuthDirective } from "./auth";
// import { LengthDirective } from "./length";
const ConstraintDirective = require('graphql-constraint-directive')

export const schemaDirectives = {
    isAuth: IsAuthDirective,
    // length: LengthDirective,
    constraint: ConstraintDirective
};