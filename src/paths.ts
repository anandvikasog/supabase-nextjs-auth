export const paths = {
  public: {
    signIn: "/login",
    signUp: "/register",
    emailVerify: "/email-verified",
    forgetPassword: "/forgot-password",
    resetPassword: "/reset-password",
  },
  private: {
    dashboard: "/dashboard",
    emailVerified: "/email-verified",
    resetPassword: "/reset-password",
  },
  common: {
    home: "/",
  },
} as const;
