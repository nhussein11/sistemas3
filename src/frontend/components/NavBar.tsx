import { Menubar } from 'primereact/menubar'
import { useRouter } from 'next/router'
import { Button } from 'primereact/button'

const NavBar = () => {
  const router = useRouter()
  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-fw pi-home',
      command: () => {
        router.push('/')
      }
    },
    {
      label: 'Stock',
      icon: 'pi pi-fw pi-pencil',
      command: () => {
        router.push('/stock')
      }
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-fw pi-user',
      command: () => {
        router.push('/stock')
      }
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
    }
  ]

  return (
    <Menubar
      model={items}
      end={
        <Button
          label="Cerrar Sesión"
          icon="pi pi-fw pi-power-off"
          className="p-button-raised-danger p-button-rounded"
        />
      }
    />
  )
}

export default NavBar
