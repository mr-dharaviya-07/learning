import { useMemo } from "react";
import { useGetAll } from "../../hooks/useGetAll"
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";



export const Authores = () => {

    const result = useGetAll('http://localhost:4000/all-authordata')

    const data = result?.data || [];

    const columns = useMemo(
        () => [
            { accessorKey: 'name', header: 'Name ', enableGrouping: false },
            { accessorKey: 'contact_number', header: 'Contact Number', enableGrouping: false },
            { accessorKey: 'email', header: 'Email', enableGrouping: false },
            { accessorKey: 'nationality', header: 'Nationality', enableGrouping: false },
            { accessorKey: 'title', header: 'Book Title ', enableGrouping: false },
            { accessorKey: 'formatted_date', header: 'Publication Date', enableGrouping: false },
            { accessorKey: 'genre', header: 'Genre', enableGrouping: false },
            {
                accessorKey: 'language', header: 'Language',
                enableGrouping: true
            },
            { accessorKey: 'author', header: 'Author Name', enableGrouping: false, },
            { accessorKey: 'co_author', header: 'Co-author', enableGrouping: false },
            { accessorKey: 'price', header: 'Price', enableGrouping: false },
        ],
        []
    );

    const table = useMaterialReactTable({
        data, columns,
        enableExpanding: true,
        enableGrouping: true,
        muiTopToolbarProps: {
            sx: {
                border: '1px solid rgba(81, 81, 81, .5)',
                color: "black",
                '& .MuiSvgIcon-root': { color: "black" },
            },
        },

        muiTableProps: {
            sx: {
                '& .MuiSvgIcon-root': { color: "black" },
            },
        }
    });

    return <MaterialReactTable table={table} />;

} 