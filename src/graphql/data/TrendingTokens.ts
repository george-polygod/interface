import gql from 'graphql-tag'
import { useMemo } from 'react'

import { useTrendingTokensQuery } from './__generated__/types-and-hooks'
import { chainIdToBackendName, unwrapToken } from './util'

gql`
  query TrendingTokens($chain: Chain!) {
    topTokens(pageSize: 4, page: 1, chain: $chain, orderBy: VOLUME) {
      id
      decimals
      name
      chain
      standard
      address
      symbol
      market(currency: USD) {
        id
        price {
          id
          value
          currency
        }
        pricePercentChange(duration: DAY) {
          id
          value
        }
        volume24H: volume(duration: DAY) {
          id
          value
          currency
        }
      }
      project {
        id
        logoUrl
        safetyLevel
      }
    }
  }
`

export default function useTrendingTokens(chainId?: number) {
  const chain = chainIdToBackendName(chainId)
  const { data, loading } = useTrendingTokensQuery({ variables: { chain } })

  return useMemo(
    () => ({ data: [
      {
        "__typename": "Token",

        "decimals": 18,
        "name": "HairyPlotterFTX",
        "chain": "ETHEREUM",
        "standard": "ERC20",
        "address": "0xb1a822ce8c799b0777ed1f260113819247e1bf26",
        "symbol": "FTX",
        "imageUrl":""
      
       
    }].map((token) => unwrapToken(chainId ?? 1, token)), loading }),
    [chainId, data?.topTokens, loading]
  )
}
