import * as React from "react";
import { mergeClasses } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                {...props}
                className={mergeClasses(
                    "bg-white rounded-lg shadow-sm",
                    "w-full max-w-full", 
                    "p-4 sm:p-6", 
                    className
                )}
            >
                 {children}
            </div>
        );
    }
);
Card.displayName = "Card";

export { Card };
