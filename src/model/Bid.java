package model;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Timestamp;


/**
 * The persistent class for the Bid database table.
 * 
 */
@Entity
@NamedQuery(name="Bid.findAll", query="SELECT b FROM Bid b")
public class Bid implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private BidPK id;

	private float amount;

	private Timestamp time;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="idBidder")
	private User bidder;
	
	//bi-directional many-to-one association to Item
	@ManyToOne
	@JoinColumn(name="idItem")
	private Item item;

	//bi-directional one-to-one association to Item
	@OneToOne
	@JoinColumn(name="idBid", referencedColumnName="currently")
	private Item itemMaxBid;

	public Bid() {
	}

	public BidPK getId() {
		return this.id;
	}

	public void setId(BidPK id) {
		this.id = id;
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
	
	public User getBidder() {
		return this.bidder;
	}

	public void setBidder(User bidder) {
		this.bidder = bidder;
	}

	public Item getItem() {
		return this.item;
	}

	public void setItem(Item item) {
		this.item = item;
	}
	
	public Item getItemMaxBid() {
		return this.itemMaxBid;
	}

	public void setItemMaxBid(Item itemMaxBid) {
		this.itemMaxBid = itemMaxBid;
	}
	
}