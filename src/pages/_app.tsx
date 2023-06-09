import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/presentation/style/theme";

const inter = Inter({ subsets: ["latin"] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </main>
  );
}
