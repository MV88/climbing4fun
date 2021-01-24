export const state = () => ({
  user: {
    accessToken: null,
    accessTokenExpiry: null,
  },
  auth: {
    alreadyUsed: [],
  },
});

export const mutations = {
  setUser(state, { user }) {
    state.user = user;
  },
  setUserErrors(state, auth) {
    state.auth = auth;
  },
  resetServerErrors(state, name) {
    /* eslint-disable */
    state.auth.alreadyUsed = state.auth.alreadyUsed.filter(
      (item) => item !== name
    );
    /* eslint-enable */
  },
};
