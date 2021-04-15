import get from "lodash/get";

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
  show: {
    delete: {},
  },
  resources: {},
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
  getShowDeleteFlag: (state) => (path) =>
    get(state, `show.delete.${path}`, false),
};
