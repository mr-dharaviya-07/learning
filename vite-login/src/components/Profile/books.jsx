import { useMemo } from "react";
import { useGetAll } from "../../hooks/useGetAll"
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";


export const Books = () => {

    const result = useGetAll('http://localhost:4000/all-bookdata');

    const data = result?.data || []


    const columns = useMemo(
        () => [
            { accessorKey: 'title', header: 'Title ', enableGrouping: false, },
            { accessorKey: 'author', header: 'Author Name', enableGrouping: false, },
            { accessorKey: 'publisher', header: 'Publisher', enableGrouping: true, },
            { accessorKey: 'formatted_date', header: 'Publication Date', enableGrouping: false, },
            { accessorKey: 'genre', header: 'Genre', enableGrouping: false, },
            { accessorKey: 'language', header: 'Language', enableGrouping: true, },
            { accessorKey: 'price', header: 'Price', enableGrouping: false, },
            { accessorKey: 'name', header: 'Name ', enableGrouping: false, },
            { accessorKey: 'contact_number', header: 'Contact Number', enableGrouping: false, },
            { accessorKey: 'email', header: 'Email', enableGrouping: false, },
            { accessorKey: 'nationality', header: 'Nationality', enableGrouping: false, },
            { accessorKey: 'designation', header: 'Designation', enableGrouping: false, },
        ],
        []
    );

    const table = useMaterialReactTable({
        data, columns,
        enableExpandAll: false,
        enableExpanding: true,
        enableGrouping: true,

        paginateExpandedRows: true,
        // manualPagination: true, 
        enableColumnDragging: false,
        muiTopToolbarProps: {
            sx: {
                border: '1px solid rgba(81, 81, 81, .5)',
                color: "black",
                '& .MuiSvgIcon-root': { color: "black" },
            },
        },
        muiBottomToolbarProps: {
            sx: {
                '& .MuiSvgIcon-root': { color: "black" },
            },
        },
        muiTableProps: {
            sx: {
                '& .MuiSvgIcon-root': { color: "black" },
            },
        },

        initialState: {
            sorting: [
                { id: 'designation', desc: false },
            ],
        }
    });

    return <MaterialReactTable table={table} />;

}