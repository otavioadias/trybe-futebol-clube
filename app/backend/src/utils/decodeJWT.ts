import jwtDecode from 'jwt-decode';

interface MyToken {
  email: string,
  username: string,
  role: string,
  iat: number,
  exp: number
}

const userJWT = async (token: string) => {
  const decoded = jwtDecode<MyToken>(token);
  return decoded;
};

export default userJWT;
