package dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

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
	
	@SuppressWarnings("unchecked")
	public List<entities.Message> getMessageByUsername(String username) {
		EntityManager entityManager = JPAResource.factory.createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();
        List<entities.Message> messages = null;
        
        try 
        {	
        	UserDAO userDAO = new UserDAO();
        	entities.User user = userDAO.getUserByUsername(username);
        	
        	Query q = entityManager.createQuery(
        			"Select m from Message m where m.user2.idUser = ?1");
            q.setParameter(1,user.getIdUser());    

            transaction.commit();
            messages = (List<entities.Message>) q.getResultList();
            return messages;
        }
        catch (PersistenceException e)
        {
            if (transaction.isActive()) transaction.rollback();
            return null;
        }
        finally 
        {
            entityManager.close();
        }
	}
}
