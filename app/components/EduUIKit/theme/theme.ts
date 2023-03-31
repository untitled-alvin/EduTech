import { createTheme } from 'tamagui'
import { themes as tamaguiThemes } from "@tamagui/themes"
import { tokens } from './tokens'

type BaseTheme = typeof light

// note: we set up a single consistent base type to validate the rest:
const light = createTheme({
  ...tamaguiThemes.light,
  background: '#fff',
  color: tokens.color["greyscale900"],
  divider: tokens.color["greyscale200"],
})
const light_button_secondary = {
  ...light,
  background: tokens.color["primary100"],
  backgroundStrong: tokens.color["primary200"],
  color: tokens.color["primary500"],
}
const light_input = { ...light, background: tokens.color["greyscale50"], }
const light_list_tile = { ...light, background: '#fff' }

// the rest of the themes use BaseTheme
const dark: BaseTheme = {
  ...tamaguiThemes.dark,
  background: tokens.color["dark1"],
  color: '#fff',
  divider: tokens.color["dark3"],
}
const dark_button_secondary = { ...dark, background: tokens.color["dark3"] }
const dark_input = { ...dark, background: tokens.color["dark2"], }
const dark_list_tile = { ...dark, background: tokens.color["dark2"] }

const primary500: BaseTheme = {
  ...light,
  background: tokens.color["primary500"],
  borderColor: tokens.color["primary500"],
  backgroundStrong: tokens.color["primary700"],
  color: '#fff',
}

const light_social: BaseTheme = {
  ...light,
  borderColor: tokens.color["greyscale200"],
}

const dark_social: BaseTheme = { ...dark, background: tokens.color["dark3"] }

const allThemes = {
  light,
  light_input,
  light_button_secondary,
  light_list_tile,
  light_social,

  dark,
  dark_input,
  dark_button_secondary,
  dark_list_tile,
  dark_social,

  primary500,
  button_primary500: primary500,
}

// 2. then get the name type
type ThemeName = keyof typeof allThemes

// 3. then, create a Themes type that explicitly maps ThemeName => BaseTheme
type Themes = { [key in ThemeName]: BaseTheme }

// 4. finally, export it with the stricter type
export const themes: Themes = allThemes