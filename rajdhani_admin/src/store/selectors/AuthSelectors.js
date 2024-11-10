export const isAuthenticated = (state) => {
    if (state.auth.auth.tokens?.token || state.auth?.auth?.token) return true;
    return false;
};
