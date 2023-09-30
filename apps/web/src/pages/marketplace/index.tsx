import { Container, Flex, Group, Input, Menu, Stack, Text } from '@mantine/core';
import { NextPage } from 'next';
import { SearchIcon, SelectArrowIcon, SortIcon, XIcon } from 'public/icons';
import { useState } from 'react';
import NumberInput from './components/NumberInput/NumberInput';
import ProductCard from './components/ProductCard/ProductCard';
import { useStyles } from './styles';

const sortValues = [
  { value: 'dateASC', label: 'oldest' },
  { value: 'dateDESC', label: 'newest' },
  { value: 'priceASC', label: 'cheepest' },
  { value: 'priceDESC', label: 'most expensive' },
];

const Marketplace: NextPage = () => {
  const { classes } = useStyles();
  const [sortValue, setSortValue] = useState({ value: 'dateDESC', label: 'newest' });
  return (
    <Group spacing={28}>
      <Container
        m={0}
        p="md"
        bg="white"
        sx={(theme) => ({ borderRadius: 12, border: `1px solid ${theme.colors.black[0]}` })}
        w={315}
      >
        <Stack spacing="xl">
          <Flex justify="space-between">
            <Text size="md" weight={700}>
              Filters
            </Text>
            <Group spacing={4} align="center">
              <Text size="xs" c="black.2" weight={500}>
                Reset All
              </Text>
              <XIcon />
            </Group>
          </Flex>
          <Stack spacing={12}>
            <Text size="sm" weight={700}>
              Price
            </Text>
            <Group noWrap spacing={12}>
              <NumberInput
                size="xs"
                hideControls
                formatter={(value) => (Number.isNaN(parseFloat(value)) ? value : `${value}$`)}
                leftElement={(
                  <Text pl={12} size="xs" c="black.2" weight={500}>
                    From:
                  </Text>
                )}
                leftGap={4}
              />
              <NumberInput
                size="xs"
                hideControls
                formatter={(value) => (Number.isNaN(parseFloat(value)) ? value : `${value}$`)}
                leftElement={(
                  <Text pl={12} size="xs" c="black.2" weight={500}>
                    To:
                  </Text>
                )}
                leftGap={4}
              />
            </Group>
          </Stack>
        </Stack>
      </Container>
      <Stack sx={{ flexGrow: 1 }} spacing="md">
        <Input
          radius={8}
          size="xs"
          pointer
          icon={<SearchIcon />}
          classNames={{
            icon: classes.searchIcon,
            input: classes.searchInput,
          }}
          placeholder="Type to search..."
        />
        <Flex justify="space-between" align="center">
          <Text size="sm" weight={700}>
            12 results
          </Text>
          <Group spacing={8}>
            <SortIcon />
            <Menu closeDelay={0}>
              <Menu.Target>
                <Text size="xs" weight={500}>
                  {`Sort by ${sortValue.label}`}
                </Text>
              </Menu.Target>
              <Menu.Dropdown
                sx={(theme) => ({
                  border: `1px solid ${theme.colors.black[0]}`,
                  borderRadius: 8,
                })}
              >
                {sortValues.map((value) => (
                  <Menu.Item
                    sx={(theme) => ({
                      fontSize: theme.fontSizes.xs,
                      padding: '5px 8px',
                      fontWeight: 500,
                    })}
                    onClick={() => setSortValue(value)}
                    key={value.label}
                  >
                    {value.label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
            <SelectArrowIcon />
          </Group>
        </Flex>
        <Flex gap={20} wrap="wrap">
          <ProductCard
            title="DJI Air 3"
            price={1158}
            imgURL="https://images.unsplash.com/photo-1617109224926-b69d0862ef1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          />
          <ProductCard
            title="DJI Air 3"
            price={1158}
            imgURL="https://images.unsplash.com/photo-1617109224926-b69d0862ef1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          />
          <ProductCard
            title="DJI Air 3"
            price={1158}
            imgURL="https://images.unsplash.com/photo-1624952627373-714a72a80ddb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          />
          <ProductCard
            title="DJI Air 3"
            price={1158}
            imgURL="https://images.unsplash.com/photo-1624952627373-714a72a80ddb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          />
          <ProductCard
            title="DJI Air 3"
            price={1158}
            imgURL="https://images.unsplash.com/photo-1617109224926-b69d0862ef1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          />
          <ProductCard
            title="DJI Air 3"
            price={1158}
            imgURL="https://images.unsplash.com/photo-1617109224926-b69d0862ef1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          />
        </Flex>
      </Stack>
    </Group>
  );
};

export default Marketplace;
