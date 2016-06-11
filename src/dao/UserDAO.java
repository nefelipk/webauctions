package dao;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceException;

import db.JPAResource;
import entities.User;

public class UserDAO {
	public int insert(User user) {
		int id = -1;
        EntityManager entityManager = JPAResource.factory.createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();

        try 
        {
        	entityManager.persist(user);
        	entityManager.flush();
            id = user.getIdUser();
            transaction.commit();
            return id;
        }
        catch (PersistenceException e)
        {
            if (transaction.isActive()) transaction.rollback();
            return id;
        }
        finally 
        {
            entityManager.close();
        }
	}
}
