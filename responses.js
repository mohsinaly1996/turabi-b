export function reply(statusNo, state, message) {
  return res.status(statusNo).json({
    status: state,
    message: message,
  });
}
