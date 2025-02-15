import { useMemo, useState } from "react";
import { useGetAll } from "../../../../hooks/useGetAll"
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { AuthorForm } from "./AuthorForm";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteForm } from "../DeleteForm";


export const Authores = () => {

    const result = useGetAll('http://localhost:4000/all-authordata')

    const data = result?.data || [];

    const [open, setOpen] = useState(false);
    const [editAuthorData, setEditAuthorData] = useState();
    const [openDeleteForm, setOpenDeleteForm] = useState();
    const [deleteAuthorData, setDeleteAuthorData] = useState();


    const handleOpen = () => {
        setEditAuthorData()
        setOpen(true)
    };

    const handleEditOpen = (row) => {
        setEditAuthorData(row.original);
        setOpen(true);
    };

    const handleDeleteOpen = (row) => {
        setDeleteAuthorData(row.original);
        setOpenDeleteForm(true);
    }


    const columns = useMemo(
        () => [
            { accessorKey: 'name', header: 'Name ', enableGrouping: false },
            { accessorKey: 'contact_no', header: 'Contact Number', enableGrouping: false },
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
        enableExpandAll: false,
        enableExpanding: true,
        enableGrouping: true,
        enableEditing: true,
        paginateExpandedRows: true,
        enableColumnDragging: false,

        renderRowActions: ({ row }) => {

            const isExpanded = row.id.includes("."); 
            const isNotDeleteable = row.subRows.some((subRow)=> subRow.original.author === row.original.name)
            return (
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Tooltip title="Edit">
                        <IconButton onClick={() => handleEditOpen(row)} sx={{
                            "& .MuiSvgIcon-root": {
                                color: isExpanded ? "gray" : "black",
                            },
                        }} disabled={isExpanded} >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleDeleteOpen(row)} sx={{
                            "& .MuiSvgIcon-root": {
                                color: isExpanded || isNotDeleteable ? "gray " : "red",
                            },
                        }} disabled={isExpanded || isNotDeleteable}>
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
        muiTableProps: {
            sx: {
                "& .MuiSvgIcon-root": {
                    color: "black ",
                },
            },
        },
    });

    return (
        <>
            <div className="w-full flex justify-end mb-3">
                <Button
                    variant="contained"
                    sx={{ width: "200px" }}
                    onClick={handleOpen}>
                    Create New Author
                </Button>
            </div>
            <AuthorForm refetch={result.refetch} open={open} setOpen={setOpen} authorId={editAuthorData ? editAuthorData?.author_id : null} ></AuthorForm>

            <DeleteForm open={openDeleteForm} setOpen={setOpenDeleteForm} value={"author"} deleteData={deleteAuthorData} onDelete={result.refetch} />
            <MaterialReactTable table={table} />
        </>);

} 