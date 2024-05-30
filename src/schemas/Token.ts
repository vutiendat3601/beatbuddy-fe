interface Token {
  token: string;
  tokenType: string;
  expiresIn: number;
}

const EMPTY_TOKEN: Token = {
  token: '',
  tokenType: '',
  expiresIn: 0,
};

export { EMPTY_TOKEN };

export default Token;
