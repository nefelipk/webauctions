package dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import db.JPAResource;
import entities.Bid;
import entities.Item;

public class ItemDAO {

	@SuppressWarnings("unchecked")
	public List<entities.Item> generalSearch(String term) {
		List<entities.Item> items = null;
		EntityManager em = JPAResource.factory.createEntityManager();
		EntityTransaction tx = em.getTransaction();
		tx.begin();

		// OR i.idItem IN (SELECT ic.idItem FROM ItemCategory ic,Category c
		// WHERE ic.idCategory = c.idCategory AND c.name LIKE :term3)
		
		Query q = em.createQuery("SELECT i FROM Item i WHERE i.description LIKE :term OR i.name LIKE :term order by i.ends desc");		
		q.setParameter("term", "%"+term+"%");
		items = q.getResultList();

		tx.commit();
		em.close();
		return items;
	}

	public int insert(Item item) {
		int id = -1;
		EntityManager entityManager = JPAResource.factory.createEntityManager();
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		try {
			entityManager.persist(item);
			id = item.getIdItem();
			
			for(entities.Bid crawl : item.getBids()) {
				crawl.setItem(item);
				entityManager.persist(crawl);
			}	
			//item.getBid().setItem(item);
			//entityManager.persist(item.getBid());

			entityManager.flush();
			transaction.commit();
			return id;
		} catch (PersistenceException e) {
			if (transaction.isActive())
				transaction.rollback();
			return id;
		} finally {
			entityManager.close();
		}
	}
	
	public entities.Item getById(int id) {
		EntityManager entityManager = JPAResource.factory.createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();
        
        try {	
        	entities.Item item = (entities.Item) entityManager.find(entities.Item.class,id);
        	transaction.commit();
        	return item;
		}
        catch(PersistenceException e) {
			if (transaction.isActive())
				transaction.rollback();
			return null;
		}
        finally {
			entityManager.close();
		}
	}
	
	public void placeBid(Bid bid) {
		EntityManager entityManager = JPAResource.factory.createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();
       
        try {	
        	entities.Item item = (entities.Item) entityManager.find(entities.Item.class,bid.getItem().getIdItem());
        	item.addBid(bid);
        	transaction.commit();
		}
        catch(PersistenceException e) {
			if (transaction.isActive())
				transaction.rollback();
			return;
		}
        finally {
			entityManager.close();
		}
	};
}
