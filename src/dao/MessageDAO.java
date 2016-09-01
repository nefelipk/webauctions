package dao;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceException;

import db.JPAResource;

public class MessageDAO {
	public int insert(entities.Message message) {
		int id = -1;
        EntityManager entityManager = JPAResource.factory.createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();

        try 
        {
        	entityManager.persist(message);
        	entityManager.flush();
            id = message.getIdMessage();
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
