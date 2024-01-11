class ApiError extends Error {
  constructor(status, message, error = [], success = "false") {
    super(message);
    this.status = status;
    this.error = error;
    this.success = success;
    this.stack = Error.stack;
  }
}

export default ApiError;
