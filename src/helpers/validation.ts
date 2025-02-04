/** Helper function to validate email, phone number, and empty values*/

export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPhoneNumberValid = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

export const isEmpty = (value: any): boolean => {
  return (
    value == null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
};
