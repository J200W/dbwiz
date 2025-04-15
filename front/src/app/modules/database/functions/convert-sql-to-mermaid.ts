export default function convertSQLToMermaid(sql: any) {
    var mermaid = "\nerDiagram\n";
    const tables = new Map();
    const foreignKeys = new Map();
    const primaryKeys = new Map();
    let match;

    // Les regex pour reconnaître la syntax sql
    const tableRegex = /CREATE TABLE (\w+)\s*\(([\s\S]+?)\);/g;
    const foreignKeyRegex = /FOREIGN KEY \((\w+)\) REFERENCES (\w+)\s*\((\w+)\)/g;
    const referenceRegex = /REFERENCES (\w+)\s*\((\w+)\)/g

    while ((match = tableRegex.exec(sql)) !== null) {
        tables.set(match[1], match[2].split(",\n").map(attr => {
            if (!attr.includes("PRIMARY KEY") && !attr.includes("FOREIGN KEY") && !attr.includes("REFERENCES")) {
                let parts = attr.trim().split(" ");
                let colName = parts[0];
                let colType = parts[1];
                return colName + " " + colType;
            }
            else {
                return attr.trim()
            }
        }))
    }

    // Extraire dans chaque table les clés primaires et les clés étrangères
    tables.forEach((attributes, table) => {
        let primKeyArr: any[] = []
        let foreKeyArr: any[] = []

        attributes.forEach((at: any) => {
            if (at.startsWith("PRIMARY KEY")) {
                extractPrimaryKeys(at).forEach(pk => {
                    primKeyArr.push(pk)
                })
            }
            else if (at.includes("PRIMARY KEY")) {
                primKeyArr.push(at)
            }
            else if (at.includes("FOREIGN KEY")) {
                foreKeyArr.push(at)
            }
            else if (at.includes("REFERENCES")) {
                const parts = at.split(" ")
                while ((match = referenceRegex.exec(at)) !== null) {
                    const newRef = `FOREIGN KEY (${parts[0]}) REFERENCES ${match[1]}(${match[2]})`
                    foreKeyArr.push(newRef)
                }
            }
        })
        primaryKeys.set(table, primKeyArr);
        foreignKeys.set(table, foreKeyArr);
    });

    tables.forEach((attributes, table) => {
        mermaid += "\n  " + table + " {";
        for (let attr of attributes) {
            let parts = attr.split(" ");
            let colName = parts[0];
            let colType = parts[1].split("(")[0];

            if (!attr.includes("FOREIGN KEY")) {
                // C'est une clé primaire : name_attr type PRIMARY KEY
                if (attr.includes("PRIMARY KEY") && !attr.startsWith("PRIMARY KEY")) {
                    mermaid += "\n    " + colName + " " + colType + " PK";
                }
                // C'est un attribut basique : name_attr type
                else if (!attr.includes("PRIMARY KEY")) {
                    mermaid += "\n    " + colName + " " + colType;

                    primaryKeys.get(table).forEach((pk: any) => {
                        if (pk.includes(colName)) {
                            mermaid += " PK"
                        }
                    })

                    foreignKeys.get(table).forEach((fk: any) => {
                        if (fk.includes(colName)) {
                            if (mermaid.endsWith("PK")) mermaid += ", FK"
                            else mermaid += " FK"
                        }
                    })
                }

            }
        }
        mermaid += "\n  }\n"
    })
    mermaid += "\n"

    // Ajout des relations entre les entités

    for (let [table, fk] of foreignKeys) {
        while ((match = foreignKeyRegex.exec(fk)) !== null) {
            const fromColumn = match[1];  // Clé étrangère
            const toTable = match[2];     // Table référencée
            const toColumn = match[3];    // Colonne référencée
            mermaid += toTable + " ||--o{ " + table + " : \""+ fromColumn +"\"\n";
        }
    }

    if (mermaid.replaceAll("\n", "") == "erDiagram") return "";
    return mermaid;
}


function extractPrimaryKeys(sql: any) {
    const primaryKeyRegex = /PRIMARY KEY\s*\(([^)]+)\)/g;
    let match;
    const primaryKeys = [];

    while ((match = primaryKeyRegex.exec(sql)) !== null) {
        const keys = match[1].split(',').map(key => key.trim()); // Séparer et nettoyer les clés primaires
        primaryKeys.push(...keys);
    }

    return primaryKeys;
}