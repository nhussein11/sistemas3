import { Menubar } from 'primereact/menubar'

const NavBar = () => {
  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-fw pi-home'
    },
    {
      label: 'Stock',
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

  return <Menubar model={items} />
}

export default NavBar
