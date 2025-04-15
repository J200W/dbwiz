import {Entity} from "./entity-interface";

export default function convertSQLToTableView(sql: any) {
    var returned_table: Entity[] = [];
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

    tables.forEach((attributes, table: string) => {
        const newEntity: Entity = {
            tablename: table,
            attributes: []
        }
        newEntity.tablename = table;
        for (let attr of attributes) {
            let parts = attr.split(" ");
            let colName = parts[0];
            let colType = parts[1].split("(")[0];


            if (!attr.includes("FOREIGN KEY")) {
                // C'est une clé primaire : name_attr type PRIMARY KEY
                if (attr.includes("PRIMARY KEY") && !attr.startsWith("PRIMARY KEY")) {
                    newEntity.attributes.push({
                        name: colName,
                        type: colType,
                        option: "PK"
                    })
                }
                // C'est un attribut basique : name_attr type
                else if (!attr.includes("PRIMARY KEY")) {
                    // returned_table += "\n    " + colName + " " + colType;

                    newEntity.attributes.push({
                        name: colName,
                        type: colType,
                        option: ""
                    })
                    primaryKeys.get(table).forEach((pk: any) => {
                        if (pk.includes(colName)) {
                            const entity = newEntity.attributes.find((attr => attr.name === colName));
                            if (entity) {
                                entity.option += "PK"
                            }
                        }
                    })

                    foreignKeys.get(table).forEach((fk: any) => {
                        if (fk.includes(colName)) {
                            const entity = newEntity.attributes.find((attr => attr.name === colName));
                            if (entity) {
                                if (entity.option?.endsWith("PK")) entity.option += ", FK"
                                else entity.option += "FK"
                            }
                        }
                    })
                }

            }
        }
        returned_table.push(newEntity);

    })

    // console.log("tables:", tables);
    // console.log("primaryKeys:", primaryKeys);
    // console.log("foreignKeys:", foreignKeys);
    // console.log("returned_table:", returned_table);

    return returned_table;
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