import { Box, Button, Text, clsx } from '@mantine/core';
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  MouseEvent,
  forwardRef,
  memo,
  useCallback,
  useRef,
} from 'react';
import { useStyles } from './styles';

interface FileInputProps
  extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> {
  buttonText: string;
  error?: string;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ buttonText, error, ...props }, ref) => {
    const { classes } = useStyles();

    const labelRef = useRef<HTMLLabelElement>(null);

    const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
      if (e.target !== labelRef.current) {
        labelRef.current?.click();
      }
    }, []);

    return (
      <Box>
        <Box>
          <Button
            size="xs"
            p="4px 20px"
            radius={8}
            bg="white"
            className={clsx({
              [classes.button]: true,
              [classes.buttonError]: Boolean(error),
            })}
            h={40}
            w={135}
            onClick={handleButtonClick}
          >
            <label ref={labelRef} className={classes.label} htmlFor="file">
              {buttonText}
            </label>
          </Button>

          <input className={classes.input} {...props} ref={ref} type="file" id="file" />
        </Box>
        {error && (
          <Text mt={8} c="red" size="xs">
            {error}
          </Text>
        )}
      </Box>
    );
  },
);

export default memo(FileInput);
