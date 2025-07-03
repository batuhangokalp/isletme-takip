import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Customer {
  _id: string;
  name: string;
  surname: string;
  phone: string;
  address: string;
}

interface CustomersState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

// Fetch all customers
export const fetchCustomers = createAsyncThunk<Customer[]>(
  "customers/fetchCustomers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}customers`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add a customer
export const addCustomer = createAsyncThunk<Customer, Partial<Customer>>(
  "customers/addCustomer",
  async (newCustomerData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}customers`,
        newCustomerData
      );
      return response.data.customer;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update a customer
export const updateCustomer = createAsyncThunk<
  Customer,
  { id: string; data: Partial<Customer> }
>("customers/updateCustomer", async ({ id, data }, thunkAPI) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}customers/${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteCustomer = createAsyncThunk<
  string, // dönüş tipi: silinen customer id
  string, // parametre olarak customer id
  { rejectValue: string }
>("customers/deleteCustomer", async (id, thunkAPI) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}customers/${id}`);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState: CustomersState = {
  customers: [],
  loading: false,
  error: null,
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    // ekstra sync reducerlar istersen buraya
  },
  extraReducers: (builder) => {
    builder
      // fetchCustomers
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCustomers.fulfilled,
        (state, action: PayloadAction<Customer[]>) => {
          state.loading = false;
          state.customers = action.payload;
        }
      )
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // addCustomer
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addCustomer.fulfilled,
        (state, action: PayloadAction<Customer>) => {
          state.loading = false;
          state.customers.push(action.payload);
        }
      )
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // updateCustomer
      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCustomer.fulfilled,
        (state, action: PayloadAction<Customer>) => {
          state.loading = false;
          const index = state.customers.findIndex(
            (c) => c._id === action.payload._id
          );
          if (index !== -1) {
            state.customers[index] = action.payload;
          }
        }
      )
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        deleteCustomer.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.customers = state.customers.filter(
            (c) => c._id !== action.payload
          );
        }
      )
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default customersSlice.reducer;
