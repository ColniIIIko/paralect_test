import { ActionIcon, Badge, Group } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { FC, memo } from 'react';

interface FilterBadgesProps {
  badges: {
    label: string;
    reset: () => void;
  }[];
}

const FilterBadges: FC<FilterBadgesProps> = ({ badges }) => (
  <Group spacing={8}>
    {badges.map(
      (badge) => badge.label && (
        <Badge
          rightSection={(
            <ActionIcon size={16} c="black.3" variant="filled" radius="50%" onClick={badge.reset}>
              <IconX size={16} color="white" />
            </ActionIcon>
          )}
          radius={30}
          p="0 20px"
          bg="white"
          h={36}
          sx={(theme) => ({
            border: `1px solid ${theme.colors.black[0]}`,
            fontWeight: 500,
            fontSize: theme.fontSizes.xs,
            color: theme.black,
            textTransform: 'none',
          })}
        >
          {badge.label}
        </Badge>
      ),
    )}
  </Group>
);

export default memo(FilterBadges);
