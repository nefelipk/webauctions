package dao;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import db.JPAResource;
import entities.*;

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

			List<Category> safe_categories = new ArrayList<Category>();
			for(Category crawl : item.getCategories()) {
				if(crawl.getIdCategory() == 0) {
					Query q = entityManager.createQuery("Select c from Category c where c.name = ?1");		
					q.setParameter(1,crawl.getName());
					Category existing_category = null;
					try {
						existing_category = (Category) q.getSingleResult();
					} catch (Exception e) {
						existing_category = null;
					}
					if(existing_category == null) {
						entityManager.persist(crawl);
						safe_categories.add(crawl);	
					}
					else {
						safe_categories.add(existing_category);
					}
				}
				else {
					entityManager.merge(crawl);
					safe_categories.add(crawl);
				}
			}
			item.setCategories(safe_categories);
			/*
			List<Bid> safe_bids = new ArrayList<Bid>();
			for(Bid crawl : item.getBids()) {
				if(crawl.getIdBid() == 0) {
					Query q = entityManager.createQuery("select c from Bid where c.name = :name");		
					q.setParameter("name",crawl.getName());
					Category existing_category = (Category) q.getSingleResult();
					if(existing_category == null) {
						entityManager.persist(existing_category);
						safe_categories.add(existing_category);	
					}
					else {
						entityManager.merge(crawl);
						safe_categories.add(crawl);
					}
				}
				else {
					entityManager.merge(crawl);
					safe_categories.add(crawl);
				}
			}
			*/
			User seller = entityManager.find(User.class,item.getUser().getIdUser());
			if(seller == null) {
				User itemUser = item.getUser();
				Query q = entityManager.createQuery("Select u from User u where u.username = ?1");		
				q.setParameter(1,item.getUser().getUsername());
				User existing_user = null;
				try {
					existing_user = (User) q.getSingleResult();
				} catch (Exception e) {
					existing_user = null;
				}
				if(existing_user == null) {
					entityManager.persist(itemUser);
					item.setUser(itemUser);
				}
				else {
					entityManager.merge(existing_user);
					item.setUser(existing_user);
				}
			}
			
			List<Bid> safe_bids = new ArrayList<Bid>();
			for(Bid crawl : item.getBids()) {
				User user = entityManager.find(User.class,crawl.getUser().getIdUser());
				if(user == null) {
					User bidUser = crawl.getUser();
					Query q = entityManager.createQuery("Select u from User u where u.username = ?1");		
					q.setParameter(1,bidUser.getUsername());
					User existing_user = null;
					try {
						existing_user = (User) q.getSingleResult();
					} catch (Exception e) {
						existing_user = null;
					}
					if(existing_user == null) {
						entityManager.persist(bidUser);
						crawl.setUser(bidUser);
					}
					else {
						//entityManager.merge(existing_user);
						crawl.setUser(existing_user);
					}
				}
				//entityManager.persist(crawl);
				safe_bids.add(crawl);
			}	
			item.setBids(safe_bids);
			
			entityManager.persist(item);
			id = item.getIdItem();

			for(entities.Bid crawl : item.getBids()) {
				crawl.setItem(item);
				entityManager.persist(crawl);
			}	
			entityManager.flush();
			transaction.commit();
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
	
	public List<entities.Bid> getBidsForAuction(int id) {
		EntityManager entityManager = JPAResource.factory.createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();
        try {	
        	entities.Item item = (entities.Item) entityManager.find(entities.Item.class,id);
        	transaction.commit();
        	return item.getBids();
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
	
	@SuppressWarnings("unchecked")
	public List<String> getTopCategories() {
		EntityManager entityManager = JPAResource.factory.createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        transaction.begin();
        try {	
        	List<String> categories = null;
        	Query q = entityManager.createQuery("select c.name from Category c group by c.name having count(c.name) > 1 order by count(c.name) desc");		
    		categories = q.setMaxResults(10).getResultList();
        	transaction.commit();
        	return categories;
        }
        catch(Exception e) {
        	logger.LoggerWA.LOGGER.log(Level.SEVERE , "{0}", e.getMessage());
			if (transaction.isActive())
				transaction.rollback();
			return null;
		}
        finally {
			entityManager.close();
		}
	}
	
	
}
