import * as Yup from "yup";
export const inputs = [
  { id: "name", name: "name", type: "text", label: "Name" },
  { id: "age", name: "age", type: "number", label: "Age" },
  {
    id: "prescription",
    name: "prescription",
    type: "text",
    label: "Prescription",
  },
  { id: "title", name: "title", type: "text", label: "Title" },
  {
    id: "description",
    name: "description",
    type: "text",
    label: "Description",
  },
  { id: "date", name: "date", type: "date", label: "Date" },
];

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  age: Yup.number().required("Age is required"),
  prescription: Yup.string().required("Prescription is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.date()
    .required("Date is required")
    .min(new Date(), "Date cannot be in the past"),
});
