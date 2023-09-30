import {
  NumberInput as NumberInputMantine,
  NumberInputProps as NumberInputPropsMantine,
} from '@mantine/core';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useStyles } from './styles';

interface NumberInputProps extends Omit<NumberInputPropsMantine, 'icon'> {
  leftElement: ReactNode;
  leftGap: number;
}

const NumberInput: FC<NumberInputProps> = ({ leftElement, leftGap, sx, ...props }) => {
  const leftElementRef = useRef<HTMLDivElement>(null);
  const [paddingLeft, setPaddingLeft] = useState<number>(0);

  const { classes } = useStyles();

  useEffect(() => {
    if (leftElementRef.current) {
      const width = leftElementRef.current?.getBoundingClientRect().width;
      setPaddingLeft(width + leftGap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftElementRef.current, leftGap]);
  return (
    <div className={classes.inputWrapper}>
      <div ref={leftElementRef} className={classes.inputLeft}>
        {leftElement}
      </div>
      <NumberInputMantine
        {...props}
        sx={(theme) => ({
          input: {
            paddingLeft,
            fontWeight: 500,
            borderRadius: 8,
            border: `1px solid ${theme.colors.black[0]}`,
          },
        })}
      />
    </div>
  );
};

export default NumberInput;
