
import Link from "next/link";



 export default function ButtonsTypes({types}) {



return (
    <div className="flex-wrap mx-auto flexMid">
      <Link href="/" className="button-type">
              Tous
            </Link>
        {types.map((type) => (
          <div key={type.slug} className="flex justify-center">
            <button type="button" className="button-type">
              <Link href={`/type/${type.slug}`}>{type.type}</Link>
            </button>
          </div>
        ))}
      </div>

  );

}