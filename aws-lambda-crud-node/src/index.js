module.exports.handler = async (event) => {

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hola Mundo",
        input: event,
      },
      null,
      2
    ),
  };
};
