interface CharacterProps {
  character: string;
  actor: string;
}

export const Character: React.FC<CharacterProps> = ({ actor, character }) => {
  return (
    <>
      <div className="character">{character}</div>
      <div className="actor">{actor}</div>
    </>
  );
};