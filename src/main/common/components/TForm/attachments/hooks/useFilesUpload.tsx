import { API_ROOT } from "@/main/global/api/shared/ApiUrls";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { MULTIPLE_UPLOAD } from "../api/uploadsManager";

export const useFilesUpload = () => {
  return useMutation({
    mutationFn: async (files: File[]) => {
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
          variables: { files: Array(files.length).fill(null) },
        })
      );

      // Map each file to a unique index in the GraphQL variables
      const map: Record<string, string[]> = {};
      files.forEach((_, index) => {
        map[index.toString()] = [`variables.files.${index}`];
      });

      formData.append("map", JSON.stringify(map));

      // Append each file to the form data with the correct index
      files.forEach((file, index) => {
        formData.append(index.toString(), file);
      });

      // Use axios for multipart form data
      const response = await axios.post(`${API_ROOT}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-apollo-operation-name": "multipleUpload",
        },
      });

      return response.data;
    },
  });
};
