import { TYPES } from "@/utils/types";
import Link from "next/link";



 export default function ButtonsTypes() {



return (
    <div className="flex-wrap mx-auto flexMid">
      <Link href="/" className="button-type">
              Tous
            </Link>
        {TYPES.map((type) => (
          <div key={type.slug} className="flex justify-center">
            <button type="button" className="button-type">
              <Link href={`/type/${type.slug}`}>{type.name}</Link>
            </button>
          </div>
        ))}
      </div>

  );

}