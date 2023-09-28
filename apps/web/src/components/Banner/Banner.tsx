/* eslint-disable react/jsx-one-expression-per-line */
import { Box, Container, ContainerProps, Flex, Image, Text } from '@mantine/core';
import Logo from 'components/Logo/Logo';
import { FC } from 'react';
import { useStyles } from './styles';

interface BannerProps extends ContainerProps {}

const Banner: FC<BannerProps> = ({ children, ...props }) => {
  const { classes } = useStyles();

  return (
    <Container
      {...props}
      p="xl"
      w="100%"
    >
      <Flex
        className={classes.wrapper}
        direction="column"
      >
        <Logo pl="0.5rem" />
        <Flex
          mt="clamp(50px, 20%, 160px)"
          align="center"
          justify="center"
          w="100%"
        >
          <Box className={classes.imageWrapper}>
            <Image
              className={classes.page}
              src="../images/page.svg"
            />
            <Image
              className={classes.card1}
              src="../images/card1.svg"
              width="100px"
            />
            <Image
              className={classes.card2}
              src="../images/card2.svg"
              width="100px"
            />
          </Box>
        </Flex>
        <Box>
          <Text
            size="xxl"
            fw="bold"
            mt="110px"
            sx={{
              lineHeight: '44px',
            }}
          >
            Sell and buy products super quickly!
          </Text>
          <Text
            mt="sm"
            size="md"
          >
            Save your time, we take care of all the processing.
          </Text>
        </Box>
        <Flex
          mt="auto"
          align="center"
          gap="md"
        >
          <Flex>
            <Image
              width={40}
              src="../images/avatar5.png"
            />
            <Image
              ml={-15}
              width={40}
              src="../images/avatar4.png"
            />
            <Image
              ml={-15}
              width={40}
              src="../images/avatar3.png"
            />
            <Image
              ml={-15}
              width={40}
              src="../images/avatar2.png"
            />
            <Image
              ml={-15}
              width={40}
              src="../images/avatar1.png"
            />
          </Flex>
          <Text size="sm">
            <b>+100</b> users from all over the world
          </Text>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Banner;
