import { cn } from '@/lib/utils';
import * as SwitchPrimitives from '@rn-primitives/switch';
import { Platform, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

function Switch({
  className,
  checked,
  ...props
}: SwitchPrimitives.RootProps & React.RefAttributes<SwitchPrimitives.RootRef>) {

  const translateX = useRef(new Animated.Value(checked ? 14 : 0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: checked ? 14 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [checked]);

  return (
    <SwitchPrimitives.Root
      className={cn(
        'flex h-[1.15rem] w-8 shrink-0 flex-row items-center rounded-full border border-transparent shadow-sm shadow-black/5',
        Platform.select({
          web: 'focus-visible:border-ring focus-visible:ring-ring/50 peer inline-flex outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed',
        }),
        checked ? 'bg-primary' : 'bg-input dark:bg-input/80',
        props.disabled && 'opacity-50',
        className
      )}
      checked={checked}
      {...props}
    >
      <Animated.View
        style={{ transform: [{ translateX }] }}
        className={cn(
          'bg-background size-4 rounded-full',
          Platform.select({
            web: 'pointer-events-none block ring-0',
          }),
          checked
            ? 'dark:bg-primary-foreground'
            : 'dark:bg-foreground'
        )}
      />
    </SwitchPrimitives.Root>
  );
}

export { Switch };