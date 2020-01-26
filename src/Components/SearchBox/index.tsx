import React from "react";
import { Flex, InputGroup, InputLeftElement, Icon } from "@chakra-ui/core";
import { CustomInput } from "../CustomInput";

interface Props {
  isDisabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBox: React.FC<Props> = props => {
  const { isDisabled, onChange } = props;
  return (
    <Flex paddingBottom="8">
      <InputGroup w="100%">
        <InputLeftElement
          children={<Icon name="search-2" color="gray.300" />}
        />
        <CustomInput
          isDisabled={isDisabled}
          placeholder="Buscar produtos"
          onChange={onChange}
          paddingLeft="10"
        />
      </InputGroup>
    </Flex>
  );
};
