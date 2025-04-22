import { ClipboardText, House, Storefront, TShirt } from "@phosphor-icons/react";
import { Container, Link } from "./styles";

export function NavBar() {
  return (
    <Container>
      <Link>
        <House size={35} />
        Início
      </Link>
      <Link>
        <TShirt size={35} />
        Peças
      </Link>
      <Link>
        <ClipboardText size={35} />
        Pedidos
      </Link>
      <Link>
        <Storefront size={35} />
        Brechó
      </Link>
    </Container>
  )
}