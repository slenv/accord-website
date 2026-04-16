import { create } from "zustand";

export const useCatalogStore = create((set, get) => ({
  // Data State
  products: [],
  categories: [],
  brands: [],
  page: 1,
  hasMore: true,
  totalProducts: 0,

  // Filter State
  searchTerm: "",
  selectedCategory: null,
  selectedBrand: null,

  // Cache Status
  isInitialized: false,

  // Actions
  setCategories: (categories) => set({ categories }),

  setBrands: (brands) => set({ brands }),

  setProductsData: (products, totalProducts, hasMore, page, append = false) =>
    set((state) => ({
      products: append ? [...state.products, ...products] : products,
      totalProducts,
      hasMore,
      page,
      isInitialized: true,
    })),

  setFilters: (searchTerm, selectedCategory, selectedBrand) => {
    // If filters change, we need to reset pagination and data on the next fetch
    const current = get();

    const catChanged =
      current.selectedCategory !==
      (selectedCategory ? String(selectedCategory) : null);
    const brandChanged =
      current.selectedBrand !== (selectedBrand ? String(selectedBrand) : null);
    const searchChanged = current.searchTerm !== searchTerm;

    if (searchChanged || catChanged || brandChanged) {
      set({
        searchTerm,
        selectedCategory: selectedCategory ? String(selectedCategory) : null,
        selectedBrand: selectedBrand ? String(selectedBrand) : null,
        products: [], // Clear products to force a fresh visual transition
        page: 1,
        isInitialized: false,
      });
    }
  },

  resetStore: () =>
    set({
      products: [],
      page: 1,
      hasMore: true,
      totalProducts: 0,
      searchTerm: "",
      selectedCategory: null,
      selectedBrand: null,
      isInitialized: false,
    }),
}));
