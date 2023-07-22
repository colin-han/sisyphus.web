import { createAsyncThunk, createReducer, createSlice } from '@reduxjs/toolkit'
import * as flowApi from '@/apis/flow';
import { FlowInfo } from '@/types/flow';

export const UPDATE_FLOWS = 'UPDATE_FLOWS';

interface FlowsStatus {
    flows: FlowInfo[];
}

export const fetchFlowList = createAsyncThunk('flows/fetchFlowList', async () => {
    const response = await flowApi.fetchFlowList();
    if (!response.success) throw new Error(response.error);
    return response.data as { flows: FlowInfo[] };
});

const flowListSlice = createSlice({
    name: 'flowList',
    initialState: { flows: [] } as FlowsStatus,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFlowList.fulfilled, (state, action) => {
            state.flows = action.payload.flows;
        });
    }
});

export default flowListSlice.reducer