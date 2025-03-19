export default function convertSQLToMermaid(sql: string): string {
    var mermaid: string = "\nerDiagram\n";
    const tables = new Map();
    const foreignKeys = new Map();
    const primaryKeys = new Map();
    let match;

    // Les regex pour reconnaître la syntax sql
    const tableRegex = /CREATE TABLE (\w+) \(([\s\S]+?)\);/g;
    const foreignKeyRegex = /FOREIGN KEY \((\w+)\) REFERENCES (\w+)\((\w+)\)/g;
    const referenceRegex = /REFERENCES (\w+)\((\w+)\)/g

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
        let primKeyArr: string[] = []
        let foreKeyArr: string[] = []

        attributes.forEach((at: string) => {
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

    tables.forEach((attributes: string[] , table: string) => {
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

                    primaryKeys.get(table).forEach((pk: string) => {
                        if (pk.includes(colName)) {
                            mermaid += " PK"
                        }
                    })

                    foreignKeys.get(table).forEach((fk: string) => {
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

    /**
     *   Users ||--o{ Restaurants : "owner_id"
     *   Users ||--o{ Reviews : "user_id"
     *   Restaurants ||--o{ Reviews : "restaurant_id"
     *   Users ||--o{ Favorites : "user_id"
     *   Restaurants ||--o{ Favorites : "restaurant_id"
     */

    for (let [table, fk] of foreignKeys) {
        console.log(table, fk)
        while ((match = foreignKeyRegex.exec(fk)) !== null) {
            const fromColumn = match[1];  // Clé étrangère
            const toTable = match[2];     // Table référencée
            const toColumn = match[3];    // Colonne référencée
            console.log(table, fromColumn, toTable, toColumn, "\n\n");
            mermaid += toTable + " ||--o{ " + table + " : \""+ fromColumn +"\"\n";
        }
    }
    console.log("tables: ", tables);
    console.log("primaryKeys: ", primaryKeys);
    console.log("foreignKeys: ", foreignKeys);
    console.log("mermaid: ", mermaid);
    return mermaid;
}


function extractPrimaryKeys(sql: string) {
    const primaryKeyRegex = /PRIMARY KEY\s*\(([^)]+)\)/g;
    let match;
    const primaryKeys = [];

    while ((match = primaryKeyRegex.exec(sql)) !== null) {
        const keys = match[1].split(',').map(key => key.trim()); // Séparer et nettoyer les clés primaires
        primaryKeys.push(...keys);
    }

    return primaryKeys;
}