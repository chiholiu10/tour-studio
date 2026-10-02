import "styled-components";
import { designTokens } from "./tokens";

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: { mobile: string; tablet: string; desktop: string; wide: string };
    tokens: { [Key in keyof typeof designTokens]: string };
  }
}
