const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const resultLength = 10;

// todo: Get random symbols
/**
 * Generate random symbols
 * @returns Get random 10 symbols
 */
const getCode = () => {
  let result = '';

  let codeLength = symbols.length;
  for (let i = 0; i < resultLength; i++) {
    result += symbols.charAt(Math.floor(Math.random() * codeLength));
  }

  return result;
}

export default getCode;