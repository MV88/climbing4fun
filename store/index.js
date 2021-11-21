import get from "lodash/get";

export const state = () => ({
  user: {
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkNocm9ub3MiLCJ1c2VybmFtZSI6IkNocm9ub3MiLCJpYXQiOjE2MzcwOTM4MzUsImV4cCI6MTY0NjA5MzgzNX0.rFfG9Ne24402u1-93mmLgwvxSAkFBkdLnK8hbImiuwQ",
    accessTokenExpiry: null,
  },
  auth: {
    alreadyUsed: [],
  },
  editingItem: null,
  show: {
    delete: {},
  },
  resources: {},
  generic: {
    discord:
      "https://discord.com/channels/760625029930156042/802638566017859584",
  },
});

export const mutations = {
  setUser(state, { user }) {
    state.user = { ...user };
  },
  setUserErrors(state, auth) {
    state.auth = { ...auth };
  },
  setResources(state, { name, resources }) {
    state.resources = { ...state.resources, [name]: [...resources] };
  },
  setEditingItem(state, item) {
    state.editingItem = { ...item };
  },
  updateEditingItem(state, { prop, value }) {
    state.editingItem = {
      ...state.editingItem,
      [prop]: value,
    };
  },
  setShowDeleteFlag(state, { path, value }) {
    state.show = {
      ...state.show,
      delete: {
        ...state.show.delete,
        [path]: value,
      },
    };
  },
  resetServerErrors(state, name) {
    state.auth.alreadyUsed = [
      ...state.auth.alreadyUsed.filter((item) => item !== name),
    ];
  },
};

export const getters = {
  isLoggedIn: (state) => true || !!state.user.accessToken, // TODO restore this
  accessToken: (state) => state.user.accessToken,
  editingItem: (state) => state.editingItem,
  getShowDeleteGalleryById: (state) => state.show.delete.galleryById,
  getResources: (state) => state.resources,
  getResourcesAttempts: (state) => state.resources.attempts || [],
  getResourcesStyles: (state) => state.resources.styles || [],
  getResourcesGalleries: (state) => state.resources.galleries || [],
  getResourcesRopes: (state) => state.resources.ropes || [],
  getResourcesRoutes: (state) => state.resources.routes || [],
  discord: (state) => state.generic.discord,
  getShowDeleteFlag: (state) => (path) =>
    get(state, `show.delete.${path}`, false),
};
