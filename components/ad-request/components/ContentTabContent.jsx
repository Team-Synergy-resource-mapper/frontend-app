'use client'
import BannerUploader from "./content/BannerUploader";
import DropdownFilter from "../DropdownFilter";
import DropDown from "../DropDown";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
// third party import
import _ from "lodash";
import * as Yup from "yup";
import CategorySelector from "../CategorySelector";
import { dispatch } from "@/store/store";
import { addRequest } from "@/store/reducers/data/adRequestReducer";

// formik initial data
const getInitialValues = (settedRequest) => {
  const newRequest = {
    title: "",
    description: "",
    isUsed: false,
    price: "",
    category: "",
    images: [],
    trade: "",
    subCategory: "",
  };
  if (settedRequest) {
    return _.merge({}, newRequest, newRecipe);
  }
  return newRequest;
};

const requestSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Required sub category"),
});

const ContentTabContent = () => {
  const { settedRequest, isLoading } = useSelector((state) => state.request);
  const router = useRouter();

  const formik = useFormik({
    initialValues: getInitialValues(settedRequest),
    validationSchema: requestSchema,
    onSubmit: async (values) => {
      console.log("Form Values:", values);
      const jsonData = {
        title: values.title,
        url: "",  // not available in formData, add if needed
        description: values.description,
        userId: "1212",  // possibly redundant with "UserId"
        main_category: values.category === 1 ? "electronics" : values.category === 2 ? "property" : "vehicle",
        sub_category: values.subCategory?.toString(),
        created_at: new Date().toISOString(),  // current timestamp
        transaction_type: "",  // you need to provide this
        wanted_offering: "",   // you need to provide this
        image_urls: []         // assuming no images yet; otherwise provide array of URLs
      };
      console.log(jsonData)
      // const formData = new FormData();
      // formData.append("title", values.title);
      // formData.append("description", values.description);
      // formData.append("category_id", values.category === 1 ? "electronics" : values.category === 2 ? "property" : "vehicle");
      // formData.append("sub_category_id", values.subCategory);
      // formData.append("created_by", "exampleUser");
      // formData.append("user_id", 1212);
      // console.log("dkdkdj", formData)
      await dispatch(addRequest(jsonData));
      router.push("/my-ads");
    },
  });

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="col-xl-10">
        <div className="text-18 fw-500 mb-10">Property Details</div>
        <div className="row x-gap-20 y-gap-20">
          <div className="col-12">
            <div className="form-input">
              <input
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className="lh-1 text-16 text-light-1">Title</label>
            </div>
            {formik.touched.title && formik.errors.title && (
              <div className="text-danger">{formik.errors.title}</div>
            )}
          </div>

          <div className="col-12">
            <div className="form-input">
              <textarea
                name="description"
                rows={10}
                value={formik.values.description || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className="lh-1 text-16 text-light-1">Description</label>
            </div>
            {formik.touched.description && formik.errors.description && (
              <div className="text-danger">{formik.errors.description}</div>
            )}
          </div>
        </div>

        <div className="mt-30">
          <div className="col-12">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="fw-500">Category</div>
                <DropdownFilter formik={formik} name={"category"} />
                {formik.touched.category && formik.errors.category && (
                  <div className="text-danger">{formik.errors.category}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-top-light mt-30 mb-30" />
        <CategorySelector
          formik={formik}
          name={"subCategory"}
          category={"category"}
        />
        {formik.touched.subCategory && formik.errors.subCategory && (
          <div className="text-danger">{formik.errors.subCategory}</div>
        )}
        <div className="border-top-light mt-30 mb-30" />

        <div className="d-inline-block pt-30">
          <button
            type="submit"
            className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
          >
            Save Changes <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContentTabContent;
