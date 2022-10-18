import { Button } from 'primereact/button'
import { Menubar } from 'primereact/menubar'
import { useRouter } from 'next/router'

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
      label: 'Productos',
      icon: 'pi pi-fw pi-box',
      command: () => {
        router.push('/productos')
      }
    },
    {
      label: 'Stock',
      icon: 'pi pi-fw pi-table',
      command: () => {
        router.push('/stock')
      }
    },
    {
      label: 'Depositos',
      icon: 'pi pi-fw pi-database',
      command: () => {
        router.push('/stores')
      }
    },
    {
      label: 'Comprobantes',
      icon: 'pi pi-fw pi-book',
      items: [
        {
          label: 'Ingresos',
          icon: 'pi pi-fw pi-file',
          command: () => {
            router.push('/records?type=ing')
          }
        },
        {
          label: 'Egresos',
          icon: 'pi pi-fw pi-file',
          command: () => {
            router.push('/records?type=egr')
          }
        },
        {
          label: 'Inscripciones',
          icon: 'pi pi-fw pi-dollar',
          command: () => {
            router.push('/enrollments')
          }
        }
      ]
    },
    {
      label: 'Educación',
      icon: 'pi pi-fw pi-book',
      items: [
        {
          label: 'Cursos',
          icon: 'pi pi-fw pi-book',
          command: () => {
            router.push('/courses')
          }
        },
        {
          label: 'Alumnos',
          icon: 'pi pi-fw pi-users',
          command: () => {
            router.push('/students')
          }
        },
        {
          label: 'Inscripciones',
          icon: 'pi pi-fw pi-dollar',
          command: () => {
            router.push('/enrollments')
          }
        }
      ]
    },

    {
      label: 'Ventas',
      icon: 'pi pi-fw pi-check',
      command: () => {
        router.push('/sales')
      }
    }
  ]

  return (
    <Menubar
      model={items}
      end={
        <Button
          label="Cerrar Sesión"
          icon="pi pi-fw pi-power-off"
          className="p-button-p-button-raised p-button-danger"
        />
      }
    />
  )
}

export default NavBar
