package dao;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

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

		try {
			entityManager.persist(message);
			entityManager.flush();
			id = message.getIdMessage();
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

	@SuppressWarnings("unchecked")
	public List<entities.Message> getMessageByUsername(String username) {
		EntityManager entityManager = JPAResource.factory.createEntityManager();
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		List<entities.Message> messages = null;

		try {
			UserDAO userDAO = new UserDAO();
			entities.User user = userDAO.getUserByUsername(username);
			/*
			 * createQuery("Select m from Message m " +
			 * "where (m.user2.idUser = ?1 or m.user1.idUser = ?1) " +
			 * "and () order by m.user1.idUser asc");
			 */
			Query q = entityManager.createQuery("Select m from Message m "
					+ "where (m.user1.idUser = ?1 and m.deleted_by_sender = false) or (m.user2.idUser = ?1 and m.deleted_by_receiver = false) "
					+ "order by m.time desc");

			q.setParameter(1, user.getIdUser());

			transaction.commit();
			messages = (List<entities.Message>) q.getResultList();
			return messages;
		} catch (PersistenceException e) {
			if (transaction.isActive())
				transaction.rollback();
			return null;
		} finally {
			entityManager.close();
		}
	}

	public void deleteMessageById(String username, int id) {
		EntityManager entityManager = JPAResource.factory.createEntityManager();
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();

		try {
			entities.Message message = (entities.Message) entityManager.find(entities.Message.class, id);
			if (message.getUser1().getUsername().equals(username))
				message.setDeleted_by_sender(true);
			else
				message.setDeleted_by_receiver(true);

			if (message.isDeleted_by_receiver() && message.isDeleted_by_sender())
				entityManager.remove(message);
			transaction.commit();
		} catch (PersistenceException e) {
			if (transaction.isActive())
				transaction.rollback();
			return;
		} finally {
			entityManager.close();
		}
		return;
	}

	public int updateMessageById(int id) {
		EntityManager entityManager = JPAResource.factory.createEntityManager();
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();

		try {
			entities.Message message = (entities.Message) entityManager.find(entities.Message.class, id);
			message.setRead(true);
			transaction.commit();
			return message.getIdMessage();
		} catch (Exception e) {
			return -1;
		} finally {
			entityManager.close();
		}
	}

	@SuppressWarnings("unchecked")
	public int getNumberOfUnreadMessages(int userID) {
		EntityManager entityManager = JPAResource.factory.createEntityManager();
		EntityTransaction transaction = entityManager.getTransaction();
		transaction.begin();
		try {
			Query q = entityManager.createQuery("Select m from Message m where m.user2.idUser = ?1 AND m.read = 0");
			q.setParameter(1, userID);
			List<entities.Message> unreadMessages = q.getResultList();

			Logger LOGGER = Logger.getLogger(MessageDAO.class.getName());
			LOGGER.log(Level.SEVERE, " {0} UNREAD MESSAGES ", unreadMessages.size());

			return unreadMessages.size();

		} catch (Exception e) {
			return 0;
		} finally {
			entityManager.close();
		}
	}
}
