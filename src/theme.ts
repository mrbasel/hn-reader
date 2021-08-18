import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';

const styles = {
    global: (props: any) => ({
        body: {
            bg: mode('gray.100', '#262626')(props),
            // bg: mode('gray.100', '#121212')(props),
        },
    }),
};

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
}

const theme = extendTheme({ config, styles });

export default theme;