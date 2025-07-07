import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { Bitacora } from '../data/schema'


interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData extends Bitacora>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      {/* Contenedor principal de los elementos de filtro/búsqueda */}
      <div className='flex flex-1 items-center space-x-2'> {/* CAMBIO: `flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2` */}
        {/* Aquí estaba: `flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2` */}
        {/* Ahora es: `flex flex-1 items-center space-x-2` para mantener todo en una fila por defecto */}

        <Input
          placeholder='Filtrar por Usuario...'
          value={
            (table.getColumn('username')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('username')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  )
}