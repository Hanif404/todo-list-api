import customError from "./CustomError";
type ErrorCode = "ERR_NF" | "ERR_UNAUTHORIZED" | "ERR_FORBIDDEN" | "ERR_INTERNAL_SERVER";

class MessageError extends customError<ErrorCode> {}
export default MessageError;