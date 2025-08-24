// import { GraphQLClient } from "graphql-request";
import { useFileUpload } from "./hooks/useFileUpload";

// // Create GraphQL client
// const client = new GraphQLClient("YOUR_GRAPHQL_ENDPOINT", {
//   // Add any necessary headers
//   headers: {},
// });

const FileUpload = () => {
  const { mutate: uploadFile, isPending, isError, error } = useFileUpload();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} disabled={isPending} />

      {isPending && <p>Uploading...</p>}
      {isError && <p>Error: {(error as Error)?.message}</p>}
    </div>
  );
};

export default FileUpload;
