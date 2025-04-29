package com.j200w.dbwiz.service;

import com.j200w.dbwiz.model.DatabaseTable;
import com.j200w.dbwiz.repository.DatabaseTableRepository;
import com.j200w.dbwiz.service.interfaces.IDatabaseService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Data
public class DatabaseTableService implements IDatabaseTableService {

    @Autowired
    private final DatabaseTableRepository databaseTableRepository;

    @Override
    public void saveDatabase(DatabaseTable databaseTable) {
        databaseTableRepository.save(databaseTable);
    }

}
