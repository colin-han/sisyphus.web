import { Action } from "@reduxjs/toolkit";

interface PayloadAction<TType, TPayload> extends Action<TType> {
    payload: TPayload;
}