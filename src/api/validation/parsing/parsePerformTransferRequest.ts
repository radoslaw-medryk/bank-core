// import { Parsing } from "rusane";
// import { AnyProps } from "../helpers/AnyProps";
// import { ApiPerformTransferRequest } from "@radoslaw-medryk/bank-core-shared";

// export const parsePerformTransferRequest = (
//     value: AnyProps<ApiPerformTransferRequest>,
//     key?: string
// ): Parsing.ParseResult<ApiPerformTransferRequest> => {
//     if (value === null || value === undefined) {
//         return Parsing.missingValueError(key);
//     }

//     if (typeof value !== "object") {
//         return Parsing.failedParseObject(key);
//     }

//     const parsedFromId = Parsing.parseProp(value, "fromId", Parsing.parseNumber);
//     const parsedToId = Parsing.parseProp(value, "toId", Parsing.parseNumber);
//     const parsedAmount = Parsing.parseProp(value, "amount", Parsing.parseBig);

//     if (
//         Parsing.isFailedParseResult(parsedFromId) ||
//         Parsing.isFailedParseResult(parsedToId) ||
//         Parsing.isFailedParseResult(parsedAmount)
//     ) {
//         const parseErrors = Parsing.combineParseErrors(parsedFromId, parsedToId, parsedAmount);
//         return Parsing.failedParseProps(parseErrors, key);
//     }

//     const result: ApiPerformTransferRequest = {
//         fromId: parsedFromId.value,
//         toId: parsedToId.value,
//         amount: parsedAmount.value,
//     };
//     return Parsing.successfulParse(result);
// };
