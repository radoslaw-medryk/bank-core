import { parseAndValidate } from "../helpers/parseAndValidate";
import { parsePerformTransferRequest } from "../parsing/parsePerformTransferRequest";
import { validatePerformTransferRequest } from "../validation/validatePerformTransferRequest";
import { ParsedAndValidated } from "../helpers/ParsedAndValidated";
import { PerformTransferRequest } from "../models/PerformTransferRequest";
import { AnyProps } from "../helpers/AnyProps";

export const checkPerformTransferRequest = (
    value: AnyProps<PerformTransferRequest>
): ParsedAndValidated<PerformTransferRequest> => {
    return parseAndValidate(
        value,
        value => parsePerformTransferRequest(value),
        parsedValue => validatePerformTransferRequest(parsedValue, undefined)
    );
};
