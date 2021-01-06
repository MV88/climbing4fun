export const state = () => ({
  showAddGalleryForm: false,
});

export const mutations = {
  showAddGalleryForm(state) {
    state.showAddGalleryForm = true;
  },
};
