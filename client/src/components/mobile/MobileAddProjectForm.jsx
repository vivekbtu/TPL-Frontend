import {
  Box,
  Text,
  Textarea,
  Button,
  FormLabel,
  Input,
  Select,
  Spinner,
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
  projectManager: 'person-x'
};

const validationSchema = Yup.object({
  projectName: Yup.string().required("Project Theme required"),
  startDate: Yup.date().required("Start Date required"),
  endDate: Yup.date()
    .required("End Date required")
    .min(Yup.ref("startDate"), "End Date must be later than Start Date"),
});

export default function MobileAddProjectForm({ postData, load }) {
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
      w="90%"
      m="auto"
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
      display={"flex"}
      flexDirection={"column"}
      gap="20px"
      py="20px"
      bg="#FFFFFF"
      px="10px"
      borderRadius={"15px"}
      mb="70px"
      mt="20px"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <Textarea
            placeholder="Enter Project Theme"
            resize={"none"}
            value={formik.values.projectName}
            name="projectName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.projectName && formik.errors.projectName}
            borderColor={
              formik.touched.projectName && formik.errors.projectName
                ? "red"
                : "gray.200"
            }
          />
          {formik.touched.projectName && formik.errors.projectName ? (
            <Text color="red">{formik.errors.projectName}</Text>
          ) : null}
        </Box>

        <Box>
          <FormLabel color={"#a4a4a4"}>Reason</FormLabel>
          <Select
            value={formik.values.reason}
            onChange={formik.handleChange}
            name="reason"
          >
            <option value="Business">Business</option>
            <option value="Dealership">Dealership</option>
            <option value="Transport">Transport</option>
          </Select>
        </Box>
        <Box>
          <FormLabel color={"#a4a4a4"}>Type</FormLabel>
          <Select
            value={formik.values.type}
            onChange={formik.handleChange}
            name="type"
          >
            <option value="Internal">Internal</option>
            <option value="External">External</option>
            <option value="Vendor">Vendor</option>
          </Select>
        </Box>
        <Box>
          <FormLabel color={"#a4a4a4"}>Division</FormLabel>
          <Select
            value={formik.values.division}
            onChange={formik.handleChange}
            name="division"
          >
            <option value="Pumps">Pumps</option>
            <option value="Filters">Filters</option>
            <option value="Compressor">Compressor</option>
            <option value="Glass">Glass</option>
            <option value="Water Heater">Water Heater</option>
          </Select>
        </Box>
        <Box>
          <FormLabel color={"#a4a4a4"}>Category</FormLabel>
          <Select
            value={formik.values.category}
            onChange={formik.handleChange}
            name="category"
          >
            <option value="Quality A">Quality A</option>
            <option value="Quality B">Quality B</option>
            <option value="Quality C">Quality C</option>
            <option value="Quality D">Quality D</option>
          </Select>
        </Box>
        <Box>
          <FormLabel color={"#a4a4a4"}>Priority</FormLabel>
          <Select
            value={formik.values.priority}
            onChange={formik.handleChange}
            name="priority"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
        </Box>
        <Box>
          <FormLabel color={"#a4a4a4"}>Department</FormLabel>
          <Select
            value={formik.values.department}
            onChange={formik.handleChange}
            name="department"
          >
            <option value="Strategy">Strategy</option>
            <option value="Finance">Finance</option>
            <option value="Quality">Quality</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Stores">Stores</option>
          </Select>
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
            borderColor={
              formik.touched.startDate && formik.errors.startDate
                ? "red"
                : "gray.200"
            }
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
            borderColor={
              formik.touched.endDate && formik.errors.endDate
                ? "red"
                : "gray.200"
            }
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
          >
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
            <option value="Patna">Patna</option>
          </Select>
        </Box>
        {/* <Box>
          <FormLabel color={"#a4a4a4"}>Project Manager</FormLabel>
          <Select
            value={formik.values.projectManager}
            onChange={formik.handleChange}
            name="projectManager"
          >
            <option value="person-x">person-x</option>
            <option value="person-y">person-y</option>
            <option value="person-z">person-z</option>
          </Select>
        </Box> */}
        <Box>
          <Text color="#a4a4a4">
            Status:{" "}
            <Text as="span" fontWeight="700" color="gray.600">
              Registered
            </Text>
          </Text>
        </Box>
        <Button
          w={"100%"}
          marginTop={"20px"}
          colorScheme="#FFFFFF"
          bg="#025aab"
          borderRadius={"30px"}
          px="30px"
          type="submit"
          isDisabled={load}
        >
          {load ? <Spinner size="sm" /> : "Save Project"}
        </Button>
      </form>
    </Box>
  );
}
