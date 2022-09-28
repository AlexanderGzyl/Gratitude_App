import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import gratitudeService from './gratitudeService'

const initialState = {
  gratitudes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new 
export const createGratitude = createAsyncThunk(
  'gratitudes/create',
  async (gratitudeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await gratitudeService.createGratitude(gratitudeData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user gratitudes
export const getGratitudes = createAsyncThunk(
  'gratitudes/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await gratitudeService.getGratitudes(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user gratitude
export const deleteGratitude = createAsyncThunk(
  'gratitudes/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await gratitudeService.deleteGratitude(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)



export const gratitudeSlice = createSlice({
  name: 'gratitude',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGratitude.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGratitude.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.gratitudes.push(action.payload)
      })
      .addCase(createGratitude.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getGratitudes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGratitudes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.gratitudes = action.payload
      })
      .addCase(getGratitudes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteGratitude.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGratitude.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.gratitudes = state.gratitudes.filter(
          (gratitude) => gratitude._id !== action.payload.id
        )
      })
      .addCase(deleteGratitude.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      
  },
})

export const { reset } = gratitudeSlice.actions
export default gratitudeSlice.reducer