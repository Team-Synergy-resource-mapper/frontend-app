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


const base64ToBlob = (base64) => {
  const [prefix, data] = base64.split(',');
  const mime = prefix.match(/:(.*?);/)[1];
  const binary = atob(data);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: mime });
};

const requestSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  category: Yup.string().required("Category is required"),
  trade: Yup.string().required("Trade is required"),
  isUsed: Yup.boolean(),
  images: Yup.array()
    .min(1, "At least one image is required") // Ensures the array has at least one item
    .required("Images are required"),
  subCategory: Yup.number().required("Required sub category"),
});

const ContentTabContent = () => {
  // manage states

  // store states
  const { settedRequest, isLoading } = useSelector((state) => state.request);
  const router = useRouter();
  // formik define
  const formik = useFormik({
    initialValues: getInitialValues(settedRequest),
    validationSchema: requestSchema,
    onSubmit: async (values) => {
      console.log("Form Values:", values);
      
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append("url","");
      formData.append('description', values.description);
      formData.append('category_id', values.category);
      formData.append('sub_category_id', values.subCategory);
      formData.append('price', values.price);
      formData.append('transaction_type', values.trade);
      formData.append('created_by', 'exampleUser'); // Adjust as necessary
      formData.append('user_id',1);
      formData.append('is_wanted', values.trade ? 'true' : 'false');
      // Convert base64 image to Blob and append to FormData
      const imageBlob = base64ToBlob(values.images[0]);
      formData.append('image', imageBlob, 'image.png');
      // Handle form submission logic here
      await dispatch(addRequest(formData))
      
      router.push("/my-ads")
    },
  });

  // loading
  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="col-xl-10">
          <div className="text-18 fw-500 mb-10">Property Details</div>
          <div className="row x-gap-20 y-gap-20">
            <div className="col-12">
              <div className="form-input ">
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
            {/* End Name */}

            <div className="col-12">
              <div className="form-input ">
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
            {/* End Content */}

            <div className="col-12">
              <div className="form-input ">
                <input
                  type="text"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="lh-1 text-16 text-light-1">Price (LKR)</label>
              </div>
              {formik.touched.price && formik.errors.price && (
                <div className="text-danger">{formik.errors.price}</div>
              )}
            </div>
            {/* End price */}
          </div>
          {/* End HotelContent */}

          <div className="mt-30">
            <div className="fw-500">Property Images</div>
            <BannerUploader name="images" formik={formik} />
            {formik.touched.images && formik.errors.images && (
              <div className="text-danger">{formik.errors.images}</div>
            )}
          </div>
          {/* End ImageUploader */}

          <div className="mt-30">
            <div className="col-12">
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <div className="fw-500 ">Category</div>
                  <DropdownFilter formik={formik} name={"category"} />
                  {formik.touched.category && formik.errors.category && (
                    <div className="text-danger">{formik.errors.category}</div>
                  )}
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="fw-500 ">Buy / Sell</div>
                  <DropDown formik={formik} name={"trade"} />
                  {formik.touched.trade && formik.errors.trade && (
                    <div className="text-danger">{formik.errors.trade}</div>
                  )}
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="fw-500">Condition</div>
                  <div className="form-input ">
                    <div className="d-flex items-center form-checkbox">
                      <input
                        type="checkbox"
                        name="isUsed"
                        checked={formik.values.isUsed}
                        onChange={formik.handleChange}
                      />
                      <div className="form-checkbox__mark">
                        <div className="form-checkbox__icon icon-check" />
                      </div>
                      <div className="text-15 lh-11 ml-10">Used</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End category dropdown */}

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
    </>
  );
};

export default ContentTabContent;
