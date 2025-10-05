
const myReplace = (source, pattern, replacement) => {
    
    const patternIndexStart = source.indexOf(pattern);
    const patternIndexEnd = patternIndexStart + pattern.length;

    const before = source.substring(0, patternIndexStart);
    const after = source.substring(patternIndexEnd);

    return before + replacement + after;
}

function main() {
    console.log(myReplace("Water Fire Fire", "Fire", "Earth"))

}
main();