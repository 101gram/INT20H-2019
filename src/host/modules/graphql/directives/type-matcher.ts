import * as _         from 'lodash';
import * as Vts       from 'vee-type-safe';

import {
    GraphQLScalarType,
    GraphQLField,
    GraphQLInputField,
    GraphQLNonNull
} from 'graphql';
import * as Apollo from 'apollo-server-express';

/**
 * Factory function that creates `Apollo.SchemaDirectiveVisitor` that
 * validates object and input fields according to the given `Vts.TypeDescription`.
 * It wraps those fields into `TypeMatchedScalar`, so you need to declare it in
 * your `schema.graphql`.
 * 
 * @param typeDescr `Vts.TypeDescription` that the given field must `exactlyMatch()` to.
 */
export function makeTypeMatcher(typeDescr: Vts.TypeDescription) {
    return class TypeMatchDirective extends Apollo.SchemaDirectiveVisitor {

        visitInputFieldDefinition(field: GraphQLInputField) {
            this.wrapType(field);
        }
    
        visitFieldDefinition(field: GraphQLField<unknown, unknown>) {
            this.wrapType(field);
        }

        private wrapType(field: GraphQLInputField | GraphQLField<unknown, unknown>) {
            if (field.type        instanceof GraphQLNonNull &&
                field.type.ofType instanceof GraphQLScalarType
            ) {
                field.type = new GraphQLNonNull(new GqlTypeMatchedScalar(
                    field.type.ofType, typeDescr
                ));
            } else if (field.type instanceof GraphQLScalarType) {
                field.type = new GqlTypeMatchedScalar(field.type, typeDescr);
            } else throw new Error(
                `TypeMatchDirective expected a scalar type, but got: ${field.type}`
            );
        }
    };
}
export class GqlTypeMatchedScalar extends GraphQLScalarType {
    constructor(type: GraphQLScalarType, typeDescr: Vts.TypeDescription) {
        super({
            name: `TypeMatchedScalar`,
            serialize(value: unknown) {
                const serialized = type.serialize(value);
                Vts.ensureMatch(serialized, typeDescr);
                return serialized;
            },
            parseValue(...args) {
                const parsed = type.parseValue(...args);
                Vts.ensureMatch(parsed, typeDescr);
                return parsed;
            },
            parseLiteral(...args) {
                const parsed = type.parseLiteral(...args);
                Vts.ensureMatch(parsed, typeDescr);
                return parsed;
            }
        });
    }
}
