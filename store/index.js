export const state = () => ({
  user: {
    accessToken: null,
    accessTokenExpiry: null,
  },
});

export const mutations = {
  setUser(state, { user }) {
    state.user = user;
  },
  setUserErrors(state, { message }) {
    state.user.error = message;
  },
};
