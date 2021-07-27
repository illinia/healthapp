export const validateEmail = email => {
  const regex =
    /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
  return regex.test(email);
};

export const removeWhitespace = text => {
  const regex = /\s/g;
  return text.replace(regex, '');
};

export const checkNumber = cal => {
  const regex = /^[0-9]+$/;
  return regex.test(cal);
};

export const checkTrim = text => {
  const regex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]+( +[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]+)*$/;
  return regex.test(text);
};
