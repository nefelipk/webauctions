package dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

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
	
	public List<String> getTopLocations() {
		 EntityManager entityManager = JPAResource.factory.createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();
        
        try {
        	Query q = entityManager.createQuery("Select i.location.country from Item i group by i.location.country having count(i.location.country) > 1 order by count(i.location.country) desc");
        	List<String> locations = q.setMaxResults(10).getResultList();
        	return locations;
        } finally {
        	entityManager.close();
        }
	}
}
