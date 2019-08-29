// import { SchemaDirectiveVisitor } from "apollo-server-express";
// import { GraphQLScalarType, GraphQLNonNull } from "graphql";
// import { assert } from "chai";

// export class LengthDirective extends SchemaDirectiveVisitor {
//   visitInputFieldDefinition(field) {
//     console.log("input");

//     this.wrapType(field);
//   }

//   visitFieldDefinition(field) {
//     console.log("visit");

//     this.wrapType(field);
//   }
//   visitArgumentDefinition(field) {
//     console.log(field);
//     this.wrapType(field);
//   }

//   // Replace field.type with a custom GraphQLScalarType that enforces the
//   // length restriction.
//   wrapType(field) {
//     console.log(field.type,field.type.ofType);
//     if (field.type instanceof GraphQLNonNull && field.type.ofType instanceof GraphQLScalarType) {
//       console.log("if");
//       field.type = new GraphQLNonNull(new LimitedLengthType(field.type.ofType, this.args.max));
//     } else if (field.type instanceof GraphQLScalarType) {
//       console.log("else if");

//       field.type = new LimitedLengthType(field.type, this.args.max);
//     } else {
//       throw new Error(`Not a scalar type: ${field.type}`);
//     }
//   }
// }

// class LimitedLengthType extends GraphQLScalarType {
//   constructor(type, maxLength) {
//     super({
//       name: `LengthAtMost${maxLength}`,

//       // For more information about GraphQLScalar type (de)serialization,
//       // see the graphql-js implementation:
//       // https://github.com/graphql/graphql-js/blob/31ae8a8e8312/src/type/definition.js#L425-L446

//       serialize(value) {
//           console.log("serial",value)
//         if(value !instanceof String){
//         value = type.serialize(value);
//         }
//         assert.isAtMost(value.length, maxLength);
//         return value;
//       },

//       parseValue(value) {
//         console.log("parsev",value)

//         value = (value instanceof String) ? value : type.parseValue(value);
//         return value
//       },

//       parseLiteral(ast) {
//         console.log("parseLi",ast)
//         return type.parseLiteral(ast);
       
//       },
//     });
//   }
// }


