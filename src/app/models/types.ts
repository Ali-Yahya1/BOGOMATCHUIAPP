// Sign Up Type
interface SignUpType
{
  firstName: string;
  lastName: string;
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

// Google Token
interface GoogleTokenAPI
{
  googleAccessToken: string;
}

// Reset Password API
interface ResetPasswordAPI
{
  email: string;
  emailToken: string;
  newPassword: string;
  confirmPassword: string;
}

// Link Type
interface LinkType
{
  name: string;
  icon: string;
  url: string;
  selected: boolean;
}

export type { SignUpType, SignInType, TokenAPI, GoogleTokenAPI, ResetPasswordAPI, LinkType };