import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

const Uploader = () => {
  const axios = require("axios").default;

  // const API_ENDPOINT =
  //   "https://snnypcf9xb.execute-api.ap-southeast-1.amazonaws.com/default/getPresignedImageURL";
  // const API_ENDPOINT = `http://localhost:8080/api/largeFile/generatePresignedURL/${extension}`;
  const handleChangeStatus = ({ meta, remove }, status) => {
    console.log(status, meta);
  };

  const handleSubmit = async (files) => {
    const f = files[0];
    console.log(f["file"]);
    console.log(f);
    const extension = files[0]?.file?.name?.split(".").pop();
    console.log("Extension ==>", extension);
    // * GET request: presigned URL
    const response = await axios({
      method: "GET",
      url: `http://localhost:8080/api/largeFile/generatePresignedURL/${extension}`,
      // contentType: "application/jpeg",
    });

    console.log("Response: ", response);

    // * PUT request: upload file to S3
    const result = await fetch(response.data.uploadURL, {
      method: "PUT",
      headers: {
        // "Content-Type": "image/jpeg",
      },
      body: f["file"],
    });
    console.log("Result: ", result);
  };

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      hjello
      maxFiles={1}
      multiple={false}
      canCancel={false}
      inputContent="Drop A File"
      styles={{
        dropzone: { width: 400, height: 200 },
        dropzoneActive: { borderColor: "green" },
      }}
    />
  );
};

<Uploader />;

export default Uploader;
