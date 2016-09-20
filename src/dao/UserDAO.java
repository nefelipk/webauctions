package dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

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
	
	@SuppressWarnings("unchecked")
	public List<entities.User> getAllUsers() {
        List<entities.User> users = null;
        EntityManager em = JPAResource.factory.createEntityManager();
        EntityTransaction tx = em.getTransaction();
        tx.begin();
        
        Query q = em.createQuery("Select u from User u");
       // Query q = em.createNamedQuery("User.findAll");
        users =  q.getResultList();
		
        tx.commit();
        em.close();
        return users;
	}
	
	public boolean checkUsernames(String username) {
        EntityManager em = JPAResource.factory.createEntityManager();
        EntityTransaction tx = em.getTransaction();
        tx.begin();
        
        Query q = em.createQuery("Select u.username from User u where u.username = ?1");
        q.setParameter(1,username);
        String exists = null;
        try {
        	exists =  (String) q.getSingleResult();
        } catch(NoResultException noRes) {
        	exists = null;
        }
        tx.commit();
        em.close();
		if(exists != null)
			return true;
		return false;
	}
	
	
	public entities.User getSpecificUser(String username, String password) {
        EntityManager em = JPAResource.factory.createEntityManager();
        EntityTransaction tx = em.getTransaction();
        tx.begin();
        
        Query q = em.createQuery("Select u from User u where u.username = ?1 and u.password = ?2");
        q.setParameter(1,username);
        q.setParameter(2,password);
		entities.User user = (User) q.getSingleResult();
		       
        tx.commit();
        em.close();
        return user;
	}
	
	public entities.User getUserByUsername(String username) {
		EntityManager em = JPAResource.factory.createEntityManager();
		EntityTransaction tx = em.getTransaction();
		tx.begin();

		Query q = em.createQuery("Select u from User u where u.username = ?1");
		q.setParameter(1, username);
		
		entities.User user = (User) q.getSingleResult();
		
		tx.commit();
		em.close();
		return user;
	}
	
	@SuppressWarnings("unchecked")
	public List<String> getTopUsers() {
		EntityManager em = JPAResource.factory.createEntityManager();
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		
		Query q = em.createQuery("Select u.username from User u,Item i where i.user.idUser = u.idUser group by u.username having count(u.username) > 1 order by count(u.username) desc ");
		List<String> topUser = q.setMaxResults(10).getResultList();
	
		tx.commit();
		em.close();
		return topUser;
	}
}
