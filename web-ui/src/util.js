export function mapDistinct(items, primitiveKeyAccessor, projection ) {
    const keySet = new Set();
    const output = [];

    for (var i of items) {
        var key = primitiveKeyAccessor(i);

        if (!keySet.has(key)) {
            keySet.add(key);
            
            output.push(projection ? projection(i): i);
        }
    }

    return output;
}