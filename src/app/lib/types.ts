// Sign Up Type
interface SignUpType
{
  name: string;
  dob: string;
  email: string;
  password: string;
}

// Sign In Type
interface SignInType
{
  email: string;
  password: string;
}

// Token API
interface TokenAPI
{
  accessToken: string;
  refreshToken: string;
}

// Token
interface Token
{
  name: string;
  role: string;
}

export type { SignUpType, SignInType, TokenAPI, Token };