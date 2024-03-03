import Link from "next/link";
import Container from "./Container";
import Button from "../utilities/Button";

export default function Header() {
  return (
    <Container>
      <div className="flex items-center justify-between w-full text-2xl ">
        <div>
          <Link href="/">Accueil</Link>
        </div>
        <div>
          <Link href="/">Ajouter</Link>
        </div>
        <div className="gap-3 flexMid">
          <Button><h4>Connexion</h4></Button>
        </div>
      </div>
    </Container>
  );
}
