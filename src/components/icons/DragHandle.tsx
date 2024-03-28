type DragHandleProps = {
    fill?: string;
};

export function DragHandle({ fill = '#000' }: DragHandleProps) {
    return (
        <svg width="25" height="25" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.875 0.5a0.25 0.25 0 1 0 0 0.5 0.25 0.25 0 0 0 0 -0.5m0 0.75a0.25 0.25 0 1 0 0 0.5 0.25 0.25 0 0 0 0 -0.5m0 0.75a0.25 0.25 0 1 0 0 0.5 0.25 0.25 0 0 0 0 -0.5m-0.75 -0.75a0.25 0.25 0 1 0 0 0.5 0.25 0.25 0 0 0 0 -0.5m0 0.75a0.25 0.25 0 1 0 0 0.5 0.25 0.25 0 0 0 0 -0.5M1.125 0.5a0.25 0.25 0 1 0 0 0.5 0.25 0.25 0 0 0 0 -0.5"
                fill={fill}
            />
        </svg>
    );
}
