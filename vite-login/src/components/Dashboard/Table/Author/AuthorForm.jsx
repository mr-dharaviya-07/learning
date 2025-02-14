/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Validation } from "../../../validation";
import { DropDown } from "../DropDown";
import { nationality } from "../file/nationality";
import { useInsert } from "../../../../hooks/useInsert";
import { useState } from "react";
import { Response } from "../../../response";
import { useGetOne } from "../../../../hooks/useGetOne";
import { useUpdate } from "../../../../hooks/useUpdate";

export const AuthorForm = ({ open, setOpen, refetch, initialName = "", authorId = null }) => {

    const [alert, setAlert] = useState(false)

    const isAuthorId = Boolean(authorId)
    const author = useGetOne('http://localhost:4000/author', authorId, { enabled: isAuthorId });
    const authorData = author?.data || [];


    const showAlert = async () => {
        setAlert(true);

        setTimeout(() => {
            setAlert(false)
        }, 2200)
    }

    const InsertSchema = z.object({
        name: z.string({
            required_error: "Name is required",
        }),
        email: z.string({
            required_error: "Email is required",
        }).email({ message: "Please enter a valid email" }),
        contact_no: z.string({
            required_error: "Contact number is required",
        })
        .regex(/^\d+$/, { message: "Only numeric values are allowed" })
        .length(10, { message: "Contact number must be exactly 10 digits" }),
        nationality: z.array(z.string()).min(1, { message: "At least one nationality is required" }),
    });

    const initialValuesStructure = {
        name: initialName,
        email: "",
        contact_no: "",
        nationality: [],
    }

    const authorOperation = isAuthorId ? useUpdate('http://localhost:4000/update-author', authorData?.author_id) : useInsert('http://localhost:4000/insert-author');

    const handleClose = () => setOpen(false);



    return (
        <>
            {authorOperation?.isError && <Response value={{ text: authorOperation.error.message, response: "error" }} alert={alert} />}
            {authorOperation?.isSuccess && <Response value={{ text: authorOperation.data.success, response: "" }} alert={alert} />}

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle variant="h5" className="text-center font-bold">
                    {isAuthorId ? "Update Author" : "Create New Author"}
                </DialogTitle>
                <DialogContent>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            ...initialValuesStructure,
                            ...authorData,
                        }}
                        validationSchema={toFormikValidationSchema(InsertSchema)}
                        onSubmit={async (values, { resetForm }) => {
                            try {
                                await authorOperation.mutateAsync(values);
                                showAlert()
                                refetch();
                                resetForm();
                                handleClose();
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="flex flex-col justify-center items-center">
                                <div className="flex w-11/12 flex-col my-3">
                                    <label htmlFor="name" className="block text-sm font-medium">Name <span style={{ color: "red" }}>*</span></label>
                                    <Field name="name" id="name" placeholder="Enter Author Name" className={`w-full p-2 border rounded ${errors.name && touched.name ? "border-red-500" : "border-gray-300"}`} />
                                    {errors.name && touched.name && <Validation value={{ text: errors.name, component: "validation" }} />}
                                </div>

                                <div className="flex w-11/12 flex-col my-3">
                                    <label htmlFor="email" className="block text-sm font-medium">Email <span style={{ color: "red" }}>*</span></label>
                                    <Field name="email" id="email" placeholder="Enter the Email" className={`w-full p-2 border rounded ${errors.email && touched.email ? "border-red-500" : "border-gray-300"}`} />
                                    {errors.email && touched.email && <Validation value={{ text: errors.email, component: "validation" }} />}
                                    {/* <ErrorMessage name="email" render={msg => <Validation value={{ text: msg, component: "validation" }} />} /> */}
                                </div>

                                <div className="flex w-11/12 flex-col my-3">
                                    <label htmlFor="contact_no" className="block text-sm font-medium">Contact No <span style={{ color: "red" }}>*</span></label>
                                    <Field name="contact_no" id="contact_no" placeholder="Enter the Contact No" className={`w-full p-2 border rounded ${errors.contact_no && touched.contact_no ? "border-red-500" : "border-gray-300"}`} />
                                    {errors.contact_no && touched.contact_no && <Validation value={{ text: errors.contact_no, component: "validation" }} />}
                                </div>

                                <div className="flex w-11/12 flex-col my-3">
                                    <label htmlFor="nationality" className="block text-sm font-medium">Nationality <span style={{ color: "red" }}>*</span></label>
                                    <Field name="nationality" component={DropDown} options={nationality} multiple={true} error={errors.nationality} touched={touched.nationality} placeholder={"Select Nationality"} />
                                    {errors.nationality && touched.nationality && <Validation value={{ text: errors.nationality, component: "validation" }} />}
                                </div>

                                <div className="flex justify-end space-x-2">
                                    <Button color="secondary" variant="outlined" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" variant="contained" type="submit">
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