package dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import db.JPAResource;

public class ItemDAO {

	@SuppressWarnings("unchecked")
	public List<entities.Item> generalSearch(String term) {
		List<entities.Item> items = null;
		EntityManager em = JPAResource.factory.createEntityManager();
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		
		//OR i.idItem IN (SELECT ic.idItem FROM ItemCategory ic,Category c WHERE ic.idCategory = c.idCategory AND c.name LIKE :term3) 
		
		Query q = em.createQuery("SELECT i FROM Item i WHERE i.description LIKE :term1 OR i.name LIKE :term2 ");
		q.setParameter("term1",term);
		q.setParameter("term2",term);
		items = q.getResultList();
		tx.commit();
		em.close();
		return items;
	}
}