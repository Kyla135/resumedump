export const validateRegister = (data) => {
    if (!data.email || !data.password) return false;
    return true;
};