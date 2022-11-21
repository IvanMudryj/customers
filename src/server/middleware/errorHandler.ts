import logger from "../../utils/logger";

/**
 * Error handler middleware.
 * @param {object} error throwable error.
 * @param {object} req   request object.
 * @param {object} res   response object.
 * @param {object} next  next middleware.
 * @returns {Promise}.
 */
const errorHandler = (err: any, req: any, res: any, next: any) => {
  const source = "errorHandler";

  // Return bad gateway if the error come with a status code.
  const { statusCode, status, statusText, message } = err;
  const statusResp = status || statusCode;
  const statusApiError = err && statusResp ? statusResp : 500;

  // Get detail.
  const messageError = message || statusText;
  const messageApiError = err && messageError ? messageError : "Internal server Error";

  res.status(statusApiError).json({
    status: statusApiError,
    message: messageApiError
  });
};
export default errorHandler;
