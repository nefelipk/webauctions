package entities;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Timestamp;


/**
 * The persistent class for the Message database table.
 * 
 */
@Entity
@NamedQuery(name="Message.findAll", query="SELECT m FROM Message m")
@Table(name="Message")
public class Message implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idMessage;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="idSender")
	private User user1;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="idReceiver")
	private User user2;
		
	private String message;
	
	/* escape character because 'read' is a keyword for mysql */
	@Column(name="\"read\"")
	private boolean read;
	
	private boolean deleted_by_receiver;
	private boolean deleted_by_sender;
	
	public boolean isDeleted_by_receiver() {
		return deleted_by_receiver;
	}

	public void setDeleted_by_receiver(boolean deleted_by_receiver) {
		this.deleted_by_receiver = deleted_by_receiver;
	}

	public boolean isDeleted_by_sender() {
		return deleted_by_sender;
	}

	public void setDeleted_by_sender(boolean deleted_by_sender) {
		this.deleted_by_sender = deleted_by_sender;
	}

	private Timestamp time;

	public Message() {
	}

	public int getIdMessage() {
		return this.idMessage;
	}

	public void setIdMessage(int idMessage) {
		this.idMessage = idMessage;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean getRead() {
		return this.read;
	}

	public void setRead(boolean read) {
		this.read = read;
	}

	public Timestamp getTime() {
		return this.time;
	}

	public void setTime(Timestamp time) {
		this.time = time;
	}

	public User getUser1() {
		return this.user1;
	}

	public void setUser1(User user1) {
		this.user1 = user1;
	}

	public User getUser2() {
		return this.user2;
	}

	public void setUser2(User user2) {
		this.user2 = user2;
	}

}