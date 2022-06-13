const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.err.message === "Incorrect login or password") {
    return res.status(400).json({ error: true, message: res.err.message });
  }
  if (res.err.message === "User not found") {
    return res.status(404).json({ error: true, message: res.err.message })
  }
  if (res.err.message === "Incorrect password") {
    return res.status(401).json({ error: true, message: res.err.message })
  }
  if (res.data) {
    return res.status(200).json(res.data)
  }
  next();
}

exports.responseMiddleware = responseMiddleware;