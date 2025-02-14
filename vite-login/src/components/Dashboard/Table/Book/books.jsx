import { useMemo, useState } from "react";
import { useGetAll } from "../../../../hooks/useGetAll"
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteForm } from "../DeleteForm";
import { BookForm } from "./BookForm";




export const Books = () => {

    const [open, setOpen] = useState(false);
    const [openDeleteForm, setOpenDeleteForm] = useState(false);
    const [editBookData, setEditBookData] = useState();
    const [deleteBookData, setDeleteBookData] = useState();

    const result = useGetAll('http://localhost:4000/all-bookdata');

    const data = result?.data || []

    const handleOpen = () => {
        setEditBookData();
        setOpen(true)
    };


    const handleEditOpen = (row) => {
        setEditBookData(row.original);
        setOpen(true);
    };

    const handleDeleteOpen = (row) => {
        setDeleteBookData(row.original);
        setOpenDeleteForm(true);
    }

    const columns = useMemo(
        () => [
            { accessorKey: 'title', header: 'Title ', enableGrouping: false, },
            { accessorKey: 'author', header: 'Author Name', enableGrouping: false, },
            // { accessorKey: 'publisher', header: 'Publisher', enableGrouping: true, },
            { accessorKey: 'formatted_date', header: 'Publication Date', enableGrouping: false, },
            { accessorKey: 'genre', header: 'Genre', enableGrouping: false, },
            { accessorKey: 'language', header: 'Language', enableGrouping: true, },
            { accessorKey: 'price', header: 'Price', enableGrouping: false, },
            { accessorKey: 'name', header: 'Name ', enableGrouping: false, },
            { accessorKey: 'contact_no', header: 'Contact Number', enableGrouping: false, },
            { accessorKey: 'email', header: 'Email', enableGrouping: false, },
            { accessorKey: 'nationality', header: 'Nationality', enableGrouping: false, },
            { accessorKey: 'designation', header: 'Designation', enableGrouping: false, },
        ],
        []
    );


    const table = useMaterialReactTable({
        data, columns,
        enableExpandAll: true,
        enableExpanding: true,
        enableGrouping: true,
        enableEditing: true,
        paginateExpandedRows: true,
        enableColumnDragging: false,


        renderRowActions: ({ row }) => {
            const isExpanded = Boolean(row.depth !== 0)
            return (
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Tooltip title="Edit">
                        <IconButton onClick={() => handleEditOpen(row)} sx={{
                            "& .MuiSvgIcon-root": {
                                color: isExpanded ? "gray" : "black" ,
                            },
                        }} disabled={isExpanded}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleDeleteOpen(row)} sx={{
                            "& .MuiSvgIcon-root": {
                                color:isExpanded ? "gray " : "red",
                            },
                        }} disabled={isExpanded}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            )
        },

        muiTopToolbarProps: {
            sx: {
                border: "1px solid rgba(81, 81, 81, .5)",
                color: "black",
                "& .MuiSvgIcon-root": {
                    color: "black !important",
                },
            },
        },
        muiBottomToolbarProps: {
            sx: {
                "& .MuiSvgIcon-root": {
                    color: "black !important",
                },
            },
        },
        muiTableHeadCellProps: {
            sx: {
                "& .MuiSvgIcon-root": {
                    color: "black !important",
                },
            },
        },
        muiTableProps: {
            sx: {
                "& .MuiSvgIcon-root": {
                    color: "black ",
                },
            },

        },

        initialState: {
            sorting: [
                { id: 'designation', desc: false },
            ],
        }
    });

    return (
        <>
            <div className="w-full flex justify-end mb-3">
                <Button
                    variant="contained"
                    sx={{ width: "200px", cursor: "pointer" }}
                    onClick={handleOpen}>
                    Create New Book
                </Button>
            </div>
            <BookForm refetch={result.refetch} open={open} setOpen={setOpen} bookId={editBookData ? editBookData?.book_id : null} ></BookForm>
            <DeleteForm open={openDeleteForm} setOpen={setOpenDeleteForm} value={"book"} deleteData={deleteBookData} onDelete={result.refetch} />
            <MaterialReactTable table={table} />
        </>

    );

}