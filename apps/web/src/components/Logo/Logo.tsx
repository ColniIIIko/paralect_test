import { Flex, FlexProps, Title } from '@mantine/core';
import { LogoImage } from 'public/images';
import { FC } from 'react';

interface LogoProps extends FlexProps {}

const Logo: FC<LogoProps> = ({ children, ...props }) => (
  <Flex
    align="center"
    gap="sm"
    {...props}
  >
    <LogoImage alt="shopy logo" />
    <Title size="29px">Shopy</Title>
  </Flex>
);

export default Logo;
