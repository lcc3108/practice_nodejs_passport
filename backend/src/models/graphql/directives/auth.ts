import { client } from "@/controllers/redis";
import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from "graphql";


export class IsAuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const [, {}, { user: userInfo }] = args;
      if (!userInfo) {
        throw new Error("User not authenticated");
      }
      const token = await client.get(`jwt:${userInfo.id}`);
      if (userInfo.iat !== +token) {
        throw new Error("JWT token not authenticated");
      }
      // args[2].authUser = authUser;
      return resolve.apply(this, args);
    };
  }
  
}
