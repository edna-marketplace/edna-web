import { ClipboardText, House, Storefront, TShirt } from "@phosphor-icons/react";
import { Container, Link } from "./styles";
import { useRouter } from "next/router";

export function NavBar() {
  const router = useRouter();

  const currentPath = router.pathname;

  return (
    <Container>
      <Link
        isActive={currentPath === "/"}
        onClick={() => router.push("/")}
      >
        <House
          weight={currentPath === "/" ? "fill" : "regular"}
          size={30}
        />
        Início
      </Link>
      <Link
        isActive={currentPath === "/clothes"}
        onClick={() => router.push("/clothes")}
      >
        <TShirt
          weight={currentPath === "/clothes" ? "fill" : "regular"}
          size={30}
        />
        Peças
      </Link>
      <Link
        isActive={currentPath === "/orders"}
        onClick={() => router.push("/orders")}
      >
        <ClipboardText
          weight={currentPath === "/orders" ? "fill" : "regular"}
          size={30}
        />
        Pedidos
      </Link>
      <Link
        isActive={currentPath === "/store"}
        onClick={() => router.push("/store")}
      >
        <Storefront
          weight={currentPath === "/store" ? "fill" : "regular"}
          size={30}
        />
        Brechó
      </Link>
    </Container>
  )
}