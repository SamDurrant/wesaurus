import { createGlobalStyle } from 'styled-components'

const GlobalStyleTheme = createGlobalStyle`
body {
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: all 0.50s linear;
}
`
export default GlobalStyleTheme
