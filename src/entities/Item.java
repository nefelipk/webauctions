package entities;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.sql.Timestamp;
import java.util.List;


/**
 * The persistent class for the Item database table.
 * 
 */
@Entity
@NamedQuery(name="Item.findAll", query="SELECT i FROM Item i")
@Table(name="Item")
public class Item implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idItem;

	@Column(name="buy_price")
	private String buyPrice;

	private float currently;

	private String description;

	private Timestamp ends;

	@Column(name="first_bid")
	private String firstBid;

	private String name;

	@Column(name="number_of_bids")
	private int numberOfBids;

	private Timestamp started;

	//bi-directional many-to-one association to Bid
	@OneToMany(mappedBy="item",cascade=CascadeType.PERSIST)
	@OrderBy("amount asc")
	private List<Bid> bids;

	//bi-directional many-to-many association to Category
	@ManyToMany
	@JoinTable(
		name="ItemCategory"
		, joinColumns={
			@JoinColumn(name="idItem")
			}
		, inverseJoinColumns={
			@JoinColumn(name="idCategory")
			}
		)
	private List<Category> categories;

	//bi-directional many-to-one association to Image
	@ManyToOne(cascade=CascadeType.PERSIST)
	@JoinColumn(name="idImage")
	//@JsonDeserialize(as = java.sql.Blob.class)
	private Image image;

	//bi-directional many-to-one association to Location
	@ManyToOne(cascade=CascadeType.PERSIST)
	@JoinColumn(name="idLocation")
	private Location location;

	//bi-directional many-to-one association to User
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="idSeller")
	private User user;

	public Item() {
	}

	public int getIdItem() {
		return this.idItem;
	}

	public void setIdItem(int idItem) {
		this.idItem = idItem;
	}

	public String getBuyPrice() {
		return this.buyPrice;
	}

	public void setBuyPrice(String buyPrice) {
		this.buyPrice = buyPrice;
	}

	public float getCurrently() {
		return this.currently;
	}

	public void setCurrently(float currently) {
		this.currently = currently;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Timestamp getEnds() {
		return this.ends;
	}

	public void setEnds(Timestamp ends) {
		this.ends = ends;
	}

	public String getFirstBid() {
		return this.firstBid;
	}

	public void setFirstBid(String firstBid) {
		this.firstBid = firstBid;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getNumberOfBids() {
		return this.numberOfBids;
	}

	public void setNumberOfBids(int numberOfBids) {
		this.numberOfBids = numberOfBids;
	}

	public Timestamp getStarted() {
		return this.started;
	}

	public void setStarted(Timestamp started) {
		this.started = started;
	}

	public List<Bid> getBids() {
		return this.bids;
	}

	public void setBids(List<Bid> bids) {
		this.bids = bids;
	}

	public Bid addBid(Bid bid) {
		getBids().add(bid);
		bid.setItem(this);

		return bid;
	}

	public Bid removeBid(Bid bid) {
		getBids().remove(bid);
		bid.setItem(null);

		return bid;
	}

	public List<Category> getCategories() {
		return this.categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

	public Image getImage() {
		return this.image;
	}

	public void setImage(Image image) {
		this.image = image;
	}

	public Location getLocation() {
		return this.location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}