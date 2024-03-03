import Card from "@/components/commons/Card";
import ButtonsTypes from "@/components/utilities/ButtonsTypes";
import { CHARACTERS } from "@/utils/characters";

export default function Home() {
  return (
    <div className="w-full">
      <h3 className="mb-2 text-center">Liste de personnages</h3>

      <ButtonsTypes />

      <div className="grid w-full grid-cols-2 gap-4 mx-auto my-4 md:grid-cols-3 lg:grid-cols-4">
        {CHARACTERS.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
