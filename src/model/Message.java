package model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the Message database table.
 * 
 */
@Entity
@NamedQuery(name="Message.findAll", query="SELECT m FROM Message m")
public class Message implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private MessagePK id;

	@Lob
	private String message;

	private byte read;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="idSender")
	private User sender;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="idReceiver")
	private User receiver;

	public Message() {
	}

	public MessagePK getId() {
		return this.id;
	}

	public void setId(MessagePK id) {
		this.id = id;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public byte getRead() {
		return this.read;
	}

	public void setRead(byte read) {
		this.read = read;
	}

	public User getSender() {
		return this.sender;
	}

	public void setSender(User sender) {
		this.sender = sender;
	}

	public User getReceiver() {
		return this.receiver;
	}

	public void setReceiver(User receiver) {
		this.receiver = receiver;
	}

}