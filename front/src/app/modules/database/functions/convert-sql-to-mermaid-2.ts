export default function convertSQLToMermaid2(sql: string): string {
    const tables: Record<string, string[]> = {};
    const relations: string[] = [];

    // Expressions régulières pour capturer les tables et leurs colonnes
    const tableRegex = /CREATE TABLE (\w+) \(([\s\S]+?)\);/g;
    const foreignKeyRegex = /FOREIGN KEY \((\w+)\) REFERENCES (\w+)\((\w+)\)/g;
    const primaryKeyRegex = /PRIMARY KEY \(([\w,\s]+)\)/g;

    let match;
    var allColumns: string[][] = [];

    // Extraire les tables et leurs colonnes
    while ((match = tableRegex.exec(sql)) !== null) {
        const tableName = match[1];
        const columnsSection = match[2];
        allColumns.push([match[1], match[2]]);

        let columns = columnsSection
            .split(',\n')
            .map(col => col.trim())
            .filter(col => !col.startsWith("PRIMARY KEY")) // Exclure les PK des colonnes
            .filter(col => !col.startsWith("FOREIGN KEY")) // Exclure les FK des colonnes
            .map(col => {
                const parts = col.split(/\s+/);
                const colName = parts[0];
                const colType = parts[1];
                return `    ${colName} ${colType}`;
            });

        // Détection des clés primaires composites
        let primaryKeys: string[] = [];
        let primaryKeyMatch;
        while ((primaryKeyMatch = primaryKeyRegex.exec(columnsSection)) !== null) {
            primaryKeys = primaryKeyMatch[1].split(",").map(pk => pk.trim());
        }

        // Marquer les colonnes primaires
        columns = columns.map(col => {
            const colName = col.trim().split(" ")[0];
            if (primaryKeys.includes(colName)) {
                return col + " PK";
            }
            return col;
        });

        tables[tableName] = columns;
    }


    // Trouver les relations entre les tables
    while ((match = foreignKeyRegex.exec(sql)) !== null) {
        const fromColumn = match[1];  // Clé étrangère
        const toTable = match[2];     // Table référencée
        const toColumn = match[3];    // Colonne référencée

        // Trouver la table qui possède cette clé étrangère
        const fromTable = Object.keys(tables).find(t =>
            // Chercher dans allcolumns pour trouver la colonne et vérifier que l'attribut n'est pas déjà présent
            allColumns.find(c => c[0] === t && c[1].includes(fromColumn))

        );

        console.log("Foreign key from table", fromTable);
        console.log("matches", match);

        if (fromTable) {
            relations.push(`  ${toTable} ||--o{ ${fromTable} : "${fromColumn}"`);
        }
    }

    // Construire la sortie MermaidJS
    let mermaid = "erDiagram\n\n";
    for (const [table, cols] of Object.entries(tables)) {
        mermaid += `  ${table} {\n`;
        mermaid += cols.join("\n") + "\n";
        mermaid += "  }\n\n";
    }

    mermaid += relations.join("\n") + "\n";

    return mermaid;
}
