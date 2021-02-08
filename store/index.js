export const state = () => ({
  user: {
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkNocm9ub3MiLCJ1c2VybmFtZSI6IkNocm9ub3MiLCJpYXQiOjE2MTI4MTc5NzksImV4cCI6MTYxMjkwNzk3OX0.L7ZWOBcyottFDUJ4yy4_XxRrnoUsrBsVmjzEt56UWEE",
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

export const getters = {
  isLoggedIn: (state) => true || !!state.user.accessToken, // TODO restore this
  accessToken: (state) => state.user.accessToken,
};
