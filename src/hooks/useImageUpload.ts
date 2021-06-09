import { ImageType } from "react-images-uploading";
import Swal from "sweetalert2";
import { imageApi } from "../services/api";
import FormData from "form-data";

export interface IImageUpload {
  success: boolean;
  message: string;
  filename?: string;
}

const useImageUpload = () => {
  const upload = async (imageFile: ImageType) => {
    try {
      console.log(imageFile);
      if (!!imageFile.file) {
        const formData = new FormData();
        formData.append("image", imageFile.file, imageFile.file?.name);
        // formData.append("type", type);

        const { data, status } = await imageApi.post("/", formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        });

        return { data, status } as {
          data: IImageUpload;
          status: number;
        };
      }
      return {
        status: 400,
        data: { success: false, message: "File not uploaded." },
      };
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Ops",
        "Ocorreu algum erro ao fazer upload da sua imagem, por favor tente mais tarde!",
        "error"
      );
      return {
        status: 400,
        data: { success: false, message: "File not uploaded." },
      };
    }
  };

  return { upload };
};

export { useImageUpload };
