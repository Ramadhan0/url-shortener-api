const response = (res, status, message, data) => {
  console.log(status, message);
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export default response;
