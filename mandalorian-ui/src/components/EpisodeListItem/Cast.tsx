import { CastItem } from "../../types"
import { Character } from "./Character";

interface Props {
  cast: CastItem[]
}

export const Cast: React.FC<Props> = ({cast}) => {
  const flatten = cast.flatMap(({characters, actor}) => characters.map(character => ({character, actor})));

  return <>{flatten.map(Character)}</>
};