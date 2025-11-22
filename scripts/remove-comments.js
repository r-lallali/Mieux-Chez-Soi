const fs = require('fs');
const path = require('path');

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'];
const directoriesToSkip = ['node_modules', '.next', '.git', 'dist', 'build', 'public'];

function removeComments(content) {
    // This regex captures:
    // 1. Strings (double or single quotes) to avoid matching comments inside them
    // 2. Template literals (backticks) to avoid matching comments inside them
    // 3. Multi-line comments
    // 4. Single-line comments
    const regex = /("(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|`(?:\\[\s\S]|[^`\\])*`)|(\/\*[\s\S]*?\*\/)|(\/\/.*)/g;

    return content.replace(regex, (match, group1, group2, group3) => {
        if (group1) {
            // It's a string or template literal, keep it as is
            return group1;
        }
        // It's a comment, replace with empty string (or newline for single line to preserve line count if needed, but usually empty is fine for "cleaning")
        // However, removing single line comments entirely might merge lines if not careful with newlines.
        // Usually // comment ends at newline. The regex matches //.* which consumes until newline (but not the newline itself usually, depending on dotall).
        // JS regex . does not match newline. So //.* matches until end of line.
        // We replace with empty string. The newline remains in the original content after the match.
        return '';
    });
}

function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const newContent = removeComments(content);
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Cleaned: ${filePath}`);
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
            if (!directoriesToSkip.includes(file)) {
                traverseDir(fullPath);
            }
        } else if (extensions.includes(path.extname(file))) {
            processFile(fullPath);
        }
    }
}

// Resolve rootDir relative to this script's location (scripts/remove-comments.js -> ..)
const rootDir = path.resolve(__dirname, '..');

// Check for command line arguments
const args = process.argv.slice(2);
if (args.length > 0) {
    args.forEach(arg => {
        const fullPath = path.resolve(rootDir, arg);
        if (fs.existsSync(fullPath)) {
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                traverseDir(fullPath);
            } else {
                processFile(fullPath);
            }
        } else {
            console.log(`Path not found: ${arg}`);
        }
    });
} else {
    // Default behavior: process specific directories
    // Plan said app, components, lib, actions.
    const targetDirs = ['app', 'components', 'lib', 'actions', 'services', 'realisations'];

    console.log('Starting comment removal...');

    targetDirs.forEach(dir => {
        const fullPath = path.join(rootDir, dir);
        if (fs.existsSync(fullPath)) {
            traverseDir(fullPath);
        } else {
            console.log(`Directory not found (skipping): ${dir}`);
        }
    });

    // Also process config files in root
    const rootFiles = ['next.config.ts', 'next.config.js', 'tailwind.config.ts', 'tailwind.config.js'];
    rootFiles.forEach(file => {
        const fullPath = path.join(rootDir, file);
        if (fs.existsSync(fullPath)) {
            processFile(fullPath);
        }
    });
}

console.log('Comment removal complete.');
