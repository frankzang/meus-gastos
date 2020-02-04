import React from "react";
import styles from "./index.module.css";
import { Button, useColorMode } from "@chakra-ui/core";

interface Props {
  onChange: (file: File | undefined) => void;
  dispose?: Boolean;
}

export const ImagePicker: React.FC<Props> = props => {
  const [image, setImage] = React.useState<string>();
  const { colorMode } = useColorMode();
  const { onChange, dispose: resetImage } = props;

  React.useEffect(() => {
    if (resetImage && image) {
      setImage("");
    }
  }, [resetImage, image]);

  React.useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  });

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.currentTarget;

    if (files && files.length) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onChange(file);
    }
  }

  function triggerImagePicker() {
    const input = document.querySelector<HTMLInputElement>("#imagePicker");

    if (input) {
      input.click();
    }
  }

  function removeImage() {
    setImage("");
    onChange(undefined);
  }

  return (
    <div className={styles.container}>
      <img
        onClick={triggerImagePicker}
        src={image}
        alt=""
        className={styles.image}
      />
      <Button
        onClick={image ? removeImage : triggerImagePicker}
        color={colorMode === "light" ? "gray.800" : "white"}
        variant="solid"
        leftIcon="plus-square"
      >
        {image ? "Remover" : "Selecionar imagem"}
      </Button>
      <input
        id="imagePicker"
        className={styles.input}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        tabIndex={-1}
      />
    </div>
  );
};
