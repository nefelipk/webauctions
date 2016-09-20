package entities;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Timestamp;


/**
 * The persistent class for the Bid database table.
 * 
 */
@Entity
@NamedQuery(name="Bid.findAll", query="SELECT b FROM Bid b")
@Table(name="Bid")
public class Bid implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idBid;

	private float amount;

	private Timestamp time;

	//bi-directional many-to-one association to Item
	@ManyToOne
	@JoinColumn(name="idItem")
	private Item item;

	//bi-directional many-to-one association to User
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="idBidder")
	private User user;

	public Bid() {
	}

	public int getIdBid() {
		return this.idBid;
	}

	public void setIdBid(int idBid) {
		this.idBid = idBid;
	}

	public float getAmount() {
		return this.amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}

	public Timestamp getTime() {
		return this.time;
	}

	public void setTime(Timestamp time) {
		this.time = time;
	}

	public Item getItem() {
		return this.item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}