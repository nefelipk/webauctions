package dao;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceException;

import db.JPAResource;
import entities.Location;

public class LocationDAO {
	public int insert(Location location) {
		int id = -1;
        EntityManager entityManager = JPAResource.factory.createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();

        try 
        {
        	entityManager.persist(location);
        	entityManager.flush();
            id = location.getIdLocation();
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
	
	public Location getById(int id) {
		Location location = null;
		EntityManager em = JPAResource.factory.createEntityManager();
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		location = em.find(Location.class, id);	
		tx.commit();
		em.close();
		return location;
	}
}
