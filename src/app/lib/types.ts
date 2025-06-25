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

// Reset Password API
interface ResetPasswordAPI
{
  email: string;
  emailToken: string;
  newPassword: string;
  confirmPassword: string;
}

export type { SignUpType, SignInType, TokenAPI, ResetPasswordAPI };