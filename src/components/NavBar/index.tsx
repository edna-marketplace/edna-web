import { useState } from 'react'
import {
  ClipboardText,
  House,
  Storefront,
  TShirt,
  List,
} from '@phosphor-icons/react'
import {
  Container,
  Link,
  DrawerOverlay,
  DrawerContent,
  DrawerToggle,
} from './styles'
import { useRouter } from 'next/router'
import { useIsMobile } from '@/hooks/use-is-mobile'

export function NavBar() {
  const router = useRouter()
  const currentPath = router.pathname
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { path: '/', label: 'Início', icon: House },
    { path: '/clothes', label: 'Peças', icon: TShirt },
    { path: '/orders', label: 'Pedidos', icon: ClipboardText },
    { path: '/store', label: 'Brechó', icon: Storefront },
  ]

  const renderLinks = () =>
    links.map(({ path, label, icon: Icon }) => (
      <Link
        key={path}
        isActive={currentPath === path}
        onClick={() => {
          router.push(path)
          setIsOpen(false) // close drawer after click
        }}
      >
        <Icon weight={currentPath === path ? 'fill' : 'regular'} size={30} />
        {label}
      </Link>
    ))

  if (isMobile) {
    return (
      <>
        <DrawerToggle onClick={() => setIsOpen(true)}>
          <List size={28} />
        </DrawerToggle>

        {isOpen && (
          <>
            <DrawerOverlay onClick={() => setIsOpen(false)} />
            <DrawerContent>{renderLinks()}</DrawerContent>
          </>
        )}
      </>
    )
  }

  return <Container>{renderLinks()}</Container>
}
