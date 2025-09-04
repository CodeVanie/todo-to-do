
export default function HomeContentWrapper({ children }) {
    return (
        <div className="flex w-full flex-col p-3 gap-y-2 max-w-4xl relative h-[80vh]">
            {children}
        </div>
    )
}