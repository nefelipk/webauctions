package dao;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import db.JPAResource;
import entities.Bid;
import entities.Category;
import entities.Item;
import entities.User;

public class ItemDAO {

	@SuppressWarnings("unchecked")
	public List<entities.Item> generalSearch(String term) {
		List<entities.Item> items = null;
		EntityManager em = JPAResource.factory.createEntityManager();
		EntityTransaction tx = em.getTransaction();
		tx.begin();

		// OR i.idItem IN (SELECT ic.idItem FROM ItemCategory ic,Category c
		// WHERE ic.idCategory = c.idCategory AND c.name LIKE :term3)

		Query q = em.createQuery(
				"SELECT i FROM Item i WHERE i.description LIKE :term OR i.name LIKE :term order by i.ends desc");
		q.setParameter("term", "%" + term + "%");
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
		
		Query q2 = entityManager.createQuery("select i from Item i where i.user.username = :username and i.started = :started and i.name = :name");
		q2.setParameter("username",item.getUser().getUsername());
		q2.setParameter("started",item.getStarted());
		q2.setParameter("name",item.getName());
		try {
			Item i = (Item) q2.getSingleResult();
			if(i != null) {
				return -1;
			}
		} catch (Exception e) {
			
		} 
		
		try {
				
			List<Category> safe_categories = new ArrayList<Category>();
			for (Category crawl : item.getCategories()) {
				if (crawl.getIdCategory() == 0) {
					Query q = entityManager.createQuery("Select c from Category c where c.name = ?1");
					q.setParameter(1, crawl.getName());
					Category existing_category = null;
					try {
						existing_category = (Category) q.getSingleResult();
					} catch (Exception e) {
						existing_category = null;
					}
					if (existing_category == null) {
						entityManager.persist(crawl);
						safe_categories.add(crawl);
					} else {
						safe_categories.add(existing_category);
					}
				} else {
					entityManager.merge(crawl);
					safe_categories.add(crawl);
				}
			}
			item.setCategories(safe_categories);
			/*
			 * List<Bid> safe_bids = new ArrayList<Bid>(); for(Bid crawl :
			 * item.getBids()) { if(crawl.getIdBid() == 0) { Query q =
			 * entityManager.createQuery(
			 * "select c from Bid where c.name = :name");
			 * q.setParameter("name",crawl.getName()); Category
			 * existing_category = (Category) q.getSingleResult();
			 * if(existing_category == null) {
			 * entityManager.persist(existing_category);
			 * safe_categories.add(existing_category); } else {
			 * entityManager.merge(crawl); safe_categories.add(crawl); } } else
			 * { entityManager.merge(crawl); safe_categories.add(crawl); } }
			 */
			User seller = entityManager.find(User.class, item.getUser().getIdUser());
			if (seller == null) {
				User itemUser = item.getUser();
				Query q = entityManager.createQuery("Select u from User u where u.username = ?1");
				q.setParameter(1, item.getUser().getUsername());
				User existing_user = null;
				try {
					existing_user = (User) q.getSingleResult();
				} catch (Exception e) {
					existing_user = null;
				}
				if (existing_user == null) {
					entityManager.persist(itemUser);
					item.setUser(itemUser);
				} else {
					entityManager.merge(existing_user);
					item.setUser(existing_user);
				}
			}

			List<Bid> safe_bids = new ArrayList<Bid>();
			for (Bid crawl : item.getBids()) {
				User user = entityManager.find(User.class, crawl.getUser().getIdUser());
				if (user == null) {
					User bidUser = crawl.getUser();
					Query q = entityManager.createQuery("Select u from User u where u.username = ?1");
					q.setParameter(1, bidUser.getUsername());
					User existing_user = null;
					try {
						existing_user = (User) q.getSingleResult();
					} catch (Exception e) {
						existing_user = null;
					}
					if (existing_user == null) {
						entityManager.persist(bidUser);
						crawl.setUser(bidUser);
					} else {
						// entityManager.merge(existing_user);
						crawl.setUser(existing_user);
					}
				}
				// entityManager.persist(crawl);
				safe_bids.add(crawl);
			}
			item.setBids(safe_bids);

			entityManager.persist(item);
			id = item.getIdItem();

			for (entities.Bid crawl : item.getBids()) {
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
			entities.Item item = (entities.Item) entityManager.find(entities.Item.class, id);
			transaction.commit();
			return item;
		} catch (PersistenceException e) {
			if (transaction.isActive())
				transaction.rollback();
			return null;
		} finally {
			entityManager.close();
		}
	}

	public void placeBid(Bid bid) {
		EntityManager entityManager = JPAResource.factory.createEntityManager();
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();

		try {
			entities.Item item = (entities.Item) entityManager.find(entities.Item.class, bid.getItem().getIdItem());
			item.addBid(bid);
			transaction.commit();
		} catch (PersistenceException e) {
			if (transaction.isActive())
				transaction.rollback();
			return;
		} finally {
			entityManager.close();
		}
	};

	public List<entities.Bid> getBidsForAuction(int id) {
		EntityManager entityManager = JPAResource.factory.createEntityManager();
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		try {
			entities.Item item = (entities.Item) entityManager.find(entities.Item.class, id);
			transaction.commit();
			return item.getBids();
		} catch (PersistenceException e) {
			if (transaction.isActive())
				transaction.rollback();
			return null;
		} finally {
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
			// Query q = entityManager.createQuery("select c.name from Category
			// c group by c.name having count(c.name) > 1 order by count(c.name)
			// desc");
			Query q = entityManager.createQuery(
					"select c.name from Category c,Item i where c member of i.categories group by c.name having count(c.name) > 1 order by count(c.name) desc");
			categories = q.setMaxResults(10).getResultList();
			transaction.commit();
			return categories;
		} catch (Exception e) {
			logger.LoggerWA.LOGGER.log(Level.SEVERE, "{0}", e.getMessage());
			if (transaction.isActive())
				transaction.rollback();
			return null;
		} finally {
			entityManager.close();
		}
	}

	public List<entities.Item> getByCategory(String term) {
		EntityManager entityManager = JPAResource.factory.createEntityManager();
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();

		try {

			// Query q = entityManager.createQuery("Select i from Item i ,
			// i.categories c where i.categories.idCategory in (select
			// c1.idCategory from Category c1 where c1.name like :term");
			Query q = entityManager.createQuery(
					"Select i from Item i inner join i.categories c where c.name in (Select c.name from Category c where c.name like :term) order by i.ends desc");
			q.setParameter("term", "%" + term + "%");
			List<entities.Item> items = q.setMaxResults(100).getResultList();
			return items;
		} finally {
			entityManager.close();
		}
	}

	public List<entities.Item> getByLocation(String term) {
		EntityManager entityManager = JPAResource.factory.createEntityManager();
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		try {
			Query q = entityManager.createQuery(
					"Select i from Item i where i.location.country LIKE :term or i.location.city like :term or i.location.location like :term");
			q.setParameter("term", "%" + term + "%");
			List<entities.Item> items = q.setMaxResults(100).getResultList();
			return items;
		} finally {
			entityManager.close();
		}
	}
	
	public List<entities.Item> getBySeller(String term) {
		EntityManager entityManager = JPAResource.factory.createEntityManager();
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		try {
			Query q = entityManager.createQuery("Select i from Item i where i.user.username = :term");
			q.setParameter("term",term);
			List<entities.Item> items = q.setMaxResults(100).getResultList();
			return items;
		} finally {
			entityManager.close();
		}
	}
	
	public List<entities.Item> getByPrice(float amount) {
		EntityManager entityManager = JPAResource.factory.createEntityManager();
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		try {
			Query q = entityManager.createQuery("Select i from Item i where i.currently - :amount <= 0 order by i.currently desc");
			q.setParameter("amount",amount);
			List<entities.Item> items = q.setMaxResults(100).getResultList();
			return items;
		} finally {
			entityManager.close();
		}
	}
		
}
