import React from "react";

import BGimage from "../../../../../../assets/icons/bg-image.svg";

interface IUploadColorImageProps {
  color: string;
  index: number;
  handleChangeColorsFile: (index: number, files: FileList | null) => void;
  previewImage: string | null;
}

const UploadColorImage: React.FC<IUploadColorImageProps> = ({
  color,
  index,
  handleChangeColorsFile,
  previewImage,
}) => {
  return (
    <div className="color-image">
      <label htmlFor={`color-image-${index}`} className="custom-file-upload">
        <input
          type="file"
          id={`color-image-${index}`}
          name={`color-image-${index}`}
          onChange={(e) => handleChangeColorsFile(index, e.target.files)}
          hidden
        />
        {!previewImage ? <img src={BGimage} alt="" /> : <img src={previewImage} alt="" />}
        <p style={{ backgroundColor: color, height: "15px", width: "100%" }}></p>
      </label>
    </div>
  );
};

export default UploadColorImage;
