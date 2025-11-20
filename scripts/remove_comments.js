const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const extensions = ['.ts', '.tsx', '.js', '.mjs'];
const excludeDirs = ['node_modules', '.next', '.git', '.gemini', 'dist', 'build', 'out'];

function removeComments(content) {
    // This regex handles:
    // 1. Strings (double/single quotes, backticks) - captured in group 1
    // 2. Single line comments // ...
    // 3. Multi-line comments /* ... */
    // It returns group 1 if it exists (preserving strings), otherwise empty string (removing comments)
    return content.replace(/("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`)|(\/\/[^\n\r]*|\/\*[\s\S]*?\*\/)/g, (match, group1) => {
        if (group1) return group1;
        return ''; // It's a comment, remove it
    });
}

function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const newContent = removeComments(content);
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Processed: ${filePath}`);
        }
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
    }
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (!excludeDirs.includes(file)) {
                traverseDir(fullPath);
            }
        } else if (extensions.includes(path.extname(file))) {
            // Don't process this script itself if it happens to be in the list (though it's in scripts/)
            if (fullPath !== __filename) {
                processFile(fullPath);
            }
        }
    }
}

console.log('Starting comment removal...');
traverseDir(rootDir);
console.log('Comment removal complete.');
