export const classNames = (...args: any[]) => {
  return args.filter(Boolean).join(" ");
};

export const checkPassword = (password: string) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
  return regex.test(password);
}

export const checkEmail = (email: string) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}