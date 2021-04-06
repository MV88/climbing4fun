// TODO remove this fixed token
export const state = () => ({
  user: {
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkNocm9ub3MiLCJ1c2VybmFtZSI6IkNocm9ub3MiLCJpYXQiOjE2MTYzNDg4OTIsImV4cCI6MTYyNTM0ODg5Mn0.J1P8s6YFGLq0eQzzyQS4lIqr1DqTqUVmwdVDkrj9xcU",
    accessTokenExpiry: null,
  },
  auth: {
    alreadyUsed: [],
  },
  editingItem: null,
});

export const mutations = {
  setUser(state, { user }) {
    state.user = user;
  },
  setUserErrors(state, auth) {
    state.auth = auth;
  },
  setEditingItem(state, item) {
    state.editingItem = item;
  },
  updateEditingItem(state, { prop, value }) {
    state.editingItem[prop] = value;
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
  editingItem: (state) => state.editingItem,
};
