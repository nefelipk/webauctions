package model;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the Message database table.
 * 
 */
@Embeddable
public class MessagePK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	private int idMessage;

	@Column(insertable=false, updatable=false)
	private int idReceiver;

	@Column(insertable=false, updatable=false)
	private int idSender;

	public MessagePK() {
	}
	public int getIdMessage() {
		return this.idMessage;
	}
	public void setIdMessage(int idMessage) {
		this.idMessage = idMessage;
	}
	public int getIdReceiver() {
		return this.idReceiver;
	}
	public void setIdReceiver(int idReceiver) {
		this.idReceiver = idReceiver;
	}
	public int getIdSender() {
		return this.idSender;
	}
	public void setIdSender(int idSender) {
		this.idSender = idSender;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof MessagePK)) {
			return false;
		}
		MessagePK castOther = (MessagePK)other;
		return 
			(this.idMessage == castOther.idMessage)
			&& (this.idReceiver == castOther.idReceiver)
			&& (this.idSender == castOther.idSender);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.idMessage;
		hash = hash * prime + this.idReceiver;
		hash = hash * prime + this.idSender;
		
		return hash;
	}
}