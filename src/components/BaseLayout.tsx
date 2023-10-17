import { forwardRef, type ReactNode } from 'react';

type TProps = {
  children: ReactNode;
  noVerticalPad?: boolean;
};

const BaseLayout = forwardRef<HTMLDivElement, TProps>(function BaseLayout(
  { children }: TProps,
  ref
) {
  return (
    <main className="bg-neutral-900 flex w-full" ref={ref}>
      {children}
    </main>
  );
});

export default BaseLayout;
