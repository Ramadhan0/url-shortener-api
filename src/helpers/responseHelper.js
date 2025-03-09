const response = (res, status, message, data, error) => {
  console.log(status, message)

  if (data)return res.status(status).json({
    status,
    message,
    data,
  })

  if (error) return res.status(status).json({
    status,
    message,
    error,
  })

  return res.status(status).json({
    status,
    message,
  })
}

export default response
