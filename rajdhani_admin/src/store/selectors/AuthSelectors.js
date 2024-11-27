export const isAuthenticated = (state) => {
    console.log(state, "state is here");
    if (state.auth.auth.tokens?.token || state.auth?.auth?.token) return true;
    return false;
};
