export const getPasswordLevel = (password: string) => {
  let level = 0;
  if (password.length >= 8) level++;
  if (/[A-Z]/.test(password)) level++;
  if (/[a-z]/.test(password)) level++;
  if (/[0-9]/.test(password)) level++;
  if (/[@$!%*?&]/.test(password)) level++;
  return level;
};
