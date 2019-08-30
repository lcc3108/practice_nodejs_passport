import { SchemaDirectiveVisitor } from "graphql-tools";
import { GraphQLScalarType, GraphQLNonNull } from "graphql";

export const makeValidateTypeDirective = <T, O extends { [param: string]: any | undefined }>(
  typeName: string,
  validator: (value: T, options: O) => boolean,
  options?: O,
) => {
  const validateType = class extends GraphQLScalarType {
    private options: O;
    constructor(type, args: O) {
      super({
        name: typeName,
        serialize(value) {
          return type.serialize(value);
        },

        parseValue(value) {
          return type.parseValue(value);
        },

        parseLiteral(ast) {
          const value = type.parseLiteral(ast);
          if (validator(value, this.options)) return value;
          throw new Error("not match type");
        },
      });

      this.options = { ...options, ...args };
    }
  };

  return class extends SchemaDirectiveVisitor {
    public visitArgumentDefinition(field) {
      this.wrapType(field);
    }
    public visitEnum(field) {
      this.wrapType(field);
    }
    public visitFieldDefinition(field) {
      this.wrapType(field);
    }
    public visitInputFieldDefinition(field) {
      this.wrapType(field);
    }
    public visitInputObject(field) {
      this.wrapType(field);
    }
    public visitEnumValue(field) {
      this.wrapType(field);
    }
    public visitInterface(field) {
      this.wrapType(field);
    }
    public visitObject(field) {
      this.wrapType(field);
    }
    public visitSchema(field) {
      this.wrapType(field);
    }
    public visitScalar(field) {
      this.wrapType(field);
    }
    public visitUnion(field) {
      this.wrapType(field);
    }

    // place field.type with a custom GraphQLScalarType that enforces the
    // length restriction.
    private wrapType(field) {
      if (field.type instanceof GraphQLNonNull && field.type.ofType instanceof GraphQLScalarType) {
        field.type = new GraphQLNonNull(new validateType(field.type.ofType, this.args as O));
      } else if (field.type instanceof GraphQLScalarType) {
        field.type = new validateType(field.type, this.args as O);
      } else {
        throw new Error(`Not a scalar type: ${field.type}`);
      }
    }
  };
};
