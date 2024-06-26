import type { AddEthereumChainParameter } from '@web3-react/types'
import { constants } from 'ethers'
import { ChainId } from './type'

export interface Chain {
  chainId: number
  name: string
  symbol: string
  decimals: number
  dPoolFactoryAddress: string
  scan: string
  urls: string[]
  isTestNet: boolean
  graphUrl?: string
}

interface Chains {
  [key: number]: Chain
}

const Mainnet: Chain = {
  chainId: 1,
  name: 'Ethereum',
  symbol: 'ETH',
  decimals: 18,
  dPoolFactoryAddress: constants.AddressZero,
  scan: 'https://etherscan.io/tx/',
  urls: [],
  isTestNet: false,
}

const Goerli: Chain = {
  chainId: 5,
  name: 'Ethereum Goerli',
  symbol: 'ETH',
  decimals: 18,
  dPoolFactoryAddress: "0xE748216dE5b8347949f274611fE14D041897cC12",
  scan: 'https://goerli.etherscan.io/',
  urls: [],
  isTestNet: true,
}

const Polygon: Chain = {
  chainId: 137,
  name: 'Polygon',
  symbol: 'MATIC',
  decimals: 18,
  dPoolFactoryAddress: '0x43677d1e464EF3121B4Ea4Ff89133f71e05238e1',
  scan: 'https://polygonscan.com',
  urls: ['https://polygon-rpc.com'],
  graphUrl:
    'https://api.thegraph.com/subgraphs/name/socemtzmdrmndfg/dpoolpolygon',
  isTestNet: false,
}
const Arbitrum: Chain = {
  chainId: 42161,
  name: 'Arbitrum',
  symbol: 'ETH',
  decimals: 18,
  dPoolFactoryAddress: '0xC5A343Db03f89B45CA1C355fcd11ecf5B8b89092',
  scan: 'https://arbiscan.io',
  graphUrl:
  'https://api.thegraph.com/subgraphs/name/socemtzmdrmndfg/dpoolarbitrum',
  urls: ['https://arb1.arbitrum.io/rpc'],
  isTestNet: false,
}
const Mumbai: Chain = {
  chainId: 80001,
  name: 'Mumbai',
  symbol: 'MATIC',
  decimals: 18,
  dPoolFactoryAddress: '0x7B6e14296d50C81D1F831224CD271FE9aCC18bd1',
  scan: 'https://mumbai.polygonscan.com/',
  urls: [
    'https://polygontestapi.terminet.io/rpc',
    'https://rpc.ankr.com/polygon_mumbai',
  ],
  isTestNet: true,
}

const RinkeBy: Chain = {
  chainId: 4,
  name: 'Rinkeby',
  symbol: 'ETH',
  decimals: 18,
  dPoolFactoryAddress: '0x43677d1e464EF3121B4Ea4Ff89133f71e05238e1',
  scan: 'https://rinkeby.etherscan.io',
  urls: ['https://rpc.ankr.com/eth_rinkeby'],
  graphUrl:
    'https://api.thegraph.com/subgraphs/name/socemtzmdrmndfg/dpoolrinkeby',
  isTestNet: true,
}

export const chains: Chains = {
  // 1: Mainnet,
  5: Goerli,
  137: Polygon,
  42161: Arbitrum,
  // 4: RinkeBy,
  // 80001: Mumbai,
}
export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter | number {
  const chainInformation = chains[chainId]
  if (!chainInformation) return chainId
  return {
    chainId,
    chainName: chainInformation.name,
    nativeCurrency: {
      name: chainInformation.name,
      symbol: chainInformation.symbol,
      decimals: 18,
    },
    rpcUrls: chainInformation.urls,
    blockExplorerUrls: [chainInformation.scan],
  }
}

export const API_LIST: {
  [key in ChainId]: {
    key: string
    url: string
  }
} = {
  [ChainId.Polygon]: {
    key: import.meta.env.VITE_POLYGON_SCAN_KEY,
    url: 'https://api.polygonscan.com',
  },
  [ChainId.Mumbai]: {
    key: import.meta.env.VITE_POLYGON_SCAN_KEY,
    url: 'https://api-testnet.polygonscan.com',
  },
  [ChainId.RinkeBy]: {
    key: import.meta.env.VITE_ETHEREUM_SCAN_KEY,
    url: 'https://api-rinkeby.etherscan.io',
  },
  [ChainId.Goerli]: {
    key: import.meta.env.VITE_ETHEREUM_SCAN_KEY,
    url: 'https://api-goerli.etherscan.io',
  },
  // [ChainId.Ethereum]: {
  //   key: import.meta.env.VITE_ETHEREUM_SCAN_KEY,
  //   url: 'https://api.etherscan.io',
  // },
  [ChainId.Arbitrum]: {
    key: import.meta.env.VITE_ARBITRUM_SCAN_KEY,
    url: 'https://arbiscan.io',
  },
}

export const URLS: { [chainId: number]: string[] } = Object.keys(
  chains
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = chains[Number(chainId)].urls

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs
  }

  return accumulator
}, {})
