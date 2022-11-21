const getUserService = async () => {
  return "Adelys Belen";
};

const validateEmail = async (email: string) => {
  if (email === "adalbeca@gmail.com") {
    return true;
  }

  return null;
};

const validateCode = async (code: string) => {
  if (code === "123456") {
    return true;
  }
  return null;
};

export {
  getUserService,
  validateEmail,
  validateCode
};
