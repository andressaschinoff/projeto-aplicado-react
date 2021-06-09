import React, { forwardRef, useImperativeHandle } from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import {
  DeleteButton,
  ImageBox,
  useImageUploadStyle,
} from "../styles/imageUpload.style";
import Box from "@material-ui/core/Box";

interface Props {}

const ImageUpload = forwardRef((inputProps: Props, ref) => {
  const [images, setImages] = React.useState([]);
  const [image, setImage] = React.useState<ImageType>();

  const classes = useImageUploadStyle();

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList as never[]);
    setImage(imageList[0]);
  };

  const getImage = () => {
    return image;
  };

  const clearImage = () => {
    setImage(undefined);
    setImages([]);
  };

  useImperativeHandle(ref, () => ({
    getImage,
    clearImage,
  }));

  return (
    <Box className={classes.mainBox}>
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={1}
        maxFileSize={1000000}
      >
        {({ onImageUpload, onImageRemove, dragProps }) => (
          <>
            <ImageBox
              onClick={onImageUpload}
              {...dragProps}
              src={!!image?.dataURL ? image.dataURL : ""}
            >
              {!!images[0] ? "" : "Click or Drop here"}
            </ImageBox>
            <Box className={classes.insideBox}>
              <Box>
                <FormHelperText>
                  É acoselhado usar uma imagem quadrada.
                </FormHelperText>
                <FormHelperText>Deve ser menor que 1 Mb.</FormHelperText>
              </Box>
              <DeleteButton onClick={() => onImageRemove(0)}>
                DELETAR
              </DeleteButton>
            </Box>
          </>
        )}
      </ImageUploading>
    </Box>
  );
});

export default ImageUpload;
