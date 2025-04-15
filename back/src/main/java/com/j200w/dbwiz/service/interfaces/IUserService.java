package com.j200w.dbwiz.service.interfaces;

import com.j200w.dbwiz.model.User;

import java.util.List;
import java.util.Optional;

/**
 * L'interface IUserService est le service pour les utilisateurs.
 */
public interface IUserService {

    /**
     * Supprimer un utilisateur par son id
     *
     * @param id
     */
    void delete(String id);

    /**
     * Récupérer tous les utilisateurs
     *
     * @return - List<User>
     */
    List<User> findAll();

    /**
     * Récupérer un utilisateur par son id
     *
     * @param id
     * @return - User
     */
    User getById(String id);

    /**
     * Mettre à jour un utilisateur
     *
     * @param id
     * @param user
     * @return - User
     */
    User update(String id, User user);

    /**
     * Créer un utilisateur
     *
     * @param user
     * @return - User
     */
    User create(User user);

    /**
     * Récupérer un utilisateur par son email
     *
     * @param email
     * @return - User
     */
    User getByEmail(String email);

    /**
     * Vérifier si un utilisateur existe.
     *
     * @param id l'id de l'utilisateur
     * @return boolean
     */
    boolean existsById(String id);

    /**
     * Trouver un utilisateur par son if
     *
     * @param id
     * @return - Optional<User>
     */
    Optional<User> findById(String id);

    /**
     * Vérifier si un utilisateur existe.
     *
     * @param email l'id de l'utilisateur
     * @return boolean
     */
    boolean existsByEmail(String email);

    /**
     * Trouver un utilisateur par son email
     *
     * @param email
     * @return - Optional<User>
     */
    Optional<User> findByEmail(String email);

    /**
     * Sauvegarder un utilisateur
     *
     * @param user
     * @return - User
     */
    User save(User user);
}
