import { forwardRef, type ReactNode } from "react";

type TProps = {
  children: ReactNode;
  noVerticalPad?: boolean;
};

const BaseLayout = forwardRef<HTMLDivElement, TProps>(function BaseLayout(
  { children, noVerticalPad }: TProps,
  ref
) {
  return (
    <div className="bg-base-100 min-h-screen">
      <div
        className={`max-w-screen-lg mx-auto max-md:px-4 ${
          !noVerticalPad && "pt-10 pb-32"
        }`}
      >
        <main
          className="w-full bg-base-100 text-base-content overflow-x-hidden"
          ref={ref}
        >
          {children}
        </main>
      </div>
    </div>
  );
});

export default BaseLayout;
