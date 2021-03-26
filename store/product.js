import { fireApp } from "@/plugins/firebase";

export const state = () => ({
  products: [],
  product: null,
  productCategories: []
});

export const mutations = {
  loadProducts(state, payload) {
    state.products = payload;
  },
  loadProduct(state, payload) {
    state.product = payload;
  },
  removeProduct(state, payload) {
    const i = state.products.indexOf(payload);
    state.products.splice(i, 1);
  }
};

export const actions = {
  addProduct({ dispatch, commit }, payload) {
    const productData = payload;
    commit("setBusy", true, { root: true });
    commit("clearError", null, { root: true });
    fireApp
      .database()
      .ref("products")
      .push(productData)
      .then(result => {
        dispatch("getProducts");
        commit("setBusy", false, { root: true });
        commit("setJobDone", true, { root: true });
      })
      .catch(error => {
        commit("setBusy", false, { root: true });
        commit("setError", error, { root: true });
      });
  },

  getProducts({ commit }) {
    fireApp
      .database()
      .ref("products")
      .once("value")
      .then(snapShot => {
        const products = [];
        let item = {};
        snapShot.forEach(child => {
          item = child.val();
          item.key = child.key;
          products.push(item);
        });
        commit("loadProducts", products.reverse());
      });
  },

  updateProduct({ dispatch, commit }, payload) {
    commit("setBusy", true, { root: true });
    commit("clearError", null, { root: true });
    fireApp
      .database()
      .ref(`products/${payload.key}`)
      .update(payload) // Update products data with updated product detail
      .then(() => {
        dispatch("getProducts");
        commit("setBusy", false, { root: true });
        commit("setJobDone", true, { root: true });
      })
      .catch(error => {
        commit("setBusy", false, { root: true });
        commit("setError", error, { root: true });
      });
  },

  removeProduct({ commit }, payload) {
    fireApp
      .database()
      .ref(`products/${payload.key}`)
      .remove()
      .then(() => {
        commit("removeProduct", payload);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export const getters = {
  products(state) {
    return state.products;
  },
  product(state) {
    return state.product;
  }
};
