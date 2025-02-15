/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Validation } from "../../../validation";
import { DropDown } from "../DropDown";
// import { DropDownAuthor } from "../DropDownAuthor";
import { languages } from "../file/languages";
import { genres } from "../file/genre";
import { useGetAll } from "../../../../hooks/useGetAll";
import { Response } from "../../../response";
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useUpdate } from "../../../../hooks/useUpdate";
import { useInsert } from "../../../../hooks/useInsert";
import { useGetOne } from "../../../../hooks/useGetOne";
import { DropDownAuthor } from "../dropDownAuthor";
import { useQueryClient } from "@tanstack/react-query";

export const BookForm = ({ open, setOpen, refetch, bookId = null }) => {

    const [alert, setAlert] = useState(false)

    const author = useGetAll('http://localhost:4000/authores');
    const authorData = author?.data || [];
    const authorName = {
        options: authorData.map((option) => option.name),
    };


    const queryClient = useQueryClient();
    if (bookId) {
        queryClient.refetchQueries({ queryKey: [bookId]})
    }

    const isBookId = Boolean(bookId)
    const book = useGetOne('http://localhost:4000/book', bookId, { enabled: isBookId });
    const bookData = book?.data || [];


    // console.log(cachedQuery);


    const showAlert = async () => {
        setAlert(true);

        setTimeout(() => {
            setAlert(false)
        }, 2200)
    }

    const InsertSchema = z.object({
        title: z.string({
            required_error: 'Please enter title'
        }),
        author: z.string({
            required_error: 'Please select the author'
        }),
        publication_date: z.string({
            required_error: 'Please enter date'
        }),
        genre: z.string({
            required_error: 'Please select genre'
        }),
        language: z.array(z.string(), {
            required_error: 'Please select the language'
        }).min(1, { message: "Please select at least one Language" }),
        price: z.number({
            required_error: 'Please enter price'
        }).nonnegative("Please enter a positive value")
    });

    const initialValuesStructure = {
        title: "",
        author: "",
        author_id: "",
        co_author: [],
        publication_date: "",
        genre: "",
        language: [],
        price: ""

    }


    const bookOperation = isBookId ? useUpdate('http://localhost:4000/update-book', bookData?.book_id) : useInsert('http://localhost:4000/insert-book');


    const handleClose = () => setOpen(false);


    return (
        <>
            {bookOperation?.isError && <Response value={{ text: bookOperation.error.message, response: "error" }} alert={alert} />}
            {bookOperation?.isSuccess && <Response value={{ text: bookOperation.data.success, response: "" }} alert={alert} />}

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle variant="h5" className="text-center font-bold">
                    {isBookId ? "Update Your Book" : "Create New Book"}
                </DialogTitle>
                <DialogContent>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            ...initialValuesStructure,
                            ...bookData
                        }}
                        validationSchema={toFormikValidationSchema(InsertSchema)}
                        onSubmit={async (values, { resetForm }) => {
                            try {
                                await bookOperation.mutateAsync(values);
                                showAlert()
                                refetch();
                                resetForm();
                                handleClose();
                            } catch (error) {
                                showAlert()
                                console.log(error);
                            }
                        }}
                    >

                        {({ errors, touched, isValid }) => (
                            <Form className="flex flex-col justify-center items-center">


                                <div className="flex w-11/12 flex-col my-3">
                                    <label htmlFor="title" className="block text-sm font-medium">Title <span style={{ color: "red" }}>*</span></label>
                                    <Field type="text" name="title" id="title" placeholder="Enter Book Title" className={`w-full p-2 border rounded ${errors.title && touched.title ? "border-red-500" : "border-gray-300"}`} />
                                    {errors.title && touched.title && <Validation value={{ text: errors.title, component: "validation" }} />}
                                </div>

                                <div className="flex w-11/12 flex-col my-3">
                                    <label htmlFor="author" className="block text-sm font-medium">Author <span style={{ color: "red" }}>*</span></label>
                                    <Field name="author" component={DropDownAuthor} options={authorData} multiple={false} error={errors?.author} touched={touched?.author} />
                                    {errors.author && touched.author && <Validation value={{ text: errors.author, component: "validation" }} />}
                                </div>
                                <div className=" w-11/12 flex-col my-3 hidden">
                                    <Field name="author_id" component={DropDownAuthor} options={authorData} multiple={false} className={`w-full p-2 border rounded`} />
                                </div>

                                <div className="flex w-11/12 flex-col my-3">
                                    <label htmlFor="co_author" className="block text-sm font-medium">Co-Author</label>
                                    <Field name="co_author" component={DropDown} options={authorName.options} multiple={true} placeholder="Select Co-Authors" />
                                    {errors.co_author && touched.co_author && <Validation value={{ text: errors.co_author, component: "validation" }} />}
                                </div>

                                <div className="flex w-11/12 flex-col my-3">
                                    <label htmlFor="publication_date" className="block text-sm font-medium">Publication Date <span style={{ color: "red" }}>*</span></label>
                                    <Field type="date" name="publication_date" id="publication_date" className={`w-full p-2 border rounded ${errors.publication_date && touched.publication_date ? "border-red-500" : "border-gray-300"}`} />
                                    {errors.publication_date && touched.publication_date && <Validation value={{ text: errors.publication_date, component: "validation" }} />}
                                </div>

                                <div className="flex w-11/12 flex-col my-3">
                                    <label htmlFor="genre" className="block text-sm font-medium">Genre <span style={{ color: "red" }}>*</span></label>
                                    <Field name="genre" component={DropDown} options={genres} multiple={false} placeholder="Select Genre" error={errors?.genre} touched={touched?.genre} />
                                    {errors.genre && touched.genre && <Validation value={{ text: errors.genre, component: "validation" }} />}
                                </div>

                                <div className="flex w-11/12 flex-col my-3">
                                    <label htmlFor="language" className="block text-sm font-medium">Language <span style={{ color: "red" }}>*</span></label>
                                    <Field name="language" component={DropDown} options={languages} multiple={true} placeholder={"Select Language"} error={errors?.language} touched={touched?.language} />
                                    {errors.language && touched.language && <Validation value={{ text: errors.language, component: "validation" }} />}
                                </div>

                                <div className="flex w-11/12 flex-col my-3">
                                    <label htmlFor="price" className="block text-sm font-medium">Price <span style={{ color: "red" }}>*</span></label>
                                    <Field type="number" name="price" id="price" placeholder="Enter the Price" className={`w-full p-2 border rounded ${errors.price && touched.price ? "border-red-500" : "border-gray-300"}`} />
                                    {errors.price && touched.price && <Validation value={{ text: errors.price, component: "validation" }} />}
                                </div>

                                <div className="flex justify-end space-x-2">
                                    <Button color="secondary" variant="outlined" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" variant="contained" type="submit" disabled={!isValid}>
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    );
};
