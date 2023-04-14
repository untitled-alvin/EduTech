import { createTheme } from 'tamagui'
import { themes as tThemes } from "@tamagui/themes"
import { color } from './tokens'

type BaseTheme = typeof light

// note: we set up a single consistent base type to validate the rest:
const light = createTheme({
  ...tThemes.light,
  background: '#fff',
  color: color.greyscale900,
  divider: color.greyscale200,
})

// the rest of the themes use BaseTheme
const dark: BaseTheme = {
  ...tThemes.dark,
  background: color.dark1,
  color: '#fff',
  divider: color.dark3,
}

const primary: BaseTheme = {
  ...light,
  background: color.primary500,
  borderColor: color.primary500,
  backgroundStrong: color.primary700,
  color: '#fff',
}

// BUTTON
const primary_Button = primary
const light_social_Button = { ...light, borderColor: color.greyscale200 }
const light_secondary_Button = {
  ...light,
  background: color.primary100,
  backgroundStrong: color.primary200,
  color: color.primary500,
}
const dark_social_Button = { ...dark, background: color.dark3 }
const dark_secondary_Button = { ...dark, background: color.dark3 }

// INPUT
const light_Input = { ...light, background: color.greyscale50 }
const dark_Input = { ...dark, background: color.dark2 }

// LIST TILE
const light_ListTile = { ...light, background: '#fff' }
const dark_ListTile = { ...dark, background: color.dark2 }

const allThemes = {
  light,
  light_Input,
  light_ListTile,
  light_social_Button,
  light_secondary_Button,

  dark,
  dark_Input,
  dark_ListTile,
  dark_social_Button,
  dark_secondary_Button,

  primary,
  primary_Button,
}

// 2. then get the name type
type ThemeName = keyof typeof allThemes

// 3. then, create a Themes type that explicitly maps ThemeName => BaseTheme
type Themes = { [key in ThemeName]: BaseTheme }

// 4. finally, export it with the stricter type
export const themes: Themes = allThemes