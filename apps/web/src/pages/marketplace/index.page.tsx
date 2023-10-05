import {
  Center,
  Container,
  Flex,
  Grid,
  Group,
  Input,
  Menu,
  Pagination,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { NextPage } from 'next';
import { SearchIcon, SelectArrowIcon, SortIcon, XIcon } from 'public/icons';
import { ChangeEvent, useCallback, useLayoutEffect, useState } from 'react';
import { accountApi } from 'resources/account';
import { productApi } from 'resources/product';
import { useCartAdd } from 'resources/user/user.api';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterBadges from './components/FilterBadges/FilterBadges';
import NumberInput from './components/NumberInput/NumberInput';
import { useStyles } from './styles';

interface ProductsListParams {
  page?: number;
  perPage?: number;
  searchValue?: string;
  sortValue?: {
    createdOn?: 'asc' | 'desc';
    price?: 'asc' | 'desc';
  };
  filter?: {
    price?: {
      from: number | null;
      to: number | null;
    };
  };
}

interface SortParams {
  value: 'createdOn' | 'price';
  order: 'asc' | 'desc';
  label: string;
}

type PriceRange = [number | null, number | null];

const PER_PAGE = 6;

const sortValues: SortParams[] = [
  { value: 'createdOn', order: 'desc', label: 'newest' },
  { value: 'createdOn', order: 'asc', label: 'oldest' },
  { value: 'price', order: 'asc', label: 'cheepest' },
  { value: 'price', order: 'desc', label: 'most expensive' },
];

const generatePriceRangeString = (range: PriceRange) => {
  if (!range[0] && !range[1]) {
    return '';
  }

  const rangeStart = range[0] !== null ? `${range[0]}$` : '...';
  const rangeEnd = range[1] !== null ? `${range[1]}$` : '...';

  return `${rangeStart}-${rangeEnd}`;
};

const Marketplace: NextPage = () => {
  const { classes } = useStyles();
  const [sortValue, setSortValue] = useState(sortValues[0]);
  const [search, setSearch] = useState('');
  const [params, setParams] = useState<ProductsListParams>({});
  const [debouncedSearch] = useDebouncedValue(search, 500);
  const [priceFilter, setPriceFilter] = useState<PriceRange>([null, null]);
  const [currentPage, setCurrentPage] = useState(1);

  const { mutate: addToCart } = useCartAdd();
  const { data: account } = accountApi.useGet();

  const handleSort = useCallback((sortParam: SortParams) => {
    setSortValue(sortParam);
    setCurrentPage(1);
    setParams((prev) => ({
      ...prev,
      sortValue: {
        [sortParam.value]: sortParam.order,
      },
      page: 1,
    }));
  }, []);

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const handleFilter = useCallback(([from, to]: [number | null, number | null]) => {
    setPriceFilter((prev) => [from !== null ? from : prev[0], to !== null ? to : prev[1]]);

    setParams((prev) => ({ ...prev, page: 1, filter: { price: { from, to } } }));
  }, []);

  const handlePage = useCallback((page: number) => {
    setCurrentPage(page);
    setParams((prev) => ({ ...prev, page }));
  }, []);

  useLayoutEffect(() => {
    setParams((prev) => ({ ...prev, page: 1, searchValue: debouncedSearch, perPage: PER_PAGE }));
  }, [debouncedSearch]);

  const handleReset = useCallback(() => {
    setSearch('');
    setPriceFilter([null, null]);

    setParams((prev) => ({ ...prev, filter: {}, searchValue: '' }));
  }, []);

  const { data, isLoading: isListLoading } = productApi.useList(params);

  return (
    <Group spacing={28} align="flex-start">
      <Container
        m="0 0 auto"
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
            <Group spacing={4} align="center" onClick={handleReset} sx={{ cursor: 'pointer' }}>
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
                onChange={(value) => handleFilter([value || null, priceFilter[1]])}
                value={priceFilter[0] ?? ''}
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
                onChange={(value) => handleFilter([priceFilter[0], value || null])}
                value={priceFilter[1] ?? ''}
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
          onChange={handleSearch}
          value={search}
        />
        <Stack spacing={12}>
          <Flex justify="space-between" align="center">
            <Text size="sm" weight={700}>
              {data?.count === undefined || data?.count === null
                ? 'Searching'
                : `${data?.count} results`}
            </Text>
            <Menu closeDelay={0}>
              <Menu.Target>
                <Group spacing={8} sx={{ cursor: 'pointer' }}>
                  <SortIcon />
                  <Text size="xs" weight={500}>
                    {`Sort by ${sortValue.label}`}
                  </Text>
                  <SelectArrowIcon />
                </Group>
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
                    onClick={() => handleSort(value)}
                    key={value.label}
                  >
                    {value.label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Flex>
          {(priceFilter[0] || priceFilter[1] || search) && (
            <FilterBadges
              badges={[
                {
                  label: generatePriceRangeString(priceFilter),
                  reset: () => {
                    setPriceFilter([null, null]);
                    setParams((prev) => ({ ...prev, filter: {} }));
                  },
                },
                {
                  label: search || '',
                  reset: () => {
                    setSearch('');
                    setParams((prev) => ({ ...prev, searchValue: '' }));
                  },
                },
              ]}
            />
          )}
        </Stack>
        <Grid m={0} className={classes.grid}>
          {isListLoading
            && Array.from({ length: PER_PAGE }).map(() => (
              <Skeleton radius={12} height={384} width={306} />
            ))}
          {data?.items.map((product) => (
            <ProductCard
              key={product._id}
              imgUrl={product.imgUrl}
              title={product.title}
              price={product.price}
              inCart={account?.cart.some((p) => p.product._id === product._id) || false}
              onAction={() => addToCart({ productId: product._id, quantity: 1 })}
            />
          ))}
        </Grid>
        {data?.count !== 0 && (
          <Center>
            <Pagination
              sx={{
                fontSize: 16,
                fontWeight: 400,
              }}
              classNames={{
                control: classes.paginationControls,
              }}
              total={data?.totalPages || 1}
              mt={10}
              value={currentPage}
              onChange={handlePage}
            />
          </Center>
        )}
      </Stack>
    </Group>
  );
};

export default Marketplace;
