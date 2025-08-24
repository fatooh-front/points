import { API_ROOT } from "@/main/global/api/shared/ApiUrls";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { MULTIPLE_UPLOAD } from "../api/uploadsManager";

// Custom hook for file upload
export const useFileUpload = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      console.log(
        "operations@@@",
        JSON.stringify({
          query: MULTIPLE_UPLOAD.loc?.source.body,
          variables: { files: [] },
        })
      );
      // Create FormData
      const formData = new FormData();
      formData.append(
        "operations",
        JSON.stringify({
          query: MULTIPLE_UPLOAD.loc?.source.body,
          variables: { files: [] },
        })
      );

      formData.append(
        "map",
        JSON.stringify({
          "0": ["variables.files.0"],
        })
      );

      formData.append("0", file);

      // Use fetch for multipart form data
      const response = await axios.post(`${API_ROOT}`, formData);

      return response.data;
    },
  });
};

// JSON.stringify({
//   query: MULTIPLE_UPLOAD.loc?.source.body,
//   variables: { files: [] },
// });
// `{"query": "mutation upload($files: [Upload]!) { multipleUpload(files: $files) { name unique_name mime_type size url } }", "variables": {"files": []}}`
