import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Image, NumberInput, Stack, TextInput, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { NextPage } from 'next';
import { Controller, useForm } from 'react-hook-form';
import { productApi } from 'resources/product';
import { handleError } from 'utils';
import { z } from 'zod';
import FileInput from './components/FileInput/FileInput';
import { useStyles } from './styles';

const schema = z.object({
  title: z.string().min(1, 'Title should be valid'),
  price: z.number().positive('Price should be positive number'),
  file: z.any(),
});

type CreateProductParams = {
  title: string;
  price: number;
  file: FileList;
};

const CreateProduct: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    control,
    reset,
  } = useForm<CreateProductParams>({
    resolver: zodResolver(schema),
  });
  const { mutate: create, isLoading } = productApi.useCreation();

  const { classes } = useStyles();

  const onSubmit = (data: CreateProductParams) => {
    if (!data.file || !data.file[0]) {
      setError('file', { message: 'Required' });
      return;
    }

    const formData = new FormData();
    formData.append('file', data.file[0], data.file[0].name);

    create(
      { fileFormData: formData, title: data.title, price: data.price },
      {
        onError: (e) => handleError(e, setError),
        onSuccess: (product) => {
          reset();
          showNotification({ message: `Product ${product.title} created` });
        },
      },
    );
  };
  const file = watch('file');
  return (
    <Stack>
      <Title order={2} weight={600} size="md">
        Create new product
      </Title>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Stack spacing="md">
          <Group spacing="sm">
            <Image
              src={file?.length ? URL.createObjectURL(file[0]) : '../images/emptyImage.png'}
              radius={20}
              height={180}
              width={180}
              fit="cover"
            />
            <FileInput
              buttonText="Upload Photo"
              accept=".jpg, .jpeg, .png"
              {...register('file')}
              error={errors.file?.message}
            />
          </Group>
          <TextInput
            classNames={{
              input: classes.input,
              label: classes.inputLabel,
            }}
            size="sm"
            radius={8}
            label="Title of the product"
            placeholder="Enter title of the product..."
            {...register('title')}
            error={errors.title?.message}
          />
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <NumberInput
                classNames={{
                  input: classes.input,
                  label: classes.inputLabel,
                }}
                size="sm"
                hideControls
                radius={8}
                label="Price"
                placeholder="Enter price of the product..."
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
                error={errors.price?.message}
              />
            )}
          />
        </Stack>
        <Button
          type="submit"
          w={145}
          h={40}
          size="xs"
          sx={{ fontWeight: 500, alignSelf: 'flex-end' }}
          radius={8}
          bg="blue.5"
          c="white"
          mt={28}
          loading={isLoading}
          loaderPosition="center"
        >
          Upload Product
        </Button>
      </form>
    </Stack>
  );
};

export default CreateProduct;
