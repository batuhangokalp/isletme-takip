// features/products/productSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type ProductType = "Halı" | "Kilim" | "Yorgan" | "Diğer";

export interface Product {
  _id?: string;
  name: string;
  type: ProductType;
  width: number | "";
  height: number | "";
  color: string;
  description: string;
  pricePerSquareMeter: number | "";
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk - ürün ekleme
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct: Omit<Product, "_id">, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}products`,
        newProduct
      );
      return response.data; // Yeni eklenen ürün döner
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Eğer başka reducerlar varsa buraya ekle
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
