import { createTheme } from 'tamagui'
import { themes as tamaguiThemes } from "@tamagui/themes"

import { tokens } from './tokens'

type BaseTheme = typeof light

// note: we set up a single consistent base type to validate the rest:
const light = createTheme({
  ...tamaguiThemes.light,
  background: '#fff',
  color: tokens.color["greyscale900"],
})
const light_secondary_button = {
  ...light,
  background: tokens.color["primary100"],
  color: tokens.color["primary500"],
}
const light_input = { ...light, background: tokens.color["greyscale50"], }
const light_list_tile = { ...light, background: '#fff' }

// the rest of the themes use BaseTheme
const dark: BaseTheme = {
  ...tamaguiThemes.dark,
  background: tokens.color["dark1"],
  color: '#fff',
}
const dark_secondary_button = { ...dark, background: tokens.color["dark3"] }
const dark_input = { ...dark, background: tokens.color["dark2"], }
const dark_list_tile = { ...dark, background: tokens.color["dark2"] }

const primary500: BaseTheme = {
  ...tamaguiThemes.light,
  background: tokens.color["primary500"],
  color: '#fff',
}

const allThemes = {
  light,
  light_input,
  light_secondary_button,
  light_list_tile,

  dark,
  dark_input,
  dark_secondary_button,
  dark_list_tile,

  primary500,
}

// 2. then get the name type
type ThemeName = keyof typeof allThemes

// 3. then, create a Themes type that explicitly maps ThemeName => BaseTheme
type Themes = { [key in ThemeName]: BaseTheme }

// 4. finally, export it with the stricter type
export const themes: Themes = allThemes