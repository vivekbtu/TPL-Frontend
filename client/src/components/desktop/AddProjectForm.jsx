import {
  Box,
  Button,
  FormLabel,
  Input,
  Select,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const init = {
  projectName: "",
  location: "Pune",
  startDate: "",
  endDate: "",
  priority: "High",
  reason: "Business",
  type: "Internal",
  division: "Pumps",
  category: "Quality A",
  department: "Strategy",
  projectManager: "person-x"
};

const validationSchema = Yup.object({
  projectName: Yup.string().required("Project Theme required"),
  startDate: Yup.date().required("Start Date required"),
  endDate: Yup.date()
    .required("End Date required")
    .min(Yup.ref("startDate"), "End Date must be later than Start Date"),
  location: Yup.string().required("Location required"),
  priority: Yup.string().required("Priority required"),
  reason: Yup.string().required("Reason required"),
  type: Yup.string().required("Type required"),
  division: Yup.string().required("Division required"),
  category: Yup.string().required("Category required"),
  department: Yup.string().required("Department required"),
  projectManager: Yup.string().required("ProjectManager required"),
});

export default function AddProjectForm({ postData, load }) {
  const formik = useFormik({
    initialValues: init,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Form values before conversion:", values);

      // Convert date strings to timestamps
      const formValuesWithTimestamps = {
        ...values,
        startDate: Date.parse(values.startDate),
        endDate: Date.parse(values.endDate),
      };

      console.log("Form values after conversion:", formValuesWithTimestamps);

      postData(formValuesWithTimestamps)
        .then(() => {
          resetForm();
        })
        .catch((error) => {
          console.error("Error posting data:", error);
          alert("Something went wrong!");
        });
    },
  });

  return (
    <Box
      w={"95%"}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      h="82vh"
      px="20px"
      py="20px"
      bg="#FFFFFF"
      borderRadius={"10px"}
      position="absolute"
      top={"130px"}
      left="40px"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display={"flex"} justifyContent={"space-between"} w="100%">
          <Box w="55%">
            <Textarea
              placeholder="Enter Project Theme"
              resize={"none"}
              value={formik.values.projectName}
              name="projectName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.projectName && formik.errors.projectName}
              borderColor={formik.touched.projectName && formik.errors.projectName ? "red" : "gray.200"}
            />
            {formik.touched.projectName && formik.errors.projectName ? (
              <Text color="red">{formik.errors.projectName}</Text>
            ) : null}
          </Box>
          <Button
            colorScheme="#FFFFFF"
            bg="#025aab"
            borderRadius={"30px"}
            px="30px"
            type="submit"
            isDisabled={load}
          >
            {load ? <Spinner size="sm" /> : "Save Project"}
          </Button>
        </Box>
        <Box
          display={"grid"}
          w="80%"
          gridTemplateColumns={"repeat(3, 1fr)"}
          gap={"20px"}
          mt="20px"
        >
          <Box>
            <FormLabel color={"#a4a4a4"}>Reason</FormLabel>
            <Select
              value={formik.values.reason}
              onChange={formik.handleChange}
              name="reason"
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.reason && formik.errors.reason}
              borderColor={formik.touched.reason && formik.errors.reason ? "red" : "gray.200"}
            >
              <option value="Business">Business</option>
              <option value="Dealership">Dealership</option>
              <option value="Transport">Transport</option>
            </Select>
            {formik.touched.reason && formik.errors.reason ? (
              <Text color="red">{formik.errors.reason}</Text>
            ) : null}
          </Box>
          <Box>
            <FormLabel color={"#a4a4a4"}>Type</FormLabel>
            <Select
              value={formik.values.type}
              onChange={formik.handleChange}
              name="type"
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.type && formik.errors.type}
              borderColor={formik.touched.type && formik.errors.type ? "red" : "gray.200"}
            >
              <option value="Internal">Internal</option>
              <option value="External">External</option>
              <option value="Vendor">Vendor</option>
            </Select>
            {formik.touched.type && formik.errors.type ? (
              <Text color="red">{formik.errors.type}</Text>
            ) : null}
          </Box>
          <Box>
            <FormLabel color={"#a4a4a4"}>Division</FormLabel>
            <Select
              value={formik.values.division}
              onChange={formik.handleChange}
              name="division"
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.division && formik.errors.division}
              borderColor={formik.touched.division && formik.errors.division ? "red" : "gray.200"}
            >
              <option value="Pumps">Pumps</option>
              <option value="Filters">Filters</option>
              <option value="Compressor">Compressor</option>
              <option value="Glass">Glass</option>
              <option value="Water Heater">Water Heater</option>
            </Select>
            {formik.touched.division && formik.errors.division ? (
              <Text color="red">{formik.errors.division}</Text>
            ) : null}
          </Box>
          <Box>
            <FormLabel color={"#a4a4a4"}>Category</FormLabel>
            <Select
              value={formik.values.category}
              onChange={formik.handleChange}
              name="category"
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.category && formik.errors.category}
              borderColor={formik.touched.category && formik.errors.category ? "red" : "gray.200"}
            >
              <option value="Quality A">Quality A</option>
              <option value="Quality B">Quality B</option>
              <option value="Quality C">Quality C</option>
              <option value="Quality D">Quality D</option>
            </Select>
            {formik.touched.category && formik.errors.category ? (
              <Text color="red">{formik.errors.category}</Text>
            ) : null}
          </Box>
          <Box>
            <FormLabel color={"#a4a4a4"}>Priority</FormLabel>
            <Select
              value={formik.values.priority}
              onChange={formik.handleChange}
              name="priority"
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.priority && formik.errors.priority}
              borderColor={formik.touched.priority && formik.errors.priority ? "red" : "gray.200"}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Select>
            {formik.touched.priority && formik.errors.priority ? (
              <Text color="red">{formik.errors.priority}</Text>
            ) : null}
          </Box>
          <Box>
            <FormLabel color={"#a4a4a4"}>Department</FormLabel>
            <Select
              value={formik.values.department}
              onChange={formik.handleChange}
              name="department"
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.department && formik.errors.department}
              borderColor={formik.touched.department && formik.errors.department ? "red" : "gray.200"}
            >
              <option value="Strategy">Strategy</option>
              <option value="Finance">Finance</option>
              <option value="Quality">Quality</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Stores">Stores</option>
            </Select>
            {formik.touched.department && formik.errors.department ? (
              <Text color="red">{formik.errors.department}</Text>
            ) : null}
          </Box>
          <Box>
            <FormLabel color={"#a4a4a4"}>Start Date as per Project Plan</FormLabel>
            <Input
              type="date"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              name="startDate"
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.startDate && formik.errors.startDate}
              borderColor={formik.touched.startDate && formik.errors.startDate ? "red" : "gray.200"}
            />
            {formik.touched.startDate && formik.errors.startDate ? (
              <Text color="red">{formik.errors.startDate}</Text>
            ) : null}
          </Box>
          <Box>
            <FormLabel color={"#a4a4a4"}>End Date as per Project Plan</FormLabel>
            <Input
              type="date"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              name="endDate"
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.endDate && formik.errors.endDate}
              borderColor={formik.touched.endDate && formik.errors.endDate ? "red" : "gray.200"}
            />
            {formik.touched.endDate && formik.errors.endDate ? (
              <Text color="red">{formik.errors.endDate}</Text>
            ) : null}
          </Box>
          <Box>
            <FormLabel color={"#a4a4a4"}>Location</FormLabel>
            <Select
              value={formik.values.location}
              onChange={formik.handleChange}
              name="location"
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.location && formik.errors.location}
              borderColor={formik.touched.location && formik.errors.location ? "red" : "gray.200"}
            >
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi</option>
              <option value="Patna">Patna</option>
            </Select>
            {formik.touched.location && formik.errors.location ? (
              <Text color="red">{formik.errors.location}</Text>
            ) : null}
          </Box>

          {/* project manager */}

          <Box>
            <FormLabel color={"#a4a4a4"}>Project Manager</FormLabel>
            <Select
              value={formik.values.projectManager}
              onChange={formik.handleChange}
              name="projectManager"
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.projectManager && formik.errors.projectManager}
              borderColor={formik.touched.projectManager && formik.errors.projectManager ? "red" : "gray.200"}
            >
              <option value="person-x">person-x</option>
              <option value="person-y">person-y</option>
              <option value="person-z">Person-z</option>
            </Select>
            {formik.touched.projectManager && formik.errors.projectManager ? (
              <Text color="red">{formik.errors.projectManager}</Text>
            ) : null}
          </Box>
          
        </Box>

        <Box w="64%" display={"flex"} justifyContent={"right"} mt="20px">
          <Text color="#a4a4a4">
            Status:{" "}
            <Text as="span" fontWeight="700" color="gray.600">
              Registered
            </Text>
          </Text>
        </Box>
      </form>
    </Box>
  );
}
