package model;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;


/**
 * The persistent class for the Bid database table.
 * 
 */
@Entity
@NamedQuery(name="Bid.findAll", query="SELECT b FROM Bid b")
public class Bid implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idBid;

	private float amount;

	private Timestamp time;

	//bi-directional many-to-one association to Item
	@ManyToOne
	@JoinColumn(name="idItem")
	private Item item;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="idBidder")
	private User user;

	//bi-directional many-to-one association to Item
	@OneToMany(mappedBy="bid")
	private List<Item> items;

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

	public List<Item> getItems() {
		return this.items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public Item addItem(Item item) {
		getItems().add(item);
		item.setBid(this);

		return item;
	}

	public Item removeItem(Item item) {
		getItems().remove(item);
		item.setBid(null);

		return item;
	}

}