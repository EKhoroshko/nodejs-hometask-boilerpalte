const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.err?.message === "Incorrect login or password" ||
    res.err?.message === "Incorrect password") {
    return res.status(400).json({ error: true, message: res.err.message });
  }
  if (res.err?.message === "User not found" ||
    res.err?.message === "Fighter not found") {
    return res.status(404).json({ error: true, message: res.err.message })
  }
  if (res.err?.message === "Email or phone already in use" ||
    res.err?.message === "There is already a fighter with that name") {
    return res.status(409).json({ error: true, message: res.err.message })
  } else {
    res.status(200).json(res.data);
  }

  next();
}

exports.responseMiddleware = responseMiddleware;