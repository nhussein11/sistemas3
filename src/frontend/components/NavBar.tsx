import { Menubar } from 'primereact/menubar'
import { useRouter } from 'next/router'

const NavBar = () => {
  const router = useRouter()
  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-fw pi-home',
      command: () => { router.push('/') }
    },
    {
      label: 'Stock',
      icon: 'pi pi-fw pi-pencil',
      command: () => { router.push('/stock') }
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Nuevo',
          icon: 'pi pi-fw pi-plus'
        },
        {
          label: 'Borrar',
          icon: 'pi pi-fw pi-plus'
        },
        {
          label: 'Buscar',
          icon: 'pi pi-fw pi-plus'
        }
      ]
    },
    {
      label: 'Movimientos',
      icon: 'pi pi-fw pi-pencil',
      items: [
        {
          label: 'Nuevo',
          icon: 'pi pi-fw pi-plus'
        },
        {
          label: 'Borrar',
          icon: 'pi pi-fw pi-plus'
        },
        {
          label: 'Buscar',
          icon: 'pi pi-fw pi-plus'
        }
      ]
    },
    {
      label: 'Salir',
      icon: 'pi pi-fw pi-power-off'
    }
  ]

  return <Menubar model={items} onClick={(element) => console.log(element)}/>
}

export default NavBar
