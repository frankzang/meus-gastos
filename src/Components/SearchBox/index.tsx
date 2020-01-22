import React from "react";
import {
  Flex,
  InputGroup,
  InputLeftElement,
  Icon,
  Input
} from "@chakra-ui/core";

interface Props {
  isDisabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBox: React.FC<Props> = props => {
  const { isDisabled, onChange } = props;
  return (
    <Flex paddingBottom="8">
      <InputGroup w="100%" marginRight="8px">
        <InputLeftElement
          children={<Icon name="search-2" color="gray.300" />}
        />
        <Input
          isDisabled={isDisabled}
          placeholder="Buscar produtos"
          onChange={onChange}
        />
      </InputGroup>
    </Flex>
  );
};
