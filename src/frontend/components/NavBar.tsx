import { Button } from 'primereact/button'
import { Menubar } from 'primereact/menubar'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { isLoadState } from '../atoms/isLoadState'
import { selectedRecordTypeState } from '../atoms/records/selectedRecordType'
import { RecordNameEnum, RecordType } from '@prisma/client'
import useRecordTypesQuery from '../hooks/records/useRecordTypesQuery'

const NavBar = () => {
  const router = useRouter()
  const recordTypesQuery = useRecordTypesQuery('record-type')
  const [, setLoading] = useRecoilState(isLoadState)
  const [, setSelectedRecordType] = useRecoilState(selectedRecordTypeState)
  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-fw pi-home',
      command: () => {
        router.replace('/')
      }
    },
    {
      label: 'Productos',
      icon: 'pi pi-fw pi-box',
      command: () => {
        setLoading(true)
        router.replace('/productos')
      }
    },
    {
      label: 'Stock',
      icon: 'pi pi-fw pi-table',
      command: () => {
        setLoading(true)
        router.replace('/stock')
      }
    },
    {
      label: 'Depositos',
      icon: 'pi pi-fw pi-database',
      command: () => {
        setLoading(true)
        router.replace('/stores')
      }
    },
    {
      label: 'Comprobantes',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Ingresos',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            setLoading(true)
            router.replace('/records?type=ing')
          }
        },
        {
          label: 'Egresos',
          icon: 'pi pi-fw pi-minus',
          command: () => {
            setLoading(true)
            router.replace('/records?type=egr')
          }
        },
        {
          label: 'Nuevo',
          icon: 'pi pi-fw pi-file',
          command: () => {
            setLoading(true)
            router.replace('/newRecord')
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
            setLoading(true)
            router.replace('/courses')
          }
        },
        {
          label: 'Alumnos',
          icon: 'pi pi-fw pi-users',
          command: () => {
            setLoading(true)
            router.replace('/students')
          }
        },
        {
          label: 'Inscripciones',
          icon: 'pi pi-fw pi-user-edit',
          command: () => {
            setLoading(true)
            router.replace('/enrollments')
          }
        },
        {
          label: 'Cobros Cursos',
          icon: 'pi pi-fw pi-dollar',
          command: () => {
            setLoading(true)
            setSelectedRecordType(recordTypesQuery.data?.recordsTypes.find((recordType: RecordType) => recordType.recordName === RecordNameEnum.FACTURA_DUPLICADO))
            router.replace('/newRecord')
          }
        }
      ]
    },
    {
      label: 'Ventas',
      icon: 'pi pi-fw pi-dollar',
      command: () => {
        setLoading(true)
        setSelectedRecordType(recordTypesQuery.data?.recordsTypes.find((recordType: RecordType) => recordType.recordName === RecordNameEnum.FACTURA_DUPLICADO))
        router.replace('/newRecord')
      }
    },
    {
      label: 'Compras',
      icon: 'pi pi-fw pi-shopping-cart',
      command: () => {
        setLoading(true)
        setSelectedRecordType(recordTypesQuery.data?.recordsTypes.find((recordType: RecordType) => recordType.recordName === RecordNameEnum.FACTURA_ORIGINAL))
        router.replace('/newRecord')
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
