import { applyMiddleware } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import cors from "cors";


const apiKey = 'coinranking28e7b37bf3a10f44029e27350836b1979b4e867618ee4dd8coinranking28e7b37bf3a10f44029e27350836b1979b4e867618ee4dd8';

const cryptoApiHeaders = {
    // origin: "http://localhost:3000/",
    'x-access-token': apiKey,
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': 'b9516ba0ddmshdec657960dd6954p15aa2djsn48db9be20e14',
    "X-Requested-With": "XMLHttpRequest"

    // "Access-Control-Allow-Origin": "*"

}

const baseUrl = 'https://api.coinranking.com/v2';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })


export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        Cryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
        }),
    })
})

export const { useCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
