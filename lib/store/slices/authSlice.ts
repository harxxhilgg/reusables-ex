import { Session, User } from '@supabase/supabase-js';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '@/lib/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  session: null,
  loading: true,
  initialized: false,
};

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return {
      user: session?.user ?? null,
      session: session ?? null,
    };
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as { auth: AuthState };
      if (state.auth.initialized) {
        return false;
      }
      return true;
    },
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.loading = false;
    },
    clearAuth: (state) => {
      state.user = null;
      state.session = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.loading = false;
        state.initialized = true;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
      });
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
