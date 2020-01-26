import React, { useEffect } from "react";
import styles from "./index.module.css";
import { Button, useColorMode } from "@chakra-ui/core";

interface Props {
  onChange: (file: File | undefined) => void;
}

export const ImagePicker: React.FC<Props> = props => {
  const [image, setImage] = React.useState<string>();
  const { colorMode } = useColorMode();

  useEffect(() => {
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
      props.onChange(file);
    }
  }

  function triggerImagePicker() {
    const input = document.querySelector<HTMLInputElement>("#imagePicker");

    if (input) {
      input.click();
    }
  }

  function resetImage() {
    setImage("");
    props.onChange(undefined);
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
        onClick={image ? resetImage : triggerImagePicker}
        color={colorMode === "light" ? "gray.800" : "white"}
        variant="solid"
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
