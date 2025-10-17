import * as Yup from "yup";

export const loginAndRegisterSchema = (isRegister: boolean) => {
  return Yup.object({
    fullName: isRegister
      ? Yup.string()
          .required("Full Name is required")
          .min(3, "Full Name must be at least 3 characters")
          .max(50, "Full Name must be at most 50 characters")
      : Yup.string(),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),
  });
};
