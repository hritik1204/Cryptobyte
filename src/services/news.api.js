import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cryptoApi } from "./cryptoApi";


const cryptoNewsApiHeaders =  {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'b9516ba0ddmshdec657960dd6954p15aa2djsn48db9be20e14',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }
  
const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });


export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        cryptosNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
})

export const { useCryptosNewsQuery } = cryptoNewsApi;