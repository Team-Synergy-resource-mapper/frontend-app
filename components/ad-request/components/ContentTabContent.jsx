'use client'
import BannerUploader from "./content/BannerUploader";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import _ from "lodash";
import * as Yup from "yup";
import { dispatch } from "@/store/store";
import { addRequest } from "@/store/reducers/data/adRequestReducer";

// Initial values
const getInitialValues = (settedRequest) => {
  const newRequest = {
    title: "",
    description: "",
    isUsed: false,
    price: "",
    images: [],
    trade: "",
  };
  if (settedRequest) {
    return _.merge({}, newRequest, settedRequest);
  }
  return newRequest;
};

// Validation schema
const requestSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const ContentTabContent = () => {
  const { settedRequest, isLoading } = useSelector((state) => state.request);
  const router = useRouter();

  const formik = useFormik({
    initialValues: getInitialValues(settedRequest),
    validationSchema: requestSchema,
    onSubmit: async (values) => {
      const jsonData = {
        title: values.title,
        body: values.description,
        user_id: "1313",
      };
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

        {/* Removed Category and Subcategory */}

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
