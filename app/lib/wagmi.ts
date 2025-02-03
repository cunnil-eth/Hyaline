import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
    appName: 'Hyaline',
    projectId: '0b16a524504eaf7dec898a63ac584904',
    chains: [arbitrum, arbitrumSepolia],
    transports: {
        [arbitrum.id]: http('https://arbitrum-mainnet.infura.io/v3/4c3f30bf61654b41ad626a44f98adb49'),
        [arbitrumSepolia.id]: http('https://arbitrum-sepolia.infura.io/v3/4c3f30bf61654b41ad626a44f98adb49'),
    },    
    ssr: false, // If your dApp uses server side rendering (SSR)
});
