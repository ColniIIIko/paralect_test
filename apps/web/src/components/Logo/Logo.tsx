import { Flex, FlexProps, MediaQuery, Title } from '@mantine/core';
import { LogoImage } from 'public/images';
import { FC } from 'react';

interface LogoProps extends FlexProps {}

const Logo: FC<LogoProps> = ({ children, ...props }) => (
  <Flex align="center" gap="sm" {...props}>
    <LogoImage alt="shopy logo" />
    <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
      <Title size="29px">Shopy</Title>
    </MediaQuery>
  </Flex>
);

export default Logo;
