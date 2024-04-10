export function move<T>(array: T[], fromIndex: number, toIndex: number) {
    const item = array[fromIndex];
    const { length } = array;
    const diff = fromIndex - toIndex;

    if (diff > 0) {
        return [
            ...array.slice(0, toIndex),
            item,
            ...array.slice(toIndex, fromIndex),
            ...array.slice(fromIndex + 1, length),
        ];
    }

    if (diff < 0) {
        const targetIndex = toIndex + 1;
        return [
            ...array.slice(0, fromIndex),
            ...array.slice(fromIndex + 1, targetIndex),
            item,
            ...array.slice(targetIndex, length),
        ];
    }

    return array;
}
