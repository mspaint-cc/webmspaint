/**
 * A presentational React component that renders a dark-themed grouped box with a top title bar and a content area.
 *
 * The optional `icon` prop, if provided, is rendered at the start of the title bar. `title` is displayed in the top bar; `children` are rendered in the vertical content area below.
 *
 * This component is purely presentational and has no side effects or internal state.
 *
 * @returns A JSX element representing the styled group box.
 */
export function Groupbox({ icon: Icon, title, children }: { icon?: React.ElementType, title: string, children: React.ReactNode }) {
    return (
        <div className="mt-1 ml-2 mb-3 rounded-[3px] bg-[rgb(15,15,15)] border border-[rgb(40,40,40)] relative font-normal">
            {/* Top Bar */}
            <div className="w-full h-[38px] flex flex-row bg-[rgb(15,15,15)]">
                {/* Title */}
                <div className="flex flex-row items-center w-full border-b border-b-[rgb(40,40,40)]">
                    {Icon && (<Icon className="text-[rgb(125,85,255)] h-[calc(100%)] ml-2 mr-[-5px]" />)}
                    <span className="text-white text-sm ml-3 mt-1">{title}</span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col right p-2 gap-2">
                {children}
            </div>
        </div>
    )
}