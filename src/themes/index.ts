import { createTheme } from '@mui/material/styles';

// assets
import colors from './_themes-vars.module.scss';
import darkColors from './_themes-vars.dark.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { UserSettingsState } from '../store/features/settings/settings.state';
import { PaletteMode } from '@mui/material';

declare module '@mui/material/styles' {
    interface Theme {
        typography: TypographyOptions & {
            customInput: any;
        };
    }
    // allow configuration using `createTheme`
    // interface ThemeOptions {
    //     typography?: TypographyOptions & {
    //         customInput?: any;
    //     } | undefined;
    // }
}

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (mode: PaletteMode) => {
    const color = (mode === 'light') ? colors : darkColors;
    
    const themeOption = {
        colors: color,
        heading: color.grey900,
        paper: color.paper,
        backgroundDefault: color.backgroundDefault,
        background: color.primaryLight,
        darkTextPrimary: color.grey700,
        darkTextSecondary: color.grey500,
        textDark: color.grey900,
        menuSelected: color.secondaryDark,
        menuSelectedBack: color.secondaryLight,
        divider: color.grey200,
        // customization
    };

    const themeOptions = {
        direction: 'ltr' as const,
        palette: themePalette(themeOption, mode),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: (themeTypography(themeOption) as TypographyOptions & {customInput: any})
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default theme;
