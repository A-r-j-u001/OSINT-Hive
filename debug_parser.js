const fs = require('fs');
const path = require('path');

try {
    const filePath = path.join(process.cwd(), 'Cleaned Better Schema Github Indian Users Deep Data.csv');
    console.log("Reading file from:", filePath);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const parseCSV = (text) => {
        const rows = [];
        let currentRow = [];
        let currentField = '';
        let inQuotes = false;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];

            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    currentField += '"';
                    i++; // Skip escaped quote
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                currentRow.push(currentField);
                currentField = '';
            } else if ((char === '\n' || char === '\r') && !inQuotes) {
                if (char === '\r' && nextChar === '\n') i++; // Handle CRLF
                currentRow.push(currentField);
                // Push even if empty to verify structure, but usually we skip strict empty lines
                if (currentRow.length > 0) rows.push(currentRow);
                currentRow = [];
                currentField = '';
            } else {
                currentField += char;
            }
        }
        // Push last row if exists
        if (currentRow.length > 0) rows.push(currentRow);
        return rows;
    }

    const rows = parseCSV(fileContents);
    console.log(`Parsed ${rows.length} rows`);

    if (rows.length > 1) {
        // Log Header
        console.log('\n--- HEADERS (Row 0) ---');
        rows[0].forEach((col, i) => console.log(`${i}: ${col}`));

        // Log First Data Row
        console.log('\n--- DATA (Row 1) ---');
        const row = rows[1];
        console.log(`Row Length: ${row.length}`);
        row.forEach((col, i) => console.log(`${i}: ${col.substring(0, 100)}`));
    }

} catch (e) {
    console.error("Error:", e.message);
}
