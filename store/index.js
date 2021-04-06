// TODO remove this fixed token
export const state = () => ({
  user: {
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkNocm9ub3MiLCJ1c2VybmFtZSI6IkNocm9ub3MiLCJpYXQiOjE2MTYzNTI0MDIsImV4cCI6MTYyNTM1MjQwMn0.aWiTi3auIYSlnlLPMbn4Jvl47XR6kS3gO0MJF8UU8a4",
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
