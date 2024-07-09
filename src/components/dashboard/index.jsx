import { useEffect, useState } from "react";
import {
  addPatients,
  fetchPatients,
  removePatient,
  updatePatients,
} from "../../api";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ensureArray } from "../../utils/helper";
import { toast } from "react-hot-toast";
import Spinner from "../../common";
import Model from "./model";
import useModal from "../../hooks/model";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedId, setSelectedId] = useState({});
  const { show, onOpen, onClose } = useModal();
  const [filterOut, setFilterOut] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      try {
        const response = await fetchPatients();
        if (response.success) {
          setData(response.patient);
          setFilterOut(response.reminder);
        } else {
          toast.error(response.message || "Failed to fetch data");
        }
      } catch (error) {
        console.log("error", error);
        toast.error("Something went wrong while fetching data");
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const response =
        selectedId === "add patient"
          ? await addPatients(values)
          : await updatePatients({ ...values, _id: selectedId._id });
      if (response.success) {
        const fetchResponse = await fetchPatients();
        if (fetchResponse.success) {
          setData(fetchResponse.patient);
          setFilterOut(fetchResponse.reminder);
          toast.success(response.message);
        } else {
          toast.error(fetchResponse.message || "Failed to fetch updated data");
        }
      } else {
        toast.error(response.message || "Failed to update data");
      }
      onClose();
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenModel = (value) => {
    console.log("values", value);

    if (value === "add patient") {
      setSelectedId(value);
    } else {
      const filters = filterOut?.find((item) => item.patientId === value._id);
      console.log("filters", filters);

      if (filters) {
        setSelectedId({ ...filters, ...value });
      }
    }
    onOpen();
    console.log("OPen");
  };

  const removePatien = async (id) => {
    try {
      setLoader(true);
      const response = await removePatient(id);
      if (response.success) {
        const fetchResponse = await fetchPatients();
        if (fetchResponse.success) {
          toast.success(response.message);
          setData(fetchResponse.patient);
        } else {
          toast.error(fetchResponse.message || "Failed to fetch updated data");
        }
      } else {
        toast.error(response.message || "Failed to remove patient");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="w-full mx-auto">
        <div className="pt-6 pb-2">
          <h1 className="text-center text-4xl max-sm:text-2xl">
            Welcome to the Dashboard
          </h1>
        </div>
        <div className="container mx-auto p-4">
          {loader ? (
            <Spinner />
          ) : (
            <>
              <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold ">Patient Data</h1>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleOpenModel("add patient")}
                >
                  Add Patient
                </button>
              </div>
              {data.length === 0 ? (
                <p className="text-center text-gray-500 ">Data not found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr>
                        {["#", "Name", "Age", "Prescription", "Action"].map(
                          (header) => (
                            <th
                              key={header}
                              className="py-2 px-4 border-b border-gray-200 text-center"
                            >
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {ensureArray(data).map(
                        ({ _id, name, age, prescription }, index) => (
                          <tr key={_id}>
                            <td className="py-2 px-4 border-b border-gray-200 text-center align-middle">
                              {index + 1}
                            </td>
                            {[name, age, prescription].map((cell, i) => (
                              <td
                                key={i}
                                className="py-2 px-4 border-b border-gray-200 text-center align-middle"
                              >
                                {cell}
                              </td>
                            ))}
                            <td className="py-2 px-4 border-b border-gray-200 text-center align-middle">
                              <div className="flex justify-center space-x-2">
                                <PencilSquareIcon
                                  className="w-4 h-4 text-green-400 cursor-pointer"
                                  onClick={() =>
                                    handleOpenModel({
                                      _id,
                                      name,
                                      age,
                                      prescription,
                                    })
                                  }
                                />
                                <TrashIcon
                                  className="w-4 h-4 text-red-500 cursor-pointer"
                                  onClick={() => removePatien(_id)}
                                />
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Model
        open={show}
        onClose={onClose}
        title={selectedId === "add patient" ? "Add Patient" : "Edit Patient"}
        handleSubmit={handleSubmit}
        selectedId={selectedId}
        isSubmitting={isSubmitting}
      />
    </>
  );
};
export default Dashboard;
