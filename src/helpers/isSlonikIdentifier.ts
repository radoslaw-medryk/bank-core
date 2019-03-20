import { IdentifierTokenType, ValueExpressionType } from "slonik";

export const isSlonikIdentifier = (value: ValueExpressionType): value is IdentifierTokenType => {
    const valueAsIdentifier = value as IdentifierTokenType;
    return valueAsIdentifier.type && valueAsIdentifier.type.toString() === "Symbol(SLONIK_IDENTIFIER)";
};
